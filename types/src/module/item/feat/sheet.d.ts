/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { Language, SenseAcuity } from "@actor/creature/types.ts";
import { SelfEffectReference } from "@item/ability/index.ts";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import type { FeatPF2e } from "@item/feat/document.ts";
import { OneToFour } from "@module/data.ts";

declare class FeatSheetPF2e extends ItemSheetPF2e<FeatPF2e> {
    #private;
    static get defaultOptions(): ItemSheetOptions;
    get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<FeatSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _onDrop(event: DragEvent): Promise<void>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface FeatSheetData extends ItemSheetDataPF2e<FeatPF2e> {
    actionsNumber: typeof CONFIG.PF2E.actionsNumber;
    actionTypes: typeof CONFIG.PF2E.actionTypes;
    acuityOptions: typeof CONFIG.PF2E.senseAcuities;
    attributes: typeof CONFIG.PF2E.abilities;
    canHaveKeyOptions: boolean;
    categories: typeof CONFIG.PF2E.featCategories;
    frequencies: typeof CONFIG.PF2E.frequencies;
    hasLanguages: boolean;
    hasLineageTrait: boolean;
    hasProficiencies: boolean;
    hasSenses: boolean;
    languages: LanguageOptions;
    mandatoryTakeOnce: boolean;
    maxTakableOptions: FormSelectOption[];
    proficiencies: ProficiencyOptions;
    proficiencyRankOptions: Record<string, string>;
    selfEffect: SelfEffectReference | null;
    senses: SenseOption[];
    showPrerequisites: boolean;
    suppressedFeatures: {
        uuid: string;
        name: string;
        img: string;
    }[];
}
interface LanguageOptions {
    slots: number;
    granted: {
        available: {
            slug: Language;
            label: string;
        }[];
        selected: {
            slug: Language;
            label: string;
        }[];
    };
}
interface ProficiencyOptions {
    other: ProficiencyOptionGroup<null>;
    saves: ProficiencyOptionGroup;
    attacks: ProficiencyOptionGroup;
    defenses: ProficiencyOptionGroup;
    classes: ProficiencyOptionGroup;
}
interface ProficiencyOptionGroup<TGroup extends string | null = string> {
    group: TGroup;
    options: {
        slug: string;
        label: string;
        rank: OneToFour | null;
    }[];
}
interface SenseOption {
    acuity?: SenseAcuity | null;
    canSetAcuity: boolean;
    canSetRange: boolean;
    label: string;
    range?: number | null;
    selected: boolean;
    slug: string;
    special: {
        ancestry: boolean;
        second: boolean;
    } | null;
}
export { FeatSheetPF2e };
