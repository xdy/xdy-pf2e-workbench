import { ItemPF2e } from "@item/base";
import { ActionItemData, ActionItemSource } from "./data";
import { UserPF2e } from "@module/user";
import { ActionCost, Frequency } from "@item/data/base";
import { ItemSummaryData } from "@item/data";
declare class ActionItemPF2e extends ItemPF2e {
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    getChatData(this: Embedded<ActionItemPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    protected _preCreate(data: PreDocumentId<ActionItemSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface ActionItemPF2e {
    readonly data: ActionItemData;
}
export { ActionItemPF2e };
