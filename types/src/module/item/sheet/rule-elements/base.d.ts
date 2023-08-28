import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item/base.ts";
import { RuleElementPF2e, RuleElementSource } from "@module/rules/index.ts";
/** Utility function to convert a value to a number if its a valid number */
declare function coerceNumber<T extends string | unknown>(value: T): T | number;
interface RuleElementFormOptions<TSource extends RuleElementSource, TObject extends RuleElementPF2e> {
    item: ItemPF2e<ActorPF2e>;
    index: number;
    rule: TSource;
    object: TObject | null;
}
/** Base Rule Element form handler. Form handlers intercept sheet events to support new UI */
declare class RuleElementForm<TSource extends RuleElementSource = RuleElementSource, TObject extends RuleElementPF2e = RuleElementPF2e> {
    protected options: RuleElementFormOptions<TSource, TObject>;
    template: string;
    readonly item: ItemPF2e<ActorPF2e>;
    readonly index: number;
    readonly rule: TSource;
    readonly object: TObject | null;
    constructor(options: RuleElementFormOptions<TSource, TObject>);
    getData(): Promise<RuleElementFormSheetData<TSource, TObject>>;
    render(): Promise<string>;
    /**
     * Helper to update the item with the new rule data.
     * This function exists because array updates in foundry are currently clunky
     */
    updateItem(updates: Partial<TSource>): void;
    activateListeners(html: HTMLElement): void;
    updateObject(_formData: Record<string, unknown>): void;
}
type RuleElementFormSheetData<TSource extends RuleElementSource, TObject extends RuleElementPF2e> = RuleElementFormOptions<TSource, TObject>;
export { RuleElementForm, RuleElementFormSheetData, coerceNumber };
