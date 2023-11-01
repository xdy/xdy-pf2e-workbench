import { TokenPF2e } from "../object.ts";
import { AuraRenderer } from "./renderer.ts";
export declare class AuraRenderers extends Map<string, AuraRenderer> {
    #private;
    readonly token: TokenPF2e;
    constructor(token: TokenPF2e);
    /** The ID of the highlight layer for this aura's token */
    get highlightId(): string;
    /**
     * Clear current aura renders, acquire new aura data, and render.
     * @param [slugs] A specific list of slugs to limit which auras are cleared
     */
    reset(slugs?: string[]): Promise<void>;
    /** Reposition aura textures after the token moves. */
    refreshPositions(): void;
    /** Toggle visibility of aura rings and reset highlights */
    draw(): Promise<void>;
    /** Deallocate the aura's GPU memory before removing from map */
    delete(key: string): boolean;
    /** Destroy highlight layer and renderers before clearing the map. */
    clear(): void;
    /** Alias of `clear` */
    destroy(): void;
    clearHighlights(): void;
}
