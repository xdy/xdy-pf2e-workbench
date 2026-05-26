import { ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import * as systems from "../../utils/systems.ts";

export async function hideSpellNameInDamageroll(message: ChatMessagePF2e, html: HTMLElement): Promise<void> {
    const uuid = systems.getFlag(message, "origin.uuid");
    if (!uuid) return;

    const mostRecentCasting = game.messages.contents.findLast(
        (m) => systems.getFlag(m, "casting") && systems.getFlag(m, "origin.uuid") === uuid,
    );
    if (!mostRecentCasting?.item || mostRecentCasting.whisper.length === 0) return;

    const flavor = html.querySelector(".flavor-text");
    if (!flavor?.innerHTML) return;

    const replacement =
        game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.aSpell`) + '<p data-visibility="gm">($&)</p>';
    flavor.innerHTML = flavor.innerHTML.replace(mostRecentCasting.item.name, replacement);
}
