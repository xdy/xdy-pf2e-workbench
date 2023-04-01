import { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/data";
import { CoinsPF2e, PhysicalItemPF2e } from "@item/physical";
import { TreasureSource, TreasureSystemData } from "./data";
declare class TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get isCoinage(): boolean;
    get denomination(): "cp" | "gp" | "pp" | "sp" | null;
    /** Set non-coinage treasure price from its numeric value and denomination */
    prepareBaseData(): void;
    /** Don't adjust the price of treasure for size */
    protected adjustPriceForSize(): CoinsPF2e;
    getChatData(this: TreasurePF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
}
interface TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: TreasureSource;
    system: TreasureSystemData;
}
export { TreasurePF2e };
