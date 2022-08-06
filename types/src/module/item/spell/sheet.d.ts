/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { SpellPF2e } from "@item/spell";
import { ItemSheetPF2e } from "../sheet/base";
import { ItemSheetDataPF2e } from "../sheet/data-types";
import { SpellSystemData } from "./data";
import { SheetOptions } from "@module/sheet/helpers";
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
interface SpellSheetData extends ItemSheetDataPF2e<SpellPF2e> {
    isCantrip: boolean;
    isFocusSpell: boolean;
    isRitual: boolean;
    isVariant: boolean;
    variants: {
        name: string;
        id: string;
        sort: number;
        actions: string;
    }[];
    magicSchools: ConfigPF2e["PF2E"]["magicSchools"];
    spellCategories: ConfigPF2e["PF2E"]["spellCategories"];
    spellLevels: ConfigPF2e["PF2E"]["spellLevels"];
    spellTypes: ConfigPF2e["PF2E"]["spellTypes"];
    damageCategories: ConfigPF2e["PF2E"]["damageCategories"];
    damageSubtypes: ConfigPF2e["PF2E"]["damageSubtypes"];
    spellComponents: string[];
    rarities: SheetOptions;
    areaSizes: ConfigPF2e["PF2E"]["areaSizes"];
    areaTypes: ConfigPF2e["PF2E"]["areaTypes"];
    heightenIntervals: number[];
    heightenOverlays: SpellSheetOverlayData[];
    canHeighten: boolean;
}
interface SpellSheetOverlayData {
    id: string | null;
    /** Base path to the property, dot delimited */
    base: string;
    /** Base path to the spell override data, dot delimited. Currently this is the same as base */
    dataPath: string;
    level: number;
    system: Partial<SpellSystemData>;
    type: "heighten";
    heightenLevels: number[];
    missing: {
        key: keyof SpellSystemData;
        label: string;
    }[];
}
export {};
