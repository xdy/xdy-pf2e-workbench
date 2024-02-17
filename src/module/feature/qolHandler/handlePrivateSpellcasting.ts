import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export async function handlePrivateSpellcasting(data: any, message: ChatMessagePF2e) {
    const spellUUID = <string>message.flags?.pf2e.origin?.uuid;
    const origin: any = fromUuidSync(spellUUID);

    const partyMembersWithSpell = findPartyMembersWithSpell(origin);

    if (isAutoRevealActive() && partyMembersWithSpell && partyMembersWithSpell.length > 0) {
        if (game.settings.get(MODULENAME, "castPrivateSpellAutoRevealPartyMembersThatKnowSpell")) {
            showPartymembersWithSpell(message, partyMembersWithSpell, data);
        }
        return;
    }

    updateDataAndSource(data, message);

    if (isPublicMessageActive() && !isShiftModifierActive()) {
        const { content, flags, token } = await generateMessageData(message, origin, spellUUID, data);

        const showToGM = game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowToGM");

        const whisper = showToGM
            ? []
            : game.users
                  .filter((u) => u.active)
                  .filter((u) => u.id !== ChatMessage.getWhisperRecipients("GM").map((u) => u.id)[0])
                  .map((u) => u.id);
        const user = game.userId;
        if (whisper.length > 0) {
            await ChatMessage.create({
                whisper,
                user,
                speaker: ChatMessage.getSpeaker({ token: token }),
                content,
                flags,
            });
        } else {
            await ChatMessage.create({
                user,
                speaker: ChatMessage.getSpeaker({ token: token }),
                content,
                flags,
            });
        }
    }
}

function showPartymembersWithSpell(message, membersWithSpell, data: any) {
    const oldContent = message.content;
    const $editedContent = $(`<div>${oldContent}</div>`);

    $editedContent.find("hr.item-block-divider:first").after(
        game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.knownBy`, {
            spellHavers: membersWithSpell?.join(",") ?? "",
        }),
    );

    const newContent = $editedContent.html();

    if (newContent !== oldContent) {
        data.content = newContent;
        message.updateSource({ content: newContent });
    }
}

async function generateMessageData(message: ChatMessagePF2e, origin: any, spellUUID: string, data: any) {
    const anonymous = game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.they`);
    const tokenName = game.settings.get("pf2e", "metagame_tokenSetsNameVisibility")
        ? anonymous
        : message.alias ?? message.token?.name ?? message.actor?.name ?? anonymous;

    const type = message.flags?.pf2e.origin?.type ?? "spell";
    const traditionString = message.flags?.pf2e.casting?.tradition ?? "";
    const content = buildSpellMessage(origin, tokenName, type, traditionString, spellUUID, data);

    const flags = {
        "xdy-pf2e-workbench": {
            privateSpell: {
                originUuid: message.flags?.pf2e.origin?.uuid,
            },
        },
    };

    const token: any = message.token ? message.token : message.actor?.token;

    return { content, flags, token };
}

function getDcRkForLevel(level: number): number {
    const levelMapping = {
        1: 15,
        2: 18,
        3: 20,
        4: 23,
        5: 26,
        6: 28,
        7: 31,
        8: 34,
        9: 36,
        10: 39,
    };
    return levelMapping[level] ?? 0;
}

function getDcRkForRarity(rarity: string): number {
    const rarityMapping = {
        uncommon: 2,
        rare: 5,
        unique: 10,
        common: 0,
    };
    return rarityMapping[rarity] ?? 0;
}

const TRADITION_SKILLS = { arcane: "arcana", divine: "religion", occult: "occultism", primal: "nature" };

function findPartyMembersWithSpell(origin: any) {
    return game.actors?.party?.members
        ?.filter((actor) => actor.items.some((item) => item.isOfType("spell") && item.slug === origin.slug))
        .map((actor) => actor.name);
}

function updateDataAndSource(data: any, message: ChatMessagePF2e): void {
    data.type = CONST.CHAT_MESSAGE_TYPES.WHISPER;
    data.whisper = [...ChatMessage.getWhisperRecipients("GM").map((u) => u.id)];
    if (!game.user.isGM) {
        data.whisper.push(game.user.id);
    }

    message.updateSource(data);
}

function isAutoRevealActive(): boolean {
    return Boolean(game.settings.get(MODULENAME, "castPrivateSpellAutoRevealIfKnown"));
}

function isPublicMessageActive(): boolean {
    return Boolean(game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessage"));
}

function isShiftModifierActive(): boolean {
    // TODO Doesn't work on mac?
    return game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT);
}

function buildSpellMessage(
    origin: any,
    tokenName: string,
    type,
    traditionString: string,
    spellUUID: string,
    data: any,
) {
    let content = "";
    if (origin) {
        content = game.i18n.localize(
            game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.firstPart`, {
                tokenName,
                type,
                traditionString,
                spellUUID,
            }),
        );

        if (game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowTraits")) {
            content += game.i18n.localize(
                game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.traitPart`, {
                    traits: Object.values(origin.system.traits.value)
                        .map((trait: any) => trait.valueOf())
                        .sort()
                        .join(", "),
                }),
            );
        }

        const level = origin.system.level.value;
        const dcRK = getDcRkForLevel(level) + getDcRkForRarity(origin.system.traits?.rarity ?? "common");

        const skill = TRADITION_SKILLS[traditionString];

        content += game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartRK`, {
            skill: skill,
            dcRK: dcRK,
            rk: `&#123;${game.i18n.localize("PF2E.RecallKnowledge.Label")}\t&#125;`, // Grr
        });
    } else {
        content += game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartNoRK`);
    }

    const buttons = $(data.content).find("button");
    const saveButtons = buttons.filter((i) => buttons[i].getAttribute("data-action") === "spell-save");
    if (saveButtons.length === 1) {
        const dataSave = saveButtons.attr("data-save") ?? "";
        const dataDC = saveButtons.attr("data-dc") ?? "";
        const origin: any = fromUuidSync(spellUUID);
        content += game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.savePart`, {
            dataSave: dataSave,
            dataDC: dataDC,
            traits: Object.values(origin.system.traits.value)
                .map((trait: any) => game.pf2e.system.sluggify(trait.valueOf()))
                .sort()
                .join(","),
        });
    }
    return content;
}

export async function castPrivateSpellHideName(message: ChatMessagePF2e, html: HTMLElement) {
    const msg = game.messages.contents
        .reverse()
        .filter((m) => m.type === 4) // Whisper, rollup can't resolve constant
        .filter((m) => m.flags?.pf2e?.casting)
        .filter((m) => m.flags?.pf2e?.origin?.uuid === message.flags?.pf2e?.origin?.uuid)
        .pop();

    if (msg) {
        const flavor = html.querySelector(".flavor-text");
        if (flavor && flavor.innerHTML) {
            const origin = await fromUuid(<string>message.flags?.pf2e.origin?.uuid);
            const searchValue = origin?.name ?? "???";
            const replaceValue =
                game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.aSpell`) +
                `<p data-visibility="gm">(${searchValue})</p>`;
            flavor.innerHTML = flavor.innerHTML.replace(searchValue, replaceValue);
        }
    }
}
