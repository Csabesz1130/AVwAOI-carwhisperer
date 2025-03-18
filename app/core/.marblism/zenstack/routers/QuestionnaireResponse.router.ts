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

        createMany: procedure.input($Schema.QuestionnaireResponseInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.createMany(input as any))),

        create: procedure.input($Schema.QuestionnaireResponseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.create(input as any))),

        deleteMany: procedure.input($Schema.QuestionnaireResponseInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.deleteMany(input as any))),

        delete: procedure.input($Schema.QuestionnaireResponseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.delete(input as any))),

        findFirst: procedure.input($Schema.QuestionnaireResponseInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).questionnaireResponse.findFirst(input as any))),

        findMany: procedure.input($Schema.QuestionnaireResponseInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).questionnaireResponse.findMany(input as any))),

        findUnique: procedure.input($Schema.QuestionnaireResponseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).questionnaireResponse.findUnique(input as any))),

        updateMany: procedure.input($Schema.QuestionnaireResponseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.updateMany(input as any))),

        update: procedure.input($Schema.QuestionnaireResponseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).questionnaireResponse.update(input as any))),

        count: procedure.input($Schema.QuestionnaireResponseInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).questionnaireResponse.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.QuestionnaireResponseCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.QuestionnaireResponseCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.QuestionnaireResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.QuestionnaireResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.QuestionnaireResponseGetPayload<T>, Context>) => Promise<Prisma.QuestionnaireResponseGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.QuestionnaireResponseDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.QuestionnaireResponseDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.QuestionnaireResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.QuestionnaireResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.QuestionnaireResponseGetPayload<T>, Context>) => Promise<Prisma.QuestionnaireResponseGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.QuestionnaireResponseFindFirstArgs, TData = Prisma.QuestionnaireResponseGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.QuestionnaireResponseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.QuestionnaireResponseFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.QuestionnaireResponseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.QuestionnaireResponseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.QuestionnaireResponseFindManyArgs, TData = Array<Prisma.QuestionnaireResponseGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.QuestionnaireResponseGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.QuestionnaireResponseFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.QuestionnaireResponseGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.QuestionnaireResponseGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.QuestionnaireResponseFindUniqueArgs, TData = Prisma.QuestionnaireResponseGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.QuestionnaireResponseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.QuestionnaireResponseFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.QuestionnaireResponseFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.QuestionnaireResponseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.QuestionnaireResponseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.QuestionnaireResponseUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.QuestionnaireResponseUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.QuestionnaireResponseUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.QuestionnaireResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.QuestionnaireResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.QuestionnaireResponseUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.QuestionnaireResponseUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.QuestionnaireResponseGetPayload<T>, Context>) => Promise<Prisma.QuestionnaireResponseGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.QuestionnaireResponseCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.QuestionnaireResponseCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.QuestionnaireResponseCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.QuestionnaireResponseCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.QuestionnaireResponseCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.QuestionnaireResponseCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.QuestionnaireResponseCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.QuestionnaireResponseCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
