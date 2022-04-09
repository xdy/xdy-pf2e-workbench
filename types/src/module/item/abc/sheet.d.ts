/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { AbilityString } from "@actor/data";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item/index";
import { ItemSheetPF2e } from "../sheet/base";
import { ABCSheetData } from "../sheet/data-types";
declare type ABCItem = AncestryPF2e | BackgroundPF2e | ClassPF2e;
export declare abstract class ABCSheetPF2e<TItem extends ABCItem> extends ItemSheetPF2e<TItem> {
    static get defaultOptions(): {
        scrollY: string[];
        dragDrop: {
            dropSelector: string;
        }[];
        classes: string[];
        template: string;
        viewPermission: number;
        editable: boolean;
        closeOnSubmit: boolean;
        submitOnClose: boolean;
        submitOnChange: boolean;
        baseApplication: string | null;
        width: string | number | null;
        height: string | number | null;
        top: number | null;
        left: number | null;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean | null;
        id: string;
        tabs: TabsOptions[];
        title: string;
    };
    getData(): Promise<ABCSheetData<TItem>>;
    protected getLocalizedAbilities(traits: {
        value: AbilityString[];
    }): {
        [key: string]: string;
    };
    /** Is the dropped feat or feature valid for the given section? */
    private isValidDrop;
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    private removeItem;
    activateListeners($html: JQuery): void;
}
export {};
