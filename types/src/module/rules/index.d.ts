import type { ItemPF2e } from "@item";
import { LaxSchemaField } from "@system/schema-data-fields.ts";
import type { RuleElementData, RuleElementOptions, RuleElementSchema, RuleElementSource } from "./rule-element/index.ts";
import { RuleElementPF2e } from "./rule-element/base.ts";
import { ActorPF2e } from "@actor";
export type { RuleElementSynthetics } from "./synthetics.ts";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor | undefined>;
    static custom: Record<string, RuleElementConstructor | undefined>;
    static get all(): Record<string, RuleElementConstructor | undefined>;
    static fromOwnedItem(item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
}
type RuleElementConstructor = {
    schema: LaxSchemaField<RuleElementSchema>;
} & (new (data: RuleElementSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions) => RuleElementPF2e);
export { RuleElements, RuleElementPF2e, RuleElementSource, RuleElementData, RuleElementOptions };
