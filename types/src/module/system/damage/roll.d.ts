import { ResistanceType } from "@actor/types.ts";
import { DamageRollFlag } from "@module/chat-message/index.ts";
import { UserPF2e } from "@module/user/index.ts";
import { DegreeOfSuccessIndex } from "@system/degree-of-success.ts";
import { RollDataPF2e } from "@system/rolls.ts";
import type Peggy from "peggy";
import { InstancePool } from "./terms.ts";
import { DamageCategory, DamageTemplate, DamageType, MaterialDamageEffect } from "./types.ts";
declare abstract class AbstractDamageRoll extends Roll {
    /** Ensure the presence and validity of the `critRule` option for this roll */
    constructor(formula: string, data?: {}, options?: DamageInstanceData);
    static parser: Peggy.Parser;
    /** Strip out parentheses enclosing constants */
    static replaceFormulaData(formula: string, data: Record<string, unknown>, options?: {
        missing?: string;
        warn?: boolean;
    }): string;
    /** The theoretically lowest total of this roll */
    abstract get minimumValue(): number;
    /** The expected value (average result over the course of a "large number" of rolls) of this roll */
    abstract get expectedValue(): number;
    /** The theoretically highest total of this roll */
    abstract get maximumValue(): number;
    protected _evaluateSync(): never;
}
declare class DamageRoll extends AbstractDamageRoll {
    roller: UserPF2e | null;
    constructor(formula: string, data?: {}, options?: DamageRollDataPF2e);
    static CHAT_TEMPLATE: string;
    static TOOLTIP_TEMPLATE: string;
    static parse(formula: string, data: Record<string, unknown>): InstancePool[];
    /** Ensure the roll is parsable as `PoolTermData` */
    static validate(formula: string): boolean;
    /** Identify each "DiceTerm" raw object with a non-abstract subclass name */
    static classifyDice(data: RollTermData): void;
    get formula(): string;
    get instances(): DamageInstance[];
    get materials(): MaterialDamageEffect[];
    /** Return an Array of the individual DiceTerm instances contained within this Roll. */
    get dice(): DiceTerm[];
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    static fromData<TRoll extends Roll>(this: AbstractConstructorOf<TRoll>, data: RollJSON): TRoll;
    /** Increase total to 1 if evaluating to 0 or less */
    protected _evaluateTotal(): number;
    getTooltip(): Promise<string>;
    /** Work around upstream issue in which display base formula is used for chat messages instead of display formula */
    render({ flavor, template, isPrivate, }?: RollRenderOptions): Promise<string>;
    alter(multiplier: number, addend: number, { multiplyNumeric }?: {
        multiplyNumeric?: boolean | undefined;
    }): this;
}
interface DamageRoll extends AbstractDamageRoll {
    constructor: typeof DamageRoll;
    options: DamageRollDataPF2e;
}
declare class DamageInstance extends AbstractDamageRoll {
    #private;
    type: DamageType;
    persistent: boolean;
    materials: MaterialDamageEffect[];
    constructor(formula: string, data?: {}, options?: DamageInstanceData);
    static parse(formula: string, data: Record<string, unknown>): RollTerm[];
    static fromData<TRoll extends Roll>(this: ConstructorOf<TRoll>, data: RollJSON): TRoll;
    /** Get the expected, minimum, or maximum value of a term */
    static getValue(term: RollTerm, type?: "minimum" | "maximum" | "expected"): number;
    get formula(): string;
    get total(): number | undefined;
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    /** An array of statements for use in predicate testing */
    get formalDescription(): Set<string>;
    get iconClass(): string | null;
    /** Return 0 for persistent damage */
    protected _evaluateTotal(): number;
    render(): Promise<string>;
    get dice(): DiceTerm[];
    /** Get the head term of this instance */
    get head(): RollTerm;
    get category(): DamageCategory | null;
    get typeLabel(): string;
    /** Get the total of this instance without any doubling or tripling from a critical hit */
    get critImmuneTotal(): this["total"];
    componentTotal(component: "precision" | "splash"): number;
    /**
     * Set a "hidden" property for DsN! so that it doesn't simulate rolling deferred persistent damage.
     * See https://gitlab.com/riccisi/foundryvtt-dice-so-nice/-/wikis/API/Roll#hiding-a-dice-from-a-roll-animation
     */
    protected _evaluate(params?: Omit<EvaluateRollParams, "async">): Promise<Rolled<this>>;
}
interface DamageInstance extends AbstractDamageRoll {
    options: DamageInstanceData;
}
type CriticalDoublingRule = "double-damage" | "double-dice";
interface AbstractDamageRollData extends RollOptions {
    evaluatePersistent?: boolean;
    critRule?: CriticalDoublingRule;
}
interface DamageRollDataPF2e extends RollDataPF2e, AbstractDamageRollData {
    /** Data used to construct the damage formula and options */
    damage?: DamageTemplate;
    result?: DamageRollFlag;
    degreeOfSuccess?: DegreeOfSuccessIndex | null;
    /** If the total was increased to 1, the original total */
    increasedFrom?: number;
    /** Whether this roll is the splash damage from another roll */
    splashOnly?: boolean;
    /** Resistance types to be ignored */
    ignoredResistances?: {
        type: ResistanceType;
        max: number | null;
    }[];
}
type DamageInstanceData = AbstractDamageRollData;
export { DamageInstance, DamageRoll, DamageRollDataPF2e };
