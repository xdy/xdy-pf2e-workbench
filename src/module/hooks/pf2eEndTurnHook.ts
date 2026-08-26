import { CombatantPF2e, EncounterPF2e } from "foundry-pf2e";

import { clearTargetsLocally, fireAndForget, getModuleSetting, saveTargetsLocally } from "../utils.ts";
import { dispatchToCombatantOwner } from "./combatTurnShared.ts";
import { reduceFrightened } from "../feature/conditionHandler/index.ts";

export function pf2eEndTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string): void {
    if (getModuleSetting("decreaseFrightenedConditionEachTurn")) {
        fireAndForget(reduceFrightened(combatant, userId), "reduceFrightened");
    }

    const actor = combatant.actor;
    if (!actor) return;

    if (
        !getModuleSetting<boolean>("rememberAndReaddCombatantTargets") &&
        !getModuleSetting<boolean>("clearCombatantTargetsOnTurnEnd")
    ) {
        return;
    }

    dispatchToCombatantOwner(actor, combatant.id, "combatTurnEnd", () => {
        if (getModuleSetting<boolean>("rememberAndReaddCombatantTargets")) {
            saveTargetsLocally(combatant.id);
        }
        if (getModuleSetting<boolean>("clearCombatantTargetsOnTurnEnd")) {
            clearTargetsLocally();
        }
    });
}
