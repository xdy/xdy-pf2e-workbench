import { PhysicalItemPF2e } from "../physical";
import { EquipmentData, EquipmentTrait } from "./data";
declare class EquipmentPF2e extends PhysicalItemPF2e {
    getChatData(this: Embedded<EquipmentPF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
interface EquipmentPF2e {
    readonly data: EquipmentData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
