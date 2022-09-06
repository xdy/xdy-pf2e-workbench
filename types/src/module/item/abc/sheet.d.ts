/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { AbilityString } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
import { ItemSheetPF2e } from "../sheet/base";
import { ABCSheetData } from "../sheet/data-types";
declare type ABCItem = AncestryPF2e | BackgroundPF2e | ClassPF2e;
export declare abstract class ABCSheetPF2e<TItem extends ABCItem> extends ItemSheetPF2e<TItem> {
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<ABCSheetData<TItem>>;
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
