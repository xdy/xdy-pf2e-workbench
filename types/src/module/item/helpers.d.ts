import { ActorPF2e } from "@actor";
import { ItemPF2e } from "./base.ts";
import { ItemSourcePF2e, ItemType } from "./data/index.ts";
import { PhysicalItemPF2e } from "./physical/document.ts";
import { ItemInstances } from "./types.ts";
/** Determine in a type-safe way whether an `ItemPF2e` or `ItemSourcePF2e` is among certain types */
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(item: ItemPF2e<TParent> | ItemSourcePF2e, ...types: TType[]): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null>(item: ItemPF2e<TParent> | ItemSourcePF2e, type: "physical"): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(item: ItemPF2e<TParent> | ItemSourcePF2e, ...types: TType[]): item is TType extends "physical" ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"] : TType extends ItemType ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"] : never;
/** Create a "reduced" item name; that is, one without an "Effect:" or similar prefix */
declare function reduceItemName(label: string): string;
export { itemIsOfType, reduceItemName };
