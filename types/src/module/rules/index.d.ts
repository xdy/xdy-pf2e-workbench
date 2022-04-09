import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource, RuleElementSynthetics } from "./rule-element";
import type { ItemPF2e } from "@item";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor | undefined>;
    static custom: Record<string, RuleElementConstructor | undefined>;
    static fromOwnedItem(item: Embedded<ItemPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
}
declare type RuleElementConstructor = new (data: RuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions) => RuleElementPF2e;
export { RuleElements, RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions, RuleElementSynthetics };
