import type { ActorPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { logError } from "../../utils.js";

interface OglItemEntry {
    name: string;
    uuid: string;
    type: string;
}

const SKIPPED_ITEM_TYPES = new Set(["lore", "spellcastingEntry"]);

const OGL_LICENSE = "OGL";

let activeOglDialog: foundry.applications.api.DialogV2 | null = null;

function isOglItem(item: { type: string; system: { publication?: { license?: unknown } } }): boolean {
    if (SKIPPED_ITEM_TYPES.has(item.type)) return false;
    return (item.system.publication?.license as string | undefined) === OGL_LICENSE;
}

function getOglItems(actor: ActorPF2e): OglItemEntry[] {
    return actor.items.filter(isOglItem).map((item) => ({
        name: item.name,
        uuid: item.uuid,
        type: item.type,
    }));
}

function buildOglDialogContent(oglItems: OglItemEntry[]): string {
    const grouped = Map.groupBy(oglItems, (item) => item.type);
    const sortedTypes = [...grouped.keys()].sort();

    const sections = sortedTypes
        .map((type) => {
            const items = (grouped.get(type) ?? [])
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => `<li>@UUID[${item.uuid}]{${item.name}}</li>`)
                .join("\n");
            const localizedType = game.i18n.localize(`TYPES.Item.${type}`);
            return `<h4>${localizedType}</h4>\n<ul class="xdy-pf2e-workbench-ogl-list">\n${items}\n</ul>`;
        })
        .join("\n");

    return `
        <div class="xdy-pf2e-workbench-ogl-dialog">
            <p>${game.i18n.format(`${MODULENAME}.SETTINGS.showCharacterOglTag.oglItemsFound`, { count: oglItems.length })}</p>
            ${sections}
        </div>
    `;
}

const dialogLifecycle = {
    render: (_event: unknown, dialog: foundry.applications.api.DialogV2) => {
        activeOglDialog = dialog;
    },
    close: () => {
        activeOglDialog = null;
    },
};

export async function showCharacterOglItemsDialog(actor: ActorPF2e): Promise<void> {
    const oglItems = getOglItems(actor);
    const title = `${game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.title`)}: ${actor.name}`;

    if (activeOglDialog) {
        await activeOglDialog.close();
        activeOglDialog = null;
    }

    // @ts-expect-error TextEditor is a Foundry global
    const content = await TextEditor.enrichHTML(buildOglDialogContent(oglItems));

    await foundry.applications.api.DialogV2.wait({
        window: { title, resizable: true },
        content,
        buttons: [{ action: "close", label: game.i18n.localize("Close"), default: true }],
        ...dialogLifecycle,
    });
}

export function actorHasOglContent(actor: ActorPF2e): boolean {
    return actor.items.some(isOglItem);
}

export function addOglTagToCharacterSheet(html: HTMLElement, actor: ActorPF2e): boolean {
    if (!actorHasOglContent(actor)) return false;

    const traitsUl = html.querySelector<HTMLUListElement>(".abcd ul.tags.traits");
    if (!traitsUl) return false;

    if (traitsUl.querySelector(".xdy-pf2e-workbench-ogl-char-tag")) return false;

    const tooltipText = game.i18n.localize(`${MODULENAME}.SETTINGS.showCharacterOglTag.clickToView`);

    const oglTag = document.createElement("li");
    oglTag.classList.add("tag", "xdy-pf2e-workbench-ogl-char-tag");
    oglTag.textContent = "OGL CONTENT";
    oglTag.title = tooltipText;

    oglTag.addEventListener("click", () => {
        showCharacterOglItemsDialog(actor).catch((err) => logError(`${MODULENAME} | showCharacterOglDialog`, err));
    });

    traitsUl.append(oglTag);

    return true;
}
