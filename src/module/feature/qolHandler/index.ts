import { getModuleSetting, isActuallyDamageRoll, NOT_MYSTIFIED_VALUE } from "../../utils.ts";
import { ChatMessagePF2e, CreaturePF2e, PhysicalItemPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";

const EYE_ICON = '<i style="font-size: small; max-width: min-content" class="fa-solid fa-eye-slash"></i>';

type CollapseConfig = {
    contentSelector: string;
    settingKey: string;
    eyeInsertIndex: number;
    useGrandparent?: boolean;
    toggleMatchSelector?: string;
    toggleMode: "roll-note" | "card-content";
};

function applyCollapseToggle(html: HTMLElement, config: CollapseConfig): void {
    const contentElements = html.querySelectorAll(config.contentSelector);
    if (contentElements.length === 0) return;

    if (getModuleSetting<string>(config.settingKey) === "collapsedDefault") {
        for (const el of contentElements) {
            (el as HTMLElement).style.display = "none";
        }

        let target: ParentNode | null | undefined;
        if (config.useGrandparent) {
            target = contentElements[0].parentNode?.parentNode;
        } else {
            target = (contentElements[0] as HTMLElement).parentElement;
        }
        if (target?.children?.[config.eyeInsertIndex]) {
            target.children[config.eyeInsertIndex].insertAdjacentHTML("beforeend", EYE_ICON);
        }
    }

    html.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target?.matches(`h4.action, .fa-eye, .fa-eye-slash, strong, .card-header`)) {
            event.preventDefault();
            if (config.toggleMode === "roll-note") {
                for (const note of html.querySelectorAll(config.contentSelector)) {
                    (note as HTMLElement).style.display =
                        (note as HTMLElement).style.display === "none" ? "block" : "none";
                }
                toggleEyes(html);
            } else {
                target
                    .closest(".chat-message")
                    ?.querySelectorAll(config.contentSelector)
                    ?.forEach((content) => {
                        if (content instanceof HTMLElement)
                            content.style.display = content.style.display === "none" ? "block" : "none";
                    });
                toggleEyes(target as HTMLElement);
            }
        }
    });
}

function toggleEyes(html: HTMLElement) {
    html.querySelectorAll(".fa-eye, .fa-eye-slash").forEach((eye) => {
        eye.classList.toggle("fa-eye-slash");
        eye.classList.toggle("fa-eye");
    });
}

export function chatCardDescriptionCollapse(html: HTMLElement): void {
    applyCollapseToggle(html, {
        contentSelector: ".card-content:not(span.flavor-text *)",
        settingKey: "autoCollapseItemChatCardContent",
        eyeInsertIndex: 0,
        toggleMatchSelector: ".card-header",
        toggleMode: "card-content",
    });
}

export function chatActionCardDescriptionCollapse(html: HTMLElement): void {
    applyCollapseToggle(html, {
        contentSelector: ".roll-note",
        settingKey: "autoCollapseItemActionChatCardContent",
        eyeInsertIndex: 1,
        toggleMode: "roll-note",
    });
}

export function chatAttackCardDescriptionCollapse(html: HTMLElement): void {
    applyCollapseToggle(html, {
        contentSelector: ".roll-note",
        settingKey: "autoCollapseItemAttackChatCardContent",
        eyeInsertIndex: 0,
        useGrandparent: true,
        toggleMode: "roll-note",
    });
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

Hooks.on("deleteChatMessage", (message: ChatMessagePF2e) => {
    recentDamageMessages.delete(message.id);
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
    usingPartyLevel: boolean = getModuleSetting<boolean>(
        "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel",
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
            Number.parseInt(getModuleSetting<string>(getThresholdSettingKey(rarity, usingPartyLevel)));
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
