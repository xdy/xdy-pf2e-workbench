import { CheckContext, CheckContextData, CheckContextOptions, CheckResultCallback } from "@system/action-macros/types";
import { ActionUseOptions } from "./types";
import { ModifierPF2e } from "@actor/modifiers";
import { CheckDC } from "@system/degree-of-success";
import { RollNoteSource } from "@module/notes";
import { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData } from "./base";
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
type SingleCheckActionRollNoteData = Omit<RollNoteSource, "selector"> & {
    selector?: string;
};
interface SingleCheckActionVariantData extends BaseActionVariantData {
    difficultyClass?: CheckDC | string;
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic?: string;
}
interface SingleCheckActionData extends BaseActionData<SingleCheckActionVariantData> {
    difficultyClass?: CheckDC | string;
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic: string;
}
interface SingleCheckActionRollOptions extends ActionUseOptions {
    actors: ActorPF2e | ActorPF2e[];
    difficultyClass: CheckDC | string;
    modifiers: ModifierPF2e[];
    multipleAttackPenalty: number;
    notes: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic: string;
}
declare class SingleCheckActionVariant extends BaseActionVariant {
    #private;
    constructor(action: SingleCheckAction, data?: SingleCheckActionVariantData);
    get difficultyClass(): string | CheckDC | undefined;
    get notes(): RollNoteSource[];
    get rollOptions(): string[];
    get statistic(): string;
    use(options?: Partial<SingleCheckActionRollOptions>): Promise<CheckResultCallback>;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckContext<ItemType> | undefined;
}
declare class SingleCheckAction extends BaseAction<SingleCheckActionVariantData, SingleCheckActionVariant> {
    readonly difficultyClass?: CheckDC | string;
    readonly notes: RollNoteSource[];
    readonly rollOptions: string[];
    readonly statistic: string;
    constructor(data: SingleCheckActionData);
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
export { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData };
