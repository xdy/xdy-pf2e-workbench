import { CharacterPF2e, FamiliarPF2e } from "@actor";
import { SenseAcuity } from "@actor/creature/sense.ts";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions } from "./base.ts";
import { RuleElementData, RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
export declare class SenseRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    private selector;
    private acuity;
    constructor(data: SenseRuleElementSource, options: RuleElementOptions);
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
