import { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { PredicatePF2e, RawPredicate } from "@system/predication";
import { RuleElementSource } from "../index";
import { RuleElementData, RuleElementPF2e } from "./index";
import { RuleElementOptions } from "./base";

/**
 * @category RuleElement
 */
export declare class TogglePropertyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    /** The current value of the toggle */
    value: boolean;
    /** Whether the toggle is interactable by the user. The value may still be true even if the toggle is disabled */
    enabled: PredicatePF2e;
    constructor(data: TogglePropertySource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
export interface TogglePropertyRuleElement {
    get actor(): CharacterPF2e | NPCPF2e;
    data: TogglePropertyData;
}
interface TogglePropertyData extends RuleElementData {
    property: string;
    enabled?: RawPredicate;
    default: boolean;
}
interface TogglePropertySource extends RuleElementSource {
    property?: unknown;
    enabled?: unknown;
    default?: unknown;
}
export {};
