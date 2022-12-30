function validTarget(r1, r2) {
    return (r1.right > r2.right ? r2.right : r1.right) <= (r1.left < r2.left ? r2.left : r1.left)
        ? false
        : (r1.bottom > r2.bottom ? r2.bottom : r1.bottom) > (r1.top < r2.top ? r2.top : r1.top);
}

// TODO Allow user to select if multiple reach weapons are present (currently takes the first it finds).
// TODO Auto set the reach of the 'aura' to the reach of the weapon.
// TODO Set cover as appropriate for all targets (and unset once the strike is over) Using a ray cast from _token I guess?
// TODO Check if other feats should be covered by this, and if so, add them.
// TODO Stop using the aura, just calculate the covered area and use that. (Or, make the aura dynamically if that's easier).

export async function whirlwindStrike(_token, msToSleepBetweenAttacks = 1001) {
    const aura = _token.auras.get("xdy-workbench-reach-aura");
    const canWhirlwind =
        _token &&
        _token.actor &&
        _token.actor.items &&
        _token.actor.items.find((feat) => feat.slug === "whirlwind-strike") &&
        aura;
    if (canWhirlwind) {
        await ChatMessage.create({ content: _token.name + " Whirlwind Strike starts!" });
        const reachWeapon = _token.actor?.system?.actions.find((w) => w.item.system?.traits.value.includes("reach"));
        // @ts-ignore
        for (const target of canvas.tokens.objects.children
            .filter((t) => t.isVisible)
            .filter((token) => token.document.disposition === -1)
            .filter((token) => validTarget(token.bounds, aura.bounds))) {
            game.user.targets.clear();
            game.user.targets.add(target);
            await reachWeapon?.attack();
            if (msToSleepBetweenAttacks > 0) {
                await new Promise((resolve) => setTimeout(resolve, msToSleepBetweenAttacks));
            }
        }
        await ChatMessage.create({ content: _token.name + " Whirlwind strike ends!" });
    } else {
        ui.notifications.error("Select a token with Whirlwind Strike (and the reach 'aura')!");
    }
}

// await whirlwindStrike(_token);
