import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DrivingPattern {
  date: string;
  aggressiveBrakingCount: number;
  aggressiveCorneringCount: number;
  averageSpeed: number;
  distanceTraveled: number;
}

interface DrivingPatternsAnalysisProps {
  vehicleId: string;
}

export function DrivingPatternsAnalysis({ vehicleId }: DrivingPatternsAnalysisProps) {
  const [patterns, setPatterns] = useState<DrivingPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDrivingPatterns = async () => {
      try {
        const response = await fetch(`/api/vehicles/${vehicleId}/driving-patterns`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Nem sikerült betölteni a vezetési mintákat');
        }
        
        const data = await response.json();
        setPatterns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt');
      } finally {
        setLoading(false);
      }
    };

    fetchDrivingPatterns();
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
          A megadott járműhöz nem találhatók vezetési minták. 
          Ellenőrizze a jármű azonosítóját, vagy futtassa a seed scriptet a demo adatok létrehozásához.
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Hiba</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (patterns.length === 0) {
    return (
      <Alert>
        <InfoCircledIcon className="h-4 w-4" />
        <AlertTitle>Nincsenek vezetési minták</AlertTitle>
        <AlertDescription>
          A járműhöz még nem rendelkezünk vezetési mintákkal.
        </AlertDescription>
      </Alert>
    );
  }

  const calculateAggressiveDrivingScore = (pattern: DrivingPattern) => {
    return (pattern.aggressiveBrakingCount * 0.6) + (pattern.aggressiveCorneringCount * 0.4);
  };

  const data = patterns.map(pattern => ({
    date: new Date(pattern.date).toLocaleDateString('hu-HU', { 
      month: 'short', 
      day: 'numeric' 
    }),
    aggressiveScore: Math.round(calculateAggressiveDrivingScore(pattern) * 10) / 10,
    averageSpeed: Math.round(pattern.averageSpeed),
    distance: Math.round(pattern.distanceTraveled)
  }));

  const totalAggressiveBraking = patterns.reduce((sum, p) => sum + p.aggressiveBrakingCount, 0);
  const totalAggressiveCornering = patterns.reduce((sum, p) => sum + p.aggressiveCorneringCount, 0);
  const averageSpeed = Math.round(patterns.reduce((sum, p) => sum + p.averageSpeed, 0) / patterns.length);
  const totalDistance = Math.round(patterns.reduce((sum, p) => sum + p.distanceTraveled, 0));
  const averageAggressiveScore = Math.round(
    patterns.reduce((sum, p) => sum + calculateAggressiveDrivingScore(p), 0) / patterns.length * 10
  ) / 10;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vezetési minták elemzése</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#ff4444"
                  fontSize={12}
                  label={{ value: 'Agresszív pontszám', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#4444ff"
                  fontSize={12}
                  label={{ value: 'Sebesség (km/h)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="aggressiveScore"
                  stroke="#ff4444"
                  strokeWidth={2}
                  name="Agresszív vezetés pontszám"
                  dot={{ fill: '#ff4444', strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="averageSpeed"
                  stroke="#4444ff"
                  strokeWidth={2}
                  name="Átlagsebesség (km/h)"
                  dot={{ fill: '#4444ff', strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="distance"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Megtett távolság (km)"
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Összefoglaló</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agresszív fékezések:</span>
                <span className="font-semibold">{totalAggressiveBraking}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agresszív kanyarodások:</span>
                <span className="font-semibold">{totalAggressiveCornering}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Átlagos sebesség:</span>
                <span className="font-semibold">{averageSpeed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Összes távolság:</span>
                <span className="font-semibold">{totalDistance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Átlagos agresszív pontszám:</span>
                <span className="font-semibold">{averageAggressiveScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Javaslatok</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {totalAggressiveBraking > 10 && (
                <li className="text-orange-600">
                  Próbáljon meg csökkenteni az agresszív fékezések számát a biztonságosabb
                  vezetés érdekében
                </li>
              )}
              {totalAggressiveCornering > 5 && (
                <li className="text-orange-600">
                  A gumiabroncsok kopása csökkenthető a kanyarodások során történő
                  sebességcsökkentéssel
                </li>
              )}
              {averageSpeed > 50 && (
                <li className="text-blue-600">
                  A magasabb átlagsebesség növelheti a fékrendszer terhelését
                </li>
              )}
              <li className="text-green-600">
                A fékrendszer élettartama jelentősen növelhető a simább fékezéssel
              </li>
              <li className="text-green-600">
                Rendszeres karbantartás javasolt a jármű optimális állapotának fenntartásához
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 