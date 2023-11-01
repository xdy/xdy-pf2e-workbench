declare const ALIGNMENTS: Set<"CE" | "LG" | "NG" | "CG" | "LN" | "N" | "CN" | "LE" | "NE">;
declare const ALIGNMENT_TRAITS: Set<"chaotic" | "evil" | "good" | "lawful">;
declare const ALLIANCES: Set<"party" | "opposition" | null>;
declare const SAVING_THROW_DEFAULT_ATTRIBUTES: {
    readonly fortitude: "con";
    readonly reflex: "dex";
    readonly will: "wis";
};
/** Use the lower end of CRB Table 9-1 ("Size and Reach"), allowing individual attacks to specify otherwise */
declare const SIZE_TO_REACH: {
    readonly tiny: 0;
    readonly sm: 5;
    readonly med: 5;
    readonly lg: 5;
    readonly huge: 10;
    readonly grg: 15;
};
/** Sense types associated with a particular acuities by definition */
declare const SENSES_WITH_MANDATORY_ACUITIES: {
    readonly darkvision: "precise";
    readonly heatsight: "precise";
    readonly greaterDarkvision: "precise";
    readonly lowLightVision: "precise";
    readonly seeInvisibility: "precise";
};
export { ALIGNMENTS, ALIGNMENT_TRAITS, ALLIANCES, SAVING_THROW_DEFAULT_ATTRIBUTES, SENSES_WITH_MANDATORY_ACUITIES, SIZE_TO_REACH, };
