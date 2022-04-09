/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { KitPF2e } from "@item/kit";
import { ItemSheetPF2e } from "../sheet/base";
/**
 * @category Other
 */
export declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<{
        type: string;
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
        data: import("./data").KitSystemData;
        user: {
            isGM: boolean;
        };
        enabledRulesUI: boolean;
        cssClass: string;
        editable: boolean;
        document: KitPF2e;
        limited: boolean;
        options: FormApplicationOptions;
        owner: boolean;
        title: string;
    }>;
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    removeItem(event: JQuery.ClickEvent): void;
    activateListeners($html: JQuery): void;
}
