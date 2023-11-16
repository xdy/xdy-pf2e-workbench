declare const ALIGNMENTS: Set<"CE" | "LG" | "NG" | "CG" | "LE" | "NE" | "LN" | "CN" | "N">;
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
export { ALIGNMENTS, ARMY_STATS, fetchArmyGearData, ARMY_TYPES };
