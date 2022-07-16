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
        sidebarTemplate: () => string;
        hasDetails: boolean;
        detailsTemplate: () => string;
        rarity: {
            common: string;
            uncommon: string;
            rare: string;
            unique: string;
        };
        traits: import("@module/sheet/helpers").SheetOptions;
        itemType: string | null;
        item: import("./data").KitData;
        data: import("./data").KitSystemSource;
        isPhysical: boolean;
        user: {
            isGM: boolean;
        };
        enabledRulesUI: boolean;
        ruleEditing: boolean;
        ruleSelection: {
            selected: string | null;
            types: Record<string, string>;
        };
        ruleElements: {
            template: string;
            index: number;
            rule: import("../../rules").RuleElementSource;
        }[];
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
