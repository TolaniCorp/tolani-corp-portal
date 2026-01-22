/**
 * GET /api/tracks
 * Returns all available learning tracks
 */

import { NextResponse } from 'next/server';
import { LEARNING_TRACKS } from '@/lib/api';

export async function GET() {
  return NextResponse.json({
    tracks: LEARNING_TRACKS,
    meta: {
      total: LEARNING_TRACKS.length,
      totalRewards: LEARNING_TRACKS.reduce((sum, t) => sum + t.reward, 0),
    },
  });
}
