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
    /**
     * Adds a condition to a token.
     * @param name  A collection of conditions to retrieve modifiers from.
     * @param token The token to add the condition to.
     */
    static addConditionToToken(name: string | ConditionSource, token: TokenPF2e): Promise<ConditionPF2e | null>;
    static addConditionToToken(name: string | ConditionSource, actor: ActorPF2e): Promise<ConditionPF2e | null>;
    static addConditionToToken(name: string | ConditionSource, actorOrToken: ActorPF2e | TokenPF2e): Promise<ConditionPF2e | null>;
    /**
     * A convience alias for adding a condition to an actor
     * @param name  A collection of conditions to retrieve modifiers from.
     * @param actor The actor to add the condition to.
     */
    static addConditionToActor(name: string | ConditionSource, actor: ActorPF2e): Promise<ConditionPF2e | null>;
    private static createConditions;
    private static createAdditionallyAppliedConditions;
    /**
     * Removes a condition from a token.
     * @param name  A collection of conditions to retrieve modifiers from.
     * @param token The token to add the condition to.
     */
    static removeConditionFromToken(itemId: string | string[], token: TokenPF2e): Promise<void>;
    static removeConditionFromToken(itemId: string | string[], actor: ActorPF2e): Promise<void>;
    static removeConditionFromToken(itemId: string | string[], actorOrToken: ActorPF2e | TokenPF2e): Promise<void>;
    /** A convenience alias for removing a condition from an actor */
    static removeConditionFromActor(itemId: string | string[], actor: ActorPF2e): Promise<void>;
    private static deleteConditions;
    static updateConditionValue(itemId: string, actor: ActorPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, token: TokenPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, actorOrToken: ActorPF2e | TokenPF2e, value: number): Promise<void>;
    static getFlattenedConditions(items: ConditionPF2e[]): FlattenedCondition[];
    private static sortConditions;
}
