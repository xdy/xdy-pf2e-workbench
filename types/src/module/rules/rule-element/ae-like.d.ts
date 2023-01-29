import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions, RuleValue } from "./";
/**
 * Make a numeric modification to an arbitrary property in a similar way as `ActiveEffect`s
 * @category RuleElement
 */
declare class AELikeRuleElement extends RuleElementPF2e {
    mode: AELikeChangeMode;
    path: string;
    phase: AELikeDataPrepPhase;
    /** Change modes and their default priority orders */
    static CHANGE_MODES: {
        multiply: number;
        add: number;
        subtract: number;
        remove: number;
        downgrade: number;
        upgrade: number;
        override: number;
    };
    static PHASES: readonly ["applyAEs", "beforeDerived", "afterDerived", "beforeRoll"];
    /**
     * Pattern to match system.skills.${longForm} paths for replacement
     * Temporary solution until skill data is represented in long form
     */
    static SKILL_LONG_FORM_PATH: RegExp;
    constructor(data: AELikeSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected validateData(): void;
    get value(): RuleValue;
    /** Apply the modifications immediately after proper ActiveEffects are applied */
    onApplyActiveEffects(): void;
    /** Apply the modifications near the beginning of the actor's derived-data preparation */
    beforePrepareData(): void;
    /** Apply the modifications at the conclusion of the actor's derived-data preparation */
    afterPrepareData(): void;
    /** Apply the modifications prior to a Check (roll) */
    beforeRoll(_domains: string[], rollOptions: Set<string>): void;
    protected applyAELike(rollOptions?: Set<string>): void;
    protected getNewValue(current: number | undefined, change: number): number;
    protected getNewValue(current: string | number | undefined, change: string | number): string | number;
    protected getNewValue(current: unknown, change: unknown): unknown;
    /** Log the numeric change of an actor data property */
    private logChange;
    protected warn(property: string): void;
}
interface AutoChangeEntry {
    source: string;
    level: number | null;
    value: number | string;
    mode: AELikeChangeMode;
}
interface AELikeRuleElement extends RuleElementPF2e {
    data: AELikeData;
}
type AELikeChangeMode = "add" | "subtract" | "remove" | "multiply" | "upgrade" | "downgrade" | "override";
type AELikeDataPrepPhase = "applyAEs" | "beforeDerived" | "afterDerived" | "beforeRoll";
interface AELikeData extends RuleElementData {
    path: string;
    value: RuleValue;
    mode: AELikeChangeMode;
    priority: number;
    phase: AELikeDataPrepPhase;
}
interface AELikeSource extends RuleElementSource {
    mode?: unknown;
    path?: unknown;
    phase?: unknown;
}
export { AELikeData, AELikeRuleElement, AELikeSource, AutoChangeEntry };
