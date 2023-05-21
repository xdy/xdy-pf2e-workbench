import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { ItemGrantDeleteAction } from "@item/data/base.ts";
import { ItemSourcePF2e } from "@item/data/index.ts";
import type { ModelPropsFromSchema } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSource } from "../index.ts";
import { GrantItemSchema } from "./schema.ts";
declare class GrantItemRuleElement extends RuleElementPF2e<GrantItemSchema> {
    #private;
    static validActorTypes: ActorType[];
    /** The id of the granted item */
    grantedId: string | null;
    /**
     * If the granted item has a `ChoiceSet`, its selection may be predetermined. The key of the record must be the
     * `ChoiceSet`'s designated `flag` property.
     */
    preselectChoices: Record<string, string | number>;
    /** Actions taken when either the parent or child item are deleted */
    onDeleteActions: Partial<OnDeleteActions> | null;
    constructor(data: GrantItemSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defineSchema(): GrantItemSchema;
    static ON_DELETE_ACTIONS: readonly ["cascade", "detach", "restrict"];
    _validateModel(data: SourceFromSchema<GrantItemSchema>): void;
    preCreate(args: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Grant an item if this rule element permits it and the predicate passes */
    preUpdateActor(): Promise<{
        create: ItemSourcePF2e[];
        delete: string[];
    }>;
}
interface GrantItemRuleElement extends RuleElementPF2e<GrantItemSchema>, ModelPropsFromSchema<GrantItemSchema> {
}
interface GrantItemSource extends RuleElementSource {
    uuid?: unknown;
    replaceSelf?: unknown;
    preselectChoices?: unknown;
    reevaluateOnUpdate?: unknown;
    allowDuplicate?: unknown;
    onDeleteActions?: unknown;
    flag?: unknown;
    alterations?: unknown;
}
interface OnDeleteActions {
    granter: ItemGrantDeleteAction;
    grantee: ItemGrantDeleteAction;
}
export { GrantItemRuleElement, GrantItemSource };
