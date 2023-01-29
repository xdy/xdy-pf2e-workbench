declare const ALIGNMENTS: Set<"LE" | "CE" | "LG" | "NG" | "CG" | "LN" | "N" | "CN" | "NE">;
declare const ALIGNMENT_TRAITS: Set<"chaotic" | "evil" | "good" | "lawful">;
declare const ALLIANCES: Set<"party" | "opposition" | null>;
/** Use the lower end of CRB Table 9-1 ("Size and Reach"), allowing individual attacks to specify otherwise */
declare const SIZE_TO_REACH: {
    tiny: number;
    sm: number;
    med: number;
    lg: number;
    huge: number;
    grg: number;
};
export { ALIGNMENTS, ALIGNMENT_TRAITS, ALLIANCES, SIZE_TO_REACH };
