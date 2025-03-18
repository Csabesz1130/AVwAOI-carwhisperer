/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createCarRouter from "./Car.router";
import createUserPreferenceRouter from "./UserPreference.router";
import createQuestionnaireResponseRouter from "./QuestionnaireResponse.router";
import createUserCarRouter from "./UserCar.router";
import createRecommendationRouter from "./Recommendation.router";
import createDealRouter from "./Deal.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import createCarTechnologyRouter from "./CarTechnology.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as CarClientType } from "./Car.router";
import { ClientType as UserPreferenceClientType } from "./UserPreference.router";
import { ClientType as QuestionnaireResponseClientType } from "./QuestionnaireResponse.router";
import { ClientType as UserCarClientType } from "./UserCar.router";
import { ClientType as RecommendationClientType } from "./Recommendation.router";
import { ClientType as DealClientType } from "./Deal.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";
import { ClientType as CarTechnologyClientType } from "./CarTechnology.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        car: createCarRouter(router, procedure),
        userPreference: createUserPreferenceRouter(router, procedure),
        questionnaireResponse: createQuestionnaireResponseRouter(router, procedure),
        userCar: createUserCarRouter(router, procedure),
        recommendation: createRecommendationRouter(router, procedure),
        deal: createDealRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
        carTechnology: createCarTechnologyRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    car: CarClientType<AppRouter>;
    userPreference: UserPreferenceClientType<AppRouter>;
    questionnaireResponse: QuestionnaireResponseClientType<AppRouter>;
    userCar: UserCarClientType<AppRouter>;
    recommendation: RecommendationClientType<AppRouter>;
    deal: DealClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
    carTechnology: CarTechnologyClientType<AppRouter>;
}
