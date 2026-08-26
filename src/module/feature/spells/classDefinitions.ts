import type { MagicTradition } from "foundry-pf2e";

export interface ClassDefinition {
    readonly traditions: readonly MagicTradition[];
    readonly castingType: "prepared" | "spontaneous";
    readonly forcedTraditionSpells?: readonly string[];
}

export type ClassSlug =
    | "animist"
    | "bard"
    | "cleric"
    | "druid"
    | "magus"
    | "necromancer"
    | "oracle"
    | "psychic"
    | "sorcerer"
    | "summoner"
    | "witch"
    | "wizard";

export const CLASS_DEFINITIONS: Record<ClassSlug, ClassDefinition> = {
    animist: { traditions: ["divine"], castingType: "prepared" },
    bard: { traditions: ["occult"], castingType: "spontaneous" },
    cleric: { traditions: ["divine"], castingType: "prepared" },
    druid: { traditions: ["primal"], castingType: "prepared" },
    magus: { traditions: ["arcane"], castingType: "prepared" },
    necromancer: {
        traditions: ["occult"],
        castingType: "prepared",
        forcedTraditionSpells: ["harm"],
    },
    oracle: { traditions: ["divine"], castingType: "spontaneous" },
    psychic: { traditions: ["occult"], castingType: "spontaneous" },
    sorcerer: {
        traditions: [],
        castingType: "spontaneous",
    },
    summoner: { traditions: ["primal"], castingType: "spontaneous" },
    witch: {
        traditions: [],
        castingType: "prepared",
    },
    wizard: { traditions: ["arcane"], castingType: "prepared" },
};
