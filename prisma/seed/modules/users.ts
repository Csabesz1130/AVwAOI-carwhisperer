import type { PrismaClient } from '@prisma/client'

const passwordHash = '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC'

const users = [
  {
    id: 'user-alex-johnson',
    email: 'alex.johnson@example.com',
    name: 'Alex Johnson',
    pictureUrl: 'https://i.imgur.com/YfJQV5z.png?id=3',
    globalRole: 'ADMIN',
    password: passwordHash,
    tokenInvitation: null,
    status: 'VERIFIED' as const,
  },
  {
    id: 'user-sam-taylor',
    email: 'sam.taylor@example.com',
    name: 'Sam Taylor',
    pictureUrl: 'https://i.imgur.com/YfJQV5z.png?id=35',
    globalRole: 'USER',
    password: passwordHash,
    tokenInvitation: null,
    status: 'VERIFIED' as const,
  },
  {
    id: 'user-jamie-lee',
    email: 'jamie.lee@example.com',
    name: 'Jamie Lee',
    pictureUrl: 'https://i.imgur.com/YfJQV5z.png?id=59',
    globalRole: 'USER',
    password: passwordHash,
    tokenInvitation: null,
    status: 'VERIFIED' as const,
  },
]

const userPreferences = [
  {
    id: 'pref-alex-budget',
    preferenceType: 'Budget',
    preferenceValue: 'Under $35k',
    userId: 'user-alex-johnson',
  },
  {
    id: 'pref-sam-efficiency',
    preferenceType: 'Fuel Efficiency',
    preferenceValue: 'Over 30 MPG',
    userId: 'user-sam-taylor',
  },
  {
    id: 'pref-jamie-tech',
    preferenceType: 'Technology',
    preferenceValue: 'Advanced Driver Assistance',
    userId: 'user-jamie-lee',
  },
]

const questionnaireResponses = [
  {
    id: 'questionnaire-alex',
    userId: 'user-alex-johnson',
    responses:
      'Looking for a plug-in hybrid SUV with 400+ mile range, lane keep assist, and enough cargo room for road trips.',
  },
  {
    id: 'questionnaire-sam',
    userId: 'user-sam-taylor',
    responses:
      'Needs a compact EV for city commuting with great safety features and fast charging support.',
  },
  {
    id: 'questionnaire-jamie',
    userId: 'user-jamie-lee',
    responses:
      'Searching for a reliable crossover with heated seats, adaptive cruise control, and kid-friendly space.',
  },
]

const pwaSubscriptions = [
  {
    id: 'pwa-subscription-alex',
    userId: 'user-alex-johnson',
    content: 'Receive fleet health reports and predictive maintenance alerts.',
  },
  {
    id: 'pwa-subscription-sam',
    userId: 'user-sam-taylor',
    content: 'Remind me when new EV incentives and charging locations are available.',
  },
]

export async function seedUsers(prisma: PrismaClient) {
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        pictureUrl: user.pictureUrl,
        globalRole: user.globalRole,
        password: user.password,
        status: user.status,
      },
      create: {
        ...user,
      },
    })
  }

  for (const preference of userPreferences) {
    await prisma.userPreference.upsert({
      where: { id: preference.id },
      update: {
        preferenceType: preference.preferenceType,
        preferenceValue: preference.preferenceValue,
        userId: preference.userId,
      },
      create: preference,
    })
  }

  for (const response of questionnaireResponses) {
    await prisma.questionnaireResponse.upsert({
      where: { id: response.id },
      update: {
        responses: response.responses,
        userId: response.userId,
      },
      create: response,
    })
  }

  for (const subscription of pwaSubscriptions) {
    await prisma.pwaSubscription.upsert({
      where: { id: subscription.id },
      update: {
        content: subscription.content,
        userId: subscription.userId,
      },
      create: subscription,
    })
  }

  console.log('Seeded demo users, preferences, questionnaires, and PWA subscriptions')
}
