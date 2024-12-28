// app/api/teams/[teamId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "../../../../../prisma";

// GET endpoint to fetch team details
export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const team = await prisma.team.findUnique({
      where: { 
        id: params.teamId,
        userId: session.user.id 
      },
      include: { 
        players: true 
      },
    });

    if (!team) {
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team details" },
      { status: 500 }
    );
  }
}

// PUT endpoint to update team details
export async function PUT(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    if (!body.name || !Array.isArray(body.players)) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    // Verify team ownership
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: params.teamId,
        userId: session.user.id,
      },
    });

    if (!existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update team and players in a transaction
    const updatedTeam = await prisma.$transaction(async (tx) => {
      // Delete existing players
      await tx.player.deleteMany({
        where: {
          teamId: params.teamId,
        },
      });

      // Update team and create new players
      return await tx.team.update({
        where: {
          id: params.teamId,
        },
        data: {
          name: body.name,
          players: {
            create: body.players.map((player: { 
              name: string; 
              number?: number | null;
              position?: string | null;
            }) => ({
              name: player.name,
              number: player.number ?? null,
              position: player.position ?? null,
            })),
          },
        },
        include: {
          players: true,
        },
      });
    });

    return NextResponse.json({
      success: true,
      team: updatedTeam,
    });
  } catch (error) {
    console.error('Error in PUT /api/teams/[teamId]:', error);
    return NextResponse.json(
      { success: false, message: "Failed to update team" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a team
export async function DELETE(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify team ownership before deletion
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: params.teamId,
        userId: session.user.id,
      },
    });

    if (!existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the team (players will be automatically deleted due to cascade delete)
    await prisma.team.delete({
      where: {
        id: params.teamId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Team deleted successfully"
    });
  } catch (error) {
    console.error('Error in DELETE /api/teams/[teamId]:', error);
    return NextResponse.json(
      { success: false, message: "Failed to delete team" },
      { status: 500 }
    );
  }
}