// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";
import { moveSelectedAheadOfCurrent } from "./app/moveCombatant";
import { canMystify, doMystification, isTokenMystified } from "./app/mystify-token";

export let mystifyModifierKey: string;

export function registerKeybindings() {
    console.log(`${MODULENAME} | registerKeybindings`);

    //TODO Make a settings menu with the following settings that is set to be restricted to GMs
    // @ts-ignore
    const keybindings = (game as Game).keybindings;

    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: "SETTINGS.moveBeforeCurrentCombatantKey.name",
        hint: "Key for moving selected combatant to before the current combatant, normally because the current combatant has killed the selected combatant. Due to rounding several combatants may show the same initiative in the list.", //Foundry bug: hint is not translated
        editable: [],
        // @ts-ignore Shut up Typescript, it can be async,
        onDown: async () => {
            if ((game as Game).user?.isGM) {
                await moveSelectedAheadOfCurrent(
                    <Combatant>(game as Game)?.combat?.getCombatantByToken(<string>canvas?.tokens?.controlled[0].id)
                );
            }
        },
    });

    //Mystification below this
    keybindings.register(MODULENAME, "npcMystifierMystifyKey", {
        name: "SETTINGS.npcMystifierMystifyKey.name",
        hint: "Select tokens and press this key to mystify them.", //Localization of the keybind hint doesn't work for some reason. Should just be "SETTINGS.npcMystifierMystifyKey.hint",
        editable: [
            {
                key: "KeyM",
            },
        ],
        // @ts-ignore Shut up Typescript, it can be async,
        onDown: async () => {
            if (canMystify()) {
                const updates = [];
                for (const token of canvas?.tokens?.controlled || []) {
                    updates.push(...(await doMystification(token, isTokenMystified(token))));
                }

                await (game as Game).scenes?.active?.updateEmbeddedDocuments("Token", updates);
            } else {
                ui.notifications?.warn((game as Game).i18n.localize("SETTINGS.notifications.cantMystify"));
            }
        },
        restricted: false,
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });
}
