import { ItemPF2e } from "@item/base";
import { ActionItemSource, ActionSystemData } from "./data";
import { UserPF2e } from "@module/user";
import { ActionCost, Frequency } from "@item/data/base";
import { ItemSummaryData } from "@item/data";
import { ActorPF2e } from "@actor";
declare class ActionItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    getChatData(this: ActionItemPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    protected _preCreate(data: PreDocumentId<ActionItemSource>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
}
interface ActionItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: ActionItemSource;
    system: ActionSystemData;
}
export { ActionItemPF2e };
