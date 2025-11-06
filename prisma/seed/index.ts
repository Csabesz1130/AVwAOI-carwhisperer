import { PrismaClient } from '@prisma/client'

import { seedFleet } from './modules/fleet'
import { seedOrganizations } from './modules/organizations'
import { seedTelematics } from './modules/telematics'
import { seedUsers } from './modules/users'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  await seedUsers(prisma)
  await seedOrganizations(prisma)
  await seedFleet(prisma)
  await seedTelematics(prisma)

  console.log('Database seed complete.')
}

main()
  .catch(error => {
    console.error('Database seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
