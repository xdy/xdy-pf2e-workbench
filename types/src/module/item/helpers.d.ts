import type { ActorPF2e } from "@actor";
import type { EnrichmentOptionsPF2e } from "@system/text-editor.ts";
import type { ItemSourcePF2e, ItemType, RawItemChatData } from "./base/data/index.ts";
import type { ItemPF2e } from "./base/document.ts";
import type { PhysicalItemPF2e } from "./physical/document.ts";
import type { ItemInstances } from "./types.ts";
type ItemOrSource = PreCreate<ItemSourcePF2e> | ItemPF2e;
/** Determine in a type-safe way whether an `ItemPF2e` or `ItemSourcePF2e` is among certain types */
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(item: ItemOrSource, ...types: TType[]): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(item: ItemOrSource, ...types: TType[]): item is TType extends "physical" ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"] : TType extends ItemType ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"] : never;
declare function itemIsOfType<TParent extends ActorPF2e | null>(item: ItemOrSource, type: "physical"): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
/** Create a "reduced" item name; that is, one without an "Effect:" or similar prefix */
declare function reduceItemName(label: string): string;
/** A helper class to finalize data for item summaries and chat cards */
declare class ItemChatData {
    #private;
    item: ItemPF2e;
    data: RawItemChatData;
    htmlOptions: EnrichmentOptionsPF2e;
    constructor({ item, data, htmlOptions }: ItemChatDataConstructorOptions);
    /** Sanitized and convert stringy markdown into stringy HTML, with any initial HTML content stripped */
    static markdownToHTML(markdown: string): string;
    process(): Promise<RawItemChatData>;
}
interface ItemChatDataConstructorOptions {
    item: ItemPF2e;
    data: RawItemChatData;
    htmlOptions?: EnrichmentOptionsPF2e;
}
export { ItemChatData, itemIsOfType, reduceItemName };
