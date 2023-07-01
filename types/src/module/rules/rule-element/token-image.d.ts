import { BracketedValue, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
export declare class TokenImageRuleElement extends RuleElementPF2e {
    #private;
    /** An image or video path */
    value: string | BracketedValue | null;
    /** An optional scale, tint, and alpha adjustment */
    scale?: number;
    tint?: HexColorString;
    alpha?: number;
    constructor(data: TokenImageSource, options: RuleElementOptions);
    afterPrepareData(): void;
}
interface TokenImageSource extends RuleElementSource {
    value?: unknown;
    scale?: unknown;
    tint?: unknown;
    alpha?: unknown;
}
export {};
