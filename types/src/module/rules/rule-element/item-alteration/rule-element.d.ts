import { ItemType } from "@item/data/index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "../index.ts";
import { ItemAlterationSchema } from "./alteration.ts";
declare class ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema> {
    constructor(source: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): ItemAlterationRuleSchema;
    static validateJoint(data: SourceFromSchema<ItemAlterationRuleSchema>): void;
    beforePrepareData(): void;
    /** If this RE alters max HP, proportionally adjust current HP of items it would match against */
    preCreate(): Promise<void>;
}
interface ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema>, ModelPropsFromSchema<ItemAlterationRuleSchema> {
}
type ItemAlterationRuleSchema = RuleElementSchema & ItemAlterationSchema & {
    /** The type of items to alter */
    itemType: StringField<ItemType, ItemType, false, false, false>;
    /** As an alternative to specifying item types, an exact item ID can be provided */
    itemId: StringField<string, string, false, false, false>;
};
export { ItemAlterationRuleElement };
