import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { Size } from "@module/data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { ResolvableValueField } from "./data.ts";
import { RecordField } from "@system/schema-data-fields.ts";
/**
 * @category RuleElement
 * Change a creature's size
 */
declare class CreatureSizeRuleElement extends RuleElementPF2e<CreatureSizeRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static defineSchema(): CreatureSizeRuleSchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    private static wordToAbbreviation;
    private static incrementMap;
    private static decrementMap;
    private incrementSize;
    private decrementSize;
    beforePrepareData(): void;
}
interface CreatureSizeRuleElement extends RuleElementPF2e<CreatureSizeRuleSchema>, ModelPropsFromSchema<CreatureSizeRuleSchema> {
    get actor(): CreaturePF2e;
}
type CreatureSizeRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, true>;
    reach: RecordField<StringField<"add" | "upgrade" | "override", "add" | "upgrade" | "override", true, false, false>, ResolvableValueField<true, false, false>, false, false, false>;
    resizeEquipment: BooleanField<boolean, boolean, false, false, false>;
    minimumSize: StringField<Size, Size, false, false, false>;
    maximumSize: StringField<Size, Size, false, false, false>;
};
export { CreatureSizeRuleElement };
