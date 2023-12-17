import type { ActionTrait } from "@item/ability/types.ts";
import type { KingmakerTrait } from "@item/campaign-feature/types.ts";
declare const BASIC_WAR_ACTIONS_FOLDER = "Vqp8b64uH35zkncy";
declare const ALIGNMENTS: Set<"CE" | "LG" | "NG" | "CG" | "LN" | "N" | "CN" | "LE" | "NE">;
declare const ARMY_TYPES: readonly ["infantry", "cavalry", "siege", "skirmisher"];
declare const ARMY_STATS: {
    scouting: number[];
    standardDC: number[];
    ac: number[];
    strongSave: number[];
    weakSave: number[];
    attack: number[];
    maxTactics: number[];
};
interface ArmyGearData {
    img: string;
    name: string;
    traits: (KingmakerTrait | ActionTrait)[];
    description: string;
    price?: number;
    level?: number;
    ranks?: {
        name: string;
        description: string;
        price: number;
        level: number;
    }[];
}
type ArmyGearType = "melee" | "ranged" | "additional-melee" | "additional-ranged" | "potions" | "armor";
declare function getArmyGearData(): Record<ArmyGearType, ArmyGearData>;
export { ALIGNMENTS, ARMY_STATS, ARMY_TYPES, BASIC_WAR_ACTIONS_FOLDER, getArmyGearData };
