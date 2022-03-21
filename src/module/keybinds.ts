// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";
import { moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";
import { canMystify, doMystification, isTokenMystified } from "./feature/mystify-token";
import { heroPointHandler, HPHState } from "./feature/heroPointHandler";
import { CombatantPF2e } from "../../types/src/module/encounter/combatant";

export function registerKeybindings() {
    console.log(`${MODULENAME} | registerKeybindings`);

    // @ts-ignore
    const keybindings = game.keybindings;

    keybindings.register(MODULENAME, "heroPointHandler", {
        name: `${MODULENAME}.SETTINGS.heroPointHandlerKey.name`,
        hint: `${MODULENAME}.SETTINGS.heroPointHandlerKey.hint`,
        restricted: true,
        editable: [],
        onDown: () => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "heroPointHandler")) {
                heroPointHandler(
                    game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes")
                        ? HPHState.Check
                        : HPHState.Start
                );
            }
            return true;
        },
    });

    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.name`,
        hint: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.hint`,
        restricted: true,
        editable: [],
        onDown: async () => {
            if (game.user?.isGM) {
                await moveSelectedAheadOfCurrent(
                    <CombatantPF2e>game?.combat?.getCombatantByToken(<string>canvas?.tokens?.controlled[0].id)
                );
            }
            return true;
        },
    });

    //Move combatant
    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.name`,
        hint: `${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.hint`,
        restricted: true,
        editable: [],
        onDown: async () => {
            if (game.user?.isGM) {
                await moveSelectedAheadOfCurrent(
                    <CombatantPF2e>game?.combat?.getCombatantByToken(<string>canvas?.tokens?.controlled[0].id)
                );
            }
            return true;
        },
    });

    //Mystification
    keybindings.register(MODULENAME, "npcMystifierMystifyKey", {
        name: `${MODULENAME}.SETTINGS.npcMystifierMystifyKey.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierMystifyKey.hint`,
        restricted: true,
        editable: [],
        onDown: async () => {
            if (game.settings.get(MODULENAME, "npcMystifier")) {
                if (canMystify()) {
                    const updates: any[] = [];
                    for (const token of canvas?.tokens?.controlled.filter((x) => !x.actor?.hasPlayerOwner) || []) {
                        updates.push(...(await doMystification(token, isTokenMystified(token))));
                    }

                    await canvas?.scene?.updateEmbeddedDocuments("Token", updates);
                } else {
                    ui.notifications?.warn(game.i18n.localize(`${MODULENAME}.SETTINGS.notifications.cantMystify`));
                }
                return true;
            }
        },
        reservedModifiers: [],
        // @ts-ignore
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });

    //Macro keybinds
    for (let page = 1; page <= 5; page++) {
        for (let column = 1; column <= 10; column++) {
            keybindings.register(MODULENAME, `callHotbarPage${page}Macro${column}`, {
                name: `Call hotbar macro on page ${page} position ${column}`, //TODO Localize. Preferably without 50 strings to translate...
                hint: `Call hotbar macro on page ${page} position ${column}`, //TODO Localize. Preferably without 50 strings to translate...
                restricted: false,
                editable: [],
                onDown: () => {
                    game.user?.getHotbarMacros(page)?.[column - 1]["macro"].execute();
                    return true;
                },
            });
        }
    }
}
