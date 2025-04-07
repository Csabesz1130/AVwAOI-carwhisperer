import { DrivingPatternsAnalysis } from '@/components/DrivingPatternsAnalysis';
import { VehicleHealthDashboard } from '@/components/VehicleHealthDashboard';

export default function Home() {
  // Példa vehicleId, a valós alkalmazásban ezt a felhasználó kiválasztott járművétől függően kell beállítani
  const vehicleId = 'example-vehicle-id';

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Jármű Egészségügyi Tanácsadó</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Jármű állapotának áttekintése</h2>
          <VehicleHealthDashboard vehicleId={vehicleId} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Vezetési minták elemzése</h2>
          <DrivingPatternsAnalysis vehicleId={vehicleId} />
        </section>
      </div>
    </main>
  );
} 