import { EquipmentSystemData, EquipmentSystemSource } from "@item/equipment/data";
import { BasePhysicalItemData, BasePhysicalItemSource } from "@item/physical/data";
import type { BookPF2e } from "./document";
declare type BookSource = BasePhysicalItemSource<"book", BookSystemSource>;
declare type BookData = Omit<BookSource, "system" | "effects" | "flags"> & BasePhysicalItemData<BookPF2e, "book", BookSystemData, BookSource>;
declare type BookSystemSource = EquipmentSystemSource & {
    capacity: number;
} & (FormulaBookData | SpellBookData);
declare type BookSystemData = Omit<BookSystemSource, "price"> & EquipmentSystemData;
interface FormulaBookData {
    subtype: "formula";
    item: ItemUUID[];
}
interface SpellBookData {
    subtype: "spell";
    item: object[];
}
export { BookData, BookSource };
