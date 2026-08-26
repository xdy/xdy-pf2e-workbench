import { CombatantPF2e, EncounterPF2e } from "foundry-pf2e";
import { getModuleSetting, restoreTargetsLocally, selectCombatantLocally } from "../utils.ts";
import { dispatchToCombatantOwner } from "./combatTurnShared.ts";
import { actionsReminder, autoReduceStunned } from "../feature/reminders/index.ts";

export async function pf2eStartTurnHook(
    combatant: CombatantPF2e,
    _combat: EncounterPF2e,
    userId: string,
): Promise<void> {
    const forWhom = getModuleSetting<string>("actionsReminderAllow");
    if (getModuleSetting("autoReduceStunned")) {
        const reduction = await autoReduceStunned(combatant, userId);
        if (forWhom !== "none") {
            actionsReminder(combatant, reduction);
        }
    } else if (forWhom !== "none") {
        actionsReminder(combatant, 0);
    }

    const actor = combatant.actor;
    if (!actor) return;

    if (
        !getModuleSetting<boolean>("selectCurrentCombatantOnTurnStart") &&
        !getModuleSetting<boolean>("rememberAndReaddCombatantTargets")
    ) {
        return;
    }

    dispatchToCombatantOwner(actor, combatant.id, "combatTurnStart", () => {
        if (getModuleSetting<boolean>("selectCurrentCombatantOnTurnStart")) {
            selectCombatantLocally(combatant.id);
        }
        if (getModuleSetting<boolean>("rememberAndReaddCombatantTargets")) {
            restoreTargetsLocally(combatant.id);
        }
    });

    // TODO Handle removal of game.combats.active.combatant.defeated/unsetting of deathIcon (are those the same?) for combatants that are neither dying nor have 0 HP.
}
