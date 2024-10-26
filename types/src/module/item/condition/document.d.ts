import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { AbstractEffectPF2e, EffectBadge } from "@item/abstract-effect/index.ts";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import type { TokenDocumentPF2e } from "@scene/index.ts";
import { ConditionSource, ConditionSystemData, PersistentDamageData } from "./data.ts";
import { ConditionKey, ConditionSlug } from "./types.ts";

declare class ConditionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    active: boolean;
    get badge(): EffectBadge | null;
    /** Retrieve this condition's origin from its granting effect, if any */
    get origin(): ActorPF2e | null;
    /** A key that can be used in place of slug for condition types that are split up (persistent damage) */
    get key(): ConditionKey;
    get appliedBy(): ItemPF2e<ActorPF2e> | null;
    get value(): number | null;
    /** Is this condition locked in place by another? */
    get isLocked(): boolean;
    /** Is the condition found in the token HUD menu? */
    get isInHUD(): boolean;
    /** Create a textual breakdown of what applied this condition */
    get breakdown(): string | null;
    /**
     * Whether this condition is in-memory rather than stored in an actor's `items` collection and cannot be updated or
     * deleted
     */
    get readonly(): boolean;
    /** Include damage type and possibly category for persistent-damage conditions */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    increase(this: ConditionPF2e<ActorPF2e>): Promise<void>;
    decrease(this: ConditionPF2e<ActorPF2e>): Promise<void>;
    onEndTurn(options?: {
        token?: TokenDocumentPF2e | null;
    }): Promise<void>;
    /** Rolls recovery for this condition if it is persistent damage */
    rollRecovery(): Promise<void>;
    /** Ensure value.isValued and value.value are in sync */
    prepareBaseData(): void;
    prepareSiblingData(this: ConditionPF2e<ActorPF2e>): void;
    /** Log self in parent's conditions map */
    prepareActorData(this: ConditionPF2e<ActorPF2e>): void;
    /** Withhold all rule elements if this condition is inactive */
    prepareRuleElements(options?: RuleElementOptions): RuleElementPF2e[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: ConditionUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, operation: ConditionUpdateOperation<TParent>, userId: string): void;
}
interface ConditionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    readonly _source: ConditionSource;
    system: ConditionSystemData;
    get slug(): ConditionSlug;
}
interface PersistentDamagePF2e<TParent extends ActorPF2e | null> extends ConditionPF2e<TParent> {
    system: Omit<ConditionSystemData, "persistent"> & {
        persistent: PersistentDamageData;
    };
}
interface ConditionUpdateOperation<TParent extends ActorPF2e | null> extends DatabaseUpdateOperation<TParent> {
    conditionValue?: number | null;
}
export { ConditionPF2e };
export type { ConditionUpdateOperation, PersistentDamagePF2e };
