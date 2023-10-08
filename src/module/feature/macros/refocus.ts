import { MODULENAME } from "../../xdy-pf2e-workbench.js";

async function increaseFocusPoints(actor, value) {
    const focus = actor.system.resources.focus;
    const max = focus.max;
    const current = focus.value;
    if (!max || current >= max) return;
    const result = Math.min(current + value, focus.max);
    await actor.update({ "data.resources.focus.value": result });
    await ChatMessage.create({
        type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
        speaker: ChatMessage.getSpeaker(actor),
        flavor: '<strong><img src="systems/pf2e/icons/actions/Passive.webp" width="10" height="10" style="border: 0; margin-right: 3px;" alt="Passive">Refocus</strong>',
        content: game.i18n.format(`${MODULENAME}.macros.refocus.regains`, { focus: result - current }),
    });
}

/**
 * Executes the "refocus" action.
 *
 * @return {Promise<void>} - A promise that resolves when the action is complete.
 */
export async function refocus() {
    const selected = canvas.tokens.controlled.map((token) => token.actor) ?? [];

    if (selected.length === 1) {
        const actor = canvas.tokens.controlled[0].actor;
        let regain = 1;
        let isPsychic = false;
        if (actor) {
            // @ts-ignore
            const feats = actor.feats.map((x) => x.feats).flat();
            if (
                feats?.find((i) => {
                    return [
                        "bloodline-focus",
                        "bonded-focus",
                        "conflux-focus",
                        "crimson-oath-devotion",
                        "devoted-focus",
                        "domain-focus",
                        "hex-focus",
                        "inspirational-focus",
                        "link-focus",
                        "major-curse",
                        "meditative-focus",
                        "primal-focus",
                        "wardens-focus",
                    ].includes(i.feat?.system?.slug);
                })
            ) {
                regain = actor.system["resources"].focus.max;
            }
            if (
                feats?.find((i) => {
                    return ["psychic-spellcasting"].includes(i.feat?.system?.slug);
                })
            ) {
                regain = 2;
                isPsychic = true;
            }
            const details = isPsychic
                ? game.i18n.localize(`${MODULENAME}.macros.refocus.isPsychic`)
                : game.i18n.format(`${MODULENAME}.macros.refocus.notPsychic`, { regain: regain });

            const dialog = new Dialog({
                title: "Refocus",
                buttons: {
                    one: {
                        label: game.i18n.localize(`${MODULENAME}.macros.refocus.regainOne`),
                        callback: () => increaseFocusPoints(actor, 1),
                    },
                    more: {
                        // @ts-ignore
                        disabled: regain === 1,
                        label:
                            regain === 1
                                ? game.i18n.localize(`${MODULENAME}.macros.refocus.disabled`)
                                : game.i18n.format(`${MODULENAME}.macros.refocus.enabled`, {
                                      regain: regain,
                                      details: details,
                                  }),
                        callback: () => increaseFocusPoints(actor, regain),
                    },
                },
                default: game.i18n.localize(`${MODULENAME}.macros.refocus.one`),
            });
            dialog.render(true);
        }
    } else {
        ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.refocus.selectOneActor`));
    }
}

// refocus();
