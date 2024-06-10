import { ZeroToTwo } from "@module/data.ts";
interface SceneFlagsPF2e extends DocumentFlags {
    pf2e: {
        [key: string]: unknown;
        hearingRange: number | null;
        /** Rules-based vision override for the scene: `null` indicates the world setting is used. */
        rulesBasedVision: boolean | null;
        syncDarkness: "enabled" | "disabled" | "default";
        /** The global terrain types for this scene */
        environmentTypes?: EnvironmentType[];
    };
}
declare enum LightLevels {
    DARKNESS = 0.25,
    BRIGHT_LIGHT = 0.75
}
type LightLevel = ZeroToTwo;
type EnvironmentType = keyof typeof CONFIG.PF2E.environmentTypes;
export { LightLevels };
export type { LightLevel, SceneFlagsPF2e, EnvironmentType };
