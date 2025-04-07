import { PredictiveMaintenanceModel } from '@/models/predictiveMaintenance';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const model = new PredictiveMaintenanceModel();
    const healthData = await model.analyzeVehicleHealth(params.id);
    
    return NextResponse.json(healthData);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ismeretlen hiba történt' },
      { status: 500 }
    );
  }
} 