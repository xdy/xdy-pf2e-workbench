import { ActorPF2e, ActorSheetPF2e, FeatPF2e, ItemPF2e } from "foundry-pf2e";
import { CHARACTER_TYPE } from "../../xdy-pf2e-workbench.ts";
import { MODULENAME } from "../../constants.ts";
import { fireAndForget, getModuleSetting, shouldIHandleThis } from "../../utils.ts";
import { canonicalizeSpellUuid } from "../spells/spellResolver.ts";

export function itemFromActor(element: Element, attributeName: string, actor: ActorPF2e): ItemPF2e | null {
    const itemId = <string>element.getAttribute(attributeName);
    return itemId ? (actor.items?.get(itemId) ?? null) : null;
}

export function itemFromCompendium(element: Element, qualifiedName: string): ItemPF2e | null {
    const itemUuid = element.getAttribute(qualifiedName);
    return itemUuid ? fromUuidSync(itemUuid) : null;
}

type FetchItemFn = (element: Element) => ItemPF2e | null;

interface ColorItemsByRarityOptions {
    html: HTMLElement | undefined;
    actor: ActorPF2e;
    setting: string;
    listSelector: string;
    itemSelector: string;
    fetchItem: FetchItemFn;
    headingSelector?: string;
}

export function colorActorItemsByRarity({
    html,
    actor,
    setting,
    listSelector,
    itemSelector,
    fetchItem,
    headingSelector = "h4",
}: ColorItemsByRarityOptions): void {
    if (actor.type === CHARACTER_TYPE && getModuleSetting<boolean>(setting)) {
        const lists = html?.querySelectorAll(listSelector) ?? [];
        for (const list of lists) {
            const itemNodes = list.querySelectorAll(itemSelector);
            for (const element of itemNodes) {
                const item = fetchItem(element);
                if (item) {
                    const rarity = item.system?.traits?.rarity;
                    if (rarity) {
                        const headingElements = element.querySelectorAll(headingSelector);
                        headingElements.forEach((heading) =>
                            heading.classList.add(`xdy-pf2e-workbench-rarity-${rarity}`),
                        );
                    }
                }
            }
        }
    }
}

export function markFeatsWithPrerequisites(html: HTMLElement, actor: ActorPF2e): void {
    if (actor.type !== CHARACTER_TYPE || !getModuleSetting<boolean>("playerFeatsPrerequisiteHint")) return;

    const featLists = html.querySelectorAll(".feats-pane");
    featLists.forEach((list) => {
        const slots = list.querySelectorAll(".slot");
        for (const element of slots) {
            const feat = <FeatPF2e | null>itemFromActor(element, "data-item-id", actor);
            if (feat && feat.system.prerequisites.value.length > 0) {
                const h4Elements = element.querySelectorAll("h4");
                h4Elements.forEach((h4Element) => (h4Element.innerHTML += "*"));
            }
        }
    });
}

const WORKBENCH_SPELL_TO_CHAT = "workbench-spell-to-chat";

/** Walk up from the action element to the spell container <li>. */
function getSpellContainer(target: HTMLElement): Element | null {
    return target?.closest(`[data-action="${WORKBENCH_SPELL_TO_CHAT}"]`)?.parentElement?.parentElement ?? null;
}

export function rewriteSpellToChatToSendLink(sheet: ActorSheetPF2e<ActorPF2e>, html: HTMLElement): void {
    if (sheet.actor?.type !== CHARACTER_TYPE) return;
    if (!getModuleSetting<boolean>("playerSpellsChangeSendToChat")) return;

    const actor = sheet.actor;

    html.querySelectorAll<HTMLElement>("li.spell").forEach((spellElement) => {
        spellElement
            .querySelectorAll<HTMLElement>('div.item-name [data-action="item-to-chat"]')
            .forEach((actionElement) => {
                if (actionElement.getAttribute("data-action") === WORKBENCH_SPELL_TO_CHAT) return;

                actionElement.setAttribute("data-action", WORKBENCH_SPELL_TO_CHAT);
                actionElement.onclick = async (event: MouseEvent) => {
                    const target = event.target as HTMLElement;
                    const spellContainer = getSpellContainer(target);

                    if (!shouldIHandleThis(actor) || !spellContainer) return;

                    const item = <ItemPF2e>itemFromActor(spellContainer, "data-item-id", actor);
                    if (!item || item.type !== "spell") return;

                    const canonicalUuid = await canonicalizeSpellUuid(item.uuid);
                    const flavor = `${game.i18n.localize(`${MODULENAME}.SETTINGS.playerSpellsChangeSendToChat.text`)}<em>@UUID[${canonicalUuid}]</em></p>`;
                    fireAndForget(
                        ChatMessage.create({
                            style: CONST.CHAT_MESSAGE_STYLES.OOC,
                            speaker: ChatMessage.getSpeaker(),
                            flavor,
                        }),
                        "playerSpellsChange ChatMessage",
                    );
                };
            });
    });
}
