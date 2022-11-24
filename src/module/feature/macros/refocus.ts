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
        content: `Regains ${result - current} focus points.`,
    });
}

export async function refocus() {
    const selected = canvas.tokens.controlled.map((token) => token.actor) ?? [];

    if (selected.length === 1) {
        const actor = canvas.tokens.controlled[0].actor;
        let value = 1;
        if (actor) {
            // @ts-ignore
            const feats = actor.feats.map((x) => x.feats).flat();
            if (
                feats?.find((i) => {
                    return [
                        "bloodline-focus",
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
                value += 1;
            }
            if (
                feats?.find((i) => {
                    return [
                        "bloodline-wellspring",
                        "conflux-wellspring",
                        "domain-wellspring",
                        "hex-wellspring",
                        "link-wellspring",
                        "meditative-wellspring",
                        "primal-wellspring",
                        "wardens-wellspring",
                    ].includes(i.feat?.system?.slug);
                })
            ) {
                value += 1;
            }
            const dialog = new Dialog({
                title: "Refocus",
                buttons: {
                    one: {
                        label: "Regain 1 focus point.",
                        callback: () => increaseFocusPoints(actor, 1),
                    },
                    more: {
                        // @ts-ignore
                        disabled: value === 1,
                        label: `Regain ${value} focus points.<br/>Click <b>ONLY</b> if you have spent at least ${value} focus points since last Refocuse.`,
                        callback: () => increaseFocusPoints(actor, value),
                    },
                },
                default: "one",
            });
            dialog.render(true);
        }
    } else {
        ui.notifications.warn("You must select one actor.");
    }
}

// refocus();
