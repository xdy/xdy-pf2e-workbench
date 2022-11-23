import { DamageDicePF2e } from "@actor/modifiers";
/** Apply damage dice to a spell's damage formulas: currently only support simple overrides */
declare function applyDamageDice(formulas: string[], dice: DamageDicePF2e[]): string[];
export { applyDamageDice };
