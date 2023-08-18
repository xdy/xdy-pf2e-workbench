import { ActorPF2e } from "@actor";
import { FeatGroup } from "@actor/character/feats.ts";
import { HeritagePF2e, ItemPF2e } from "@item";
import { ActionCost, Frequency } from "@item/data/base.ts";
import { ItemSummaryData } from "@item/data/index.ts";
import { Rarity } from "@module/data.ts";
import { UserPF2e } from "@module/user/index.ts";
import { FeatSource, FeatSystemData } from "./data.ts";
import { FeatCategory, FeatTrait } from "./types.ts";
declare class FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup | null;
    grants: (FeatPF2e | HeritagePF2e)[];
    get category(): FeatCategory;
    get level(): number;
    get traits(): Set<FeatTrait>;
    get rarity(): Rarity;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    get isFeature(): boolean;
    get isFeat(): boolean;
    /** Whether this feat must be taken at character level 1 */
    get onlyLevel1(): boolean;
    /** The maximum number of times this feat can be taken */
    get maxTakeable(): number;
    prepareBaseData(): void;
    /** Set a self roll option for this feat(ure) */
    prepareActorData(this: FeatPF2e<ActorPF2e>): void;
    prepareSiblingData(): void;
    getChatData(this: FeatPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    protected _preCreate(data: PreDocumentId<FeatSource>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, options: DocumentModificationContext<TParent>, userId: string): void;
}
interface FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: FeatSource;
    system: FeatSystemData;
}
export { FeatPF2e };
