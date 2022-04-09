import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e } from "@item";
import { RollDataPF2e } from "@system/rolls";
export declare function craftItem(item: PhysicalItemPF2e, itemQuantity: number, actor: ActorPF2e, infused?: boolean): Promise<void>;
export declare function craftSpellConsumable(item: PhysicalItemPF2e, itemQuantity: number, actor: ActorPF2e): Promise<void>;
export declare function renderCraftingInline(item: PhysicalItemPF2e, roll: Rolled<Roll<RollDataPF2e>>, quantity: number, actor: ActorPF2e): Promise<string | undefined>;
