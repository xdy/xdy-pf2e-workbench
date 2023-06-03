import { CheckContext, CheckContextData, CheckContextOptions, CheckResultCallback } from "@system/action-macros/types.ts";
import { ActionUseOptions } from "./types.ts";
import { ModifierPF2e, RawModifier } from "@actor/modifiers.ts";
import { CheckDC } from "@system/degree-of-success.ts";
import { Statistic } from "@system/statistic/index.ts";
import { RollNoteSource } from "@module/notes.ts";
import { BaseAction, BaseActionData, BaseActionVariant, BaseActionVariantData } from "./base.ts";
import { ActorPF2e, CreaturePF2e } from "@actor";
import { ItemPF2e } from "@item";
type SingleCheckActionRollNoteData = Omit<RollNoteSource, "selector"> & {
    selector?: string;
};
interface SingleCheckActionVariantData extends BaseActionVariantData {
    difficultyClass?: CheckDC | string;
    modifiers?: RawModifier[];
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic?: string;
}
interface SingleCheckActionData extends BaseActionData<SingleCheckActionVariantData> {
    difficultyClass?: CheckDC | string;
    modifiers?: RawModifier[];
    notes?: SingleCheckActionRollNoteData[];
    rollOptions?: string[];
    statistic: string;
}
interface SingleCheckActionUseOptions extends ActionUseOptions {
    difficultyClass: CheckDC | string;
    modifiers: ModifierPF2e[];
    multipleAttackPenalty: number;
    notes: SingleCheckActionRollNoteData[];
    rollOptions: string[];
    statistic: string;
}
declare class SingleCheckActionVariant extends BaseActionVariant {
    #private;
    constructor(action: SingleCheckAction, data?: SingleCheckActionVariantData);
    get difficultyClass(): CheckDC | string | undefined;
    get modifiers(): RawModifier[];
    get notes(): RollNoteSource[];
    get rollOptions(): string[];
    get statistic(): string;
    use(options?: Partial<SingleCheckActionUseOptions>): Promise<CheckResultCallback[]>;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckContext<ItemType> | undefined;
    protected difficultyClassWithTarget(_target: CreaturePF2e): Statistic | null;
}
declare class SingleCheckAction extends BaseAction<SingleCheckActionVariantData, SingleCheckActionVariant> {
    readonly difficultyClass?: CheckDC | string;
    readonly modifiers: RawModifier[];
    readonly notes: RollNoteSource[];
    readonly rollOptions: string[];
    readonly statistic: string;
    constructor(data: SingleCheckActionData);
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
export { SingleCheckAction, SingleCheckActionUseOptions, SingleCheckActionVariant, SingleCheckActionVariantData };
