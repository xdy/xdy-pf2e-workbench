import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { isActuallyDamageRoll, NOT_MYSTIFIED_VALUE } from "../../utils.js";
import { ChatMessagePF2e, CreaturePF2e, PhysicalItemPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";

export function chatCardDescriptionCollapse(html: HTMLElement): void {
    if (!(html instanceof HTMLElement)) {
        return;
    }

    const hasCardContent = html.querySelectorAll(".card-content:not(span.flavor-text *)");
    if (hasCardContent.length > 0) {
        const effectItem = game.i18n.localize(`${MODULENAME}.effectItem`);
        if (String(game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) === "collapsedDefault") {
            // @ts-expect-error TODO fix
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
        // @ts-expect-error TODO fix
        note.style.display = note.style.display === "none" ? "block" : "none";
    }
    toggleEyes(html);
}

export function chatActionCardDescriptionCollapse(html: HTMLElement): void {
    const hasAction = html.querySelectorAll(".action");
    if (hasAction.length > 0) {
        const rollNotes = html.querySelectorAll(".roll-note");
        if (rollNotes.length > 0) {
            if (String(game.settings.get(MODULENAME, "autoCollapseItemActionChatCardContent")) === "collapsedDefault") {
                for (const note of Array.from(rollNotes)) {
                    // @ts-expect-error TODO fix
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

export function chatAttackCardDescriptionCollapse(html: HTMLElement): void {
    const hasRollNote = html.querySelectorAll(".roll-note");
    if (hasRollNote.length > 0) {
        if (String(game.settings.get(MODULENAME, "autoCollapseItemAttackChatCardContent")) === "collapsedDefault") {
            for (const note of hasRollNote) {
                (note as HTMLElement).style.display = "none";
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

export function damageCardExpand(message: ChatMessagePF2e, html: HTMLElement, expandDmg: string): void {
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

const RARITY_THRESHOLD_SUFFIXES = {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    unique: "Unique",
} as const;

type RarityKey = keyof typeof RARITY_THRESHOLD_SUFFIXES;
const RARITY_KEYS: RarityKey[] = ["common", "uncommon", "rare", "unique"];

function getThresholdSettingKey(rarity: RarityKey, usingPartyLevel: boolean): `mystifyThreshold${string}${string}` {
    const suffix = usingPartyLevel ? "Pl" : "Abs";
    return `mystifyThreshold${RARITY_THRESHOLD_SUFFIXES[rarity]}${suffix}`;
}

const PHYSICAL_ITEM_TYPES = new Set([
    "armor",
    "shield",
    "consumable",
    "backpack",
    "book",
    "equipment",
    "treasure",
    "weapon",
]);

/**
 * Mystify NPC items using per-rarity level thresholds.
 *
 * Thresholds are read from settings (or passed as override). When usingPartyLevel is true, thresholds are
 * offsets from party level; when false, they are absolute item levels.
 * Unique items with threshold -1 are always mystified.
 *
 * @param actor - The NPC actor whose items to mystify.
 * @param usingPartyLevel - Whether thresholds are party-level offsets. Defaults to the setting.
 * @param thresholds - Optional per-rarity threshold overrides. Defaults to settings.
 */
export async function mystifyNpcItemsByRarity(
    actor: CreaturePF2e<TokenDocumentPF2e<ScenePF2e | null> | null>,
    usingPartyLevel: boolean = Boolean(
        game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel"),
    ),
    thresholds: Partial<Record<string, number>> = {},
): Promise<void> {
    if (!actor?.items) {
        return;
    }

    const baseLevel = usingPartyLevel ? (game.actors?.party?.level ?? 0) : 0;

    const resolvedThresholds: Record<string, number> = {};
    for (const rarity of RARITY_KEYS) {
        resolvedThresholds[rarity] =
            thresholds[rarity] ??
            Number.parseInt(String(game.settings.get(MODULENAME, getThresholdSettingKey(rarity, usingPartyLevel))));
    }

    const itemUpdates: {
        _id: string;
        "system.identification.status": string;
        "system.identification.unidentified": unknown;
    }[] = [];

    for (const item of actor.items) {
        if (!PHYSICAL_ITEM_TYPES.has(item.type)) continue;

        const physicalItem = item as unknown as PhysicalItemPF2e;
        if (
            !physicalItem.isIdentified ||
            physicalItem.isTemporary ||
            !(physicalItem.isMagical || physicalItem.isAlchemical)
        )
            continue;

        const threshold = resolvedThresholds[physicalItem.rarity];
        if (threshold === undefined || threshold === Number(NOT_MYSTIFIED_VALUE)) continue;

        const effectiveThreshold = baseLevel + threshold;
        if (physicalItem.level < effectiveThreshold) continue;

        itemUpdates.push({
            _id: item.id,
            "system.identification.status": "unidentified",
            "system.identification.unidentified": physicalItem.getMystifiedData("unidentified"),
        });
    }

    if (itemUpdates.length > 0) {
        await actor.updateEmbeddedDocuments("Item", itemUpdates);
    }
}

/**
 * @deprecated Use {@link mystifyNpcItemsByRarity} instead. This wrapper converts the old
 * minimumRarity/minimumLevel/multiplier parameters to per-rarity thresholds for backward compatibility.
 */
export async function mystifyNpcItems(
    actor: CreaturePF2e<TokenDocumentPF2e<ScenePF2e | null> | null>,
    minimumRarity: string = String(
        game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisRarityOrGreater") ?? "common",
    ),
    usingPartyLevel: boolean = Boolean(
        game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel"),
    ),
    minimumLevel: number = Number.parseInt(
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater")),
    ) ?? -1,
    multiplier: number = Number.parseFloat(
        String(game.settings.get(MODULENAME, "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterMultiplier")),
    ),
): Promise<void> {
    if (usingPartyLevel) {
        minimumLevel = game.actors?.party?.level ?? minimumLevel;
    }
    if (multiplier !== 1 && minimumLevel !== -1) {
        minimumLevel = minimumLevel * multiplier;
    }

    const rarityKeys = Object.keys(CONFIG.PF2E.rarityTraits);
    const minimumRarityIndex = rarityKeys.indexOf(minimumRarity);

    // Convert legacy params to per-rarity thresholds
    const derivedThresholds: Record<string, number> = {};
    for (const rarity of RARITY_KEYS) {
        const rarityIndex = rarityKeys.indexOf(rarity);
        if (rarityIndex >= minimumRarityIndex) {
            derivedThresholds[rarity] = minimumLevel;
        }
    }

    return mystifyNpcItemsByRarity(actor, usingPartyLevel, derivedThresholds);
}
