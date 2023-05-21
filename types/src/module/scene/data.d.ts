import { ZeroToTwo } from "@module/data.ts";
interface SceneFlagsPF2e extends DocumentFlags {
    pf2e: {
        [key: string]: unknown;
        syncDarkness: "enabled" | "disabled" | "default";
    };
}
declare enum LightLevels {
    DARKNESS = 0.25,
    BRIGHT_LIGHT = 0.75
}
type LightLevel = ZeroToTwo;
export { LightLevel, LightLevels, SceneFlagsPF2e };
