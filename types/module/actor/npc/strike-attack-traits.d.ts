import { ModifierPF2e } from "@actor/modifiers";
import { MeleePF2e } from "@item/melee";
declare class StrikeAttackTraits {
    static createAttackModifiers(strike: MeleePF2e): ModifierPF2e[];
}
export { StrikeAttackTraits };
