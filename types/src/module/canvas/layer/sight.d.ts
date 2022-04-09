import { FogExplorationPF2e } from "@module/fog-exploration";
import { TokenPF2e } from "../token";
export declare class SightLayerPF2e extends SightLayer<TokenPF2e, FogExplorationPF2e> {
    /** Is the rules-based vision setting enabled? */
    get rulesBasedVision(): boolean;
    get hasLowLightVision(): boolean;
    get hasDarkvision(): boolean;
}
