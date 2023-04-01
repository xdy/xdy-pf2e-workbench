import type { ItemPF2e } from "@item";
import { LaxSchemaField } from "@system/schema-data-fields";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./rule-element";
import { ActorPF2e } from "@actor";
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
    static fromOwnedItem(item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
}
type RuleElementConstructor = {
    schema: LaxSchemaField<RuleElementSchema>;
} & (new (data: RuleElementSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions) => RuleElementPF2e);
export { RuleElements, RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions };
