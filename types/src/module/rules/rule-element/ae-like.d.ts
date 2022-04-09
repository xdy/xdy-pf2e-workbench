import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions, RuleValue } from "./";
/**
 * Make a numeric modification to an arbitrary property in a similar way as `ActiveEffect`s
 * @category RuleElement
 */
declare class AELikeRuleElement extends RuleElementPF2e {
    static CHANGE_MODES: string[];
    constructor(data: AELikeSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected validateData(): void;
    get path(): string;
    get mode(): AELikeChangeMode;
    get value(): RuleValue;
    /** Apply the modifications immediately after proper ActiveEffects are applied */
    onApplyActiveEffects(): void;
    /** Apply the modifications near the beginning of the actor's derived-data preparation */
    beforePrepareData(): void;
    /** Apply the modifications at the conclusion of the actor's derived-data preparation */
    afterPrepareData(): void;
    /** Apply the modifications prior to a Check (roll) */
    beforeRoll(_domains: string[], rollOptions: string[]): void;
    protected applyAELike(rollOptions?: string[]): void;
    protected getNewValue(current: number | undefined, change: number): number;
    protected getNewValue(current: string | number | undefined, change: string | number): string | number;
    protected getNewValue(current: unknown, change: unknown): unknown;
    /** Log the numeric change of an actor data property */
    private logChange;
    protected warn(property: string): void;
}
export interface AutoChangeEntry {
    source: string;
    level: number | null;
    value: number | string;
    mode: AELikeChangeMode;
}
interface AELikeRuleElement extends RuleElementPF2e {
    data: AELikeData;
}
declare type AELikeChangeMode = "add" | "multiply" | "upgrade" | "downgrade" | "override";
export interface AELikeData extends RuleElementData {
    path: string;
    value: RuleValue;
    mode: AELikeChangeMode;
    priority: number;
    phase: "applyAEs" | "beforeDerived" | "afterDerived" | "beforeRoll";
}
export interface AELikeSource extends RuleElementSource {
    mode?: unknown;
    path?: unknown;
    phase?: unknown;
}
export { AELikeRuleElement };
