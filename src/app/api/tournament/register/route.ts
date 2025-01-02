import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { connectDB } from '../../../../../lib/mongodb';
import { Team, Player } from '../../../../../models/Team';
import { startSession } from 'mongoose';

export async function POST(request: Request) {
  console.log('Received tournament registration request');

  try {
    // Get the raw request data
    const rawData = await request.text();
    console.log('Raw request data:', rawData);

    // Parse the JSON data
    let body;
    try {
      body = JSON.parse(rawData);
      console.log('Parsed request body:', body);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON data' },
        { status: 400 }
      );
    }

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

    // Connect to MongoDB
    await connectDB();

    // Start a MongoDB session for the transaction
    const mongoSession = await startSession();

    try {
      // Start transaction
      mongoSession.startTransaction();
      console.log('Starting database transaction');

      // First create the team
      const team = await Team.create([{
        name: teamName,
        userId: session.user.id,
        players: [] // Initialize with empty players array
      }], { session: mongoSession });

      const newTeam = team[0]; // Create returns an array

      // Create players and associate them with the team
      const playerDocs = await Player.create(
        players.map((name: string, index: number) => ({
          name,
          number: index + 1,
          teamId: newTeam._id
        })),
        { session: mongoSession }
      );

      // Add player references to the team
      newTeam.players = playerDocs.map(player => player._id);
      await newTeam.save({ session: mongoSession });

      // Commit the transaction
      await mongoSession.commitTransaction();

      // Populate the players field for the response
      const populatedTeam = await Team.findById(newTeam._id)
        .populate('players')
        .lean();

      return NextResponse.json({
        success: true,
        message: 'Team registered successfully',
        team: populatedTeam,
      });
    } catch (transactionError) {
      // If there's an error, abort the transaction
      await mongoSession.abortTransaction();
      throw transactionError;
    } finally {
      // End the session
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