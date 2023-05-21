import { ChatMessagePF2e } from "@module/chat-message/document.ts";
import { Action, ActionCost, ActionMessageOptions, ActionUseOptions, ActionVariant, ActionVariantUseOptions } from "./types.ts";
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
    get cost(): ActionCost | undefined;
    get description(): string | undefined;
    get glyph(): string;
    get slug(): string;
    get traits(): string[];
    toMessage(options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined>;
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
    get variants(): Collection<TAction>;
    protected getDefaultVariant(options?: {
        variant?: string;
    }): Promise<TAction>;
    toMessage(options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined>;
    use(options?: Partial<ActionUseOptions>): Promise<unknown>;
    protected abstract toActionVariant(data?: TData): TAction;
}
export { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData };
