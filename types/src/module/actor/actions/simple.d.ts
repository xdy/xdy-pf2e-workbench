import { ActionCost, ActionUseOptions } from "./types";
import { ActorPF2e } from "@actor";
import { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData } from "./base";
import { EffectPF2e } from "@item";
interface SimpleActionVariantData extends BaseActionVariantData {
    effect?: string | EffectPF2e;
}
interface SimpleActionData extends BaseActionData<SimpleActionVariantData> {
    effect?: string | EffectPF2e;
}
interface SimpleActionUseOptions extends ActionUseOptions {
    actors: ActorPF2e[];
    cost: ActionCost;
    effect: string | EffectPF2e;
    traits: string[];
}
declare class SimpleActionVariant extends BaseActionVariant {
    #private;
    constructor(action: SimpleAction, data?: SimpleActionVariantData);
    get effect(): string | EffectPF2e<ActorPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null> | null> | undefined;
    use(options?: Partial<SimpleActionUseOptions>): Promise<void>;
}
declare class SimpleAction extends BaseAction<SimpleActionVariantData, SimpleActionVariant> {
    readonly effect?: string | EffectPF2e;
    constructor(data: SimpleActionData);
    protected toActionVariant(data?: SimpleActionVariantData): SimpleActionVariant;
}
export { SimpleAction, SimpleActionVariantData };
