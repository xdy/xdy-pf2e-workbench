import type { StringField } from "types/foundry/common/data/fields.d.ts";
import type { DataModelValidationFailure } from "types/foundry/common/data/validation-failure.d.ts";
import { ResolvableValueField } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
/**
 * Make a numeric modification to an arbitrary property in a similar way as `ActiveEffect`s
 * @category RuleElement
 */
declare class AELikeRuleElement<TSchema extends AELikeSchema> extends RuleElementPF2e<TSchema> {
    #private;
    constructor(source: AELikeSource, options: RuleElementOptions);
    static defineSchema(): AELikeSchema;
    static CHANGE_MODES: readonly ["multiply", "add", "subtract", "remove", "downgrade", "upgrade", "override"];
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
    /** Apply the modifications immediately after proper ActiveEffects are applied */
    onApplyActiveEffects(): void;
    /** Apply the modifications near the beginning of the actor's derived-data preparation */
    beforePrepareData(): void;
    /** Apply the modifications at the conclusion of the actor's derived-data preparation */
    afterPrepareData(): void;
    /** Apply the modifications prior to a Check (roll) */
    beforeRoll(_domains: string[], rollOptions: Set<string>): void;
    protected applyAELike(rollOptions?: Set<string>): void;
    static getNewValue<TCurrent>(mode: AELikeChangeMode, current: TCurrent, change: TCurrent extends (infer TValue)[] ? TValue : TCurrent): TCurrent | DataModelValidationFailure;
}
interface AELikeRuleElement<TSchema extends AELikeSchema> extends RuleElementPF2e<TSchema>, ModelPropsFromSchema<AELikeSchema> {
}
interface AutoChangeEntry {
    source: string;
    level: number | null;
    value: number | string;
    mode: AELikeChangeMode;
}
type AELikeSchema = RuleElementSchema & {
    mode: StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    path: StringField<string, string, true, false, false>;
    phase: StringField<AELikeDataPrepPhase, AELikeDataPrepPhase, false, false, true>;
    value: ResolvableValueField<true, boolean, boolean>;
};
type AELikeChangeMode = (typeof AELikeRuleElement.CHANGE_MODES)[number];
type AELikeDataPrepPhase = (typeof AELikeRuleElement.PHASES)[number];
interface AELikeSource extends RuleElementSource {
    mode?: unknown;
    path?: unknown;
    phase?: unknown;
}
export { AELikeChangeMode, AELikeDataPrepPhase, AELikeRuleElement, AELikeSchema, AELikeSource, AutoChangeEntry };
