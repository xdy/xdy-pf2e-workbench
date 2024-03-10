import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { ItemType } from "@item/base/data/index.ts";
import type { StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "../data.ts";
import { ItemAlterationSchema } from "./alteration.ts";
declare class ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema> {
    #private;
    static defineSchema(): ItemAlterationRuleSchema;
    static validateJoint(data: SourceFromSchema<ItemAlterationRuleSchema>): void;
    preCreate({ tempItems }: RuleElementPF2e.PreCreateParams): Promise<void>;
    onApplyActiveEffects(): void;
    afterPrepareData(): void;
    applyAlteration({ singleItem, additionalItems }?: ApplyAlterationOptions): void;
}
interface ItemAlterationRuleElement extends RuleElementPF2e<ItemAlterationRuleSchema>, ModelPropsFromRESchema<ItemAlterationRuleSchema> {
    constructor: typeof ItemAlterationRuleElement;
}
type ItemAlterationRuleSchema = RuleElementSchema & ItemAlterationSchema & {
    /** The type of items to alter */
    itemType: StringField<ItemType, ItemType, false, false, false>;
    /** As an alternative to specifying item types, an exact item ID can be provided */
    itemId: StringField<string, string, false, false, false>;
};
interface ApplyAlterationOptions {
    /** A single item to on which to run alterations instead of all qualifying items owned by the actor */
    singleItem?: ItemPF2e<ActorPF2e> | null;
    additionalItems?: ItemPF2e<ActorPF2e>[];
}
export { ItemAlterationRuleElement };
