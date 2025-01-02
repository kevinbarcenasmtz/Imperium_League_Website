// File: src/app/api/teams/[teamId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { connectDB } from "../../../../../lib/mongodb";
import { Team, Player } from "../../../../../models/Team";
import mongoose from "mongoose";

// Type definitions
type TeamResponse = {
  success: boolean;
  team?: any;  // Using 'any' since we don't have the exact Team type
  message?: string;
};

type TeamRequest = {
  name: string;
  players: {
    name: string;
    number?: number | null;
    position?: string | null;
  }[];
};

// Helper Functions
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    {
      success: false,
      message,
      timestamp: new Date().toISOString(),
      code: status,
    },
    { status }
  );
};

const logError = (error: any, context: Record<string, any>) => {
  console.error('API Error:', {
    ...context,
    error,
    timestamp: new Date().toISOString()
  });
};

const validateTeamName = (name: string): string | null => {
  if (!name?.trim() || name.length > 100) {
    return "Team name must be between 1 and 100 characters";
  }
  return null;
};

const validatePlayer = (player: TeamRequest["players"][0]): string | null => {
  if (player.number !== null && player.number !== undefined) {
    if (!Number.isInteger(player.number) || player.number < 0 || player.number > 99) {
      return "Player number must be between 0 and 99";
    }
  }
  if (player.position && player.position.length > 50) {
    return "Position cannot exceed 50 characters";
  }
  return null;
};

// Route Handlers
export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  let userId: string | undefined;

  try {
    await connectDB();
    

    // Add early validation for teamId
    if (!params.teamId || params.teamId === 'undefined') {
      return createErrorResponse("Invalid team ID provided", 400);
    }

    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(params.teamId)) {
      return createErrorResponse("Invalid team ID format", 400);
    }
    const session = await auth();
    userId = session?.user?.id;
    
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    // Add debug logging
    console.log('Debug: Attempting to find team with params:', {
      teamId: params.teamId,
      userId
    });

    const team = await Team.findOne({
      _id: params.teamId,
      userId
    })
    .populate('players')
    .lean();

    // Add debug logging
    console.log('Debug: Found team:', team);

    if (!team) {
      return createErrorResponse("Team not found", 404);
    }

    return NextResponse.json({ success: true, team });
  } catch (error) {
    // Enhanced error logging
    console.error('Detailed Error in GET /api/teams/[teamId]:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      params,
      userId
    });
    return createErrorResponse("Failed to fetch team details", 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  let userId: string | undefined;

  try {
    await connectDB();
    
    const session = await auth();
    userId = session?.user?.id;
    
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const body = await request.json() as TeamRequest;

    // Validate team name
    const nameError = validateTeamName(body.name);
    if (nameError) {
      return createErrorResponse(nameError, 400);
    }

    // Validate players array
    if (!Array.isArray(body.players) || body.players.length > 50) {
      return createErrorResponse("Invalid players data or too many players (max 50)", 400);
    }

    // Validate each player
    for (const player of body.players) {
      const playerError = validatePlayer(player);
      if (playerError) {
        return createErrorResponse(playerError, 400);
      }
    }

    // Verify team ownership
    const existingTeam = await Team.findOne({
      _id: params.teamId,
      userId,
    });

    if (!existingTeam) {
      return createErrorResponse("Team not found or unauthorized", 404);
    }

    const mongoSession = await mongoose.startSession();
    let updatedTeam;

    try {
      await mongoSession.withTransaction(async () => {
        await Player.deleteMany({
          teamId: params.teamId
        }, { session: mongoSession });

        const newPlayers = await Player.create(
          body.players.map(player => ({
            name: player.name.trim(),
            number: player.number ?? null,
            position: player.position?.trim() ?? null,
            teamId: params.teamId
          })),
          { session: mongoSession }
        );

        updatedTeam = await Team.findByIdAndUpdate(
          params.teamId,
          {
            name: body.name.trim(),
            players: newPlayers.map(player => player._id)
          },
          { 
            new: true,
            session: mongoSession 
          }
        ).populate('players');
      });

      return NextResponse.json({
        success: true,
        team: updatedTeam
      });
    } finally {
      await mongoSession.endSession();
    }
  } catch (error) {
    logError(error, {
      endpoint: 'PUT /api/teams/[teamId]',
      teamId: params.teamId,
      userId
    });
    return createErrorResponse("Failed to update team", 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  let userId: string | undefined;

  try {
    await connectDB();
    
    const session = await auth();
    userId = session?.user?.id;
    
    if (!userId) {
      return createErrorResponse("Unauthorized", 401);
    }

    const existingTeam = await Team.findOne({
      _id: params.teamId,
      userId,
    });

    if (!existingTeam) {
      return createErrorResponse("Team not found or unauthorized", 404);
    }

    const mongoSession = await mongoose.startSession();

    try {
      await mongoSession.withTransaction(async () => {
        await Player.deleteMany(
          { teamId: params.teamId },
          { session: mongoSession }
        );
        await Team.findByIdAndDelete(params.teamId, { session: mongoSession });
      });

      return NextResponse.json({
        success: true,
        message: "Team deleted successfully"
      });
    } finally {
      await mongoSession.endSession();
    }
  } catch (error) {
    logError(error, {
      endpoint: 'DELETE /api/teams/[teamId]',
      teamId: params.teamId,
      userId
    });
    return createErrorResponse("Failed to delete team", 500);
  }
}