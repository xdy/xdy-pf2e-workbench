// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";
import { moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";
import { canMystify, doMystification, isTokenMystified } from "./feature/mystify-token";
import { heroPointHandler } from "./feature/heroPointHandler";

export function registerKeybindings() {
    console.log(`${MODULENAME} | registerKeybindings`);

    const keybindings = game.keybindings;

    //Move combatant
    keybindings.register(MODULENAME, "heroPointHandler", {
        name: "SETTINGS.heroPointHandlerKey.name",
        hint: "SETTINGS.heroPointHandlerKey.hint",
        editable: [],
        onDown: () => {
            if (game.user?.isGM) {
                heroPointHandler();
            }
        },
    });

    //Move combatant
    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: "SETTINGS.moveBeforeCurrentCombatantKey.name",
        hint: "SETTINGS.moveBeforeCurrentCombatantKey.hint",
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

    //Move combatant
    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: "SETTINGS.moveBeforeCurrentCombatantKey.name",
        hint: "SETTINGS.moveBeforeCurrentCombatantKey.hint",
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
        hint: "SETTINGS.npcMystifierMystifyKey.hint",
        editable: [],
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
