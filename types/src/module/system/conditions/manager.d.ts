import type { ActorPF2e } from "@actor";
import { ConditionPF2e } from "@item";
import { ConditionSource } from "@item/condition/data.ts";
import { ConditionSlug } from "@item/condition/types.ts";
import type { TokenPF2e } from "@module/canvas/index.ts";
/** A helper class to manage PF2e Conditions */
export declare class ConditionManager {
    #private;
    static conditions: Map<ConditionSlug | ItemUUID, ConditionPF2e<null>>;
    /** Gets a list of condition slugs. */
    static get conditionsSlugs(): string[];
    static initialize(): void;
    /**
     * Get a condition using the condition name.
     * @param slug A condition slug
     */
    static getCondition(slug: ConditionSlug, modifications?: DeepPartial<ConditionSource>): ConditionPF2e<null>;
    static getCondition(slug: string, modifications?: DeepPartial<ConditionSource>): ConditionPF2e<null> | null;
    static updateConditionValue(itemId: string, actor: ActorPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, token: TokenPF2e, value: number): Promise<void>;
    static updateConditionValue(itemId: string, actorOrToken: ActorPF2e | TokenPF2e, value: number): Promise<void>;
}
