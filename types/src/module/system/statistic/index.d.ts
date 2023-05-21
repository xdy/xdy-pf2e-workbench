import { ActorPF2e } from "@actor";
import { TraitViewData } from "@actor/data/base.ts";
import { ModifierPF2e } from "@actor/modifiers.ts";
import { AbilityString } from "@actor/types.ts";
import { ItemPF2e } from "@item";
import { ZeroToFour } from "@module/data.ts";
import { RollNotePF2e, RollNoteSource } from "@module/notes.ts";
import { TokenDocumentPF2e } from "@scene";
import { CheckRoll, CheckRollCallback, CheckType, RollTwiceOption } from "@system/check/index.ts";
import { CheckDC } from "@system/degree-of-success.ts";
import { StatisticChatData, StatisticCheckData, StatisticData, StatisticTraceData } from "./data.ts";
export * from "./data.ts";
export { RollOptionParameters, Statistic, StatisticCheck, StatisticDifficultyClass, StatisticRollParameters };
/** Basic data forming any Pathfinder statistic */
declare abstract class SimpleStatistic {
    /** The actor to which this statistic belongs */
    actor: ActorPF2e;
    /** A stable but human-readable identifier */
    slug: string;
    /** A display label */
    label: string;
    /** Original construction arguments */
    protected data: StatisticData;
    /** Penalties, bonuses, and actual modifiers comprising a total modifier value */
    modifiers: ModifierPF2e[];
    /** String category identifiers: used to retrieve modifiers and other synthetics as well as create roll options  */
    domains: string[];
    constructor(actor: ActorPF2e, data: StatisticData);
    createRollOptions(domains?: string[]): Set<string>;
}
/** A Pathfinder statistic used to perform checks or get dcs */
declare class Statistic extends SimpleStatistic {
    #private;
    ability: AbilityString | null;
    abilityModifier: ModifierPF2e | null;
    rank: ZeroToFour | null;
    proficient: boolean;
    /** If this is a skill, returns whether it is a lore skill or not */
    lore?: boolean;
    options: RollOptionParameters;
    constructor(actor: ActorPF2e, data: StatisticData, options?: RollOptionParameters);
    get check(): StatisticCheck<this>;
    get dc(): StatisticDifficultyClass<this>;
    /** Convenience getter to the statistic's total modifier */
    get mod(): number;
    createRollOptions(domains?: string[], args?: RollOptionParameters): Set<string>;
    withRollOptions(options?: RollOptionParameters): Statistic;
    /**
     * Extend this statistic into a new cloned statistic with additional data.
     * Combines all domains and modifier lists.
     */
    extend(data: Omit<DeepPartial<StatisticData>, "check"> & {
        check?: Partial<StatisticCheckData>;
    }): Statistic;
    /** Shortcut to `this#check#roll` */
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    /** Creates view data for sheets and chat messages */
    getChatData(options?: RollOptionParameters): StatisticChatData;
    /** Returns data intended to be merged back into actor data. By default the value is the DC */
    getTraceData(options?: {
        value?: "dc" | "mod";
        rollable?: [string, string];
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
    constructor(parent: TParent, data: StatisticData, options?: RollOptionParameters);
    createRollOptions(args?: RollOptionParameters): Set<string>;
    roll(args?: StatisticRollParameters): Promise<Rolled<CheckRoll> | null>;
    get breakdown(): string;
}
declare class StatisticDifficultyClass<TParent extends Statistic = Statistic> {
    parent: TParent;
    domains: string[];
    label?: string;
    modifiers: ModifierPF2e[];
    options: Set<string>;
    constructor(parent: TParent, data: StatisticData, options?: RollOptionParameters);
    get value(): number;
    get breakdown(): string;
}
interface StatisticRollParameters {
    /** What token to use for the roll itself. Defaults to the actor's token */
    token?: TokenDocumentPF2e;
    /** Which attack this is (for the purposes of multiple attack penalty) */
    attackNumber?: number;
    /** Optional target for the roll */
    target?: ActorPF2e | null;
    /** Optional origin for the roll: only one of target and origin may be provided */
    origin?: ActorPF2e | null;
    /** Optional DC data for the roll */
    dc?: CheckDC | null;
    /** Optional override for the check modifier label */
    label?: string;
    /** Optional override for the dialog's title. Defaults to label */
    title?: string;
    /** Any additional roll notes which should be used in the roll. */
    extraRollNotes?: (RollNotePF2e | RollNoteSource)[];
    /** Any additional options which should be used in the roll. */
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
    /** Whether to create a chat message using the roll (defaults true) */
    createMessage?: boolean;
    /** Callback called when the roll occurs. */
    callback?: CheckRollCallback;
}
interface RollOptionParameters {
    extraRollOptions?: string[];
    item?: ItemPF2e | null;
    origin?: ActorPF2e | null;
    target?: ActorPF2e | null;
}
