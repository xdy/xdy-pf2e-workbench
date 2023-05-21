import { DamageDicePF2e } from "@actor/modifiers.ts";
import { DynamicBaseDamageData } from "@system/damage/index.ts";
/** Apply damage dice to a spell's damage formulas */
declare function applyDamageDiceOverrides(base: DynamicBaseDamageData[], dice: DamageDicePF2e[]): void;
export { applyDamageDiceOverrides };
