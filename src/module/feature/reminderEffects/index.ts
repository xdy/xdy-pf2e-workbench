import { ChatMessagePF2e } from "@module/chat-message";
import { shouldIHandleThisMessage } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { TokenDocumentPF2e } from "@scene";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    if (
        message.data.content &&
        game.combats &&
        game.combats.active &&
        game.combats.active.combatant &&
        game.combats.active.combatant.token &&
        shouldIHandleThisMessage(message, true, true)
    ) {
        // const token = game.combats.active.combatant.token;
        const token: TokenDocumentPF2e = <TokenDocumentPF2e>(
            canvas?.scene?.tokens.get(<string>message.data.speaker.token)
        );

        const prefix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.prefix`);
        const postfix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.postfix`);
        const matcher = `.*${prefix}.*1d([46])${postfix}.*`;
        const match = message.data.content.match(matcher);
        const matchString = match ? `1d${match[1]}` : "";

        if (matchString) {
            const effect = {
                type: "effect",
                name: "Breath",
                img: "systems/pf2e/icons/spells/dragon-breath.webp",
                data: {
                    tokenIcon: {
                        show: true,
                    },
                    duration: {
                        value: 1,
                        unit: "rounds",
                        sustained: false,
                        expiry: "turn-start",
                    },
                },
            };

            effect.data.duration.value = new Roll(matchString).roll({ async: false }).total + 1;
            const title = message.data.content.match(/.*title="(.*?)" width.*/);
            effect.name =
                game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                (title ? title[1] : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`));
            // @ts-ignore
            await token.actor?.createEmbeddedDocuments("Item", [effect]);
        }
    }
}
