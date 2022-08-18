/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { KitPF2e } from "@item/kit";
import { CoinsPF2e } from "@item/physical/helpers";
import { ItemSheetPF2e } from "../sheet/base";
/**
 * @category Other
 */
export declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<{
        type: string;
        priceString: CoinsPF2e;
        hasSidebar: boolean;
        hasDetails: boolean;
        itemType: string | null;
        showTraits: boolean;
        sidebarTemplate?: (() => string) | undefined;
        detailsTemplate?: (() => string) | undefined;
        item: import("./data").KitData;
        data: import("./data").KitSystemSource;
        enrichedContent: Record<string, string>;
        isPhysical: boolean;
        user: {
            isGM: boolean;
        };
        enabledRulesUI: boolean;
        ruleEditing: boolean;
        rarity: "unique" | "common" | "uncommon" | "rare" | null;
        rarities: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        traits: import("../../sheet/helpers").SheetOptions | null;
        ruleLabels: {
            label: string;
            recognized: boolean;
        }[];
        ruleSelection: {
            selected: string | null;
            types: Record<string, string>;
        };
        ruleElements: {
            template: string;
            index: number;
            rule: import("../../rules/rule-element/data").RuleElementSource;
        }[];
        proficiencies: readonly ["PF2E.ProficiencyLevel0", "PF2E.ProficiencyLevel1", "PF2E.ProficiencyLevel2", "PF2E.ProficiencyLevel3", "PF2E.ProficiencyLevel4"];
        cssClass: string;
        editable: boolean;
        document: KitPF2e;
        limited: boolean;
        options: FormApplicationOptions;
        owner: boolean;
        title: string;
    }>;
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    removeItem(event: JQuery.ClickEvent): Promise<KitPF2e>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
