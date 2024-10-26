import type { AbilityTrait } from "@item/ability/index.ts";
import type { ProficiencyRank } from "@item/base/data/index.ts";
import { ChatMessagePF2e } from "@module/chat-message/document.ts";
import {
    Action,
    ActionCost,
    ActionMessageOptions,
    ActionSection,
    ActionUseOptions,
    ActionVariant,
    ActionVariantUseOptions,
} from "./types.ts";

interface BaseActionVariantData {
    cost?: ActionCost;
    description?: string;
    name?: string;
    slug?: string;
    traits?: AbilityTrait[];
}
interface BaseActionData<ActionVariantDataType extends BaseActionVariantData = BaseActionVariantData> {
    cost?: ActionCost;
    description: string;
    img?: string;
    name: string;
    sampleTasks?: Partial<Record<ProficiencyRank, string>>;
    section?: ActionSection;
    slug?: string | null;
    traits?: AbilityTrait[];
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
    get traits(): AbilityTrait[];
    toMessage(options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined>;
    abstract use(options?: Partial<ActionVariantUseOptions>): Promise<unknown>;
}
declare abstract class BaseAction<TData extends BaseActionVariantData, TAction extends BaseActionVariant> implements Action {
    #private;
    readonly cost?: ActionCost;
    readonly description?: string;
    readonly img?: string;
    readonly name: string;
    readonly sampleTasks?: Partial<Record<ProficiencyRank, string>>;
    readonly section?: ActionSection;
    readonly slug: string;
    readonly traits: AbilityTrait[];
    protected constructor(data: BaseActionData<TData>);
    get glyph(): string;
    get variants(): Collection<TAction>;
    protected getDefaultVariant(options?: {
        variant?: string;
    }): TAction;
    toMessage(options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined>;
    use(options?: Partial<ActionUseOptions>): Promise<unknown>;
    protected abstract toActionVariant(data?: TData): TAction;
}
export { BaseAction, BaseActionVariant };
export type { BaseActionData, BaseActionVariantData };
