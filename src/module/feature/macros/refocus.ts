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
        let regain = 1;
        let isPsychic = false;
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
                regain += 1;
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
                regain += 1;
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
                ? `spent Focus Points only to amp psi cantrips or fuel psychic abilities`
                : `spent at least ${regain} focus points`;

            const dialog = new Dialog({
                title: "Refocus",
                buttons: {
                    one: {
                        label: "Regain 1 focus point.",
                        callback: () => increaseFocusPoints(actor, 1),
                    },
                    more: {
                        // @ts-ignore
                        disabled: regain === 1,
                        label:
                            regain === 1
                                ? "Disabled due to no ability to regain more than 1 focus point."
                                : `Regain ${regain} focus points.<br/>Click <b>ONLY</b> if you have ${details} since last Refocus.`,
                        callback: () => increaseFocusPoints(actor, regain),
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
