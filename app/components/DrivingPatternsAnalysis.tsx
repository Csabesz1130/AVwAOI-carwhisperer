import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

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

  useEffect(() => {
    const fetchDrivingPatterns = async () => {
      try {
        const response = await fetch(`/api/vehicles/${vehicleId}/driving-patterns`);
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
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const calculateAggressiveDrivingScore = (pattern: DrivingPattern) => {
    return (pattern.aggressiveBrakingCount * 0.6) + (pattern.aggressiveCorneringCount * 0.4);
  };

  const data = patterns.map(pattern => ({
    date: new Date(pattern.date).toLocaleDateString(),
    aggressiveScore: calculateAggressiveDrivingScore(pattern),
    averageSpeed: pattern.averageSpeed,
    distance: pattern.distanceTraveled
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vezetési minták elemzése</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <LineChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="aggressiveScore"
                stroke="#ff4444"
                name="Agresszív vezetés pontszám"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageSpeed"
                stroke="#4444ff"
                name="Átlagsebesség (km/h)"
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Összefoglaló</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Agresszív fékezések száma:{' '}
                {patterns.reduce((sum, p) => sum + p.aggressiveBrakingCount, 0)}
              </p>
              <p>
                Agresszív kanyarodások száma:{' '}
                {patterns.reduce((sum, p) => sum + p.aggressiveCorneringCount, 0)}
              </p>
              <p>
                Átlagos sebesség:{' '}
                {Math.round(
                  patterns.reduce((sum, p) => sum + p.averageSpeed, 0) / patterns.length
                )}{' '}
                km/h
              </p>
              <p>
                Összes megtett távolság:{' '}
                {Math.round(patterns.reduce((sum, p) => sum + p.distanceTraveled, 0))} km
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Javaslatok</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Próbáljon meg csökkenteni az agresszív fékezések számát a biztonságosabb
                vezetés érdekében
              </li>
              <li>
                A fékrendszer élettartama jelentősen növelhető a simább fékezéssel
              </li>
              <li>
                A gumiabroncsok kopása csökkenthető a kanyarodások során történő
                sebességcsökkentéssel
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 