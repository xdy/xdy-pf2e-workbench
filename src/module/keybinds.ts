// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";
import { moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";
import { canMystify, doMystification, isTokenMystified } from "./feature/mystify-token";

export function registerKeybindings() {
    console.log(`${MODULENAME} | registerKeybindings`);

    //TODO Make a settings menu with the following settings that is set to be restricted to GMs
    const keybindings = game.keybindings;

    //Move combatant
    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: "SETTINGS.moveBeforeCurrentCombatantKey.name",
        hint: "Key for moving selected combatant to before the current combatant, normally because the current combatant has killed the selected combatant. Due to rounding several combatants may show the same initiative in the list.", //Foundry bug: hint is not translated
        editable: [],
        // @ts-ignore Shut up Typescript, it can be async,
        onDown: async () => {
            if (game.user?.isGM) {
                await moveSelectedAheadOfCurrent(
                    <Combatant>game?.combat?.getCombatantByToken(<string>canvas?.tokens?.controlled[0].id)
                );
            }
        },
    });

    //Mystification
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

                await game.scenes?.current?.updateEmbeddedDocuments("Token", updates);
            } else {
                ui.notifications?.warn(game.i18n.localize("SETTINGS.notifications.cantMystify"));
            }
        },
        restricted: false,
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });

    //Macro keybinds
    for (let page = 1; page <= 5; page++) {
        for (let column = 1; column <= 10; column++) {
            keybindings.register(MODULENAME, `callHotbarPage${page}Macro${column}`, {
                name: `Call hotbar macro on page ${page} position ${column}`, //TODO Localize. Preferably without 50 strings to translate...
                hint: `Call hotbar macro on page ${page} position ${column}`, //TODO Localize. Preferably without 50 strings to translate...
                editable: [],
                onDown: () => {
                    game.user?.getHotbarMacros(page)[column - 1]?.macro?.execute();
                },
            });
        }
    }
}
