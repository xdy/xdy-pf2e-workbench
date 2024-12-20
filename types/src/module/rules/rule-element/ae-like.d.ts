import type { DataModelValidationFailure } from "types/foundry/common/data/validation-failure.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

/**
 * Make a numeric modification to an arbitrary property in a similar way as `ActiveEffect`s
 * @category RuleElement
 */
declare class AELikeRuleElement<TSchema extends AELikeSchema> extends RuleElementPF2e<TSchema> {
    #private;
    static defineSchema(): AELikeSchema;
    static CHANGE_MODE_DEFAULT_PRIORITIES: {
        multiply: number;
        add: number;
        subtract: number;
        remove: number;
        downgrade: number;
        upgrade: number;
        override: number;
    };
    static PHASES: readonly ["applyAEs", "beforeDerived", "afterDerived", "beforeRoll"];
    static validateJoint(data: SourceFromSchema<AELikeSchema>): void;
    /** Process this rule element during item pre-creation to inform subsequent choice sets. */
    preCreate(): Promise<void>;
    /** Apply the modifications immediately after proper ActiveEffects are applied */
    onApplyActiveEffects(): void;
    /** Apply the modifications near the beginning of the actor's derived-data preparation */
    beforePrepareData(): void;
    /** Apply the modifications at the conclusion of the actor's derived-data preparation */
    afterPrepareData(): void;
    /** Apply the modifications prior to a Check (roll) */
    beforeRoll(_domains: string[], rollOptions: Set<string>): void;
    static getNewValue(mode: AELikeChangeMode, current: number, change: number, merge?: boolean): number;
    static getNewValue<TCurrent>(mode: AELikeChangeMode, current: TCurrent, change: TCurrent extends (infer TValue)[] ? TValue : TCurrent, merge?: boolean): (TCurrent extends (infer TValue)[] ? TValue : TCurrent) | DataModelValidationFailure;
}
interface AELikeRuleElement<TSchema extends AELikeSchema> extends RuleElementPF2e<TSchema>, ModelPropsFromRESchema<AELikeSchema> {
}
interface AutoChangeEntry {
    source: string;
    level: number | null;
    value: boolean | number | string | null;
    mode: AELikeChangeMode;
}
type AELikeSchema = RuleElementSchema & {
    /** How to apply the `value` at the `path` */
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    /** The data property path to modify on the parent item's actor */
    path: fields.StringField<string, string, true, false, false>;
    /** Which phase of data preparation to run in */
    phase: fields.StringField<AELikeDataPrepPhase, AELikeDataPrepPhase, false, false, true>;
    /** The value to applied at the `path` */
    value: ResolvableValueField<true, boolean, boolean>;
    /** A list of additional domains to include in predicate testing */
    testDomains: fields.ArrayField<fields.StringField<string, string, true, false, false>, string[], string[], false, false, true>;
    /** Whether to merge two objects given a `mode` of "override" */
    merge: fields.BooleanField<boolean, boolean, false, false, false>;
};
type AELikeChangeMode = keyof typeof AELikeRuleElement.CHANGE_MODE_DEFAULT_PRIORITIES;
type AELikeDataPrepPhase = (typeof AELikeRuleElement.PHASES)[number];
interface AELikeSource extends RuleElementSource {
    mode?: JSONValue;
    path?: JSONValue;
    phase?: JSONValue;
    value?: JSONValue;
}
export { AELikeRuleElement };
export type { AELikeChangeMode, AELikeDataPrepPhase, AELikeSchema, AELikeSource, AutoChangeEntry };
