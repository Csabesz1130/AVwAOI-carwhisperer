import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import type { ReactNode } from 'react'
import {
  ActivityLogIcon,
  CalendarIcon,
  CheckCircledIcon,
  DashboardIcon,
  LightningBoltIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const heroHighlights = [
  {
    label: 'Aktív járművek',
    value: '248',
    detail: '32 flottaeszköz valós idejű monitorozása',
  },
  {
    label: 'Előre jelzett megtakarítás',
    value: '€18 200',
    detail: 'A következő 90 napban megelőzött meghibásodások alapján',
  },
  {
    label: 'AI által feltárt hibák',
    value: '27',
    detail: 'Átlagosan 2,1 nap alatt lezárt beavatkozások',
  },
  {
    label: 'Ügyfél elégedettség',
    value: '4,8 / 5',
    detail: 'Valós visszajelzésekből számítva',
  },
]

const overviewCards = [
  {
    title: 'Prediktív egészség',
    value: '92 / 100',
    change: '+4,3% a múlt héthez képest',
    description:
      'A mesterséges intelligencia a szenzoradatok alapján értékeli a teljes flotta kockázati profilját.',
    icon: DashboardIcon,
    tone: 'emerald' as const,
  },
  {
    title: 'Aktív riasztások',
    value: '5',
    change: '3 kritikus – azonnali beavatkozás szükséges',
    description:
      'A rendszer priorizálja a járműveket, így a szerviz csapat a legfontosabb feladatokra koncentrálhat.',
    icon: ActivityLogIcon,
    tone: 'rose' as const,
  },
  {
    title: 'Költség optimalizálás',
    value: '€5 780',
    change: '12% csökkenés az elmúlt 30 napban',
    description:
      'Az előre ütemezett karbantartások és az alkatrész-logisztika minimalizálja a leállási időt.',
    icon: LightningBoltIcon,
    tone: 'amber' as const,
  },
  {
    title: 'Vezetői élmény',
    value: '4,7 / 5',
    change: '+18 új értékelés a mobil alkalmazásból',
    description:
      'Valós idejű tippek segítik a vezetőket az eco-driving elsajátításában és a stresszmentes közlekedésben.',
    icon: RocketIcon,
    tone: 'sky' as const,
  },
]

const healthBreakdown = [
  {
    label: 'Akkumulátor állapot',
    value: 86,
    status: 'Stabil',
    insight: 'Optimalizált töltési profil és kiegyensúlyozott hőmérséklet.',
    tone: 'emerald' as const,
  },
  {
    label: 'Fékrendszer kopás',
    value: 74,
    status: 'Figyelendő',
    insight: 'Bal első fékbetét 28% alá csökkent – szerviz időpont egyeztetve.',
    tone: 'amber' as const,
  },
  {
    label: 'Hajtáslánc hatékonyság',
    value: 91,
    status: 'Kiemelkedő',
    insight: 'A szoftverfrissítés 7%-kal javította a váltási mintákat.',
    tone: 'sky' as const,
  },
  {
    label: 'Gumiabroncs állapot',
    value: 67,
    status: 'Beavatkozás szükséges',
    insight: 'Bal hátsó kerék profilmélysége 2,6 mm – csere javasolt 500 km-en belül.',
    tone: 'rose' as const,
  },
]

const drivingBehaviour = [
  { week: 'Hét 1', ecoScore: 82, aggressiveEvents: 14, distance: 680 },
  { week: 'Hét 2', ecoScore: 88, aggressiveEvents: 9, distance: 720 },
  { week: 'Hét 3', ecoScore: 91, aggressiveEvents: 6, distance: 705 },
  { week: 'Hét 4', ecoScore: 94, aggressiveEvents: 4, distance: 730 },
  { week: 'Hét 5', ecoScore: 96, aggressiveEvents: 3, distance: 742 },
]

const maintenanceTimeline = [
  {
    stage: 'Ma',
    title: 'Automatikus diagnosztikai riasztás',
    status: 'Lezárva',
    tone: 'success' as const,
    detail:
      'Az AI a fékrendszer rendellenes rezgését észlelte, és részletes hibajelentést készített a szervizcsapatnak.',
  },
  {
    stage: '+2 nap',
    title: 'Alkatrész logisztika aktiválása',
    status: 'Folyamatban',
    tone: 'info' as const,
    detail:
      'A rendszer automatikusan megrendelte a gyári fékbetéteket, és optimalizálta a szállítási útvonalat.',
  },
  {
    stage: '+2 hét',
    title: 'Szerviz időpont',
    status: 'Kritikus',
    tone: 'warning' as const,
    detail:
      'Az AI a minimális leállási ablakot ajánlotta, így a jármű csúcsidőn kívül kerül szervizbe.',
    cost: '€380 várható költség',
  },
  {
    stage: '+30 nap',
    title: 'Eredmény ellenőrzése',
    status: 'Tervezett',
    tone: 'neutral' as const,
    detail:
      'Utóellenőrző teszt és vezetői feedback gyűjtése a hosszú távú hatás méréséhez.',
  },
]

const aiInsights = [
  {
    id: 'energy',
    title: 'Energia optimalizálás',
    summary:
      'A Car Whisperer eco-driving coach modulja személyre szabott tippekkel 12%-kal csökkenti az energiafelhasználást.',
    icon: LightningBoltIcon,
    highlights: [
      '-12% üzemanyag / energia fogyasztás',
      '-7 kg CO₂ megtakarítás járművenként hetente',
      'Eco-score növekedés: +9 pont',
    ],
    recommendation:
      'Aktiváld az adaptív rekuperációs módot és az időjárás alapú előfűtést.',
  },
  {
    id: 'safety',
    title: 'Biztonsági priorizálás',
    summary:
      'A prediktív modell a vezetési minták alapján előre jelzi a kockázatos eseményeket, és valós idejű tréninget kínál.',
    icon: ActivityLogIcon,
    highlights: [
      '-32% agresszív fékezés',
      'Valós idejű tréning 48 órás visszajelzési ciklusban',
      'Átlagos reagálási idő: 17 perc',
    ],
    recommendation:
      'Kapcsolj be geokerítést a nagy forgalmú területeken, és küldj push értesítést a sofőrnek.',
  },
  {
    id: 'experience',
    title: 'Ügyfélélmény maximalizálása',
    summary:
      'A rendszer automatikus kommunikációt biztosít a sofőr és a szerviz között, így transzparens a teljes folyamat.',
    icon: RocketIcon,
    highlights: [
      'NPS +18 pont',
      'Automatikus státusz frissítések 5 csatornán',
      '97% ügyfélelvárásnak megfelelő határidő',
    ],
    recommendation:
      'Aktiváld az SMS + in-app kombinált értesítést a pro előfizetők számára.',
  },
]

const scenarioSteps = [
  {
    id: 'step-1',
    title: '1. AI észlelés',
    description:
      'A fedélzeti diagnosztika perces pontossággal jelenti a fékrendszerben tapasztalt rendellenességet, és a flotta operátor azonnali riasztást kap.',
  },
  {
    id: 'step-2',
    title: '2. Automatizált koordináció',
    description:
      'A rendszer egyeztet a szervizpartnerekkel, lefoglalja az optimális idősávot, és értesíti a sofőrt a mobil alkalmazáson keresztül.',
  },
  {
    id: 'step-3',
    title: '3. Karbantartási végrehajtás',
    description:
      'A műhely valós idejű munkalapot kap, amely tartalmazza a diagnosztikát, az alkatrész listát és az ajánlott munkafolyamatot.',
  },
  {
    id: 'step-4',
    title: '4. Utókövetés és visszacsatolás',
    description:
      'A jármű visszatérése után a Car Whisperer figyeli a KPI-ket, és a sofőr értékelése alapján finomhangolja a jövőbeli javaslatokat.',
  },
]

const integrationHighlights = [
  {
    title: 'IoT szenzor réteg',
    detail: 'Valós idejű CAN-busz és telematikai adatok szinkronban a platformmal.',
    metric: '32 ms átlagos késleltetés',
  },
  {
    title: 'Szerviz partnerek',
    detail: 'Hitelesített műhelyhálózat automatikus munkalap integrációval.',
    metric: '18 aktív partner országszerte',
  },
  {
    title: 'Ügyfél kommunikáció',
    detail: 'Omnichannel értesítések e-mailen, SMS-ben és in-app üzenetekben.',
    metric: '93% megnyitási arány',
  },
]

const alertFeed = [
  {
    id: 'alert-1',
    title: 'Fékbetét kopás – javasolt csere',
    severity: 'critical' as const,
    timestamp: '11 perce',
    message:
      'Bal első kerék, 2,6 mm profilmélység. Szerviz időpont egyeztetve november 14-re.',
  },
  {
    id: 'alert-2',
    title: 'Alacsony akkumulátor hőmérséklet',
    severity: 'warning' as const,
    timestamp: '42 perce',
    message:
      'Éjszakai parkolás kültéren. Javasolt előfűtés indulás előtt 20 perccel.',
  },
  {
    id: 'alert-3',
    title: 'Vezetői coaching sikeres',
    severity: 'success' as const,
    timestamp: '1 órája',
    message:
      'Eco-driving kihívás teljesítve, agresszív események 35%-kal csökkentek.',
  },
]

export const meta: MetaFunction = () => [
  { title: 'Car Whisperer | Interaktív demó' },
  {
    name: 'description',
    content:
      'Merülj el a Car Whisperer képességeiben: prediktív karbantartás, vezetési analitika és AI-alapú ügyfélélmény egy részletes demóban.',
  },
]

type BadgeTone = 'success' | 'warning' | 'critical' | 'info' | 'neutral'
type ProgressAccent = 'emerald' | 'amber' | 'sky' | 'rose'

const badgeStyles: Record<BadgeTone, string> = {
  success:
    'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 dark:text-emerald-200',
  warning:
    'border border-amber-500/40 bg-amber-500/10 text-amber-300 dark:text-amber-200',
  critical:
    'border border-rose-500/50 bg-rose-500/10 text-rose-300 dark:text-rose-200',
  info: 'border border-sky-500/40 bg-sky-500/10 text-sky-300 dark:text-sky-200',
  neutral: 'border border-slate-500/30 bg-slate-500/10 text-slate-200',
}

const progressStyles: Record<ProgressAccent, string> = {
  emerald: 'from-emerald-400 via-emerald-500 to-emerald-600',
  amber: 'from-amber-400 via-orange-500 to-orange-600',
  sky: 'from-sky-400 via-blue-500 to-indigo-500',
  rose: 'from-rose-400 via-rose-500 to-pink-500',
}

const cardBorderStyles = {
  emerald: 'border-emerald-500/20',
  amber: 'border-amber-500/20',
  sky: 'border-sky-500/20',
  rose: 'border-rose-500/20',
}

export default function DemoPage() {
  const averageEcoScore = Math.round(
    drivingBehaviour.reduce((acc, item) => acc + item.ecoScore, 0) /
      drivingBehaviour.length,
  )
  const averageAggression =
    Math.round(
      (drivingBehaviour.reduce(
        (acc, item) => acc + item.aggressiveEvents,
        0,
      ) /
        drivingBehaviour.length) *
        10,
    ) / 10
  const totalDistance = drivingBehaviour.reduce(
    (acc, item) => acc + item.distance,
    0,
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16 lg:gap-24 lg:py-24">
        <HeroSection />

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Rendszeráttekintés"
            title="Lásd, hogyan dolgozik a Car Whisperer valós időben"
            description="Mesterséges intelligencia, automatizmus és felhasználói élmény egyetlen platformban. A demó valós telemetria alapú szcenáriókra épül."
          />
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {overviewCards.map(card => (
                <Card
                  key={card.title}
                  className={`border ${cardBorderStyles[card.tone]} bg-slate-900/60 p-6 backdrop-blur`}
                >
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-white">
                        {card.title}
                      </CardTitle>
                      <card.icon className="h-6 w-6 text-slate-300" />
                    </div>
                    <CardDescription className="mt-2 text-sm text-slate-300">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-semibold text-white">
                        {card.value}
                      </span>
                      <span className="text-sm text-emerald-300">
                        {card.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="flex h-full flex-col justify-between border border-slate-700/40 bg-slate-900/60 p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white">
                  Valós idejű esemény feed
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-slate-300">
                  A rendszer automatikusan priorizálja a riasztásokat a hatás és a kockázat alapján.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 p-0 pt-6">
                {alertFeed.map(alert => (
                  <div
                    key={alert.id}
                    className="rounded-lg border border-slate-700/40 bg-slate-900/80 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">
                        {alert.title}
                      </p>
                      <StatusBadge tone={alert.severity}>
                        {alert.severity === 'critical' && 'Kritikus'}
                        {alert.severity === 'warning' && 'Figyelmeztetés'}
                        {alert.severity === 'success' && 'Megoldva'}
                      </StatusBadge>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{alert.message}</p>
                    <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                      {alert.timestamp}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Jármű egészség"
            title="Részletes állapotkép és AI alapú ajánlások"
            description="A demó jármű egészségindexe 86 pont. Nézd meg, hogyan bontja le a rendszer komponensenként az ajánlásokat."
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card className="border border-slate-700/40 bg-slate-900/70 p-6">
              <CardHeader className="space-y-4 p-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-3xl font-semibold text-white">
                      86 / 100
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Összesített egészségindex – AI által számított kockázati érték.
                    </CardDescription>
                  </div>
                  <StatusBadge tone="success">Stabil trend</StatusBadge>
                </div>
                <p className="text-sm text-slate-300">
                  A Car Whisperer összeveti a telemetriai adatokat a történelmi mintákkal, majd proaktív karbantartási tervet ajánl.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 p-0 pt-6">
                {healthBreakdown.map(metric => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">
                        {metric.label}
                      </p>
                      <StatusBadge tone={mapMetricTone(metric.tone)}>
                        {metric.status}
                      </StatusBadge>
                    </div>
                    <DemoProgressBar value={metric.value} accent={metric.tone} />
                    <p className="text-xs text-slate-400">{metric.insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <Card className="border border-emerald-500/20 bg-slate-900/60 p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg text-white">
                    AI által jóváhagyott lépések
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-300">
                    3 karbantartási munkafolyamat előkészítve automatikus időzítéssel.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircledIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
                      Bal első fékbetét csere jóváhagyva – alkatrész úton.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircledIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
                      Szoftver frissítés ütemezve éjszakai időablakban.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircledIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
                      Gumiabroncs csere ajánlás kommunikálva a sofőrrel és a flottamenedzserrel.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border border-slate-700/40 bg-slate-900/60 p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg text-white">Kulcs KPI-k</CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-300">
                    A platform minden beavatkozás után automatikusan frissíti a mért értékeket.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 p-0 pt-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Átlagos javítási idő</span>
                    <span className="font-semibold text-white">2,1 nap</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tervezett vs. váratlan esemény</span>
                    <span className="font-semibold text-white">78% / 22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Garanciális kockázat csökkenés</span>
                    <span className="font-semibold text-white">-18%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Vezetési minták"
            title="Vezetői magatartás és energiahatékonyság"
            description="Az AI folyamatosan figyeli a sofőrök szokásait, és személyre szabott tréninget biztosít a hatékonyság növeléséhez."
          />
          <Card className="border border-slate-700/40 bg-slate-900/70 p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-lg text-white">
                Eco-score és agresszív események trendje
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={drivingBehaviour}>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
                    <XAxis
                      dataKey="week"
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="eco"
                      stroke="#34d399"
                      tickLine={false}
                      axisLine={false}
                      label={{
                        value: 'Eco-score',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#34d399',
                      }}
                    />
                    <YAxis
                      yAxisId="events"
                      orientation="right"
                      stroke="#facc15"
                      tickLine={false}
                      axisLine={false}
                      label={{
                        value: 'Agresszív események',
                        angle: 90,
                        position: 'insideRight',
                        fill: '#facc15',
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '0.75rem',
                        color: '#e2e8f0',
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="eco"
                      type="monotone"
                      dataKey="ecoScore"
                      name="Eco-score"
                      stroke="#34d399"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 2,
                        stroke: '#0f172a',
                        fill: '#34d399',
                      }}
                    />
                    <Line
                      yAxisId="events"
                      type="monotone"
                      dataKey="aggressiveEvents"
                      name="Agresszív események"
                      stroke="#facc15"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 2,
                        stroke: '#0f172a',
                        fill: '#facc15',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardContent className="grid gap-4 pt-6 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-emerald-300">
                  Átlagos eco-score
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {averageEcoScore}
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-amber-300">
                  Átlagos agresszív esemény
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {averageAggression}
                </p>
              </div>
              <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-sky-300">
                  Heti megtett távolság
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {totalDistance} km
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Karbantartási élmény"
            title="Teljes életciklus automatizálva"
            description="A Car Whisperer végigvezet a diagnosztikától a szerviz utáni visszamérésig, miközben valós időben kommunikál minden szereplővel."
          />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="border border-slate-700/40 bg-slate-900/70 p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-lg text-white">
                  Karbantartási ütemterv
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-slate-300">
                  Részletes lépések egy valós fékrendszer beavatkozás alapján.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-0 pt-6">
                <div
                  className="absolute left-4 top-6 bottom-6 w-px bg-slate-800"
                  aria-hidden
                />
                <ol className="space-y-8">
                  {maintenanceTimeline.map((item, index) => (
                    <li key={item.title} className="relative pl-12">
                      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          {item.stage}
                        </p>
                        <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
                      {item.cost && (
                        <p className="mt-3 text-sm text-slate-400">
                          Becsült költség:{' '}
                          <span className="text-slate-100">{item.cost}</span>
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <Card className="border border-emerald-500/20 bg-slate-900/60 p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg text-white">
                    Költség- és időnyereség
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-300">
                    AI becslések a beavatkozás teljes életciklusára.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 p-0 pt-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Leállási idő megtakarítás</span>
                    <span className="font-semibold text-white">-18 óra</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Megakadályozott meghibásodás költsége</span>
                    <span className="font-semibold text-white">€1 240</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ügyfél elégedettség hatás</span>
                    <span className="font-semibold text-white">+24%</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-slate-700/40 bg-slate-900/60 p-6">
                <CardHeader className="flex flex-row items-center justify-between p-0">
                  <div>
                    <CardTitle className="text-lg text-white">
                      Szerviz kalendárium
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm text-slate-300">
                      A platform automatikusan frissíti a naptárbejegyzéseket és az emlékeztetőket.
                    </CardDescription>
                  </div>
                  <CalendarIcon className="h-6 w-6 text-slate-300" />
                </CardHeader>
                <CardContent className="p-0 pt-4 text-sm text-slate-300">
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span>Nov. 14. 08:30 – Fékbetét csere</span>
                      <StatusBadge tone="info">Szerviz</StatusBadge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Nov. 28. 09:00 – Utóellenőrzés</span>
                      <StatusBadge tone="neutral">Emlékeztető</StatusBadge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Dec. 12. 10:15 – Szoftver frissítés</span>
                      <StatusBadge tone="success">Automatikus</StatusBadge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="AI insightok"
            title="Nézd meg, milyen konkrét tanácsokat kapnál"
            description="A Car Whisperer moduláris AI motorja minden érintettnek külön-külön ajánlásokat készít."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map(insight => (
              <Card
                key={insight.id}
                className="border border-slate-700/40 bg-slate-900/60 p-6"
              >
                <CardHeader className="p-0">
                  <div className="flex items-center gap-3">
                    <insight.icon className="h-6 w-6 text-sky-300" />
                    <CardTitle className="text-lg text-white">
                      {insight.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-3 text-sm text-slate-300">
                    {insight.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4 text-sm text-slate-300">
                  <ul className="space-y-2">
                    {insight.highlights.map(point => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircledIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-200">
                    <span className="font-semibold text-white">
                      Ajánlott lépés:
                    </span>{' '}
                    {insight.recommendation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Demó forgatókönyv"
            title="Lépésről lépésre: hogyan oldunk meg egy problémát"
            description="Nyisd le az egyes lépéseket, és lásd, hogyan támogatja a rendszer a felhasználókat és a szerviz csapatot."
          />
          <Card className="border border-slate-700/40 bg-slate-900/60 p-6">
            <Accordion type="single" collapsible className="w-full">
              {scenarioSteps.map(step => (
                <AccordionItem key={step.id} value={step.id}>
                  <AccordionTrigger className="text-left text-base font-medium text-white">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-300">
                    {step.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Ökoszisztéma"
            title="Integrációk és platform képességek"
            description="A Car Whisperer a háttérben több rendszerrel kapcsolódik, így a teljes élmény zökkenőmentes marad."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrationHighlights.map(item => (
              <Card
                key={item.title}
                className="border border-slate-700/40 bg-slate-900/60 p-6"
              >
                <CardHeader className="p-0">
                  <CardTitle className="text-lg text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4 text-sm text-slate-300">
                  <p>{item.detail}</p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {item.metric}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
            Készen állsz?
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Aktiváld a Car Whisperer teljes élményét ma
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200">
            Regisztrálj, és 14 napos demó hozzáférést kapsz. Fedezd fel, hogyan segít a platform a flotta üzemeltetésében, a karbantartásban és az ügyfél kommunikációban.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Ingyenes kipróbálás
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 px-6 py-3 text-base font-semibold text-emerald-200 hover:bg-emerald-400/10"
            >
              Csomagok megtekintése
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function HeroSection() {
  const previewMetrics = healthBreakdown.slice(0, 3)

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-xl">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            <RocketIcon className="h-4 w-4" /> Interaktív bemutató
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Tapasztald meg a Car Whisperer erejét
            </h1>
            <p className="text-lg text-slate-300">
              Komplett, valós adatokkal szimulált demo, amely megmutatja, hogyan segít a platform megelőzni a meghibásodásokat, optimalizálni a költségeket és boldogabb ügyfeleket kiszolgálni.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Indítsd el a demót
            </Link>
            <Link
              to="/#features"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-base font-semibold text-slate-200 hover:bg-slate-800/60"
            >
              Funkciók áttekintése
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {heroHighlights.map(highlight => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-slate-700/40 bg-slate-900/70 p-4"
              >
                <p className="text-sm text-slate-400">{highlight.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {highlight.value}
                </p>
                <p className="mt-2 text-sm text-slate-300">{highlight.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="border border-slate-700/40 bg-slate-900/70 p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-lg text-white">
              Élő egészség előnézet
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-slate-300">
              A demó jármű komponenseinek állapota a legfrissebb telemetria alapján.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-0 pt-6">
            {previewMetrics.map(metric => (
              <div key={metric.label} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{metric.label}</p>
                  <span className="text-sm font-semibold text-white">
                    {metric.value}%
                  </span>
                </div>
                <DemoProgressBar value={metric.value} accent={metric.tone} />
                <p className="text-xs text-slate-400">{metric.insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="max-w-3xl text-base text-slate-300">{description}</p>
    </div>
  )
}

function StatusBadge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`${badgeStyles[tone]} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide`}
    >
      {children}
    </span>
  )
}

function DemoProgressBar({ value, accent }: { value: number; accent: ProgressAccent }) {
  return (
    <div className="h-3 w-full rounded-full bg-slate-800/80">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${progressStyles[accent]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function mapMetricTone(accent: ProgressAccent): BadgeTone {
  switch (accent) {
    case 'emerald':
      return 'success'
    case 'amber':
      return 'warning'
    case 'sky':
      return 'info'
    case 'rose':
      return 'critical'
    default:
      return 'info'
  }
}
