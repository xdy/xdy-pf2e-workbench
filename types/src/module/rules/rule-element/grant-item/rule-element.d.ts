import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { ItemGrantDeleteAction } from "@item/data/base";
import { RuleElementPF2e, RuleElementSource } from "..";
import { RuleElementOptions } from "../base";
declare class GrantItemRuleElement extends RuleElementPF2e {
    #private;
    static validActorTypes: ActorType[];
    /** The UUID of the item to grant: must be a compendium or world item */
    uuid: string;
    /** Whether the granted item should replace the granting item */
    protected replaceSelf: boolean;
    /** Permit this grant to be applied during an actor update--if it isn't already granted and the predicate passes */
    protected reevaluateOnUpdate: boolean;
    /** Allow multiple of the same item (as determined by source ID) to be granted */
    protected allowDuplicate: boolean;
    /** The id of the granted item */
    grantedId: string | null;
    /** A flag for referencing the granted item ID in other rule elements */
    flag: string | null;
    /**
     * If the granted item has a `ChoiceSet`, its selection may be predetermined. The key of the record must be the
     * `ChoiceSet`'s designated `flag` property.
     */
    preselectChoices: Record<string, string | number>;
    onDeleteActions: Partial<OnDeleteActions> | null;
    constructor(data: GrantItemSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    static ON_DELETE_ACTIONS: readonly ["cascade", "detach", "restrict"];
    preCreate(args: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Grant an item if this rule element permits it and the predicate passes */
    preUpdateActor(): Promise<{
        create: ItemSourcePF2e[];
        delete: string[];
    }>;
    /** Run the preCreate callbacks of REs from the granted item */
    private runGrantedItemPreCreates;
}
interface GrantItemSource extends RuleElementSource {
    uuid?: unknown;
    replaceSelf?: unknown;
    preselectChoices?: unknown;
    reevaluateOnUpdate?: unknown;
    allowDuplicate?: unknown;
    onDeleteActions?: unknown;
    flag?: unknown;
}
interface OnDeleteActions {
    granter: ItemGrantDeleteAction;
    grantee: ItemGrantDeleteAction;
}
export { GrantItemRuleElement, GrantItemSource };
