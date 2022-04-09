/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SpellPF2e } from "@item/spell";
import { ItemSheetPF2e } from "../sheet/base";
import { SpellSheetData } from "../sheet/data-types";
export declare class SpellSheetPF2e extends ItemSheetPF2e<SpellPF2e> {
    getData(): Promise<SpellSheetData>;
    activateListeners($html: JQuery): void;
    private formatSpellComponents;
}
