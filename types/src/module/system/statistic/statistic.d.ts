import type { ActorPF2e, CreaturePF2e } from "@actor";
import { TraitViewData } from "@actor/data/base.ts";
import { ModifierPF2e } from "@actor/modifiers.ts";
import { AttributeString } from "@actor/types.ts";
import type { ItemPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import { RollNotePF2e, RollNoteSource } from "@module/notes.ts";
import type { TokenDocumentPF2e } from "@scene";
import { CheckRollCallback } from "@system/check/check.ts";
import type { CheckRoll } from "@system/check/index.ts";
import { CheckType, RollTwiceOption } from "@system/check/types.ts";
import { CheckDC } from "@system/degree-of-success.ts";
import { BaseStatistic } from "./base.ts";
import { StatisticChatData, StatisticCheckData, StatisticData, StatisticDifficultyClassData, StatisticTraceData } from "./data.ts";
/** A Pathfinder statistic used to perform checks and calculate DCs */
declare class Statistic<TActor extends ActorPF2e = ActorPF2e> extends BaseStatistic<TActor> {
    #private;
    attribute: AttributeString | null;
    rank: ZeroToFour | null;
    proficient: boolean;
    /** The `Statistic` from which this one was derived (set by `Statistic#extend`), or otherwise `null`. */
    base: Statistic | null;
    /** If this is a skill, returns whether it is a lore skill or not */
    lore?: boolean;
    config: RollOptionConfig;
    constructor(actor: TActor, data: StatisticData, config?: RollOptionConfig);
    /** Get the attribute modifier used with this statistic. Since NPC statistics are contrived, create a new one. */
    get attributeModifier(): ModifierPF2e | null;
    get check(): StatisticCheck<this>;
    get dc(): StatisticDifficultyClass<this>;
    /** Convenience getter to the statistic's total modifier */
    get mod(): number;
    createRollOptions(domains?: string[], args?: RollOptionConfig): Set<string>;
    withRollOptions(options?: RollOptionConfig): Statistic;
    /**
     * Extend this statistic into a new cloned statistic with additional data.
     * Combines all domains and modifier lists.
     */
    clone(data: Omit<DeepPartial<StatisticData>, "check" | "dc" | "modifiers"> & {
        dc?: Partial<StatisticDifficultyClassData>;
        check?: Partial<StatisticCheckData>;
        modifiers?: ModifierPF2e[];
    }): this;
    /**
     * Extend this statistic into a new cloned statistic with additional data.
     * Combines all domains and modifier lists, and sets the new statistic to be the base of the other
     */
    extend(data: Omit<DeepPartial<StatisticData>, "check" | "dc" | "modifiers"> & {
        dc?: Partial<StatisticDifficultyClassData>;
        check?: Partial<StatisticCheckData>;
        modifiers?: ModifierPF2e[];
    }): this;
    /** Shortcut to `this#check#roll` */
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    /** Creates view data for sheets and chat messages */
    getChatData(options?: RollOptionConfig): StatisticChatData;
    /** Returns data intended to be merged back into actor data. By default the value is the DC */
    getTraceData(this: Statistic<CreaturePF2e>, options?: {
        value?: "dc" | "mod";
    }): StatisticTraceData<AttributeString>;
    getTraceData(options?: {
        value?: "dc" | "mod";
    }): StatisticTraceData;
}
declare class StatisticCheck<TParent extends Statistic = Statistic> {
    #private;
    parent: TParent;
    type: CheckType;
    label: string;
    domains: string[];
    mod: number;
    modifiers: ModifierPF2e[];
    constructor(parent: TParent, data: StatisticData, config?: RollOptionConfig);
    get actor(): ActorPF2e;
    createRollOptions(args?: RollOptionConfig): Set<string>;
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    get breakdown(): string;
}
interface StatisticRollParameters {
    /** A string of some kind to identify the roll: will be included in `CheckRoll#options` */
    identifier?: string;
    /** The slug of an action of which this check is a constituent roll */
    action?: string;
    /** What token to use for the roll itself. Defaults to the actor's token */
    token?: Maybe<TokenDocumentPF2e>;
    /** Which attack this is (for the purposes of multiple attack penalty) */
    attackNumber?: number;
    /** Optional target for the roll */
    target?: Maybe<ActorPF2e>;
    /** Optional origin for the roll: only one of target and origin may be provided */
    origin?: Maybe<ActorPF2e>;
    /** Optional DC data for the roll */
    dc?: CheckDC | CheckDCReference | number | null;
    /** Optional override for the check modifier label */
    label?: string;
    /** An optional identifying slug to give a specific check: propagated to roll options */
    slug?: Maybe<string>;
    /** Optional override for the dialog's title: defaults to label */
    title?: string;
    /** Any additional roll notes that should be used in the roll. */
    extraRollNotes?: (RollNotePF2e | RollNoteSource)[];
    /** Any additional options that should be used in the roll. */
    extraRollOptions?: string[];
    /** Additional modifiers */
    modifiers?: ModifierPF2e[];
    /** The originating item of this attack, if any */
    item?: ItemPF2e<ActorPF2e> | null;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: RollMode | "roll";
    /** Should the dialog be skipped */
    skipDialog?: boolean;
    /** Should this roll be rolled twice? If so, should it keep highest or lowest? */
    rollTwice?: RollTwiceOption;
    /** Any traits for the check */
    traits?: (TraitViewData | string)[];
    /** Whether the check is part of a damaging action */
    damaging?: boolean;
    /** Indication that the check is associated with a melee action */
    melee?: boolean;
    /** Whether to create a chat message using the roll (defaults true) */
    createMessage?: boolean;
    /** Callback called when the roll occurs. */
    callback?: CheckRollCallback;
}
declare class StatisticDifficultyClass<TParent extends Statistic = Statistic> {
    parent: TParent;
    domains: string[];
    label?: string;
    modifiers: ModifierPF2e[];
    options: Set<string>;
    constructor(parent: TParent, data: StatisticData, options?: RollOptionConfig);
    get value(): number;
    get breakdown(): string;
    toString(): string;
}
interface CheckDCReference {
    slug: string;
    value?: never;
}
interface RollOptionConfig {
    extraRollOptions?: string[];
    item?: ItemPF2e | null;
    origin?: ActorPF2e | null;
    target?: ActorPF2e | null;
}
export { Statistic, StatisticCheck, StatisticDifficultyClass };
export type { CheckDCReference, RollOptionConfig, StatisticRollParameters };
