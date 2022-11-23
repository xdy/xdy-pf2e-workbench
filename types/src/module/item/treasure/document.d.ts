import { ItemSummaryData } from "@item/data";
import { PhysicalItemPF2e } from "@item/physical";
import { TreasureData } from "./data";
declare class TreasurePF2e extends PhysicalItemPF2e {
    get isCoinage(): boolean;
    get denomination(): "cp" | "gp" | "pp" | "sp" | null;
    /** Set non-coinage treasure price from its numeric value and denomination */
    prepareBaseData(): void;
    getChatData(this: Embedded<TreasurePF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
}
interface TreasurePF2e {
    readonly data: TreasureData;
}
export { TreasurePF2e };
