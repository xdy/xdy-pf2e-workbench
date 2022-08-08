import { ItemPF2e } from "@item/base";
import { ActionItemData, ActionItemSource } from "./data";
import { OneToThree } from "@module/data";
import { UserPF2e } from "@module/user";
import { ActionCost, Frequency } from "@item/data/base";
declare class ActionItemPF2e extends ItemPF2e {
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    getChatData(this: Embedded<ActionItemPF2e>, htmlOptions?: EnrichHTMLOptions): {
        properties: string[];
        traits: import("../data").TraitChatData[];
        frequency?: Frequency | undefined;
        actionType: {
            value: "passive" | "action" | "reaction" | "free";
        };
        actionCategory: {
            value: string;
        };
        actions: {
            value: OneToThree | null;
        };
        requirements: {
            value: string;
        };
        trigger: {
            value: string;
        };
        deathNote: boolean;
        description: {
            value: string;
        };
        source: {
            value: string;
        };
        options?: {
            value: string[];
        } | undefined;
        rules: import("../../rules/rule-element/data").RuleElementSource[];
        slug: string | null;
        schema: import("@module/data").DocumentSchemaRecord;
    };
    protected _preCreate(data: PreDocumentId<ActionItemSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface ActionItemPF2e {
    readonly data: ActionItemData;
}
export { ActionItemPF2e };
