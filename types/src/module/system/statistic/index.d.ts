import { ActorPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base.ts";
import { ModifierPF2e } from "@actor/modifiers.ts";
import { AttributeString } from "@actor/types.ts";
import { ItemPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import { RollNotePF2e, RollNoteSource } from "@module/notes.ts";
import { TokenDocumentPF2e } from "@scene";
import { CheckRoll, CheckRollCallback, CheckType, RollTwiceOption } from "@system/check/index.ts";
import { CheckDC } from "@system/degree-of-success.ts";
import { BaseStatisticData, BaseStatisticTraceData, StatisticChatData, StatisticCheckData, StatisticData, StatisticDifficultyClassData, StatisticTraceData } from "./data.ts";
/** Basic data forming any Pathfinder statistic */
declare abstract class BaseStatistic {
    /** The actor to which this statistic belongs */
    actor: ActorPF2e;
    /** A stable but human-readable identifier */
    slug: string;
    /** A display label */
    label: string;
    /** Original construction arguments */
    protected data: StatisticData;
    /** String category identifiers: used to retrieve modifiers and other synthetics as well as create roll options  */
    domains: string[];
    /** Penalties, bonuses, and actual modifiers comprising a total modifier value */
    modifiers: ModifierPF2e[];
    constructor(actor: ActorPF2e, data: BaseStatisticData);
    createRollOptions(domains?: string[]): Set<string>;
    abstract getTraceData(): BaseStatisticTraceData;
}
/** A Pathfinder statistic used to perform checks and calculate DCs */
declare class Statistic extends BaseStatistic {
    #private;
    ability: AttributeString | null;
    rank: ZeroToFour | null;
    proficient: boolean;
    /** The `Statistic` from which this one was derived (set by `Statistic#extend`), or otherwise `null`. */
    base: Statistic | null;
    /** If this is a skill, returns whether it is a lore skill or not */
    lore?: boolean;
    config: RollOptionConfig;
    constructor(actor: ActorPF2e, data: StatisticData, config?: RollOptionConfig);
    /** Get the ability modifier used with this statistic. Since NPC statistics are contrived, create a new one. */
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
    extend(data: Omit<DeepPartial<StatisticData>, "check" | "dc" | "modifiers"> & {
        dc?: Partial<StatisticDifficultyClassData>;
        check?: Partial<StatisticCheckData>;
        modifiers?: ModifierPF2e[];
    }): Statistic;
    /** Shortcut to `this#check#roll` */
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    /** Creates view data for sheets and chat messages */
    getChatData(options?: RollOptionConfig): StatisticChatData;
    /** Returns data intended to be merged back into actor data. By default the value is the DC */
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
    dc?: CheckDC | CheckDCReference | null;
    /** Optional override for the check modifier label */
    label?: string;
    /** Optional override for the dialog's title. Defaults to label */
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
    /** A range that restricts or penalizes a targeted check */
    range?: Maybe<{
        increment?: Maybe<number>;
        max?: number;
    }>;
    /** Whether to create a chat message using the roll (defaults true) */
    createMessage?: boolean;
    /** Callback called when the roll occurs. */
    callback?: CheckRollCallback;
}
interface RollOptionConfig {
    extraRollOptions?: string[];
    item?: ItemPF2e | null;
    origin?: ActorPF2e | null;
    target?: ActorPF2e | null;
}
export * from "./data.ts";
export { BaseStatistic, CheckDCReference, RollOptionConfig, Statistic, StatisticCheck, StatisticDifficultyClass, StatisticRollParameters, };
