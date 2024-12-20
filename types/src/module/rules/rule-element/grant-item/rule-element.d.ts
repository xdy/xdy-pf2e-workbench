import type { ActorType } from "@actor";
import type { ItemSourcePF2e } from "@item/base/data/index.ts";
import { ItemGrantDeleteAction } from "@item/base/data/system.ts";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSource } from "../data.ts";
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
    constructor(data: GrantItemSource, options: RuleElementOptions);
    static defineSchema(): GrantItemSchema;
    static ON_DELETE_ACTIONS: readonly ["cascade", "detach", "restrict"];
    static validateJoint(data: SourceFromSchema<GrantItemSchema>): void;
    preCreate(args: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Grant an item if this rule element permits it and the predicate passes */
    preUpdateActor(): Promise<{
        create: ItemSourcePF2e[];
        delete: string[];
    }>;
    /** Add an in-memory-only condition to the actor */
    onApplyActiveEffects(): void;
}
interface GrantItemRuleElement extends RuleElementPF2e<GrantItemSchema>, ModelPropsFromRESchema<GrantItemSchema> {
}
interface GrantItemSource extends RuleElementSource {
    uuid?: unknown;
    preselectChoices?: unknown;
    reevaluateOnUpdate?: unknown;
    inMemoryOnly?: unknown;
    allowDuplicate?: unknown;
    onDeleteActions?: unknown;
    flag?: unknown;
    alterations?: unknown;
}
interface OnDeleteActions {
    granter: ItemGrantDeleteAction;
    grantee: ItemGrantDeleteAction;
}
export { GrantItemRuleElement, type GrantItemSource };
