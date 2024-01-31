import type { ActorPF2e } from "@actor";
import type { RawItemChatData } from "@item/base/data/index.ts";
import { PhysicalItemPF2e } from "@item/physical/index.ts";
import type { CoinDenomination } from "@item/physical/types.ts";
import type { TreasureSource, TreasureSystemData } from "./data.ts";
declare class TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get isCoinage(): boolean;
    get denomination(): CoinDenomination | null;
    /** Set non-coinage treasure price from its numeric value and denomination */
    prepareBaseData(): void;
    getChatData(this: TreasurePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
}
interface TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: TreasureSource;
    system: TreasureSystemData;
}
export { TreasurePF2e };
