import { handleAsync, logInfo } from "./utils.js";
import { MODULENAME } from "./xdy-pf2e-workbench.js";
import { canMystify, doMystification, isTokenMystified } from "./feature/tokenMystificationHandler/index.js";
import { calcRemainingMinutes, heroPointHandler, HPHState } from "./feature/heroPointHandler/index.js";
import { moveSelectedAheadOfCurrent } from "./feature/initiativeHandler/index.js";

export function registerWorkbenchKeybindings(): void {
    logInfo(`${MODULENAME} | registerKeybindings`);

    const keybindings = game.keybindings;

    keybindings.register(MODULENAME, "addUserTargets", {
        name: `${MODULENAME}.SETTINGS.addUserTargets.name`,
        hint: `${MODULENAME}.SETTINGS.addUserTargets.hint`,
        restricted: true,
        editable: [],
        onDown: () => {
            const map = game.users
                .filter((user) => !user.isGM)
                .map((user) => {
                    return { label: user.name, key: user.id };
                });

            let content = `<div style="display: flex; line-height: 2rem;">
        <label style="flex-grow: 1;" for="dialogUserId">User</label>
        <select style="height: 2rem;" id="dialogUserId">`;
            for (const { key, label } of map) {
                content += `<option value="${key}">${label}</option>`;
            }
            content += `</div></select>`;

            foundry.applications.api.DialogV2.wait({
                window: { title: game.i18n.localize(`${MODULENAME}.SETTINGS.addUserTargets.title`) },
                content,
                buttons: [
                    {
                        icon: '<i class="fa-solid fa-users"></i>',
                        label: game.i18n.localize(`${MODULENAME}.SETTINGS.addUserTargets.addFor`),
                        action: "addFor",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        callback: async (_event: Event, _button: HTMLButtonElement, dialog: any) => {
                            const targets = Array.from(canvas.tokens?.controlled ?? []).concat(
                                canvas.tokens?.placeables.filter((it) => it.mouseInteractionManager.state === 1) ?? [],
                            );
                            const user: User | undefined = game.users?.find(
                                (u) =>
                                    u.id ===
                                    // @ts-expect-error TODO Fix typing
                                    (dialog.element.querySelector<HTMLSelectElement>("#dialogUserId")?.value ?? ""),
                            );
                            if (game.user?.isGM && targets && user) {
                                for (const t of targets) {
                                    t.setTarget(true, { user: user, releaseOthers: false });
                                    user.targets.add(t);
                                }
                            }
                        },
                    },
                    {
                        icon: '<i class="fa-solid fa-users-slash"></i>',
                        label: game.i18n.localize(`${MODULENAME}.SETTINGS.addUserTargets.clearFor`),
                        action: "clearFor",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        callback: async (_event: Event, _button: HTMLButtonElement, dialog: any) => {
                            const user: User | undefined = game.users?.find(
                                (u) =>
                                    u.id ===
                                    // @ts-expect-error TODO Fix typing
                                    (dialog.element.querySelector<HTMLSelectElement>("#dialogUserId")?.value ?? ""),
                            );
                            if (game.user?.isGM && user) {
                                const targets = user.targets;
                                for (const t of targets) {
                                    t.setTarget(false, { user: user, releaseOthers: false });
                                }
                            }
                        },
                    },
                ],
                // @ts-expect-error TODO Fix typing
                default: "addFor",
                rejectClose: false,
            });
            return true;
        },
    });

    keybindings.register(MODULENAME, "heroPointHandler", {
        name: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandlerKey.name`),
        hint: game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandlerKey.hint`),
        restricted: true,
        onDown: () => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "heroPointHandler")) {
                handleAsync(
                    heroPointHandler(calcRemainingMinutes(false) > 0 ? HPHState.Check : HPHState.Start),
                    "heroPointHandler",
                );
            }
            return true;
        },
    });

    // Move combatant
    keybindings.register(MODULENAME, "moveBeforeCurrentCombatantKey", {
        name: game.i18n.localize(`${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.name`),
        hint: game.i18n.localize(`${MODULENAME}.SETTINGS.moveBeforeCurrentCombatantKey.hint`),
        restricted: true,
        onDown: () => {
            if (game.user?.isGM) {
                const combatantByToken: Combatant | undefined = game?.combat?.getCombatantsByToken(
                    <string>canvas?.tokens?.controlled[0].id,
                )[0];
                if (combatantByToken) {
                    handleAsync(moveSelectedAheadOfCurrent(combatantByToken.id), "moveSelectedAheadOfCurrent");
                }
            }
            return true;
        },
    });

    // Mystification
    keybindings.register(MODULENAME, "npcMystifierMystifyKey", {
        name: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierMystifyKey.name`),
        hint: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierMystifyKey.hint`),
        restricted: true,
        editable: [{ key: "KeyM", modifiers: ["Shift"] }],
        onDown: () => {
            if (game.settings.get(MODULENAME, "npcMystifier")) {
                if (canMystify()) {
                    for (const token of canvas?.tokens?.controlled ?? []) {
                        handleAsync(doMystification(token?.document, isTokenMystified(token)), "doMystification");
                    }
                } else {
                    ui.notifications?.warn(game.i18n.localize(`${MODULENAME}.SETTINGS.notifications.cantMystify`));
                }
                return true;
            }
            return false;
        },
        reservedModifiers: [],
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
    });

    // Macro keybinds
    for (let page = 1; page <= 5; page++) {
        for (let column = 1; column <= 10; column++) {
            keybindings.register(MODULENAME, `callHotbarPage${page}Macro${column}`, {
                name: `Call hotbar macro on page ${page} position ${column}`,
                hint: `Call hotbar macro on page ${page} position ${column}`,
                restricted: false,
                onDown: () => {
                    game.user?.getHotbarMacros(page)?.[column - 1]["macro"].execute();
                    return true;
                },
            });
        }
    }
}
