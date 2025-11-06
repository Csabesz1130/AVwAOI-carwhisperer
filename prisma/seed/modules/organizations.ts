import type { PrismaClient } from '@prisma/client'

const organizations = [
  {
    id: 'org-fleetverse-analytics',
    name: 'FleetVerse Analytics',
    pictureUrl: 'https://i.imgur.com/BgkFiid.jpeg',
  },
  {
    id: 'org-urban-motors-coop',
    name: 'Urban Motors Cooperative',
    pictureUrl: 'https://i.imgur.com/YfJQV5z.png?id=109',
  },
]

const organizationRoles = [
  {
    id: 'role-alex-owner',
    name: 'owner',
    userId: 'user-alex-johnson',
    organizationId: 'org-fleetverse-analytics',
  },
  {
    id: 'role-sam-fleet-manager',
    name: 'fleet manager',
    userId: 'user-sam-taylor',
    organizationId: 'org-fleetverse-analytics',
  },
  {
    id: 'role-jamie-operations',
    name: 'operations lead',
    userId: 'user-jamie-lee',
    organizationId: 'org-urban-motors-coop',
  },
]

export async function seedOrganizations(prisma: PrismaClient) {
  for (const organization of organizations) {
    await prisma.organization.upsert({
      where: { id: organization.id },
      update: {
        name: organization.name,
        pictureUrl: organization.pictureUrl,
      },
      create: organization,
    })
  }

  for (const role of organizationRoles) {
    await prisma.organizationRole.upsert({
      where: { id: role.id },
      update: {
        name: role.name,
        userId: role.userId,
        organizationId: role.organizationId,
      },
      create: role,
    })
  }

  console.log('Seeded demo organizations and roles')
}
