import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { connectDB } from '../../../../../lib/mongodb';
import { Team } from '../../../../../models/Team';

type PaginationParams = {
  page: number;
  limit: number;
};

type TeamsResponse = {
  success: boolean;
  teams?: any[];  // Replace with proper Team type when available
  pagination?: {
    total: number;
    page: number;
    pages: number;
  };
  message?: string;
};

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

const getPaginationParams = (url: string): PaginationParams => {
  const { searchParams } = new URL(url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  return { page, limit };
};

export async function GET(request: Request): Promise<NextResponse<TeamsResponse>> {
  let userId: string | undefined;
  
  try {
    const session = await auth();
    userId = session?.user?.id;
   
    if (!userId) {
      return createErrorResponse('Unauthorized', 401);
    }

    await connectDB();

    const { page, limit } = getPaginationParams(request.url);
    const skip = (page - 1) * limit;

    const total = await Team.countDocuments({ userId });

    const teams = await Team.find({ userId })
      .populate({
        path: 'players',
        select: '-__v'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      teams,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logError(error, {
      endpoint: 'GET /api/teams/user',
      userId
    });
    return createErrorResponse('Failed to fetch teams', 500);
  }
}