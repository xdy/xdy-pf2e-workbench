import { MODULENAME } from "../../xdy-pf2e-workbench.js";

async function increaseFocusPoints(actor, value) {
    const focus = actor.system.resources.focus;
    const current = focus.value;
    const result = Math.min(current + value, focus.max);
    await actor.update({ "system.resources.focus.value": result });
    await ChatMessage.create({
        style: CONST.CHAT_MESSAGE_STYLES.EMOTE,
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
export async function refocus(actors: any = canvas.tokens.controlled.map((token) => token.actor) ?? []) {
    if (actors.length === 1) {
        const actor = canvas.tokens.controlled[0].actor;
        let regain = 1;
        if (actor) {
            // @ts-ignore
            const feats = actor.feats?.map((x) => x.feats).flat();
            if (
                feats?.find((i) => {
                    return [
                        "bloodline-focus",
                        "bonded-focus",
                        "conflux-focus",
                        "devoted-focus",
                        "domain-focus",
                        "hex-focus",
                        "inspirational-focus",
                        "link-focus",
                        "meditative-focus",
                        "primal-focus",
                        "wardens-focus",
                    ].includes(i.feat?.system?.slug);
                })
            ) {
                regain = actor.system["resources"].focus.max;
            }
            increaseFocusPoints(actor, regain);
        }
    } else {
        ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.refocus.selectOneActor`));
    }
}

// refocus();
