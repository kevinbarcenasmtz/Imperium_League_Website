// app/api/teams/user/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import prisma from '../../../../../prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const teams = await prisma.team.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        players: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      teams
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}