import { ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";
import { handleAsync, isActuallyDamageRoll } from "../utils.js";
import { autoRollDamage } from "../feature/damageHandler/index.js";
import { dyingHandlingCreateChatMessageHook } from "../feature/damageHandler/dyingHandling.js";
import { checkAttackValidity } from "../feature/reminders/checkAttackValidity.js";
import { reminderTargeting } from "../feature/reminders/index.js";
import { reminderBreathWeapon } from "../feature/reminders/reminderBreathWeapon.js";

function isDamageTaken(message: ChatMessagePF2e): boolean {
    return systems.getFlag(message, "context.type") === "damage-taken";
}

export function createChatMessageHook(message: ChatMessagePF2e): void {
    const reminderCancelAttack = String(game.settings.get(MODULENAME, "reminderCannotAttack"));
    if (reminderCancelAttack === "reminder") {
        checkAttackValidity(message, false);
    }

    const reminderTargetingSetting = String(game.settings.get(MODULENAME, "reminderTargeting"));
    if (["no", "reminder"].includes(reminderTargetingSetting)) {
        reminderTargeting(message, reminderTargetingSetting);
    }

    // Early return for damage rolls or damage taken messages
    const isDamageRoll = isActuallyDamageRoll(message);
    const isDamage = isDamageRoll || isDamageTaken(message);

    if (!isDamage) {
        const skipAutoRoll = message.getFlag(MODULENAME, "noAutoDamageRoll");
        if (!skipAutoRoll) {
            handleAsync(autoRollDamage(message), "autoRollDamage");
        }

        // Check if we need to remind about breath weapon
        const reminderBreathWeaponEnabled = game.settings.get(MODULENAME, "reminderBreathWeapon");
        if (reminderBreathWeaponEnabled) {
            handleAsync(reminderBreathWeapon(message), "reminderBreathWeapon");
        }
    }

    // Always process dying handling
    dyingHandlingCreateChatMessageHook(message);
}
