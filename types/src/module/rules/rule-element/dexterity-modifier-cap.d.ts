import type { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { RuleElementPF2e } from "./index.ts";
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
