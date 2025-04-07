import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patterns = await prisma.drivingPattern.findMany({
      where: {
        vehicleId: params.id
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(patterns);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ismeretlen hiba történt' },
      { status: 500 }
    );
  }
} 