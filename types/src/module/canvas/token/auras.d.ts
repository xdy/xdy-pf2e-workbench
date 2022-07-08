import { TokenAura } from "./aura";
import { TokenPF2e } from "./object";
export declare class TokenAuras extends Map<string, TokenAura> {
    private readonly token;
    constructor(token: TokenPF2e);
    /** The ID of the highlight layer for this aura's token */
    get highlightId(): string;
    /** Add and remove auras as needed, notify tokens of new auras */
    draw(): void;
    refresh(): void;
    /**
     * Notify tokens' actors if they are inside an aura in this collection
     * @param [specific] Only notify a single specific actor
     */
    notifyActors(specific?: TokenPF2e): Promise<void>;
    /** Deallocate the aura's GPU memory before removing from map */
    delete(key: string): boolean;
    /** Destroy highlight layer before clearing map */
    clear(): void;
    clearHighlights(): void;
}
