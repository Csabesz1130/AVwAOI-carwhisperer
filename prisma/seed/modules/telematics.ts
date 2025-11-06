import type { PrismaClient } from '@prisma/client'

const vehicleSeed = {
  id: 'vehicle-fleetverse-001',
  make: 'Toyota',
  model: 'RAV4 Prime',
  year: 2023,
  mileage: 18750,
  manufactureDate: new Date('2023-03-15T00:00:00.000Z'),
  lastOilChange: new Date('2024-08-10T00:00:00.000Z'),
  userId: 'user-sam-taylor',
}

const maintenanceEvents = [
  {
    id: 'maint-vehicle-001',
    vehicleId: vehicleSeed.id,
    type: 'Battery Health Inspection',
    description: 'Hybrid battery conditioning and software calibration.',
    cost: 180.5,
    date: new Date('2024-08-20T00:00:00.000Z'),
  },
  {
    id: 'maint-vehicle-002',
    vehicleId: vehicleSeed.id,
    type: 'All-Season Tire Rotation',
    description: 'Rotated tires and performed brake pad inspection.',
    cost: 95.25,
    date: new Date('2024-07-05T00:00:00.000Z'),
  },
]

export async function seedTelematics(prisma: PrismaClient) {
  const vehicle = await prisma.vehicleData.upsert({
    where: { id: vehicleSeed.id },
    update: {
      make: vehicleSeed.make,
      model: vehicleSeed.model,
      mileage: vehicleSeed.mileage,
      lastOilChange: vehicleSeed.lastOilChange,
      userId: vehicleSeed.userId,
    },
    create: vehicleSeed,
  })

  for (const event of maintenanceEvents) {
    await prisma.maintenanceEvent.upsert({
      where: { id: event.id },
      update: {
        type: event.type,
        description: event.description,
        cost: event.cost,
        date: event.date,
      },
      create: event,
    })
  }

  const today = new Date()
  const drivingPatterns = Array.from({ length: 14 }).map((_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (13 - index))
    const aggressiveBrakingCount = Math.floor(Math.random() * 3)
    const aggressiveCorneringCount = Math.floor(Math.random() * 2)
    const averageSpeed = 32 + Math.random() * 18
    const distanceTraveled = 12 + Math.random() * 28

    return {
      id: `driving-pattern-${date.toISOString().slice(0, 10)}`,
      vehicleId: vehicle.id,
      date,
      aggressiveBrakingCount,
      aggressiveCorneringCount,
      averageSpeed: Math.round(averageSpeed * 10) / 10,
      distanceTraveled: Math.round(distanceTraveled * 10) / 10,
    }
  })

  await prisma.drivingPattern.deleteMany({ where: { vehicleId: vehicle.id } })
  await prisma.drivingPattern.createMany({ data: drivingPatterns })

  console.log('Seeded vehicle telematics, maintenance events, and driving patterns')
}
