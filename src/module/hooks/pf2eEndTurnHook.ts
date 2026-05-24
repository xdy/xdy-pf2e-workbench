import { CombatantPF2e, EncounterPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { handleAsync } from "../utils.js";
import { reduceFrightened } from "../feature/conditionHandler/index.js";

export function pf2eEndTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string): void {
    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        handleAsync(reduceFrightened(combatant, userId), "reduceFrightened");
    }
}
