import { ActorPF2e, CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data/index.ts";
import { RuleElementPF2e, RuleElementSource } from "./index.ts";
import { RuleElementOptions } from "./base.ts";
/** Reduce current hit points without applying damage */
export declare class LoseHitPointsRuleElement extends RuleElementPF2e {
    static validActorTypes: ActorType[];
    /**
     * Lost hitpoints should reevaluate on item update, with the parent actor losing the difference in HP between the
     * new and old values.
     */
    private reevaluateOnUpdate;
    constructor(data: LoseHitPointsSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
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
