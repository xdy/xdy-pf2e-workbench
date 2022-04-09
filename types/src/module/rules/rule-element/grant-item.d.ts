import { ItemPF2e } from "@item";
import { RuleElementPF2e, REPreCreateParameters, REPreDeleteParameters, RuleElementData, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
import { ActorType } from "@actor/data";
declare class GrantItemRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    /** Permit this grant to be applied during an actor update--if it isn't already granted and the predicate passes */
    reevaluateOnUpdate: boolean;
    constructor(data: GrantItemSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    preCreate(args: Omit<REPreCreateParameters, "ruleSource">): Promise<void>;
    /** Grant an item if this rule element permits it and the predicate passes */
    preUpdateActor(): Promise<void>;
    preDelete({ pendingItems }: REPreDeleteParameters): Promise<void>;
    private applyChoiceSelections;
    /** Run the preCreate callbacks of REs from the granted item */
    private runGrantedItemPreCreates;
}
interface GrantItemRuleElement extends RuleElementPF2e {
    data: GrantItemData;
}
interface GrantItemSource extends RuleElementSource {
    uuid?: unknown;
    replaceSelf?: unknown;
    preselectChoices?: unknown;
    reevaluateOnUpdate?: unknown;
}
interface GrantItemData extends RuleElementData {
    uuid: ItemUUID;
    replaceSelf: boolean;
    /**
     * If the granted item has a `ChoiceSet`, its selection may be predetermined. The key of the record must be the
     * `ChoiceSet`'s designated `flag` property.
     */
    preselectChoices: Record<string, string | number>;
}
export { GrantItemRuleElement };
