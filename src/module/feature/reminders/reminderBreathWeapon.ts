// import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
// import { isFirstGM, myRandomId } from "../../utils.js";
// import { TokenDocumentPF2e } from "@scene/index.js";

export async function reminderBreathWeapon(_message: ChatMessagePF2e) {
    // TODO Fix
    // const messageContent = message.content;
    // const activeCombatAvailable = isFirstGM() && messageContent && game.combats && game.combats.active;
    //
    // if (activeCombatAvailable) {
    //     const token: TokenDocumentPF2e = getSpeakerToken(message);
    //     const activeActor = token?.actor;
    //
    //     if (activeActor) {
    //         const diceFormulaMatch = retrieveDiceFormulaMatch(messageContent);
    //         const diceValue = diceFormulaMatch ? `1d${diceFormulaMatch[1]}` : "";
    //
    //         if (diceValue) {
    //             const effectDetails = getEffectDetails(activeActor, messageContent, diceValue);
    //             await activeActor?.createEmbeddedDocuments("Item", [effectDetails]);
    //         }
    //     }
    // }
}

// function getSpeakerToken(message: ChatMessagePF2e): TokenDocumentPF2e {
//     return <TokenDocumentPF2e>canvas?.scene?.tokens.get(<string>message.speaker.token);
// }
//
// function retrieveDiceFormulaMatch(messageContent: string): RegExpMatchArray | null {
//     // The last one is to support the current format in some third party products.
//     return messageContent.match(/1d([46])( rounds| recharge|<\/a> rounds)/i);
// }
//
// function getEffectDetails(activeActor, messageContent: string, diceValue: string) {
//     const titleRetrieved = messageContent.match(/>(.*?) <span class="action-glyph"/);
//
//     return {
//         type: "effect",
//         name: getEffectName(titleRetrieved),
//         img: "systems/pf2e/icons/spells/dragon-breath.webp",
//         system: getSystemProperties(activeActor, diceValue),
//     };
// }
//
// function getEffectName(titleRetrieved: RegExpMatchArray | null): string {
//     if (titleRetrieved) {
//         return game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) + titleRetrieved[1];
//     } else {
//         return (
//             game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
//             game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`)
//         );
//     }
// }
//
// function getSystemProperties(activeActor, diceValue: string) {
//     return {
//         tokenIcon: { show: true },
//         duration: getDurationProperties(diceValue),
//         description: {
//             value: `<h2>${game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.name`)}</h2>`,
//         },
//         source: {
//             value: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`),
//         },
//         rules: [],
//         slug: `xdy-breath-weapon-reminder-${myRandomId()}`,
//         unidentified: getUnidentifiedProperty(activeActor),
//         traits: {
//             value: [],
//         },
//         level: {
//             value: activeActor.level ?? 0,
//         },
//         badge: null,
//         context: null,
//     };
// }
//
// async function getDurationProperties(diceValue: string) {
//     const roll = await new Roll(diceValue).roll();
//     return {
//         value: roll.total + 1,
//         unit: "rounds",
//         sustained: false,
//         expiry: "turn-start",
//     };
// }
//
// function getUnidentifiedProperty(activeActor) {
//     return (
//         game.settings.get(MODULENAME, "reminderBreathWeaponHidden") &&
//         !game.actors?.party?.members.map((m) => m.id).includes(activeActor.id)
//     );
// }
