import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ActionCost, Frequency } from "@item/data/base.ts";
import { ItemSummaryData } from "@item/data/index.ts";
import { UserPF2e } from "@module/user/index.ts";
import { AbilityItemSource, AbilitySystemData } from "./data.ts";
declare class AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    getRollOptions(prefix?: string): string[];
    getChatData(this: AbilityItemPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    protected _preCreate(data: PreDocumentId<AbilityItemSource>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AbilityItemSource;
    system: AbilitySystemData;
}
export { AbilityItemPF2e };
