import { PhysicalItemPF2e } from "../physical";
import { EquipmentData, EquipmentTrait } from "./data";
export declare class EquipmentPF2e extends PhysicalItemPF2e {
    static get schema(): typeof EquipmentData;
    getChatData(this: Embedded<EquipmentPF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
export interface EquipmentPF2e {
    readonly data: EquipmentData;
    get traits(): Set<EquipmentTrait>;
}
