import { ActorPF2e } from "@actor";
import { SkillActionOptions } from "../index.ts";
import { ItemPF2e } from "@item";
import { CheckContext, CheckContextData, CheckContextOptions } from "@system/action-macros/types.ts";
import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.ts";
declare function disarm(options: SkillActionOptions): void;
declare class DisarmActionVariant extends SingleCheckActionVariant {
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckContext<ItemType> | undefined;
}
declare class DisarmAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): DisarmActionVariant;
}
declare const action: DisarmAction;
export { disarm as legacy, action };
