/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SpellPF2e } from "@item/spell";
import { ItemSheetPF2e } from "../sheet/base";
import { SpellSheetData, SpellSheetOverlayData } from "../sheet/data-types";
export declare class SpellSheetPF2e extends ItemSheetPF2e<SpellPF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<SpellSheetData>;
    static get defaultOptions(): DocumentSheetOptions;
    get title(): string;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    protected _onDragStart(event: ElementDragEvent): void;
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    private formatSpellComponents;
    private getAvailableHeightenLevels;
    private getOverlayFromEvent;
    prepareHeighteningLevels(): SpellSheetOverlayData[];
}
