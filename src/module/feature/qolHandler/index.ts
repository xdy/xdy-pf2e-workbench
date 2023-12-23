import { PhysicalItemPF2e } from "@item";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { isActuallyDamageRoll } from "../../utils.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";

export function chatCardDescriptionCollapse(html: JQuery) {
    const hasCardContent = html.find(".card-content");
    if (hasCardContent.length > 0) {
        if (String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) === "collapsedDefault") {
            hasCardContent.hide();
            hasCardContent.siblings()?.get(0)?.insertAdjacentHTML("beforeend", eye);
        }
        html.on("click", "h3", (event: JQuery.ClickEvent) => {
            const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
            if (content && content.style) {
                event.preventDefault();
                content.style.display = content.style.display === "none" ? "block" : "none";
                if (content.style.display === "none") {
                    hasCardContent.hide();
                }
                toggleEyes(html);
            }
        });
    }
}

function toggleEyes(html: JQuery) {
    const hasEye = html.find(".fa-eye");
    const hasEyeSlash = html.find(".fa-eye-slash");
    for (const eye of hasEye) {
        eye.classList.toggle("fa-eye-slash");
        eye.classList.toggle("fa-eye");
    }
    for (const eye of hasEyeSlash) {
        eye.classList.toggle("fa-eye-slash");
        eye.classList.toggle("fa-eye");
    }
}

function handleRollNoteToggling(html: JQuery) {
    let note;
    const hasNote = html.find(".roll-note");
    for (note of hasNote) {
        note.style.display = note.style.display === "none" ? "block" : "none";
    }
    toggleEyes(html);
}

export function chatActionCardDescriptionCollapse(html: JQuery) {
    const hasAction = html.find(".action");
    if (hasAction.length > 0) {
        if (html.find(".roll-note").length > 0) {
            if (String(game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent")) === "collapsedDefault") {
                for (const note of html.find(".roll-note")) {
                    note.style.display = "none";
                }

                hasAction.siblings()?.get(1)?.insertAdjacentHTML("beforeend", eye);
            }
            html.on("click", "h4.action", (event: JQuery.ClickEvent) => {
                event.preventDefault();
                handleRollNoteToggling(html);
            });
        }
    }
}

const eye = ' <i style="font-size: small; max-width: min-content" class="fa-solid fa-eye-slash">';

export function chatAttackCardDescriptionCollapse(html: JQuery) {
    const hasRollNote = html.find(".roll-note");
    if (hasRollNote.length > 0) {
        if (String(game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent")) === "collapsedDefault") {
            for (const note of hasRollNote) {
                note.style.display = "none";
            }
            hasRollNote.siblings()?.get(0)?.insertAdjacentHTML("beforeend", eye);
        }
        html.on("click", "h4.action", (event: JQuery.ClickEvent) => {
            event.preventDefault();
            handleRollNoteToggling(html);
        });
    }
}

export function damageCardExpand(message: ChatMessagePF2e, html: JQuery) {
    const expandDmg = String(game.settings.get(MODULENAME, "autoExpandDamageRolls"));
    if (expandDmg === "expandedAll") {
        html.find(".dice-tooltip").css("display", "block");
    } else if (
        expandDmg.startsWith("expandedNew") &&
        game.messages.contents
            .filter(isActuallyDamageRoll)
            .slice(-Math.min(expandDmg.endsWith("est") ? 1 : 3, game.messages.size))
            .filter((m) => m.id === message.id).length > 0
    ) {
        html.find(".dice-tooltip").css("display", "block");
    }
}

export async function castPrivateSpell(data, message: ChatMessagePF2e) {
    const spellUUID = <string>message.flags?.pf2e.origin?.uuid;
    const origin: any = await fromUuid(spellUUID);

    if (
        new Set(
            game.actors?.party?.members
                // I assume that if you have a spell item it's because it's either prepared or in your repertoire,
                ?.map((m) => m.items.filter((i) => i.isOfType("spell")))
                ?.map((s) => s.filter((i) => i.slug === origin.slug))
                .flat(),
        )?.size > 0
    ) {
        // // If a party member knows the spell casting privately is pointless
        // ChatMessage.create({
        //     content: game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.knownSpell`),
        //     whisper: message.user ? [message.user.id] : [],
        // }).then();

        return;
    }

    data.type = CONST.CHAT_MESSAGE_TYPES.WHISPER;
    data.whisper = ChatMessage.getWhisperRecipients("GM").map((u) => u.id);
    if (!game.user.isGM) {
        data.whisper.push(game.user.id);
    }
    message.updateSource(data);

    if (
        game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessage") &&
        !game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT) // TODO Doesn't work on mac?
    ) {
        let tokenName: string;
        const anonymous = game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.they`);
        if (<boolean>game.settings.get("pf2e", "metagame_tokenSetsNameVisibility")) {
            tokenName = anonymous;
        } else {
            tokenName = message.alias ?? message.token?.name ?? message.actor?.name ?? anonymous;
        }
        const type = message.flags?.pf2e.origin?.type ?? "spell";
        const traditionString = message.flags?.pf2e.casting?.tradition ?? "";

        let content = "";
        if (origin) {
            content = game.i18n.localize(
                game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.firstPart`, {
                    tokenName: tokenName,
                    type: type,
                    traditionString: traditionString,
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

            let dcRK = 0;
            const level = origin.system.level.value;
            if (level === 1) {
                dcRK = 15;
            } else if (level === 2) {
                dcRK = 18;
            } else if (level === 3) {
                dcRK = 20;
            } else if (level === 4) {
                dcRK = 23;
            } else if (level === 5) {
                dcRK = 26;
            } else if (level === 6) {
                dcRK = 28;
            } else if (level === 7) {
                dcRK = 31;
            } else if (level === 8) {
                dcRK = 34;
            } else if (level === 9) {
                dcRK = 36;
            } else if (level === 10) {
                dcRK = 39;
            }

            switch (origin.system.traits?.rarity ?? "common") {
                case "uncommon":
                    dcRK += 2;
                    break;
                case "rare":
                    dcRK += 5;
                    break;
                case "unique":
                    dcRK += 10;
                    break;
                default:
                    dcRK += 0;
            }

            const tradition = traditionString;
            let skill = "";
            if (tradition === "arcane") {
                skill = "arcana";
            } else if (tradition === "divine") {
                skill = "religion";
            } else if (tradition === "occult") {
                skill = "occultism";
            } else if (tradition === "primal") {
                skill = "nature";
            }
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
            const origin: any = await fromUuid(spellUUID);
            content += game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.savePart`, {
                dataSave: dataSave,
                dataDC: dataDC,
                traits: Object.values(origin.system.traits.value)
                    .map((trait: any) => game.pf2e.system.sluggify(trait.valueOf()))
                    .sort()
                    .join(","),
            });
        }

        const flags = {
            "xdy-pf2e-workbench": {
                privateSpell: {
                    originUuid: message.flags?.pf2e.origin?.uuid,
                },
            },
        };

        const token: any = message.token ? message.token : message.actor?.token;
        ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ token: token }),
            content: content,
            flags,
        }).then();
    }
}

export function castPrivateSpellHideName(message: ChatMessagePF2e, html: JQuery) {
    const msg = game.messages.contents
        .reverse()
        .filter((m) => m.type === CONST.CHAT_MESSAGE_TYPES.WHISPER)
        .filter((m) => m.flags?.pf2e?.casting)
        .filter((m) => m.flags?.pf2e?.origin?.uuid === message.flags?.pf2e?.origin?.uuid)
        .filter((m) => !m.whisper?.includes(game.user?.id))
        .pop();

    if (msg) {
        const flavor = html?.find(".flavor-text");
        if (flavor.html()) {
            fromUuid(<string>message.flags?.pf2e.origin?.uuid).then((origin) => {
                flavor.html(
                    flavor
                        .html()
                        .replace(
                            origin?.name ?? "???",
                            game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpell.aSpell`),
                        ),
                );
            });
        }
    }
}

