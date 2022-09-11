import { ItemPF2e } from "@item/base";
import { RuleElementSource } from "@module/rules";
/** Utility function to convert a value to a number if its a valid number */
declare function coerceNumber<T extends string | unknown>(value: T): T | number;
/** Base Rule Element form handler. Form handlers intercept sheet events to support new UI */
declare class RuleElementForm<TSource extends RuleElementSource = RuleElementSource> {
    protected item: ItemPF2e;
    protected index: number;
    protected rule: TSource;
    template: string;
    constructor(item: ItemPF2e, index: number, rule: TSource);
    getData(): Promise<{
        index: number;
        rule: TSource;
    }>;
    render(): Promise<string>;
    /**
     * Helper to update the item with the new rule data.
     * This function exists because array updates in foundry are currently clunky
     */
    updateItem(updates: Partial<TSource>): void;
    activateListeners(_html: HTMLElement): void;
    _updateObject(_formData: Partial<Record<string, unknown>>): void;
}
export { RuleElementForm, coerceNumber };
