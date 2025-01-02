import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { connectDB } from '../../../../../lib/mongodb';
import { Team, Player } from '../../../../../models/Team';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  console.log('Received registration request');
 
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Parse the JSON data directly from request
    const body = await request.json();
    console.log('Request body:', body);

    // Get the current session
    const session = await auth();
    console.log('Session:', session);
    
    if (!session?.user?.id) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { success: false, message: 'Please log in to register a team' },
        { status: 401 }
      );
    }

    const { teamName, teamCaptain, players } = body;
    console.log('Extracted data:', { teamName, teamCaptain, players });

    // Validate the input
    if (!teamName || !teamCaptain || !Array.isArray(players)) {
      console.log('Invalid input data');
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Start a MongoDB session for transactions
    const mongoSession = await mongoose.startSession();
    let result;

    try {
      await mongoSession.withTransaction(async () => {
        console.log('Starting database transaction');
        
        // Create the team
        const team = await Team.create([{
          name: teamName,
          userId: session.user.id,
        }], { session: mongoSession });

        // Create players with required fields from your schema
        const createdPlayers = await Player.create(
          players.map((player: { name: string, number?: number, position?: string }, index: number) => ({
            name: player.name,
            number: player.number || index + 1,
            position: player.position || null,
            teamId: team[0]._id
          })),
          { session: mongoSession }
        );

        // Update team with player references
        team[0].players = createdPlayers.map(player => player._id);
        await team[0].save({ session: mongoSession });

        result = await Team.findById(team[0]._id)
          .populate('players')
          .lean();
        console.log('Created team:', result);
      });

      return NextResponse.json({
        success: true,
        message: 'Team registered successfully',
        team: result
      });
    } finally {
      await mongoSession.endSession();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to register team'
      },
      { status: 500 }
    );
  }
}