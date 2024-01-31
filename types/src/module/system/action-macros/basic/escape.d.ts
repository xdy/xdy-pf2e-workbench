import { type ActorPF2e } from "@actor";
import { ActionCheckPreview, SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.ts";
import type { ItemPF2e } from "@item";
import { CheckContext, CheckContextData, CheckContextOptions } from "@system/action-macros/types.ts";
import { SkillActionOptions } from "../index.ts";
declare function escape(options: SkillActionOptions): void;
declare class EscapeActionVariant extends SingleCheckActionVariant {
    #private;
    get statistic(): string;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckContext<ItemType> | undefined;
    protected toActionCheckPreview(options: {
        actor?: ActorPF2e;
        rollOptions: string[];
        slug: string;
    }): ActionCheckPreview | null;
}
declare class EscapeAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): EscapeActionVariant;
}
declare const action: EscapeAction;
export { action, escape as legacy };
