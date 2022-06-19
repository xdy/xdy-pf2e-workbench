import { ActionType, BaseItemDataPF2e, BaseItemSourcePF2e, ItemSystemSource, ItemTraits } from "@item/data/base";
import { ActionItemPF2e } from ".";
import { OneToThree } from "@module/data";
declare type ActionSource = BaseItemSourcePF2e<"action", ActionSystemSource>;
declare type ActionData = Omit<ActionSource, "effects" | "flags"> & BaseItemDataPF2e<ActionItemPF2e, "action", ActionSystemData, ActionSource>;
declare type ActionTrait = keyof ConfigPF2e["PF2E"]["actionTraits"];
declare type ActionTraits = ItemTraits<ActionTrait>;
interface ActionSystemSource extends ItemSystemSource {
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
    deathNote: boolean;
}
declare type ActionSystemData = ActionSystemSource;
export { ActionSource, ActionData, ActionTrait, ActionTraits };
