/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { LootPF2e } from "@actor";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.ts";
import { ActorSheetPF2e } from "../sheet/base.ts";
export declare class LootSheetPF2e<TActor extends LootPF2e> extends ActorSheetPF2e<TActor> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<LootSheetDataPF2e<TActor>>;
    activateListeners($html: JQuery): void;
}
interface LootSheetDataPF2e<TActor extends LootPF2e> extends ActorSheetDataPF2e<TActor> {
    isLoot: boolean;
}
export {};
