declare const ALIGNMENTS: Set<"LE" | "LG" | "NG" | "CG" | "LN" | "N" | "CN" | "NE" | "CE">;
declare const ALIGNMENT_TRAITS: Set<"chaotic" | "lawful" | "good" | "evil">;
declare const ALLIANCES: Set<"party" | "opposition" | null>;
declare const SIZE_TO_REACH: {
    tiny: number;
    sm: number;
    med: number;
    lg: number;
    huge: number;
    grg: number;
};
export { ALIGNMENTS, ALIGNMENT_TRAITS, ALLIANCES, SIZE_TO_REACH };
