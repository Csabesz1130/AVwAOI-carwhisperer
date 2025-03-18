/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.RecommendationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.createMany(input as any))),

        create: procedure.input($Schema.RecommendationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.create(input as any))),

        deleteMany: procedure.input($Schema.RecommendationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.deleteMany(input as any))),

        delete: procedure.input($Schema.RecommendationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.delete(input as any))),

        findFirst: procedure.input($Schema.RecommendationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).recommendation.findFirst(input as any))),

        findMany: procedure.input($Schema.RecommendationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).recommendation.findMany(input as any))),

        findUnique: procedure.input($Schema.RecommendationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).recommendation.findUnique(input as any))),

        updateMany: procedure.input($Schema.RecommendationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.updateMany(input as any))),

        update: procedure.input($Schema.RecommendationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).recommendation.update(input as any))),

        count: procedure.input($Schema.RecommendationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).recommendation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.RecommendationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.RecommendationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RecommendationGetPayload<T>, Context>) => Promise<Prisma.RecommendationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.RecommendationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.RecommendationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RecommendationGetPayload<T>, Context>) => Promise<Prisma.RecommendationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.RecommendationFindFirstArgs, TData = Prisma.RecommendationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.RecommendationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RecommendationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RecommendationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.RecommendationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RecommendationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RecommendationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.RecommendationFindManyArgs, TData = Array<Prisma.RecommendationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.RecommendationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.RecommendationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RecommendationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.RecommendationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.RecommendationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.RecommendationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.RecommendationFindUniqueArgs, TData = Prisma.RecommendationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RecommendationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RecommendationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RecommendationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RecommendationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RecommendationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RecommendationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.RecommendationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.RecommendationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RecommendationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RecommendationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RecommendationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RecommendationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RecommendationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RecommendationGetPayload<T>, Context>) => Promise<Prisma.RecommendationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.RecommendationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.RecommendationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.RecommendationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.RecommendationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.RecommendationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.RecommendationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.RecommendationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.RecommendationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
