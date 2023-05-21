import { SkillActionOptions } from "../index.ts";
import { ActorPF2e } from "@actor";
import { CheckContext, CheckContextData, CheckContextOptions } from "@system/action-macros/types.ts";
import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.ts";
import { ItemPF2e } from "@item";
declare function escape(options: SkillActionOptions): void;
declare class EscapeActionVariant extends SingleCheckActionVariant {
    get statistic(): string;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckContext<ItemType> | undefined;
}
declare class EscapeAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): EscapeActionVariant;
}
declare const action: EscapeAction;
export { escape as legacy, action };
