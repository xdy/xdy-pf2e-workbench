import { CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ActorSizePF2e } from "@actor/data/size";
import { ItemPF2e } from "@item";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index";

/**
 * @category RuleElement
 * Increase the creature's size
 */
export declare class CreatureSizeRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    constructor(data: CreatureSizeConstructionData, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    private static wordToAbbreviation;
    private static incrementMap;
    private static decrementMap;
    private incrementSize;
    private decrementSize;
    beforePrepareData(): void;
}
export interface CreatureSizeRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
    data: CreatureSizeRuleElementData;
}
interface CreatureSizeRuleElementData extends RuleElementData {
    resizeEquipment: boolean;
    minimumSize?: ActorSizePF2e;
    maximumSize?: ActorSizePF2e;
}
interface CreatureSizeConstructionData extends RuleElementSource {
    resizeEquipment?: boolean;
}
export {};
