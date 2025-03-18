import { AuthenticationServer } from '@/core/authentication/server'
import { Cookies } from '@/core/authentication/server/cookies'
import { Configuration } from '@/core/configuration'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Trpc } from '../base'

export type SessionAndConfigResponse = {
  session: {
    user: {
      id: string
      email: string
      name: string
      globalRole: string
    }
  }
  config: Record<string, any>
}

export const AuthenticationRouter = Trpc.createRouter({
  getSessionAndConfig: Trpc.procedure.query(
    async ({ ctx }): Promise<SessionAndConfigResponse> => {
      const user = await ctx.database.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          globalRole: true,
        },
      })

      const variables = process.env ?? {}
      const config: Record<string, any> = {}

      for (const [key, value] of Object.entries(variables)) {
        if (key.startsWith('PUBLIC_')) {
          config[key] = value
        }
      }

      return {
        session: { user },
        config,
      }
    },
  ),
  login: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.databaseUnprotected.user.findUnique({
          where: { email: input.email },
          select: {
            id: true,
            email: true,
            name: true,
            globalRole: true,
            password: true,
          },
        })

        if (!user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid email or password',
          })
        }

        const isValidPassword = await bcrypt.compare(
          input.password,
          user.password,
        )

        if (!isValidPassword) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid email or password',
          })
        }

        // Set session user data first
        const sessionUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          globalRole: user.globalRole,
        }

        ctx.session.user = sessionUser

        // Initialize session context
        await AuthenticationServer.getHttpContext({ request: ctx.request })

        // Generate and set token cookie
        const secret = Configuration.getAuthenticationSecret()
        const token = jwt.sign({ userId: user.id }, secret, {
          expiresIn: '24h',
        })

        Cookies.set(ctx.responseHeaders, 'MARBLISM_ACCESS_TOKEN', token)

        return {
          success: true,
          redirect: '/home',
          user: sessionUser,
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred during authentication',
        })
      }
    }),
})
