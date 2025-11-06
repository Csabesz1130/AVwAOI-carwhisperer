import type { PrismaClient } from '@prisma/client'

const cars = [
  {
    id: 'car-tesla-model-y',
    make: 'Tesla',
    model: 'Model Y Long Range',
    year: 2024,
    color: 'Midnight Silver',
    imageUrl: 'https://images.unsplash.com/photo-1617813489478-2d469599b5ec?auto=format&fit=crop&w=1200&q=80',
    description: 'Electric crossover with outstanding range, premium comfort, and over-the-air updates.',
    emissionsRating: 'Zero Emissions',
    fuelEfficiency: '4.1 mi/kWh',
    ecoFeatures: 'Heat pump HVAC, regenerative braking, autopilot hardware',
    cargoSpace: 76.0,
    seatingCapacity: 5,
    safetyRating: 5,
    maintenanceCost: 420,
    engineType: 'Dual Motor Electric',
    horsepower: 384,
    acceleration: 4.8,
    topSpeed: 135,
    transmission: 'Single-speed',
    driveType: 'AWD',
  },
  {
    id: 'car-ford-maverick-hybrid',
    make: 'Ford',
    model: 'Maverick Hybrid Lariat',
    year: 2024,
    color: 'Atlas Blue',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact hybrid truck with 40 MPG city driving and configurable FlexBed system.',
    emissionsRating: 'Ultra Low Emissions',
    fuelEfficiency: '37 MPG Combined',
    ecoFeatures: 'Hybrid powertrain, eco driving modes, solar reflective glass',
    cargoSpace: 33.3,
    seatingCapacity: 5,
    safetyRating: 4.5,
    maintenanceCost: 280,
    engineType: '2.5L Atkinson Hybrid',
    horsepower: 191,
    acceleration: 7.6,
    topSpeed: 118,
    transmission: 'CVT',
    driveType: 'FWD',
  },
  {
    id: 'car-volvo-xc40-recharge',
    make: 'Volvo',
    model: 'XC40 Recharge Twin',
    year: 2025,
    color: 'Glacier Silver',
    imageUrl: 'https://images.unsplash.com/photo-1617816449273-1f903dbe5b69?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium compact SUV with Google built-in, Pilot Assist, and 250-mile electric range.',
    emissionsRating: 'Zero Emissions',
    fuelEfficiency: '3.5 mi/kWh',
    ecoFeatures: 'Vegan interior, recycled plastics, pilot assist',
    cargoSpace: 57.5,
    seatingCapacity: 5,
    safetyRating: 5,
    maintenanceCost: 390,
    engineType: 'Twin Motor Electric',
    horsepower: 402,
    acceleration: 4.7,
    topSpeed: 112,
    transmission: 'Single-speed',
    driveType: 'AWD',
  },
]

const userCars = [
  {
    id: 'usercar-alex-tesla',
    ownershipStatus: 'Owned',
    purchaseDate: '2024-06-12T10:00:00.000Z',
    userId: 'user-alex-johnson',
    carId: 'car-tesla-model-y',
  },
  {
    id: 'usercar-sam-maverick',
    ownershipStatus: 'Company Car',
    purchaseDate: '2024-02-18T09:30:00.000Z',
    userId: 'user-sam-taylor',
    carId: 'car-ford-maverick-hybrid',
  },
]

const recommendations = [
  {
    id: 'rec-alex-volvo',
    reason: 'Best balance of safety tech and winter performance for mountain fleets.',
    userId: 'user-alex-johnson',
    carId: 'car-volvo-xc40-recharge',
  },
  {
    id: 'rec-jamie-maverick',
    reason: 'Hybrid efficiency keeps operating costs low for last-mile deliveries.',
    userId: 'user-jamie-lee',
    carId: 'car-ford-maverick-hybrid',
  },
]

const deals = [
  {
    id: 'deal-fleetverse-tesla',
    dealPrice: '52900',
    dealDate: '2024-07-01T15:45:00.000Z',
    status: 'completed',
    contractUrl: 'https://example.com/contracts/fleetverse-tesla.pdf',
    userId: 'user-alex-johnson',
    carId: 'car-tesla-model-y',
  },
  {
    id: 'deal-urban-maverick',
    dealPrice: '37950',
    dealDate: '2024-09-18T13:15:00.000Z',
    status: 'active',
    contractUrl: 'https://example.com/contracts/urban-maverick.pdf',
    userId: 'user-jamie-lee',
    carId: 'car-ford-maverick-hybrid',
  },
]

export async function seedFleet(prisma: PrismaClient) {
  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.id },
      update: {
        make: car.make,
        model: car.model,
        description: car.description,
        imageUrl: car.imageUrl,
        ecoFeatures: car.ecoFeatures,
        fuelEfficiency: car.fuelEfficiency,
        updatedAt: new Date(),
      },
      create: car,
    })
  }

  for (const userCar of userCars) {
    await prisma.userCar.upsert({
      where: { id: userCar.id },
      update: {
        ownershipStatus: userCar.ownershipStatus,
        purchaseDate: userCar.purchaseDate,
        userId: userCar.userId,
        carId: userCar.carId,
      },
      create: userCar,
    })
  }

  for (const recommendation of recommendations) {
    await prisma.recommendation.upsert({
      where: { id: recommendation.id },
      update: {
        reason: recommendation.reason,
        userId: recommendation.userId,
        carId: recommendation.carId,
      },
      create: recommendation,
    })
  }

  for (const deal of deals) {
    await prisma.deal.upsert({
      where: { id: deal.id },
      update: {
        dealPrice: deal.dealPrice,
        dealDate: deal.dealDate,
        status: deal.status,
        contractUrl: deal.contractUrl,
        userId: deal.userId,
        carId: deal.carId,
      },
      create: deal,
    })
  }

  console.log('Seeded demo cars, user cars, recommendations, and deals')
}
