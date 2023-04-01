import { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/data";
import { PhysicalItemPF2e } from "@item/physical";
import { EquipmentSource, EquipmentSystemData, EquipmentTrait } from "./data";
import { OtherEquipmentTag } from "./types";
declare class EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get otherTags(): Set<OtherEquipmentTag>;
    prepareBaseData(): void;
    prepareActorData(): void;
    getChatData(this: EquipmentPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
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
