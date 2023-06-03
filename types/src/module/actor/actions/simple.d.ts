import { ActionCost, ActionUseOptions } from "./types.ts";
import { ActorPF2e } from "@actor";
import { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData } from "./base.ts";
import { EffectPF2e } from "@item";
interface SimpleActionVariantData extends BaseActionVariantData {
    effect?: string | EffectPF2e;
}
interface SimpleActionData extends BaseActionData<SimpleActionVariantData> {
    effect?: string | EffectPF2e;
}
interface SimpleActionUseOptions extends ActionUseOptions {
    cost: ActionCost;
    effect: string | EffectPF2e | false;
}
interface SimpleActionResult {
    actor: ActorPF2e;
    effect?: EffectPF2e;
    message?: ChatMessage;
}
declare class SimpleActionVariant extends BaseActionVariant {
    #private;
    constructor(action: SimpleAction, data?: SimpleActionVariantData);
    get effect(): string | EffectPF2e | undefined;
    use(options?: Partial<SimpleActionUseOptions>): Promise<SimpleActionResult[]>;
}
declare class SimpleAction extends BaseAction<SimpleActionVariantData, SimpleActionVariant> {
    readonly effect?: string | EffectPF2e;
    constructor(data: SimpleActionData);
    protected toActionVariant(data?: SimpleActionVariantData): SimpleActionVariant;
}
export { SimpleAction, SimpleActionResult, SimpleActionVariant, SimpleActionVariantData, SimpleActionUseOptions };
