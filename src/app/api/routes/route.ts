
import { NextResponse } from 'next/server';
import { mockRoutes, mockLiveBuses } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    demo: true,
    message: 'Transport routes fetched successfully',
    routes: mockRoutes,
    buses: mockLiveBuses,
    totalRoutes: mockRoutes.length,
    totalBuses: mockLiveBuses.length,
  });
}
