/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { AbilityString } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
import { ABCFeatureEntryData } from "@item/abc/data";
import { ItemSheetDataPF2e } from "@item/sheet/data-types";
import { ABCItemPF2e } from ".";
import { ItemSheetPF2e } from "../sheet/base";
declare abstract class ABCSheetPF2e<TItem extends ABCItem> extends ItemSheetPF2e<TItem> {
    #private;
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<ABCSheetData<TItem>>;
    protected getLocalizedAbilities(traits: {
        value: AbilityString[];
    }): {
        [key: string]: string;
    };
    protected _onDrop(event: ElementDragEvent): Promise<void>;
    private removeItem;
    activateListeners($html: JQuery): void;
}
type ABCItem = AncestryPF2e | BackgroundPF2e | ClassPF2e;
interface ABCSheetData<TItem extends ABCItemPF2e> extends ItemSheetDataPF2e<TItem> {
    hasDetails: true;
    features: {
        key: string;
        item: FeatureSheetData;
    }[];
}
interface FeatureSheetData extends ABCFeatureEntryData {
    fromWorld: boolean;
}
export { ABCSheetData, ABCSheetPF2e };
