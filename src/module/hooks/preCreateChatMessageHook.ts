import { ChatMessagePF2e, UserPF2e } from "foundry-pf2e";
import { NPC_TYPE } from "../xdy-pf2e-workbench.ts";

import * as systems from "../utils/systems.ts";
import { fireAndForget, getModuleSetting } from "../utils.ts";
import { handlePrivateSpellcasting } from "../feature/qolHandler/handlePrivateSpellcasting.ts";
import { persistentDamageHealing } from "../feature/damageHandler/index.ts";
import { reminderTargeting } from "../feature/reminders/index.ts";
import { checkAttackValidity } from "../feature/reminders/checkAttackValidity.ts";

/** Modifier keys that invert the private/public spell casting behavior. */
const MODIFIER_KEYS = ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight", "Meta", "OsLeft", "OsRight"];

export const preCreateChatMessageHook = (
    message: ChatMessagePF2e,
    data: Record<string, unknown>,
    _options: unknown,
    _user: UserPF2e,
): boolean => {
    let proceed = true;

    const reminderTargetingEnabled = getModuleSetting<string>("reminderTargeting") === "mustTarget";
    const reminderCannotAttack = getModuleSetting<string>("reminderCannotAttack");
    const castPrivateSpellEnabled = getModuleSetting("castPrivateSpell");

    // Handle private spellcasting
    if (castPrivateSpellEnabled && systems.getFlag(message, "casting.id")) {
        const ctrlHeld = MODIFIER_KEYS.some((key) => game?.keyboard.downKeys.has(key));
        const inParty = game.actors?.party?.members?.some((member) => member?.id === message?.actor?.id) ?? false;
        const privateCast = castPrivately(inParty, message);

        if ((ctrlHeld && !privateCast) || (!ctrlHeld && privateCast)) {
            fireAndForget(handlePrivateSpellcasting(data, message), "handlePrivateSpellcasting");
        }
    }

    // Handle persistent damage/healing
    const applyPersistentDamage = getModuleSetting("applyPersistentDamage");
    const applyPersistentHealing = getModuleSetting("applyPersistentHealing");
    if (applyPersistentDamage || applyPersistentHealing) {
        persistentDamageHealing(message);
    }

    // Handle targeting reminders
    if (reminderTargetingEnabled) {
        proceed = reminderTargeting(message, getModuleSetting<string>("reminderTargeting"));
    }

    // Handle attack validity
    if (proceed && reminderCannotAttack === "cancelAttack") {
        proceed = checkAttackValidity(message, true);
    }

    return proceed;
};

function castPrivately(inParty: boolean, message: ChatMessagePF2e): boolean {
    const isNpc = message.actor?.type === NPC_TYPE;
    const isAlly = message.actor?.alliance === "party";
    const alwaysNpc = getModuleSetting("castPrivateSpellAlwaysFor") === "npcs";
    const alwaysNonAlly = getModuleSetting("castPrivateSpellAlwaysFor") === "nonAllies";
    const alwaysNonParty = getModuleSetting("castPrivateSpellAlwaysFor") === "nonPartymembers";

    return (isNpc && alwaysNpc) || (!isAlly && alwaysNonAlly) || (!inParty && alwaysNonParty);
}
