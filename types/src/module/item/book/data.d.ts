import { EquipmentTraits } from "@item/equipment/data";
import { BasePhysicalItemData, BasePhysicalItemSource, MagicItemSystemData } from "@item/physical/data";
import type { BookPF2e } from "./document";

export declare type BookSource = BasePhysicalItemSource<"book", BookSystemData>;
export declare class BookData extends BasePhysicalItemData<BookPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface BookData extends Omit<BookSource, "effects" | "flags"> {
    type: BookSource["type"];
    data: BookSource["data"];
    readonly _source: BookSource;
}
declare type BookSystemData = {
    traits: EquipmentTraits;
    capacity: number;
} & (FormulaBookSystemData | SpellBookSystemData);
interface FormulaBookSystemData extends MagicItemSystemData {
    subtype: "formula";
    item: ItemUUID[];
}
interface SpellBookSystemData extends MagicItemSystemData {
    subtype: "spell";
    item: object[];
}
export {};
