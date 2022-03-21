import { ItemPF2e } from "@item";
import { RuleElementData, RuleElementOptions, RuleElementPF2e, RuleElementSource } from "./index";

/**
 * @category RuleElement
 */
export declare class ActorTraitsRuleElement extends RuleElementPF2e {
    constructor(data: ActorTraitsSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
export interface ActorTraitsRuleElement extends RuleElementPF2e {
    data: ActorTraitsData;
}
interface ActorTraitsSource extends RuleElementSource {
    add?: string[];
    remove?: string[];
}
interface ActorTraitsData extends RuleElementData {
    add: string[];
    remove: string[];
}
export {};
