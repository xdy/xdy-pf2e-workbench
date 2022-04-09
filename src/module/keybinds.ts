import { MODULENAME } from "./xdy-pf2e-workbench";
import { moveSelectedAheadOfCurrent } from "./feature/initiativeHandler";
import { CombatantPF2e } from "@module/encounter";
import { canMystify, doMystification, isTokenMystified } from "./feature/tokenMystificationHandler";
import { calcRemainingMinutes, heroPointHandler, HPHState } from "./feature/heroPointHandler";

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
                heroPointHandler(calcRemainingMinutes() > 0 ? HPHState.Check : HPHState.Start);
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
                name: game.i18n.format(`${MODULENAME}.SETTINGS.callHotbarMacro.name`, { page: page, column: column }),
                hint: game.i18n.format(`${MODULENAME}.SETTINGS.callHotbarMacro.hint`, { page: page, column: column }),
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
