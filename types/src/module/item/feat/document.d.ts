import { ActorPF2e } from "@actor";
import { FeatGroup } from "@actor/character/feats";
import { ItemSummaryData } from "@item/data";
import { Frequency } from "@item/data/base";
import { OneToThree } from "@module/data";
import { UserPF2e } from "@module/user";
import { ItemPF2e } from "..";
import { FeatSource, FeatSystemData } from "./data";
import { FeatCategory, FeatTrait } from "./types";
declare class FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup | null;
    get category(): FeatCategory;
    get level(): number;
    get traits(): Set<FeatTrait>;
    get actionCost(): {
        type: "action" | "free" | "reaction";
        value: OneToThree | null;
    } | null;
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
    getChatData(this: FeatPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    protected _preCreate(data: PreDocumentId<FeatSource>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, options: DocumentModificationContext<TParent>, userId: string): void;
}
interface FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: FeatSource;
    system: FeatSystemData;
}
export { FeatPF2e };
