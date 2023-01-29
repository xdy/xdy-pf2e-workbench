import { ItemPF2e } from "@item";
import { BracketedValue, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./";
/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
export declare class TokenImageRuleElement extends RuleElementPF2e {
    #private;
    /** An image or video path */
    value: string | BracketedValue | null;
    /** An optional scale adjustment */
    scale?: number;
    constructor(data: TokenImageSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    afterPrepareData(): void;
}
interface TokenImageSource extends RuleElementSource {
    value?: unknown;
    scale?: unknown;
}
export {};
