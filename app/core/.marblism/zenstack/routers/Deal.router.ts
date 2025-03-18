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

        createMany: procedure.input($Schema.DealInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.createMany(input as any))),

        create: procedure.input($Schema.DealInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.create(input as any))),

        deleteMany: procedure.input($Schema.DealInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.deleteMany(input as any))),

        delete: procedure.input($Schema.DealInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.delete(input as any))),

        findFirst: procedure.input($Schema.DealInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).deal.findFirst(input as any))),

        findMany: procedure.input($Schema.DealInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).deal.findMany(input as any))),

        findUnique: procedure.input($Schema.DealInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).deal.findUnique(input as any))),

        updateMany: procedure.input($Schema.DealInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.updateMany(input as any))),

        update: procedure.input($Schema.DealInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).deal.update(input as any))),

        count: procedure.input($Schema.DealInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).deal.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DealCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DealCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DealGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DealGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DealGetPayload<T>, Context>) => Promise<Prisma.DealGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DealDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DealDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DealGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DealGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DealGetPayload<T>, Context>) => Promise<Prisma.DealGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DealFindFirstArgs, TData = Prisma.DealGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DealFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DealGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DealFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DealFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DealGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DealGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DealFindManyArgs, TData = Array<Prisma.DealGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DealFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DealGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DealFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DealFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DealGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DealGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DealFindUniqueArgs, TData = Prisma.DealGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DealFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DealGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DealFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DealFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DealGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DealGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DealUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DealUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DealUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DealGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DealGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DealUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DealUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DealGetPayload<T>, Context>) => Promise<Prisma.DealGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DealCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DealCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DealCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DealCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DealCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DealCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DealCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DealCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
