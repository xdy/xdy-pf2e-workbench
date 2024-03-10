import { ActorPF2e } from "@actor";
import { ModifierPF2e, RawModifier } from "@actor/modifiers.ts";
import { DCSlug } from "@actor/types.ts";
import type { ItemPF2e } from "@item";
import { RollNoteSource } from "@module/notes.ts";
import { CheckContextData, CheckContextOptions, CheckMacroContext, CheckResultCallback } from "@system/action-macros/types.ts";
import { CheckDC } from "@system/degree-of-success.ts";
import { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData } from "./base.ts";
import { ActionUseOptions } from "./types.ts";
type SingleCheckActionRollNoteData = Omit<RollNoteSource, "selector"> & {
    selector?: string;
};
interface SingleCheckActionVariantData extends BaseActionVariantData {
    difficultyClass?: CheckDC | DCSlug;
    modifiers?: RawModifier[];
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic?: string | string[];
}
interface SingleCheckActionData extends BaseActionData<SingleCheckActionVariantData> {
    difficultyClass?: CheckDC | DCSlug;
    modifiers?: RawModifier[];
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic: string | string[];
}
interface ActionVariantCheckPreviewOptions {
    actor: ActorPF2e;
}
interface ActionCheckPreviewOptions extends ActionVariantCheckPreviewOptions {
    variant: string;
}
interface ActionCheckPreview {
    label: string;
    modifier?: number;
    slug: string;
}
interface SingleCheckActionUseOptions extends ActionUseOptions {
    difficultyClass: CheckDC | DCSlug | number;
    modifiers: ModifierPF2e[];
    multipleAttackPenalty: number;
    notes: SingleCheckActionRollNoteData[];
    rollOptions: string[];
    statistic: string;
}
declare class SingleCheckActionVariant extends BaseActionVariant {
    #private;
    constructor(action: SingleCheckAction, data?: SingleCheckActionVariantData);
    get difficultyClass(): CheckDC | DCSlug | undefined;
    get modifiers(): RawModifier[];
    get notes(): RollNoteSource[];
    get rollOptions(): string[];
    get statistic(): string | string[];
    preview(options?: Partial<ActionVariantCheckPreviewOptions>): ActionCheckPreview[];
    use(options?: Partial<SingleCheckActionUseOptions>): Promise<CheckResultCallback[]>;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckMacroContext<ItemType> | undefined;
    protected toActionCheckPreview(args: {
        actor?: ActorPF2e;
        rollOptions: string[];
        slug: string;
    }): ActionCheckPreview | null;
}
declare class SingleCheckAction extends BaseAction<SingleCheckActionVariantData, SingleCheckActionVariant> {
    readonly difficultyClass?: CheckDC | DCSlug;
    readonly modifiers: RawModifier[];
    readonly notes: RollNoteSource[];
    readonly rollOptions: string[];
    readonly statistic: string | string[];
    constructor(data: SingleCheckActionData);
    preview(options?: Partial<ActionCheckPreviewOptions>): ActionCheckPreview[];
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
export { SingleCheckAction, SingleCheckActionVariant };
export type { ActionCheckPreview, SingleCheckActionUseOptions, SingleCheckActionVariantData };
