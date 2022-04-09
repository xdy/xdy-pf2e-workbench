import { AmbientLightPF2e } from "../ambient-light";
export declare class LightingLayerPF2e<TAmbientLight extends AmbientLightPF2e = AmbientLightPF2e> extends LightingLayer<TAmbientLight> {
    /** Temporarilly disable the refreshLighting hook */
    noRefreshHooks: boolean;
    get lightingLevel(): number;
    setPerceivedLightLevel({ hasLowLightVision }?: {
        hasLowLightVision?: boolean;
    }): void;
    private adjustLightRadii;
    /** Add a noHook option that can be intercepted by system hook listener */
    refresh(options?: {
        darkness?: number | null;
        backgroundColor?: string;
        noHook?: boolean;
    }): void;
}
