import { SenseData } from "./data";
export declare class CreatureSensePF2e implements SenseData {
    /** low-light vision, darkvision, scent, etc. */
    type: SenseType;
    /** One of "precise", "imprecise", or "vague" */
    acuity: SenseAcuity;
    /** The range of the sense, if any */
    value: string;
    /** The source of the sense, if any */
    source?: string;
    get range(): number;
    constructor(data: Omit<SenseData, "value"> & {
        value?: string;
    });
    /** The localized label of the sense */
    get label(): string | null;
    isMoreAcuteThan(sense: {
        acuity: SenseAcuity;
    }): boolean;
    hasLongerRangeThan(sense: {
        value: string;
    }): boolean;
}
export type SenseAcuity = typeof SENSE_ACUITIES[number];
export type SenseType = SetElement<typeof SENSE_TYPES>;
export declare const SENSE_ACUITIES: string[];
export declare const SENSE_TYPES: Set<"darkvision" | "echolocation" | "greaterDarkvision" | "lifesense" | "lowLightVision" | "motionsense" | "scent" | "seeInvisibility" | "spiritsense" | "tremorsense" | "wavesense">;
