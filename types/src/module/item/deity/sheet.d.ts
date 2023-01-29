/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SkillAbbreviation } from "@actor/creature/data";
import { Alignment } from "@actor/creature/types";
import { DeityPF2e } from "@item";
import { ItemSheetPF2e } from "@item/sheet/base";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { SheetOptions } from "@module/sheet/helpers";
export declare class DeitySheetPF2e extends ItemSheetPF2e<DeityPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<DeitySheetData>;
    activateListeners($html: JQuery): void;
    _onDrop(event: ElementDragEvent): Promise<void>;
    /** Foundry inflexibly considers checkboxes to be booleans: set back to a string tuple for Divine Font */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface DeitySheetData extends ItemSheetDataPF2e<DeityPF2e> {
    alignments: Record<Alignment, string>;
    atheistic: boolean;
    skills: Record<SkillAbbreviation, string>;
    divineFonts: SheetOptions;
    spells: SpellBrief[];
}
interface SpellBrief {
    uuid: ItemUUID;
    level: number;
    name: string;
    img: ImageFilePath;
}
export {};
