import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
import { RuleElementPF2e, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
/** Reduce current hit points without applying damage */
export declare class LoseHitPointsRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    /**
     * Lost hitpoints should reevaluate on item update, with the parent actor losing the difference in HP between the
     * new and old values.
     */
    private reevaluateOnUpdate;
    constructor(data: LoseHitPointsSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    onCreate(actorUpdates: Record<string, unknown>): void;
    preUpdate(changes: DeepPartial<ItemSourcePF2e>): Promise<void>;
}
interface LoseHitPointsSource extends RuleElementSource {
    value?: unknown;
    reevaluateOnUpdate?: unknown;
}
export interface LoseHitPointsRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
}
export {};
