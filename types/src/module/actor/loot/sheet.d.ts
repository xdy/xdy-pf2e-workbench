/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorSheetPF2e } from "../sheet/base.ts";
import { LootPF2e } from "@actor/loot/index.ts";
import { DropCanvasItemDataPF2e } from "@module/canvas/drop-canvas-data.ts";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { ItemPF2e } from "@item";
import { ActorPF2e } from "@module/documents.ts";
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
