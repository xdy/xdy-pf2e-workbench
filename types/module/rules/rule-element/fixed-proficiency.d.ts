import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { AbilityString } from "@actor/types";
import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
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
