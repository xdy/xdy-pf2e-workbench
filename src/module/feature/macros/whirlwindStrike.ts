import { MODULENAME } from "../../xdy-pf2e-workbench";
import { WeaponPF2e } from "@item";

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
    const heldWeapons =
        _token.actor?.system?.actions
            .filter((w) => w.item.type === "weapon")
            .filter((w) => !w.item.system.range)
            .filter((w) => (<WeaponPF2e>w.item).isHeld) || [];

    const weapon =
        heldWeapons?.find((w) => w.item.system?.traits.value.includes("reach")) || heldWeapons.length > 0
            ? heldWeapons[0]
            : null;
    // @ts-ignore
    const targets = canvas.tokens.objects.children
        .filter((t) => validTarget(t.bounds, aura.bounds))
        .filter((t) => !t.actor.isDead)
        .filter((t) => t.isVisible)
        .filter((t) => t.document.disposition === -1)
        .filter((t) => t.id !== _token.id);
    const canWhirlwind =
        _token &&
        _token.actor &&
        _token.actor.items &&
        _token.actor.items.find((feat) => feat.slug === "whirlwind-strike") &&
        aura &&
        weapon &&
        targets &&
        targets.length > 0;
    if (canWhirlwind) {
        await ChatMessage.create({
            content: game.i18n.format(`${MODULENAME}.macros.whirlwindStrike.starts`, { name: _token.name }),
        });
        for (let atk = 0; atk < targets.length; atk++) {
            const target = targets[atk];
            game.user.targets.clear();
            game.user.targets.add(target);
            await weapon?.attack();
            if (msToSleepBetweenAttacks > 0) {
                await new Promise((resolve) => setTimeout(resolve, msToSleepBetweenAttacks));
            }
        }
        await ChatMessage.create({
            content: game.i18n.format(`${MODULENAME}.macros.whirlwindStrike.ends`, {
                name: _token.name,
                targets: targets.length,
            }),
        });
    } else {
        ui.notifications.error(game.i18n.localize(`${MODULENAME}.macros.whirlwindStrike.error`));
    }
}

// await whirlwindStrike(_token);
