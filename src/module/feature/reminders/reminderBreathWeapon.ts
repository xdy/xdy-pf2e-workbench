import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { isFirstGM, myRandomId } from "../../utils.js";
import { TokenDocumentPF2e } from "@scene/index.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    const messageContent = message.content;
    const activeCombatAvailable = isFirstGM() && messageContent && game.combats && game.combats.active;

    if (activeCombatAvailable) {
        const token: TokenDocumentPF2e = <TokenDocumentPF2e>canvas?.scene?.tokens.get(<string>message.speaker.token);
        if (token?.actor) {
            let rounds;
            if (messageContent.includes("data-tooltip") && messageContent.includes("data-roll")) {
                const regex = /<i class="fas fa-dice-d20"><\/i>(\d).* rounds/;
                const matches = messageContent.match(regex);
                if (matches && matches.length > 1) {
                    rounds = Number(matches[1]);
                }
            } else {
                let diceValue: any;
                const diceFormulaMatch = messageContent.match(/1d([46])( rounds| recharge|<\/a> rounds)/i);
                if (diceFormulaMatch && diceFormulaMatch[1]) {
                    diceValue = diceFormulaMatch[1];
                }
                const roll = await new Roll(`1d${diceValue}`).roll();
                rounds = roll.total;
            }
            if (rounds) {
                const data: any = await getEffectDetails(token.actor, messageContent, rounds);
                await token.actor?.createEmbeddedDocuments("Item", [data]);
            }
        }
    }
}

async function getEffectDetails(activeActor, messageContent: string, diceValue) {
    const titleRetrieved = messageContent.match(/>(.*?) <span class="action-glyph"/);

    return {
        type: "effect",
        name: titleRetrieved
            ? game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) + titleRetrieved[1]
            : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
              game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`),
        img: "systems/pf2e/icons/spells/dragon-breath.webp",
        system: {
            tokenIcon: { show: true },
            duration: {
                value: diceValue,
                unit: "rounds",
                sustained: false,
                expiry: "turn-start",
            },
            description: {
                value: `<h2>${game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.name`)}</h2>`,
            },
            source: {
                value: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`),
            },
            rules: [],
            slug: `xdy-breath-weapon-reminder-${myRandomId()}`,
            unidentified:
                game.settings.get(MODULENAME, "reminderBreathWeaponHidden") &&
                !game.actors?.party?.members.map((m) => m.id).includes(activeActor.id),
            traits: {
                value: [],
            },
            level: {
                value: activeActor.level ?? 0,
            },
            badge: null,
            context: null,
        },
    };
}
