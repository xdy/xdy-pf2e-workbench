export declare class InlineRollLinks {
    #private;
    static activatePF2eListeners(): void;
    static injectRepostElements(html: HTMLElement, foundryDoc: ClientDocument | null): void;
    /** Give inline damage-roll links from items flavor text of the item name */
    static flavorDamageRolls(html: HTMLElement, document?: ClientDocument | null): void;
}
