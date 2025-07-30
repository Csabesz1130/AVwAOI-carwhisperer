# Car Whisperer - Jármű Egészségügyi Tanácsadó

Az alkalmazás egy AI-alapú prediktív karbantartási és járműegészségügyi tanácsadó rendszer, amely segít a járművek állapotának monitorozásában és a karbantartási igények előrejelzésében.

## Főbb funkciók

- Jármű állapotának valós idejű monitorozása
- Prediktív karbantartási javaslatok
- Vezetési minták elemzése és optimalizálási javaslatok
- Költségbecslések a javításokhoz
- Testreszabott karbantartási ütemterv

## Technológiai stack

- Remix (React framework)
- TypeScript
- Prisma (adatbázis ORM)
- Tailwind CSS
- Recharts (adatvizualizáció)
- Vite (build tool)

## Telepítés

1. Klónozd le a repository-t:
```bash
git clone https://github.com/yourusername/car-whisperer.git
cd car-whisperer
```

2. Telepítsd a függőségeket:
```bash
pnpm install
```

3. Állítsd be az adatbázis kapcsolatot:
```bash
cp .env.example .env
# Szerkeszd a .env fájlt és add meg az adatbázis kapcsolati adatokat
```

4. Futtasd az adatbázis migrációkat:
```bash
pnpm prisma migrate dev
```

5. Futtasd a seed scriptet a demo adatok létrehozásához:
```bash
pnpm run seed:vehicle-data
```

6. Indítsd el a fejlesztői szervert:
```bash
pnpm dev
```

## Deployment (Vercel)

### Előfeltételek
- Vercel fiók
- PostgreSQL adatbázis (Vercel Postgres vagy külső szolgáltató)
- Környezeti változók beállítása

### Környezeti változók
A következő környezeti változókat kell beállítani a Vercel projektben:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NODE_ENV="production"
```

### Deployment lépések
1. Csatlakoztasd a GitHub repository-t a Vercel-hez
2. Állítsd be a környezeti változókat a Vercel projekt beállításaiban
3. A `vercel.json` fájl automatikusan konfigurálja a build folyamatot
4. A Prisma client automatikusan generálódik a build során

### Fontos megjegyzések
- **Adatbázis**: SQLite nem támogatott Vercel-en. Használj PostgreSQL-t production környezetben.
- **Build idő**: A build folyamat maximum 30 másodpercig tarthat.
- **PWA**: Az alkalmazás PWA funkciókkal rendelkezik, a manifest fájl automatikusan generálódik.

## Használat

1. Regisztrálj egy új fiókot
2. Add hozzá járműveidet
3. Kövesd a rendszer által generált karbantartási javaslatokat
4. Figyeld a vezetési mintáidat és optimalizáld a vezetési stílusodat

## Legutóbbi fejlesztések

### Prediktív karbantartási rendszer javítása
- **Valós adatbázis kapcsolat**: A PredictiveMaintenanceModel most már a valós adatbázist használja a dummy Prisma client helyett
- **Hibakezelés javítása**: A rendszer most már 404-es hibát ad vissza, ha a jármű nem található
- **Adatbázis optimalizáció**: A driving patterns API most már a megosztott Database példányt használja
- **Seed adatok**: Demo jármű adatok és vezetési minták létrehozása a teszteléshez

### UI/UX fejlesztések
- **Jobb hibakezelés**: A frontend komponensek most már kezelik a 404-es válaszokat
- **Továbbfejlesztett grafikonok**: A vezetési minták grafikon most már tartalmazza a megtett távolságot is
- **Reszponzív design**: A grafikonok most már reszponzívak és jobban néznek ki
- **Intelligens javaslatok**: A rendszer most már kontextuális javaslatokat ad a vezetési minták alapján

## Jövőbeli fejlesztések

- OBD-II adatok integrálása
- Javító műhelyek ajánló rendszere
- Mobil alkalmazás
- AI-alapú hibadiagnosztika
- Jármű specifikus adatbázis bővítése

## Közreműködés

A projekt nyílt forráskódú, szívesen fogadunk pull requesteket. Kérjük, kövesd a CONTRIBUTING.md fájlban leírt irányelveket.

## Licenc

MIT
