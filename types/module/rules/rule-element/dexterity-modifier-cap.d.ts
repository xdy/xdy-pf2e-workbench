import type { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { RuleElementPF2e } from "./";
/**
 * @category RuleElement
 */
declare class DexterityModifierCapRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    beforePrepareData(): void;
}
interface DexterityModifierCapRuleElement extends RuleElementPF2e {
    get actor(): CharacterPF2e | NPCPF2e;
}
export { DexterityModifierCapRuleElement };
