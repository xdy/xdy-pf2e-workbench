import { ConditionSlug, ConditionSource } from "@item/condition/data";
import { ConditionPF2e } from "@item";
import { ActorPF2e } from "@actor";
import { TokenPF2e } from "@module/canvas";
import { FlattenedCondition } from "./types";
/** A helper class to manage PF2e Conditions */
export declare class ConditionManager {
    #private;
    static conditions: Map<ConditionSlug, ConditionPF2e>;
    /** Gets a list of condition slugs. */
    static get conditionsSlugs(): string[];
    static initialize(force?: boolean): Promise<void>;
    /**
     * Get a condition using the condition name.
     * @param slug A condition slug
     */
    static getCondition(slug: ConditionSlug, modifications?: DeepPartial<ConditionSource>): ConditionPF2e;
    static getCondition(slug: string, modifications?: DeepPartial<ConditionSource>): ConditionPF2e | null;
    static updateConditionValue(itemId: string, actor: ActorPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, token: TokenPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, actorOrToken: ActorPF2e | TokenPF2e, value: number): Promise<void>;
    static getFlattenedConditions(items: Embedded<ConditionPF2e>[]): FlattenedCondition[];
    private static sortConditions;
}
