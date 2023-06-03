import { DamageDicePF2e } from "@actor/modifiers.ts";
import { BaseDamageData } from "@system/damage/index.ts";
/** Apply damage dice to a spell's damage formulas (for now, terms only) */
declare function applyDamageDiceOverrides(base: BaseDamageData[], dice: DamageDicePF2e[]): void;
export { applyDamageDiceOverrides };
