import { AmbientLightPF2e } from "../ambient-light";
export declare class LightingLayerPF2e<TAmbientLight extends AmbientLightPF2e = AmbientLightPF2e> extends LightingLayer<TAmbientLight> {
    /** Temporarilly disable the refreshLighting hook */
    noRefreshHooks: boolean;
    get lightingLevel(): number;
    /** Is the rules-based vision setting enabled? */
    get rulesBasedVision(): boolean;
    get hasLowLightVision(): boolean;
    get hasDarkvision(): boolean;
    /** Add a noHook option that can be intercepted by system hook listener */
    refresh(options?: {
        darkness?: number | null;
        backgroundColor?: string;
        noHook?: boolean;
    }): void;
}
