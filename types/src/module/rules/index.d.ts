import { LaxSchemaField } from "@system/schema-data-fields.ts";
import { RuleElementPF2e } from "./rule-element/base.ts";
import type { RuleElementOptions, RuleElementSchema, RuleElementSource } from "./rule-element/index.ts";

export type { RuleElementSynthetics } from "./synthetics.ts";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor | undefined>;
    static custom: Record<string, RuleElementConstructor | undefined>;
    static get all(): Record<string, RuleElementConstructor | undefined>;
    static fromOwnedItem(options: RuleElementOptions): RuleElementPF2e[];
}
type RuleElementConstructor = {
    schema: LaxSchemaField<RuleElementSchema>;
} & (new (data: RuleElementSource, options: RuleElementOptions) => RuleElementPF2e);
export { RuleElementOptions, RuleElementPF2e, RuleElementSource, RuleElements };
