export declare class MacroPF2e extends Macro {
    /** Raise permission requirement of world macro visibility to observer */
    get visible(): boolean;
    /** Allow unbound variables to be shadowed in script's evaluation scope */
    protected _executeScript({ actor, token }?: {
        actor?: Actor;
        token?: Token | null;
    }): void;
}
