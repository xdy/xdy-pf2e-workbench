import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { isActuallyDamageRoll } from "../../utils.js";
import { ChatMessagePF2e, PhysicalItemPF2e } from "foundry-pf2e";

export function chatCardDescriptionCollapse(html: HTMLElement) {
    if (!(html instanceof HTMLElement)) {
        return;
    }

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

// Cache for recent damage messages to avoid filtering all messages repeatedly
const recentDamageMessages = new Set<string>();
const MAX_RECENT_MESSAGES = 10;

// Update recent damage messages when a new message is created
Hooks.on("createChatMessage", (message: ChatMessagePF2e) => {
    if (isActuallyDamageRoll(message)) {
        // Add to recent damage messages
        recentDamageMessages.add(message.id);

        // Keep only the most recent messages
        if (recentDamageMessages.size > MAX_RECENT_MESSAGES) {
            const toRemove = Array.from(recentDamageMessages)[0];
            recentDamageMessages.delete(toRemove);
        }
    }
});

export function damageCardExpand(message: ChatMessagePF2e, html: HTMLElement, expandDmg: string) {
    const diceTooltips = html.querySelectorAll(".dice-tooltip");

    // If no dice tooltips, nothing to do
    if (diceTooltips.length === 0) return;

    // Always expand if setting is "expandedAll"
    if (expandDmg === "expandedAll") {
        diceTooltips.forEach((diceTooltip: HTMLElement) => (diceTooltip.style.display = "block"));
        return;
    }

    // For "expandedNew" settings, check if this message is in the recent damage messages
    if (expandDmg.startsWith("expandedNew")) {
        // For "expandedNewest", only expand the most recent message
        if (expandDmg.endsWith("est")) {
            // Get the most recent damage message
            const mostRecentMessage = Array.from(recentDamageMessages).pop();
            if (message.id === mostRecentMessage) {
                diceTooltips.forEach((diceTooltip: HTMLElement) => (diceTooltip.style.display = "block"));
            }
        } else {
            // For "expandedNew", expand if message is in recent damage messages
            if (recentDamageMessages.has(message.id)) {
                diceTooltips.forEach((diceTooltip: HTMLElement) => (diceTooltip.style.display = "block"));
            }
        }
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
