import { ItemPF2e, ItemSheetPF2e } from "foundry-pf2e";
import { MODULENAME } from "../xdy-pf2e-workbench.js";
import { extractHtmlElement } from "../utils.js";

export function renderItemSheetHook(sheet: ItemSheetPF2e<ItemPF2e>, element: unknown): void {
    const html = extractHtmlElement(element);

    if (!html || !game.settings.get(MODULENAME, "showItemLicenseTags")) return;

    const item = sheet.item;
    const license: string | undefined = item?.system?.publication?.license;
    if (license !== "ORC" && license !== "OGL") return;

    const details = html.querySelector(".details");
    if (!details) return;

    // Avoid adding a duplicate tag
    if (details.querySelector(".xdy-pf2e-workbench-license-tag")) return;

    const licenseTag = document.createElement("span");
    licenseTag.classList.add("tag", "xdy-pf2e-workbench-license-tag");
    licenseTag.textContent = `LICENSE:${license}`;
    details.append(licenseTag);
}
