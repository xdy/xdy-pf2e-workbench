import type { ItemPF2e } from "@item";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./rule-element";
export { RuleElementSynthetics } from "./synthetics";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor | undefined>;
    static custom: Record<string, RuleElementConstructor | undefined>;
    static get all(): {
        [x: string]: RuleElementConstructor | undefined;
    };
    static fromOwnedItem(item: Embedded<ItemPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
}
type RuleElementConstructor = new (data: RuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions) => RuleElementPF2e;
export { RuleElements, RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions };
