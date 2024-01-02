import type { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/base/data/index.ts";
import { PhysicalItemPF2e } from "@item/physical/index.ts";
import { EquipmentSource, EquipmentSystemData, EquipmentTrait } from "./data.ts";
import { OtherEquipmentTag } from "./types.ts";
declare class EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get otherTags(): Set<OtherEquipmentTag>;
    getChatData(this: EquipmentPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
interface EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: EquipmentSource;
    system: EquipmentSystemData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
