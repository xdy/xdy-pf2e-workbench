import type { ActorPF2e, ItemPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { logError } from "../../utils.js";

interface OglItemEntry {
    name: string;
    uuid: string;
    type: string;
}

function getOglItems(actor: ActorPF2e): OglItemEntry[] {
    const oglItems: OglItemEntry[] = [];
    for (const item of actor.items) {
        const pf2eItem = item as ItemPF2e;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const license = (pf2eItem.system as any)?.publication?.license as string | undefined;
        if (license === "OGL") {
            oglItems.push({
                name: pf2eItem.name,
                uuid: pf2eItem.uuid,
                type: pf2eItem.type,
            });
        }
    }
    return oglItems;
}

export async function showCharacterOglItemsDialog(actor: ActorPF2e): Promise<void> {
    const oglItems = getOglItems(actor);

    if (oglItems.length === 0) {
        foundry.applications.api.DialogV2.wait({
            window: {
                title: game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.title`),
            },
            content: `<p>${game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.noOglContent`)}</p>`,
            buttons: [
                {
                    action: "ok",
                    label: game.i18n.localize("OK"),
                    default: true,
                },
            ],
        });
        return;
    }

    const itemsText = oglItems
        .map((item) => `<li>@UUID[${item.uuid}]{${item.name}} <em>(${item.type})</em></li>`)
        .join("\n");

    const rawContent = `
        <p>${game.i18n.format(`${MODULENAME}.SETTINGS.showCharacterOglTag.oglItemsFound`, { count: oglItems.length })}</p>
        <ul class="xdy-pf2e-workbench-ogl-list">
            ${itemsText}
        </ul>
    `;

    // @ts-expect-error TextEditor is a Foundry global
    const content = await TextEditor.enrichHTML(rawContent);

    await foundry.applications.api.DialogV2.wait({
        window: {
            title: game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.title`),
            resizable: true,
        },
        content,
        buttons: [
            {
                action: "close",
                label: game.i18n.localize("Close"),
                default: true,
            },
        ],
    });
}

/**
 * Returns true if the actor has any OGL-licensed items.
 */
export function actorHasOglContent(actor: ActorPF2e): boolean {
    return getOglItems(actor).length > 0;
}

export function addOglTagToCharacterSheet(html: HTMLElement, actor: ActorPF2e): boolean {
    if (!actorHasOglContent(actor)) return false;

    const abcdDiv = html.querySelector(".abcd");
    if (!abcdDiv) return false;

    const traitsUl = abcdDiv.querySelector("ul.tags.traits");
    if (!traitsUl) return false;

    // Avoid adding a duplicate tag
    if (traitsUl.querySelector(".xdy-pf2e-workbench-ogl-char-tag")) return false;

    const clickToView = game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.clickToView`);

    const oglTag = document.createElement("li");
    oglTag.classList.add("tag", "xdy-pf2e-workbench-ogl-char-tag");
    oglTag.textContent = "OGL CONTENT";
    oglTag.title = clickToView;

    oglTag.addEventListener("click", () => {
        showCharacterOglItemsDialog(actor).catch((err) => logError(`${MODULENAME} | showCharacterOglDialog`, err));
    });

    traitsUl.append(oglTag);

    return true;
}
