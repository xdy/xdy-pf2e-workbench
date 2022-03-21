import { RuleElementData, RuleElementPF2e } from "./index";
import { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data";

/**
 * @category RuleElement
 */
export declare class FixedProficiencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
    afterPrepareData(): void;
}
export interface FixedProficiencyRuleElement {
    data: RuleElementData & {
        name?: string;
        ability?: string;
        force?: boolean;
    };
    get actor(): CharacterPF2e | NPCPF2e;
}
