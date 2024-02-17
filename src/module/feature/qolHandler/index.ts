import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { isActuallyDamageRoll } from "../../utils.js";
import { PhysicalItemPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message/index.js";

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
    actor,
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
            game?.actors?.party?.level ?? minimumLevel,
        );
    }
    if (multiplier !== 1 && minimumLevel !== -1) {
        minimumLevel = minimumLevel * multiplier;
    }
    const itemUpdates: any[] = [];
    const rarityKeys = Object.keys(CONFIG.PF2E.rarityTraits);
    const relevantItems: PhysicalItemPF2e[] = <PhysicalItemPF2e[]>Array.from(
        actor.items
            .filter((item) =>
                // Rollup couldn't resolve PHYSICAL_ITEM_TYPES so I copied the values
                ["armor", "shield", "consumable", "backpack", "book", "equipment", "treasure", "weapon"].includes(
                    item.type,
                ),
            )
            .map((item) => <PhysicalItemPF2e>(<unknown>item))
            .filter((item) => item.isIdentified)
            .filter((item) => !item.isTemporary)
            .filter((item) => item.level >= minimumLevel)
            .filter((item) => rarityKeys.indexOf(item.rarity) >= rarityKeys.indexOf(minimumRarity))
            .filter((item) => item.isMagical || item.isAlchemical),
    );

    for (const item of relevantItems ?? []) {
        itemUpdates.push({
            _id: item.id,
            "system.identification.status": "unidentified",
            "system.identification.unidentified": item.getMystifiedData("unidentified"),
        });
    }
    await actor.updateEmbeddedDocuments("Item", itemUpdates);
}