/**
 * Mystify NPC items.
 *
 * @param {Array} items - The items to mystify.
 * @param {string} minimumRarity - The minimum rarity of items to mystify. Default is obtained from a game setting.
 * @param {any} usingPartyLevel - Whether to use the party level to determine the minimum level of items to mystify. Default is obtained from a game setting.
 * @param {number} minimumLevel - The minimum level of items to mystify. Default is obtained from a game setting.
 * @param {number} multiplier - The multiplier to apply to the minimum level. Default is obtained from a game setting.
 */
export async function mystifyNpcItems(
    items,
    minimumRarity: string = String(
        game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisRarityOrGreater"),
    ),
    usingPartyLevel: any = game.settings.get(
        MODULENAME,
        "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel",
    ),
    minimumLevel: number = Number.parseInt(
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater")),
    ) ?? -1,
    multiplier: number = Number.parseFloat(
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterMultiplier")),
    ),
) {
    // Kind of ugly, but, feeling lazy...
    if (usingPartyLevel) {
        game.settings.set(
            MODULENAME,
            "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater",
            game?.actors?.party?.level ??
                game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater"),
        );
    }
    if (multiplier !== 1 && minimumLevel !== -1) {
        minimumLevel = minimumLevel * multiplier;
    }
    const rarityKeys = Object.keys(CONFIG.PF2E.rarityTraits);
    const relevantItems: PhysicalItemPF2e[] = <PhysicalItemPF2e[]>Array.from(
        items
            .filter((item) =>
                ["armor", "backpack", "book", "consumable", "equipment", "treasure", "weapon"].includes(item.type),
            )
            .map((item) => <PhysicalItemPF2e>(<unknown>item))
            .filter((item) => !item.isTemporary)
            .filter((item) => item.isIdentified)
            .filter((item) => item.level >= minimumLevel)
            .filter((item) => {
                return rarityKeys.indexOf(item.rarity) >= rarityKeys.indexOf(minimumRarity);
            })
            .filter((item) => item.isMagical || item.isAlchemical),
    );

    for (const item of relevantItems ?? []) {
        await items.get(item.id)?.update({
            "system.identification.status": "unidentified",
            "system.identification.unidentified": item.getMystifiedData("unidentified"),
        });
    }
}
