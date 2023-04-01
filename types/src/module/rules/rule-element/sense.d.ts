import { ActorPF2e, CharacterPF2e, FamiliarPF2e } from "@actor";
import { SenseAcuity } from "@actor/creature/sense";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { RuleElementData, RuleElementPF2e, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
/**
 * @category RuleElement
 */
export declare class SenseRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    private selector;
    private acuity;
    constructor(data: SenseRuleElementSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
export interface SenseRuleElement {
    get actor(): CharacterPF2e | FamiliarPF2e;
    data: SenseRuleElementData;
}
interface SenseRuleElementData extends RuleElementData {
    label: string;
    force: boolean;
    acuity: SenseAcuity;
    range: string | number;
}
interface SenseRuleElementSource extends RuleElementSource {
    selector?: unknown;
    acuity?: string;
    range?: string | number | null;
    force?: boolean;
}
export {};
