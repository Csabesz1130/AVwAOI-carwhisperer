import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface VehicleHealthData {
  predictions: {
    batteryHealth: number;
    brakeWear: number;
    transmissionHealth: number;
    oilLife: number;
    tireWear: number;
  };
  riskScore: number;
  recommendations: Array<{
    component: string;
    priority: string;
    action: string;
    estimatedCost: string;
  }>;
}

export function VehicleHealthDashboard({ vehicleId }: { vehicleId: string }) {
  const [healthData, setHealthData] = useState<VehicleHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch(`/api/vehicles/${vehicleId}/health`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Nem sikerült betölteni az adatokat');
        }
        
        const data = await response.json();
        setHealthData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Betöltés...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <Alert>
        <InfoCircledIcon className="h-4 w-4" />
        <AlertTitle>Adatok nem találhatók</AlertTitle>
        <AlertDescription>
          A megadott járműhöz nem találhatók egészségügyi adatok. 
          Ellenőrizze a jármű azonosítóját, vagy futtassa a seed scriptet a demo adatok létrehozásához.
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Hiba</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!healthData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Akkumulátor állapota</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.predictions.batteryHealth} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.predictions.batteryHealth}% élettartam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fékrendszer állapota</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.predictions.brakeWear} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.predictions.brakeWear}% kopás
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Váltó állapota</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.predictions.transmissionHealth} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.predictions.transmissionHealth}% élettartam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Motorolaj állapota</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.predictions.oilLife} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.predictions.oilLife}% élettartam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gumiabroncsok állapota</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.predictions.tireWear} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.predictions.tireWear}% kopás
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kockázati értékelés</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={healthData.riskScore} />
            <p className="text-sm text-muted-foreground mt-2">
              {healthData.riskScore}% kockázati szint
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Ajánlott karbantartások</h2>
        {healthData.recommendations.length === 0 ? (
          <Alert>
            <InfoCircledIcon className="h-4 w-4" />
            <AlertTitle>Nincs sürgős karbantartás</AlertTitle>
            <AlertDescription>
              A jármű jelenleg jó állapotban van. Folytassa a rendszeres karbantartást.
            </AlertDescription>
          </Alert>
        ) : (
          healthData.recommendations.map((rec, index) => (
            <Alert key={index} variant={rec.priority === 'Magas' ? 'destructive' : 'default'}>
              <AlertTitle>{rec.component}</AlertTitle>
              <AlertDescription>
                <p>{rec.action}</p>
                <p className="font-semibold mt-1">Becsült költség: {rec.estimatedCost}</p>
              </AlertDescription>
            </Alert>
          ))
        )}
      </div>
    </div>
  );
} 