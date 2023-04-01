/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base";
import { LootPF2e } from "@actor/loot";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types";
import { ItemPF2e } from "@item";
import { ActorPF2e } from "@module/documents";
export declare class LootSheetPF2e<TActor extends LootPF2e> extends ActorSheetPF2e<TActor> {
    #private;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    get isLootSheet(): boolean;
    getData(): Promise<LootSheetDataPF2e<TActor>>;
    activateListeners($html: JQuery): void;
    protected _onDropItem(event: ElementDragEvent, itemData: DropCanvasItemDataPF2e): Promise<ItemPF2e<ActorPF2e | null>[]>;
}
interface LootSheetDataPF2e<TActor extends LootPF2e> extends ActorSheetDataPF2e<TActor> {
    isLoot: boolean;
}
export {};
