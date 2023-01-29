import { ItemPF2e } from "..";
import { FeatData, FeatSource, FeatTrait, FeatType } from "./data";
import { OneToThree } from "@module/data";
import { UserPF2e } from "@module/user";
import { FeatCategory } from "@actor/character/feats";
import { Frequency } from "@item/data/base";
import { ItemSummaryData } from "@item/data";
declare class FeatPF2e extends ItemPF2e {
    category: FeatCategory | null;
    get featType(): FeatType;
    get level(): number;
    get traits(): Set<FeatTrait>;
    get actionCost(): {
        type: "action" | "reaction" | "free";
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
    prepareActorData(this: Embedded<FeatPF2e>): void;
    getChatData(this: Embedded<FeatPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    protected _preCreate(data: PreDocumentId<FeatSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, options: DocumentModificationContext<this>, userId: string): void;
}
interface FeatPF2e {
    readonly data: FeatData;
}
export { FeatPF2e };
