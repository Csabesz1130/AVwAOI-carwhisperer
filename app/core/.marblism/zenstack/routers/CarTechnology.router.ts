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

        createMany: procedure.input($Schema.CarTechnologyInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.createMany(input as any))),

        create: procedure.input($Schema.CarTechnologyInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.create(input as any))),

        deleteMany: procedure.input($Schema.CarTechnologyInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.deleteMany(input as any))),

        delete: procedure.input($Schema.CarTechnologyInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.delete(input as any))),

        findFirst: procedure.input($Schema.CarTechnologyInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).carTechnology.findFirst(input as any))),

        findMany: procedure.input($Schema.CarTechnologyInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).carTechnology.findMany(input as any))),

        findUnique: procedure.input($Schema.CarTechnologyInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).carTechnology.findUnique(input as any))),

        updateMany: procedure.input($Schema.CarTechnologyInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.updateMany(input as any))),

        update: procedure.input($Schema.CarTechnologyInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).carTechnology.update(input as any))),

        count: procedure.input($Schema.CarTechnologyInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).carTechnology.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CarTechnologyCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CarTechnologyCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CarTechnologyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CarTechnologyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CarTechnologyGetPayload<T>, Context>) => Promise<Prisma.CarTechnologyGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CarTechnologyDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CarTechnologyDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CarTechnologyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CarTechnologyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CarTechnologyGetPayload<T>, Context>) => Promise<Prisma.CarTechnologyGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CarTechnologyFindFirstArgs, TData = Prisma.CarTechnologyGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CarTechnologyFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CarTechnologyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CarTechnologyFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CarTechnologyFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CarTechnologyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CarTechnologyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CarTechnologyFindManyArgs, TData = Array<Prisma.CarTechnologyGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CarTechnologyFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CarTechnologyGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CarTechnologyFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CarTechnologyFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CarTechnologyGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CarTechnologyGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CarTechnologyFindUniqueArgs, TData = Prisma.CarTechnologyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CarTechnologyFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CarTechnologyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CarTechnologyFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CarTechnologyFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CarTechnologyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CarTechnologyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CarTechnologyUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CarTechnologyUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CarTechnologyUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CarTechnologyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CarTechnologyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CarTechnologyUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CarTechnologyUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CarTechnologyGetPayload<T>, Context>) => Promise<Prisma.CarTechnologyGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CarTechnologyCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CarTechnologyCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CarTechnologyCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CarTechnologyCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CarTechnologyCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CarTechnologyCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CarTechnologyCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CarTechnologyCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
