import { ChatMessagePF2e } from "foundry-pf2e";
import { MODULENAME } from "../../constants.ts";
import * as systems from "../../utils/systems.ts";

const lastCastingByUuid = new Map<string, ChatMessagePF2e>();

Hooks.on("createChatMessage", (message: ChatMessagePF2e) => {
    const uuid = systems.getFlag<string>(message, "origin.uuid");
    if (uuid && systems.getFlag(message, "casting")) {
        lastCastingByUuid.set(uuid, message);
    }
});

export async function hideSpellNameInDamageroll(message: ChatMessagePF2e, html: HTMLElement): Promise<void> {
    const uuid = systems.getFlag<string>(message as { flags?: Record<string, Record<string, unknown>> }, "origin.uuid");
    if (!uuid) return;

    const mostRecentCasting = lastCastingByUuid.get(uuid);
    if (!mostRecentCasting?.item || mostRecentCasting.whisper.length === 0) return;

    const flavor = html.querySelector(".flavor-text");
    if (!flavor?.innerHTML) return;

    const replacement =
        game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.aSpell`) + '<p data-visibility="gm">($&)</p>';
    flavor.innerHTML = flavor.innerHTML.replace(mostRecentCasting.item.name, replacement);
}
