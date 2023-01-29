import { CharacterPF2e } from "@actor";
import { AbilityString } from "@actor/types";
import { SpellPF2e } from "@item";
import { Statistic } from "@system/statistic";
import { BaseSpellcastingEntry, CastOptions } from "./data";
export declare const TRICK_MAGIC_SKILLS: readonly ["arcana", "nature", "occultism", "religion"];
export type TrickMagicItemSkill = typeof TRICK_MAGIC_SKILLS[number];
export declare const traditionSkills: {
    readonly arcane: "arcana";
    readonly divine: "religion";
    readonly occult: "occultism";
    readonly primal: "nature";
};
/** A pseudo spellcasting entry used to trick magic item for a single skill */
export declare class TrickMagicItemEntry implements BaseSpellcastingEntry {
    actor: CharacterPF2e;
    skill: TrickMagicItemSkill;
    id: string;
    statistic: Statistic;
    ability: AbilityString;
    tradition: "arcane" | "divine" | "occult" | "primal";
    constructor(actor: CharacterPF2e, skill: TrickMagicItemSkill);
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
}
