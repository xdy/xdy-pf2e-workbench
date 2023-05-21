import { ActorPF2e, CreaturePF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ActorSizePF2e } from "@actor/data/size.ts";
import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions, BracketedValue } from "./index.ts";
/**
 * @category RuleElement
 * Change a creature's size
 */
declare class CreatureSizeRuleElement extends RuleElementPF2e {
    #private;
    protected static validActorTypes: ActorType[];
    value: string | number | BracketedValue;
    /** An optional reach adjustment to accompany the size */
    reach: ReachObject | null;
    resizeEquipment: boolean;
    constructor(data: CreatureSizeSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    private static wordToAbbreviation;
    private static incrementMap;
    private static decrementMap;
    private incrementSize;
    private decrementSize;
    beforePrepareData(): void;
}
type ReachObject = {
    add: ReachValue;
} | {
    upgrade: ReachValue;
} | {
    override: ReachValue;
};
type ReachValue = string | number | BracketedValue;
interface CreatureSizeRuleElement extends RuleElementPF2e {
    get actor(): CreaturePF2e;
    data: CreatureSizeRuleElementData;
}
interface CreatureSizeRuleElementData extends RuleElementData {
    resizeEquipment: boolean;
    minimumSize?: ActorSizePF2e;
    maximumSize?: ActorSizePF2e;
}
interface CreatureSizeSource extends RuleElementSource {
    reach?: unknown;
    resizeEquipment?: unknown;
}
export { CreatureSizeRuleElement };
