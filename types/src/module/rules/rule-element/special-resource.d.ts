import type { ActorType, CreaturePF2e } from "@actor";
import type { ActorCommitData } from "@actor/types.ts";
import type { NumberField, StringField } from "types/foundry/common/data/fields.js";
import { type RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ResolvableValueField, type RuleElementSchema, type RuleElementSource } from "./data.ts";

declare class SpecialResourceRuleElement extends RuleElementPF2e<SpecialResourceSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    constructor(source: SpecialResourceSource, options: RuleElementOptions);
    static defineSchema(): SpecialResourceSchema;
    /** Updates the remaining number of this resource. Where it updates depends on the type */
    update(value: number, options: {
        save: false;
    }): Promise<ActorCommitData>;
    update(value: number, options?: {
        save?: true;
    }): Promise<void>;
    /** If an item uuid is specified, create it when this resource is first attached */
    preCreate(args: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Treat special resources as upgrades during the AELike phase */
    onApplyActiveEffects(): void;
    /** Finish initializing the special resource, flooring values and assigning the value */
    beforePrepareData(): void;
}
interface SpecialResourceRuleElement extends RuleElementPF2e<SpecialResourceSchema>, Omit<ModelPropsFromSchema<SpecialResourceSchema>, "label"> {
    slug: string;
    max: number;
    get actor(): CreaturePF2e;
}
type SpecialResourceSource = RuleElementSource & {
    value?: unknown;
    max?: unknown;
};
type SpecialResourceSchema = RuleElementSchema & {
    /** The initial value of this resource. Defaults to max if there is a max, otherwise 0 */
    initial: NumberField<number, number, false, false>;
    /** Current value. If not set, defaults to null */
    value: NumberField<number, number, false, false>;
    /** The maximum value attainable for this resource. */
    max: ResolvableValueField<true, false>;
    /** If this represents a physical resource, the UUID of the item to create */
    itemUUID: StringField<string, string, false, false, false>;
};
export { SpecialResourceRuleElement };
export type { SpecialResourceSource };
