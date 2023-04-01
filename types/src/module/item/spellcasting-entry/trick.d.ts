import { ActorPF2e } from "@actor";
import { AbilityString } from "@actor/types";
import { SpellPF2e } from "@item";
import { Statistic } from "@system/statistic";
import { CastOptions, SpellcastingEntry, SpellcastingSheetData } from "./types";
declare const TRICK_MAGIC_SKILLS: readonly ["arcana", "nature", "occultism", "religion"];
type TrickMagicItemSkill = (typeof TRICK_MAGIC_SKILLS)[number];
declare const traditionSkills: {
    readonly arcane: "arcana";
    readonly divine: "religion";
    readonly occult: "occultism";
    readonly primal: "nature";
};
/** A pseudo spellcasting entry used to trick magic item for a single skill */
declare class TrickMagicItemEntry<TActor extends ActorPF2e = ActorPF2e> implements SpellcastingEntry<TActor> {
    actor: TActor;
    skill: TrickMagicItemSkill;
    readonly id: string;
    statistic: Statistic;
    ability: AbilityString;
    tradition: "arcane" | "divine" | "occult" | "primal";
    constructor(actor: TActor, skill: TrickMagicItemSkill);
    get name(): string;
    /** Unused since a Trick Magic Item ability isn't displayed in an actor sheet */
    get sort(): number;
    get category(): "items";
    get spells(): null;
    get isFlexible(): false;
    get isFocusPool(): false;
    get isInnate(): false;
    get isPrepared(): false;
    get isRitual(): false;
    get isSpontaneous(): false;
    /** Currently no checks for whether a magic item can be tricked */
    canCast(): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData(): Promise<SpellcastingSheetData>;
}
export { TRICK_MAGIC_SKILLS, TrickMagicItemEntry, TrickMagicItemSkill, traditionSkills };
