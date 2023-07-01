import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementOptions } from "./base.ts";
import { RuleElementPF2e, RuleElementSource } from "./index.ts";
/**
 * @category RuleElement
 */
declare class FixedProficiencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    slug: string;
    private selector;
    private ability;
    constructor(data: FixedProficiencySource, options: RuleElementOptions);
    beforePrepareData(): void;
    afterPrepareData(): void;
}
interface FixedProficiencyRuleElement {
    get actor(): CharacterPF2e;
}
interface FixedProficiencySource extends RuleElementSource {
    selector?: unknown;
    ability?: unknown;
    force?: unknown;
}
export { FixedProficiencyRuleElement };
