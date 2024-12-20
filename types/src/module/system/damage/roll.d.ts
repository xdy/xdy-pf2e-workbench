import { DamageRollFlag } from "@module/chat-message/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import { DegreeOfSuccessIndex } from "@system/degree-of-success.ts";
import { RollDataPF2e } from "@system/rolls.ts";
import type Peggy from "peggy";
import type { RollParseNode } from "types/foundry/client-esm/dice/_types.d.mts";
import type { DiceTerm, RollTerm } from "types/foundry/client-esm/dice/terms/module.d.ts";
import { InstancePool } from "./terms.ts";
import { DamageCategory, DamageIRBypassData, DamageTemplate, DamageType, MaterialDamageEffect } from "./types.ts";

declare abstract class AbstractDamageRoll extends Roll {
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
}
declare class DamageRoll extends AbstractDamageRoll {
    static CHAT_TEMPLATE: string;
    static TOOLTIP_TEMPLATE: string;
    static parse(formula: string, data: Record<string, unknown>): InstancePool[];
    constructor(formula: string, data?: {}, options?: DamageRollData);
    get roller(): UserPF2e | null;
    /** Ensure the roll is parsable as `PoolTermData` */
    static validate(formula: string): boolean;
    /** Identify each "DiceTerm" raw object with a non-abstract subclass name */
    static classifyDice(data: RollTermData): void;
    get pool(): InstancePool | null;
    get formula(): string;
    get instances(): DamageInstance[];
    /**
     * Damage roll rules more-or-less also applying to healing rolls and can be both or even include components of
     * either.
     */
    get kinds(): Set<"damage" | "healing">;
    get materials(): Set<MaterialDamageEffect>;
    /** Return an Array of the individual DiceTerm instances contained within this Roll. */
    get dice(): DiceTerm[];
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    static fromData<TRoll extends Roll>(this: AbstractConstructorOf<TRoll>, data: RollJSON): TRoll;
    /** Increase total to 1 if evaluating to 0 or less */
    protected _evaluateASTAsync(node: RollParseNode | RollTerm, options?: EvaluateRollParams): Promise<string | number>;
    getTooltip(): Promise<string>;
    /** Work around upstream issue in which display base formula is used for chat messages instead of display formula */
    render({ flavor, template, isPrivate, }?: RollRenderOptions): Promise<string>;
    alter(multiplier: number, addend: number, { multiplyNumeric }?: {
        multiplyNumeric?: boolean | undefined;
    }): this;
}
interface DamageRoll extends AbstractDamageRoll {
    constructor: typeof DamageRoll;
    options: DamageRollData & {
        showBreakdown: boolean;
    };
}
declare class DamageInstance extends AbstractDamageRoll {
    #private;
    kinds: Set<"damage" | "healing">;
    type: DamageType;
    persistent: boolean;
    materials: Set<MaterialDamageEffect>;
    critRule: CriticalDoublingRule | null;
    constructor(formula: string, data?: {}, { flavor, ...options }?: DamageInstanceData);
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
    render({ tooltips }?: InstanceRenderOptions): Promise<string>;
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
interface InstanceRenderOptions extends RollRenderOptions {
    /** Whether to attach tooltips to the damage type icons */
    tooltips?: boolean;
}
type CriticalDoublingRule = "double-damage" | "double-dice";
interface AbstractDamageRollData extends RollOptions {
    evaluatePersistent?: boolean;
}
interface DamageRollData extends RollDataPF2e, AbstractDamageRollData {
    /** Whether to double dice or total on critical hits */
    critRule?: Maybe<CriticalDoublingRule>;
    /** Data used to construct the damage formula and options */
    damage?: DamageTemplate;
    result?: DamageRollFlag;
    degreeOfSuccess?: DegreeOfSuccessIndex | null;
    /** If the total was increased to 1, the original total */
    increasedFrom?: number;
    /** Whether this roll is the splash damage from another roll */
    splashOnly?: boolean;
    bypass?: DamageIRBypassData;
}
type DamageInstanceData = AbstractDamageRollData;
export { DamageInstance, DamageRoll, type DamageRollData };
