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
declare function fetchArmyGearData(gearType: String): Object;
export { ALIGNMENTS, ARMY_STATS, ARMY_TYPES, BASIC_WAR_ACTIONS_FOLDER, fetchArmyGearData };
