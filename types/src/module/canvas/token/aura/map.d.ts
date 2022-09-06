import { AuraRenderer } from "./renderer";
import { TokenPF2e } from "../object";
export declare class AuraRenderers extends Map<string, AuraRenderer> {
    private readonly token;
    constructor(token: TokenPF2e);
    /** The ID of the highlight layer for this aura's token */
    get highlightId(): string;
    /** Draw this token's auras on the canvas */
    draw(): void;
    refresh(): void;
    /** Deallocate the aura's GPU memory before removing from map */
    delete(key: string): boolean;
    /** Destroy highlight layer before clearing map */
    clear(): void;
    clearHighlights(): void;
}
