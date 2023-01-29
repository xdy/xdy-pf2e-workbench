/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { LootPF2e } from "@actor/loot";
import { LootSheetDataPF2e } from "../sheet/data-types";
import { ItemPF2e } from "@item";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data";
export declare class LootSheetPF2e extends ActorSheetPF2e<LootPF2e> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    get isLootSheet(): boolean;
    getData(): Promise<LootSheetDataPF2e>;
    activateListeners($html: JQuery): void;
    private distributeCoins;
    private lootNPCs;
    protected _onDropItem(event: ElementDragEvent, itemData: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
}
