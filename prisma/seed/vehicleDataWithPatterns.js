const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedVehicleDataWithPatterns() {
  try {
    console.log('🌱 Seeding vehicle data with patterns...');

    // Create a demo vehicle
    const vehicle = await prisma.vehicleData.create({
      data: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        mileage: 45000,
        manufactureDate: new Date('2020-03-15'),
        lastOilChange: new Date('2024-01-15'),
      }
    });

    console.log(`✅ Created vehicle: ${vehicle.make} ${vehicle.model} (${vehicle.id})`);

    // Create maintenance events
    const maintenanceEvents = await Promise.all([
      prisma.maintenanceEvent.create({
        data: {
          vehicleId: vehicle.id,
          type: 'Olajcsere',
          description: 'Rendszeres olajcsere és szűrőcsere',
          cost: 25000,
          date: new Date('2024-01-15')
        }
      }),
      prisma.maintenanceEvent.create({
        data: {
          vehicleId: vehicle.id,
          type: 'Fékellenőrzés',
          description: 'Fékrendszer ellenőrzése és fékfolyadék csere',
          cost: 15000,
          date: new Date('2023-11-20')
        }
      }),
      prisma.maintenanceEvent.create({
        data: {
          vehicleId: vehicle.id,
          type: 'Gumiabroncs csere',
          description: 'Téli gumiabroncsok felszerelése',
          cost: 120000,
          date: new Date('2023-10-15')
        }
      })
    ]);

    console.log(`✅ Created ${maintenanceEvents.length} maintenance events`);

    // Create driving patterns for the last 14 days
    const drivingPatterns = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate realistic driving pattern data
      const aggressiveBrakingCount = Math.floor(Math.random() * 5);
      const aggressiveCorneringCount = Math.floor(Math.random() * 3);
      const averageSpeed = 35 + Math.random() * 25; // 35-60 km/h
      const distanceTraveled = 15 + Math.random() * 35; // 15-50 km
      
      drivingPatterns.push({
        vehicleId: vehicle.id,
        date: date,
        aggressiveBrakingCount,
        aggressiveCorneringCount,
        averageSpeed: Math.round(averageSpeed * 10) / 10,
        distanceTraveled: Math.round(distanceTraveled * 10) / 10
      });
    }

    const createdPatterns = await prisma.drivingPattern.createMany({
      data: drivingPatterns
    });

    console.log(`✅ Created ${createdPatterns.count} driving patterns`);

    console.log('🎉 Seeding completed successfully!');
    console.log(`Demo vehicle ID: ${vehicle.id}`);
    console.log('You can now test the health dashboard and driving patterns analysis.');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedVehicleDataWithPatterns()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });