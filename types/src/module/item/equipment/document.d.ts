import { ItemSummaryData } from "@item/data";
import { PhysicalItemPF2e } from "@item/physical";
import { EquipmentData, EquipmentTrait } from "./data";
import { OtherEquipmentTag } from "./types";
declare class EquipmentPF2e extends PhysicalItemPF2e {
    get otherTags(): Set<OtherEquipmentTag>;
    prepareBaseData(): void;
    prepareActorData(): void;
    getChatData(this: Embedded<EquipmentPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
interface EquipmentPF2e {
    readonly data: EquipmentData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
