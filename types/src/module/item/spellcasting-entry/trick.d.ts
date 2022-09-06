import { CharacterPF2e } from "@actor";
import { AbilityString } from "@actor/types";
import { SpellPF2e } from "@item";
import { Statistic } from "@system/statistic";
import { BaseSpellcastingEntry } from "./data";
export declare const TRICK_MAGIC_SKILLS: readonly ["arc", "nat", "occ", "rel"];
export declare type TrickMagicItemSkill = typeof TRICK_MAGIC_SKILLS[number];
export declare const traditionSkills: {
    readonly arcane: "arc";
    readonly divine: "rel";
    readonly occult: "occ";
    readonly primal: "nat";
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
    cast(spell: SpellPF2e, options?: {
        level?: number;
    }): Promise<void>;
}
