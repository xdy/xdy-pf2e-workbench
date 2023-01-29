import { AbstractEffectPF2e, EffectBadge } from "@item/abstract-effect";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules";
import { UserPF2e } from "@module/user";
import { ConditionData, ConditionKey, ConditionSlug, ConditionSystemData, PersistentDamageData } from "./data";
import { TokenDocumentPF2e } from "@scene";
declare class ConditionPF2e extends AbstractEffectPF2e {
    get badge(): EffectBadge | null;
    /** A key that can be used in place of slug for condition types that are split up (persistent damage) */
    get key(): ConditionKey;
    get appliedBy(): ItemPF2e | null;
    get value(): number | null;
    get duration(): number | null;
    /** Is the condition currently active? */
    get isActive(): boolean;
    /** Is this condition locked in place by another? */
    get isLocked(): boolean;
    /** Is the condition found in the token HUD menu? */
    get isInHUD(): boolean;
    /** Include damage type and possibly category for persistent-damage conditions */
    getRollOptions(prefix?: string): string[];
    increase(): Promise<void>;
    decrease(): Promise<void>;
    onEndTurn(options?: {
        token?: TokenDocumentPF2e | null;
    }): Promise<void>;
    /** Ensure value.isValued and value.value are in sync */
    prepareBaseData(): void;
    prepareSiblingData(): void;
    /** Log self in parent's conditions map */
    prepareActorData(): void;
    /** Withhold all rule elements if this condition is inactive */
    prepareRuleElements(options?: RuleElementOptions): RuleElementPF2e[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: ConditionModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<this>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: ConditionModificationContext<this>, userId: string): void;
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
interface ConditionPF2e {
    readonly data: ConditionData;
    get slug(): ConditionSlug;
}
interface PersistentDamagePF2e extends ConditionPF2e {
    system: Omit<ConditionSystemData, "persistent"> & {
        persistent: PersistentDamageData;
    };
}
interface ConditionModificationContext<T extends ConditionPF2e> extends DocumentModificationContext<T> {
    conditionValue?: number | null;
}
export { ConditionPF2e, ConditionModificationContext, PersistentDamagePF2e };
