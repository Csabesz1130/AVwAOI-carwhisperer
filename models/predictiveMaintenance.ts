import { Database } from '@/core/database';

interface VehicleData {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  manufactureDate: Date;
  lastOilChange: Date;
  maintenanceEvents: MaintenanceEvent[];
  drivingPatterns: DrivingPattern[];
}

interface MaintenanceEvent {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  cost?: number;
  date: Date;
}

interface DrivingPattern {
  id: string;
  vehicleId: string;
  date: Date;
  aggressiveBrakingCount: number;
  aggressiveCorneringCount: number;
  averageSpeed: number;
  distanceTraveled: number;
}

export class PredictiveMaintenanceModel {
  private prisma: typeof Database;

  constructor() {
    this.prisma = Database;
  }

  // Jármű adatainak elemzése és predikciók generálása
  async analyzeVehicleHealth(vehicleId: string) {
    const vehicle = await this.prisma.vehicleData.findUnique({
      where: { id: vehicleId },
      include: {
        maintenanceEvents: true,
        drivingPatterns: true
      }
    });

    if (!vehicle) {
      return { error: 'Jármű nem található' };
    }

    // Alapvető predikciók
    const predictions = {
      batteryHealth: this.predictBatteryHealth(vehicle),
      brakeWear: this.predictBrakeWear(vehicle),
      transmissionHealth: this.predictTransmissionHealth(vehicle),
      oilLife: this.predictOilLife(vehicle),
      tireWear: this.predictTireWear(vehicle)
    };

    // Kockázati értékelés
    const riskScore = this.calculateRiskScore(predictions);

    return {
      predictions,
      riskScore,
      recommendations: this.generateRecommendations(predictions, riskScore)
    };
  }

  private predictBatteryHealth(vehicle: VehicleData) {
    // Egyszerű heurisztikus modell a kezdeti fázisban
    const ageInYears = (new Date().getTime() - new Date(vehicle.manufactureDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
    const baseHealth = 100 - (ageInYears * 10);
    return Math.max(0, Math.min(100, baseHealth));
  }

  private predictBrakeWear(vehicle: VehicleData) {
    // Fékek kopásának becslése a vezetési minták alapján
    const aggressiveBrakingCount = vehicle.drivingPatterns.reduce(
      (sum, pattern) => sum + pattern.aggressiveBrakingCount,
      0
    );
    
    return Math.min(100, Math.max(0, (aggressiveBrakingCount * 2)));
  }

  private predictTransmissionHealth(vehicle: VehicleData) {
    // Váltó állapotának becslése a futásteljesítmény alapján
    const mileageFactor = vehicle.mileage / 100000;
    return Math.max(0, Math.min(100, 100 - (mileageFactor * 5)));
  }

  private predictOilLife(vehicle: VehicleData) {
    // Olaj élettartamának becslése
    const lastOilChange = vehicle.lastOilChange;
    const daysSinceChange = (new Date().getTime() - new Date(lastOilChange).getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.min(100, 100 - (daysSinceChange / 30)));
  }

  private predictTireWear(vehicle: VehicleData) {
    // Gumiabroncs kopásának becslése
    const mileageFactor = vehicle.mileage / 50000;
    const aggressiveCornering = vehicle.drivingPatterns.reduce(
      (sum, pattern) => sum + pattern.aggressiveCorneringCount,
      0
    );
    return Math.min(100, Math.max(0, (mileageFactor * 20) + (aggressiveCornering * 0.1)));
  }

  private calculateRiskScore(predictions: {
    batteryHealth: number;
    brakeWear: number;
    transmissionHealth: number;
    oilLife: number;
    tireWear: number;
  }) {
    const weights = {
      batteryHealth: 0.2,
      brakeWear: 0.25,
      transmissionHealth: 0.2,
      oilLife: 0.15,
      tireWear: 0.2
    };

    return Math.min(100, Object.entries(predictions).reduce(
      (score, [key, value]) => score + value * weights[key as keyof typeof weights],
      0
    ));
  }

  private generateRecommendations(predictions: {
    batteryHealth: number;
    brakeWear: number;
    transmissionHealth: number;
    oilLife: number;
    tireWear: number;
  }, riskScore: number) {
    const recommendations = [];

    if (predictions.batteryHealth < 30) {
      recommendations.push({
        component: 'Akkumulátor',
        priority: 'Magas',
        action: 'Azonnali ellenőrzés szükséges',
        estimatedCost: '50,000 - 150,000 Ft'
      });
    }

    if (predictions.brakeWear > 70) {
      recommendations.push({
        component: 'Fékrendszer',
        priority: 'Magas',
        action: 'Fékbetétek cseréje ajánlott',
        estimatedCost: '30,000 - 100,000 Ft'
      });
    }

    if (predictions.transmissionHealth < 40) {
      recommendations.push({
        component: 'Váltó',
        priority: 'Közepes',
        action: 'Rendszeres ellenőrzés ajánlott',
        estimatedCost: 'Változó'
      });
    }

    if (predictions.oilLife < 20) {
      recommendations.push({
        component: 'Motorolaj',
        priority: 'Közepes',
        action: 'Olajcsere szükséges',
        estimatedCost: '15,000 - 30,000 Ft'
      });
    }

    if (predictions.tireWear > 80) {
      recommendations.push({
        component: 'Gumiabroncsok',
        priority: 'Magas',
        action: 'Gumiabroncsok cseréje ajánlott',
        estimatedCost: '40,000 - 200,000 Ft/gumi'
      });
    }

    // Default recommendation when overall risk is high but no specific component triggers
    if (riskScore > 70 && recommendations.length === 0) {
      recommendations.push({
        component: 'Általános állapotfelmérés',
        priority: 'Közepes',
        action: 'Részletes műszaki vizsgálat ajánlott',
        estimatedCost: '20,000 - 50,000 Ft'
      });
    }

    return recommendations;
  }
} 