import { CombatantPF2e, EncounterPF2e } from "foundry-pf2e";

import { fireAndForget, getModuleSetting } from "../utils.ts";
import { reduceFrightened } from "../feature/conditionHandler/index.ts";

export function pf2eEndTurnHook(combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string): void {
    if (getModuleSetting("decreaseFrightenedConditionEachTurn")) {
        fireAndForget(reduceFrightened(combatant, userId), "reduceFrightened");
    }
}
