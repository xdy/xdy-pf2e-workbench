import { Action, ActionCost, ActionUseOptions, ActionVariant, ActionVariantUseOptions } from "./types";
interface BaseActionVariantData {
    cost?: ActionCost;
    description?: string;
    name?: string;
    slug?: string;
    traits?: string[];
}
interface BaseActionData<ActionVariantDataType extends BaseActionVariantData = BaseActionVariantData> {
    cost?: ActionCost;
    description: string;
    img?: string;
    name: string;
    slug?: string | null;
    traits?: string[];
    variants?: ActionVariantDataType | ActionVariantDataType[];
}
declare abstract class BaseActionVariant implements ActionVariant {
    #private;
    readonly name?: string;
    protected constructor(action: BaseAction<BaseActionVariantData, BaseActionVariant>, data?: BaseActionVariantData);
    get cost(): 2 | 1 | 3 | "free" | "reaction" | undefined;
    get description(): string | undefined;
    get glyph(): string;
    get slug(): string;
    get traits(): string[];
    abstract use(options?: Partial<ActionVariantUseOptions>): Promise<unknown>;
}
declare abstract class BaseAction<TData extends BaseActionVariantData, TAction extends BaseActionVariant> implements Action {
    #private;
    readonly cost?: ActionCost;
    readonly description?: string;
    readonly img?: string;
    readonly name: string;
    readonly slug: string;
    readonly traits: string[];
    protected constructor(data: BaseActionData<TData>);
    get glyph(): string;
    get variants(): foundry.utils.Collection<ActionVariant>;
    use(options?: Partial<ActionUseOptions>): Promise<unknown>;
    protected abstract toActionVariant(data?: TData): TAction;
}
export { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData };
