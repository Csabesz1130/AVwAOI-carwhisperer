#!/bin/bash

echo "🌱 Seeding vehicle data with patterns..."

# Check if ts-node is available
if ! command -v ts-node &> /dev/null; then
    echo "❌ ts-node is not installed. Installing..."
    npm install -g ts-node
fi

# Run the seed script
echo "📦 Running seed script..."
ts-node prisma/seed/vehicleDataWithPatterns.ts

echo "✅ Done!"