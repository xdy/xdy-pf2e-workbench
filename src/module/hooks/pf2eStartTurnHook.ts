import { CombatantPF2e, EncounterPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { actionsReminder, autoReduceStunned } from "../feature/reminders/index.js";

export async function pf2eStartTurnHook(
    combatant: CombatantPF2e,
    _combat: EncounterPF2e,
    userId: string,
): Promise<void> {
    const forWhom = String(game.settings.get(MODULENAME, "actionsReminderAllow"));
    if (game.settings.get(MODULENAME, "autoReduceStunned")) {
        const reduction = await autoReduceStunned(combatant, userId);
        if (forWhom !== "none") {
            actionsReminder(combatant, reduction);
        }
    } else if (forWhom !== "none") {
        actionsReminder(combatant, 0);
    }

    // TODO Handle removal of game.combats.active.combatant.defeated/unsetting of deathIcon (are those the same?) for combatants that are neither dying nor have 0 HP.
}
