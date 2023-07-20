import { ItemType } from "@item/data/index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "../index.ts";
import { ItemAlterationSchema } from "./alteration.ts";
declare class ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema> {
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): ItemAlterationRuleSchema;
    beforePrepareData(): void;
    /** If this RE alters max HP, proportionally adjust current HP of items it would match against */
    preCreate(): Promise<void>;
}
interface ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema>, ModelPropsFromSchema<ItemAlterationRuleSchema> {
}
type ItemAlterationRuleSchema = RuleElementSchema & ItemAlterationSchema & {
    itemType: StringField<ItemType, ItemType, true, false, false>;
};
export { ItemAlterationRuleElement };
