import { EquipmentSystemData, EquipmentSystemSource } from "@item/equipment/data";
import { BasePhysicalItemData, BasePhysicalItemSource } from "@item/physical/data";
import type { BookPF2e } from "./document";
export declare type BookSource = BasePhysicalItemSource<"book", BookSystemSource>;
export declare class BookData extends BasePhysicalItemData<BookPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface BookData extends Omit<BookSource, "effects" | "flags"> {
    type: BookSource["type"];
    data: BookSystemData;
    readonly _source: BookSource;
}
declare type BookSystemSource = EquipmentSystemSource & {
    capacity: number;
} & (FormulaBookData | SpellBookData);
declare type BookSystemData = BookSystemSource & EquipmentSystemData;
interface FormulaBookData {
    subtype: "formula";
    item: ItemUUID[];
}
interface SpellBookData {
    subtype: "spell";
    item: object[];
}
export {};
