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
export declare type SenseAcuity = typeof SENSE_ACUITIES[number];
export declare type BasicSenseType = typeof BASIC_SENSE_TYPES[number];
export declare type SenseType = typeof SENSE_TYPES[number];
export declare const SENSE_ACUITIES: string[];
export declare const BASIC_SENSE_TYPES: readonly ["darkvision", "echolocation", "greaterDarkvision", "lifesense", "lowLightVision", "motionsense", "scent", "tremorsense", "wavesense"];
export declare const SENSE_TYPES: readonly ["darkvision", "echolocation", "greaterDarkvision", "lifesense", "lowLightVision", "motionsense", "scent", "tremorsense", "wavesense"];
