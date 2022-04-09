import { ActionType, ItemSystemData, ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { ActionItemPF2e } from ".";
import { OneToThree } from "@module/data";
export declare type ActionSource = BaseNonPhysicalItemSource<"action", ActionSystemData>;
export declare class ActionData extends BaseNonPhysicalItemData<ActionItemPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ActionData extends Omit<ActionSource, "effects" | "flags"> {
    type: ActionSource["type"];
    data: ActionSource["data"];
    readonly _source: ActionSource;
}
export declare type ActionTrait = keyof ConfigPF2e["PF2E"]["actionTraits"];
export declare type ActionTraits = ItemTraits<ActionTrait>;
interface ActionSystemData extends ItemSystemData {
    traits: ActionTraits;
    actionType: {
        value: ActionType;
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
}
export {};
