// app/api/register-form/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import prisma from '../../../../../prisma';

export async function POST(request: Request) {
  console.log('Received registration request');
  
  try {
    // Log the raw request
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

    // Create the team and players in a transaction
    const result = await prisma.$transaction(async (tx) => {
      console.log('Starting database transaction');
      
      const team = await tx.team.create({
        data: {
          name: teamName,
          userId: session.user.id,
          players: {
            create: players.map((name: string, index: number) => ({
              name,
              number: index + 1,
            })),
          },
        },
        include: {
          players: true,
        },
      });

      console.log('Created team:', team);
      return team;
    });

    return NextResponse.json({
      success: true,
      message: 'Team registered successfully',
      team: result,
    });
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