/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { LootPF2e } from "@actor";
import type { ActorSheetDataPF2e, InventoryItem, SheetInventory } from "@actor/sheet/data-types.ts";
import type { PhysicalItemPF2e } from "@item";
import { ActorSheetPF2e } from "../sheet/base.ts";

export declare class LootSheetPF2e<TActor extends LootPF2e> extends ActorSheetPF2e<TActor> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<LootSheetDataPF2e<TActor>>;
    activateListeners($html: JQuery): void;
    protected prepareInventory(): SheetInventory;
    /** Hide coin item rows in merchant actors */
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
}
interface LootSheetDataPF2e<TActor extends LootPF2e> extends ActorSheetDataPF2e<TActor> {
    hasActiveParty: boolean;
    isLoot: boolean;
    lootSheetTypeOptions: FormSelectOption[];
}
export {};
