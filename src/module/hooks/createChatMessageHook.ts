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

const UNHANDLED_MODULE_FLAGS = ["pf2e-ranged-combat", "pf2e-dailies"] as const;

export function messageFromUnhandledModule(message: ChatMessagePF2e): boolean {
    return UNHANDLED_MODULE_FLAGS.some((flag) => {
        return Boolean(message.flags && flag in message.flags);
    });
}

export function createChatMessageHook(message: ChatMessagePF2e): void {
    if (messageFromUnhandledModule(message)) return;

    evictDamageHandlerCaches();
    const reminderCancelAttack = getModuleSetting<string>("reminderCannotAttack");
    if (reminderCancelAttack === "reminder") {
        checkAttackValidity(message, false);
    }
    const reminderTargetingSetting = getModuleSetting<string>("reminderTargeting");
    if (["no", "reminder"].includes(reminderTargetingSetting)) {
        reminderTargeting(message, reminderTargetingSetting);
    }
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
    dyingHandlingCreateChatMessageHook(message);
}
