import { PhysicalItemPF2e } from "@item/physical";
import { TreasureData } from "./data";
export declare class TreasurePF2e extends PhysicalItemPF2e {
    static get schema(): typeof TreasureData;
    get isCoinage(): boolean;
    /** Set non-coinage treasure price from its numeric value and denomination */
    prepareBaseData(): void;
    getChatData(this: Embedded<TreasurePF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
}
export interface TreasurePF2e {
    readonly data: TreasureData;
}
