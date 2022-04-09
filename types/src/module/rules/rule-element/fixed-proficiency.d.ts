import { RuleElementPF2e, RuleElementSource } from "./";
import { CharacterPF2e } from "@actor";
import { AbilityString, ActorType } from "@actor/data";
import { RuleElementOptions } from "./base";
import { ItemPF2e } from "@item";
/**
 * @category RuleElement
 */
declare class FixedProficiencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    slug: string;
    ability: AbilityString | null;
    constructor(data: FixedProficiencySource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
    afterPrepareData(): void;
}
interface FixedProficiencyRuleElement {
    get actor(): CharacterPF2e;
}
interface FixedProficiencySource extends RuleElementSource {
    ability?: unknown;
    force?: unknown;
}
export { FixedProficiencyRuleElement };
