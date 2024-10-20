import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { isActuallyDamageRoll } from "../../utils.js";
import { PhysicalItemPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message/index.js";

export function chatCardDescriptionCollapse(html: HTMLElement) {
    const hasCardContent = html.querySelectorAll(".card-content:not(span.flavor-text *)");
    if (hasCardContent.length > 0) {
        const effectItem = game.i18n.localize(`${MODULENAME}.effectItem`);
        if (String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) === "collapsedDefault") {
            hasCardContent.forEach((content) => (content["style"].display = "none"));
            const cardContentSiblings = (hasCardContent[0] as HTMLElement).parentElement?.children;
            if (cardContentSiblings?.[0]) {
                cardContentSiblings[0].insertAdjacentHTML("beforeend", eye);
            }
            if (game.settings.get(MODULENAME, "autoCollapseItemChatCardMoveEffectLinks")) {
                const linksToMove: any[] = [];
                const pTags = Array.from(html.getElementsByTagName("p"));
                for (const pTag of pTags) {
                    const contentLink = pTag.querySelector("a.content-link");
                    if (contentLink && contentLink?.getAttribute("data-tooltip")?.includes(effectItem)) {
                        linksToMove.push(pTag);
                    }
                }

                const chatMessageContainer = html.closest(".chat-message");
                if (chatMessageContainer && linksToMove.length > 0) {
                    linksToMove[0].classList.add("item-block-line");
                    // Append all linksToMove to the end of the chatMessageContainer
                    chatMessageContainer.append(...linksToMove);
                }
            }
        }

        // Add listener for hide/unhide click
        const header = html.querySelector(".card-header");
        if (header instanceof HTMLElement) {
            header.addEventListener("click", (event) => {
                event.preventDefault();
                header
                    .closest(".chat-message")
                    ?.querySelectorAll(".card-content")
                    ?.forEach((content) => {
                        if (content instanceof HTMLElement)
                            content.style.display = content.style.display === "none" ? "block" : "none";
                    });
                toggleEyes(header);
            });
        }
    }
}

function toggleEyes(html: HTMLElement) {
    const hasEye = html.querySelectorAll(".fa-eye");
    const hasEyeSlash = html.querySelectorAll(".fa-eye-slash");
    for (const eye of Array.from(hasEye)) {
        eye.classList.toggle("fa-eye-slash");
        eye.classList.toggle("fa-eye");
    }
    for (const eye of Array.from(hasEyeSlash)) {
        eye.classList.toggle("fa-eye-slash");
        eye.classList.toggle("fa-eye");
    }
}

function handleRollNoteToggling(html: HTMLElement) {
    let note;
    const hasNote = html.querySelectorAll(".roll-note");
    for (note of Array.from(hasNote)) {
        note.style.display = note.style.display === "none" ? "block" : "none";
    }
    toggleEyes(html);
}

export function chatActionCardDescriptionCollapse(html: HTMLElement) {
    const hasAction = html.querySelectorAll(".action");
    if (hasAction.length > 0) {
        const rollNotes = html.querySelectorAll(".roll-note");
        if (rollNotes.length > 0) {
            if (String(game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent")) === "collapsedDefault") {
                for (const note of Array.from(rollNotes)) {
                    note["style"].display = "none";
                }

                const actionSiblings = (hasAction[0] as HTMLElement).parentElement?.children;
                if (actionSiblings?.[1]) {
                    actionSiblings[1].insertAdjacentHTML("beforeend", eye);
                }
            }
            html.addEventListener("click", (event) => {
                const target = event.target as HTMLElement;
                if (target?.matches("h4.action, .fa-eye, .fa-eye-slash, strong")) {
                    event.preventDefault();
                    handleRollNoteToggling(html);
                }
            });
        }
    }
}

const eye = ' <i style="font-size: small; max-width: min-content" class="fa-solid fa-eye-slash">';

export function chatAttackCardDescriptionCollapse(html: HTMLElement) {
    const hasRollNote = html.querySelectorAll(".roll-note");
    if (hasRollNote.length > 0) {
        if (String(game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent")) === "collapsedDefault") {
            for (const note of hasRollNote) {
                note["style"].display = "none";
            }

            hasRollNote[0].parentNode?.parentNode?.children[0].insertAdjacentHTML("beforeend", eye);
        }
        html.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            if (target.matches("h4.action, .fa-eye, .fa-eye-slash, strong")) {
                event.preventDefault();
                handleRollNoteToggling(html);
            }
        });
    }
}

export function damageCardExpand(message: ChatMessagePF2e, html: HTMLElement, expandDmg: string) {
    const diceTooltips = html.querySelectorAll(".dice-tooltip");
    if (expandDmg === "expandedAll") {
        diceTooltips.forEach((diceTooltip: HTMLElement) => (diceTooltip.style.display = "block"));
    } else if (
        expandDmg.startsWith("expandedNew") &&
        game.messages.contents
            .filter(isActuallyDamageRoll)
            .slice(-Math.min(expandDmg.endsWith("est") ? 1 : 3, game.messages.size))
            .filter((m) => m.id === message.id).length > 0
    ) {
        diceTooltips.forEach((diceTooltip: HTMLElement) => (diceTooltip.style.display = "block"));
    }
}

/**
 * Mystify NPC items.
 *
 * @param actor
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
    if (!actor || !actor.items) {
        return;
    }
    const relevantItems: PhysicalItemPF2e[] = <PhysicalItemPF2e[]>Array.from(
        actor.items
            ?.filter((item) =>
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
