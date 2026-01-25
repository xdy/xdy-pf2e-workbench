import { ChatMessagePF2e, SpellPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import * as systems from "../../../utils/systems.js";

export async function handlePrivateSpellcasting(data: any, message: ChatMessagePF2e) {
    const spellUUID = <string>systems.getFlag(message, "origin.uuid");
    const origin: any = fromUuidSync(spellUUID);

    const partyMembersWithSpell = findPartyMembersWithSpell(origin);

    if (isAutoRevealActive() && partyMembersWithSpell && partyMembersWithSpell.length > 0) {
        if (game.settings.get(MODULENAME, "castPrivateSpellAutoRevealPartyMembersThatKnowSpell")) {
            showPartymembersWithSpell(message, partyMembersWithSpell, data);
        }
        if (game.settings.get(MODULENAME, "castPrivateSpellAutoRevealOverrideGMRollMode")) {
            message.applyRollMode("publicroll");
        }
        return;
    }

    updateDataAndSource(data, message);

    if (isPublicMessageActive() && !isShiftModifierActive()) {
        const { content, flags } = await generateMessageData(message, origin, spellUUID, data);

        const showToGM = game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowToGM");

        const whisper = showToGM
            ? []
            : game.users
                  .filter((u) => u.active)
                  .filter((u) => u.id !== ChatMessage.getWhisperRecipients("GM").map((u) => u.id)[0])
                  .map((u) => u.id);
        const author = game.userId;
        if (whisper.length > 0) {
            await ChatMessage.create({
                whisper,
                author,
                content,
                flags,
            });
        } else {
            await ChatMessage.create({
                author,
                content,
                flags,
            });
        }
    }
}

function showPartymembersWithSpell(message, membersWithSpell, data: any) {
    const oldContent = message.content;

    // Create a temporary DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = oldContent;

    // Find the first divider
    const firstDivider = tempDiv.querySelector("hr.item-block-divider");

    if (firstDivider) {
        // Create the new content to insert
        const knownByText = game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.knownBy`, {
            spellHavers: membersWithSpell?.join(",") ?? "",
        });

        // Create a new element to hold the text
        const knownByElement = document.createElement("div");
        knownByElement.innerHTML = knownByText;

        // Insert after the divider
        firstDivider.insertAdjacentElement("afterend", knownByElement);
    }

    const newContent = tempDiv.innerHTML;

    if (newContent !== oldContent) {
        data.content = newContent;
        message.updateSource({ content: newContent });
    }
}

async function generateMessageData(message: ChatMessagePF2e, origin, spellUUID: string, data: any) {
    const anonymous = game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.they`);
    const tokenName = systems.getSystemSetting<boolean>("metagame", "tokenSetsNameVisibility")
        ? anonymous
        : (message.alias ?? message.token?.name ?? message.actor?.name ?? anonymous);

    const type = systems.getFlag<string>(message, "origin.type") ?? "spell";
    const traditionString = systems.getFlag<string>(message, "casting.tradition") ?? "";
    const isBasicSave = systems.getFlag<string[]>(message, "context.options")?.includes("item:defense:basic");
    const content = buildSpellMessage(origin, tokenName, type, traditionString, spellUUID, data, isBasicSave);

    const flags = {
        "xdy-pf2e-workbench": {
            privateSpell: {
                originUuid: systems.getFlag(message, "origin.uuid"),
                originCastRank: systems.getFlag(message, "origin.castRank"),
                originMessageUuid: message.uuid,
            },
        },
    };

    return { content, flags };
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
        ?.filter((actor) => {
            return actor?.items
                ?.filter((i) => i.slug === origin.slug)
                ?.filter((i) => i.isOfType("spell"))
                ?.filter((i) => (<SpellPF2e>(<unknown>i)).spellcasting)
                .some((item) => {
                    const spell = <SpellPF2e>(<unknown>item);
                    const entry = spell.spellcasting;

                    // @ts-ignore
                    if (!entry?.isPrepared) {
                        return true;
                    } else {
                        if (!entry?.system?.slots) {
                            return false;
                        }

                        for (const [_, group] of Object.entries(entry.system.slots)) {
                            if (group.prepared.some((s) => s.id === spell.id)) {
                                return true;
                            }
                        }

                        return false;
                    }
                });
        })
        .map((actor) => actor?.name);
}

function updateDataAndSource(data: any, message: ChatMessagePF2e): void {
    data.style = CONST.CHAT_MESSAGE_STYLES.OTHER;
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
    const keyboardManager = foundry.helpers.interaction.KeyboardManager;
    return game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.SHIFT);
}

function buildSpellMessage(
    origin,
    tokenName: string,
    type,
    traditionString: string,
    spellUUID: string,
    data,
    isBasicSave,
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
            const traits = Object.values(origin.system.traits.value);
            const blocklist = String(game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageTraitsBlocklist"))
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t);

            content += game.i18n.localize(
                game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.traitPart`, {
                    traits: traits
                        .map((trait: any) => trait.valueOf())
                        .filter((trait: string) => !blocklist.includes(trait))
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

    // Create a temporary DOM element to parse the content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data.content;

    // Find all buttons
    const buttons = tempDiv.querySelectorAll("button");

    // Filter buttons to find save buttons
    const saveButtons = Array.from(buttons).filter((button) => button.getAttribute("data-action") === "spell-save");

    const targetHelperActive = game.modules.find((s) => s.id === "pf2e-target-helper")?.active;
    if (saveButtons.length === 1) {
        const dataSave = saveButtons[0].getAttribute("data-save") ?? "";
        if (!targetHelperActive) {
            const dataDC = saveButtons[0].getAttribute("data-dc") ?? "";

            content += game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.savePart`, {
                dataSave: dataSave,
                dataDC: dataDC,
                traits: Object.values(origin.system.traits.value)
                    .map((trait: any) => game.pf2e.system.sluggify(trait.valueOf()))
                    .sort()
                    .join(","),
                basic: isBasicSave ? "|basic:true" : "",
            });
        } else {
            content += game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.noButtonSavePart`, {
                dataSave: dataSave,
                basic: isBasicSave
                    ? game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.basic`)
                    : "",
            });
        }
    }
    return content;
}

export async function hideSpellNameInDamageroll(message: ChatMessagePF2e, html: HTMLElement) {
    const uuid = systems.getFlag(message, "origin.uuid");
    if (!uuid) return;

    // Look for the most recent casting of this specific spell
    const msg = game.messages.contents.findLast(
        (m) => systems.getFlag(m, "casting") && systems.getFlag(m, "origin.uuid") === uuid,
    );
    // If we find one, check if it's a whisper and hide the spell name if it is
    if (msg && msg.item && msg.whisper.length > 0) {
        const flavor = html.querySelector(".flavor-text");
        if (flavor?.innerHTML) {
            const replaceValue =
                game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.aSpell`) +
                '<p data-visibility="gm">($&)</p>';
            flavor.innerHTML = flavor.innerHTML.replace(msg.item.name, replaceValue);
        }
    }
}

