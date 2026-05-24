import { ChatMessagePF2e, UserPF2e } from "foundry-pf2e";
import { MODULENAME, NPC_TYPE } from "../xdy-pf2e-workbench.js";
import * as systems from "../utils/systems.js";
import { handleAsync } from "../utils.js";
import { handlePrivateSpellcasting } from "../feature/qolHandler/handlePrivateSpellcasting.js";
import { persistentDamageHealing } from "../feature/damageHandler/index.js";
import { reminderTargeting } from "../feature/reminders/index.js";
import { checkAttackValidity } from "../feature/reminders/checkAttackValidity.js";

/** Modifier keys that invert the private/public spell casting behavior. */
const MODIFIER_KEYS = ["ControlLeft", "ControlRight", "MetaLeft", "MetaRight", "Meta", "OsLeft", "OsRight"];

export const preCreateChatMessageHook = (
    message: ChatMessagePF2e,
    data: Record<string, unknown>,
    _options: unknown,
    _user: UserPF2e,
): boolean => {
    let proceed = true;

    const reminderTargetingEnabled = String(game.settings.get(MODULENAME, "reminderTargeting")) === "mustTarget";
    const reminderCannotAttack = String(game.settings.get(MODULENAME, "reminderCannotAttack"));
    const castPrivateSpellEnabled = game.settings.get(MODULENAME, "castPrivateSpell");

    // Handle private spellcasting
    if (castPrivateSpellEnabled && systems.getFlag(message, "casting.id")) {
        const ctrlHeld = MODIFIER_KEYS.some((key) => game?.keyboard.downKeys.has(key));
        const inParty = game.actors?.party?.members?.some((member) => member?.id === message?.actor?.id) ?? false;
        const privateCast = castPrivately(inParty, message);

        if ((ctrlHeld && !privateCast) || (!ctrlHeld && privateCast)) {
            handleAsync(handlePrivateSpellcasting(data, message), "handlePrivateSpellcasting");
        }
    }

    // Handle persistent damage/healing
    const applyPersistentDamage = game.settings.get(MODULENAME, "applyPersistentDamage");
    const applyPersistentHealing = game.settings.get(MODULENAME, "applyPersistentHealing");
    if (applyPersistentDamage || applyPersistentHealing) {
        persistentDamageHealing(message);
    }

    // Handle targeting reminders
    if (reminderTargetingEnabled) {
        proceed = reminderTargeting(message, String(game.settings.get(MODULENAME, "reminderTargeting")));
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
    const alwaysNpc = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "npcs";
    const alwaysNonAlly = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "nonAllies";
    const alwaysNonParty = game.settings.get(MODULENAME, "castPrivateSpellAlwaysFor") === "nonPartymembers";

    return (isNpc && alwaysNpc) || (!isAlly && alwaysNonAlly) || (!inParty && alwaysNonParty);
}
