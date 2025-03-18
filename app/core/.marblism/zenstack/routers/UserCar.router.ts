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

        createMany: procedure.input($Schema.UserCarInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.createMany(input as any))),

        create: procedure.input($Schema.UserCarInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.create(input as any))),

        deleteMany: procedure.input($Schema.UserCarInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.deleteMany(input as any))),

        delete: procedure.input($Schema.UserCarInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.delete(input as any))),

        findFirst: procedure.input($Schema.UserCarInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCar.findFirst(input as any))),

        findMany: procedure.input($Schema.UserCarInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCar.findMany(input as any))),

        findUnique: procedure.input($Schema.UserCarInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).userCar.findUnique(input as any))),

        updateMany: procedure.input($Schema.UserCarInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.updateMany(input as any))),

        update: procedure.input($Schema.UserCarInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userCar.update(input as any))),

        count: procedure.input($Schema.UserCarInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).userCar.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.UserCarCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.UserCarCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCarGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCarGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCarGetPayload<T>, Context>) => Promise<Prisma.UserCarGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.UserCarDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.UserCarDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCarGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCarGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCarGetPayload<T>, Context>) => Promise<Prisma.UserCarGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.UserCarFindFirstArgs, TData = Prisma.UserCarGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.UserCarFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserCarGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCarFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserCarFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserCarGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserCarGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.UserCarFindManyArgs, TData = Array<Prisma.UserCarGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.UserCarFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.UserCarGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCarFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserCarFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.UserCarGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.UserCarGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.UserCarFindUniqueArgs, TData = Prisma.UserCarGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.UserCarFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserCarGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserCarFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UserCarFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserCarGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserCarGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.UserCarUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.UserCarUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserCarUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserCarGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserCarGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserCarUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserCarUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserCarGetPayload<T>, Context>) => Promise<Prisma.UserCarGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.UserCarCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserCarCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.UserCarCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.UserCarCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.UserCarCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.UserCarCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCarCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserCarCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
