import type { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import type { EquipmentTrait } from "@item/equipment/types.ts";
import type { BookSource, BookSystemData } from "./data.ts";
declare class BookPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<EquipmentTrait, string>;
}
interface BookPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: BookSource;
    system: BookSystemData;
}
export { BookPF2e };
