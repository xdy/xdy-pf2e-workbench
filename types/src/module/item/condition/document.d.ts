import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { AbstractEffectPF2e, EffectBadge } from "@item/abstract-effect";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules";
import { UserPF2e } from "@module/user";
import { TokenDocumentPF2e } from "@scene";
import { ConditionKey, ConditionSlug, ConditionSource, ConditionSystemData, PersistentDamageData } from "./data";
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
    /** Include damage type and possibly category for persistent-damage conditions */
    getRollOptions(prefix?: string): string[];
    increase(this: ConditionPF2e<ActorPF2e>): Promise<void>;
    decrease(this: ConditionPF2e<ActorPF2e>): Promise<void>;
    onEndTurn(options?: {
        token?: TokenDocumentPF2e | null;
    }): Promise<void>;
    /** Rolls recovery for this condition if it is persistent damage */
    rollRecovery(): Promise<void>;
    /** Ensure value.isValued and value.value are in sync */
    prepareBaseData(): void;
    prepareSiblingData(): void;
    /** Log self in parent's conditions map */
    prepareActorData(this: ConditionPF2e<ActorPF2e>): void;
    /** Withhold all rule elements if this condition is inactive */
    prepareRuleElements(options?: RuleElementOptions): RuleElementPF2e[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: ConditionModificationContext<TParent>, user: UserPF2e): Promise<void>;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: ConditionModificationContext<TParent>, userId: string): void;
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
interface ConditionModificationContext<TParent extends ActorPF2e | null> extends DocumentModificationContext<TParent> {
    conditionValue?: number | null;
}
export { ConditionPF2e, ConditionModificationContext, PersistentDamagePF2e };
