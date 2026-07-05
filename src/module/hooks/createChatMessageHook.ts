import { ChatMessagePF2e } from "foundry-pf2e";
import * as systems from "../utils/systems.ts";
import { fireAndForget, getModuleFlag, getModuleSetting, isActuallyDamageRoll } from "../utils.ts";
import { autoRollDamage, evictDamageHandlerCaches } from "../feature/damageHandler/index.ts";
import { dyingHandlingCreateChatMessageHook } from "../feature/damageHandler/dyingHandling.ts";
import { checkAttackValidity } from "../feature/reminders/checkAttackValidity.ts";
import { reminderTargeting } from "../feature/reminders/index.ts";
import { reminderBreathWeapon } from "../feature/reminders/reminderBreathWeapon.ts";

function isDamageTaken(message: ChatMessagePF2e): boolean {
    return systems.getFlag(message, "context.type") === "damage-taken";
}

export function createChatMessageHook(message: ChatMessagePF2e): void {
    evictDamageHandlerCaches();
    const reminderCancelAttack = getModuleSetting<string>("reminderCannotAttack");
    if (reminderCancelAttack === "reminder") {
        checkAttackValidity(message, false);
    }

    const reminderTargetingSetting = getModuleSetting<string>("reminderTargeting");
    if (["no", "reminder"].includes(reminderTargetingSetting)) {
        reminderTargeting(message, reminderTargetingSetting);
    }

    // Early return for damage rolls or damage taken messages
    const isDamageRoll = isActuallyDamageRoll(message);
    const isDamage = isDamageRoll || isDamageTaken(message);

    if (!isDamage) {
        const skipAutoRoll = getModuleFlag(message, "noAutoDamageRoll");
        if (!skipAutoRoll) {
            fireAndForget(autoRollDamage(message), "autoRollDamage");
        }

        // Check if we need to remind about breath weapon
        const reminderBreathWeaponEnabled = getModuleSetting("reminderBreathWeapon");
        if (reminderBreathWeaponEnabled) {
            fireAndForget(reminderBreathWeapon(message), "reminderBreathWeapon");
        }
    }

    // Always process dying handling
    dyingHandlingCreateChatMessageHook(message);
}
