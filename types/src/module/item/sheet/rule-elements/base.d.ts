import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item/base.ts";
import { RuleElementPF2e, RuleElementSource } from "@module/rules/index.ts";
import { RuleElementSchema } from "@module/rules/rule-element/data.ts";
import { LaxSchemaField } from "@system/schema-data-fields.ts";
interface RuleElementFormOptions<TSource extends RuleElementSource, TObject extends RuleElementPF2e> {
    item: ItemPF2e<ActorPF2e>;
    index: number;
    rule: TSource;
    object: TObject | null;
}
/** Base Rule Element form handler. Form handlers intercept sheet events to support new UI */
declare class RuleElementForm<TSource extends RuleElementSource = RuleElementSource, TObject extends RuleElementPF2e = RuleElementPF2e> {
    #private;
    protected options: RuleElementFormOptions<TSource, TObject>;
    template: string;
    readonly item: ItemPF2e<ActorPF2e>;
    readonly index: number;
    readonly rule: TSource;
    readonly object: TObject | null;
    schema: LaxSchemaField<RuleElementSchema> | null;
    /** Base proprety path for the contained rule */
    get basePath(): string;
    constructor(options: RuleElementFormOptions<TSource, TObject>);
    getData(): Promise<RuleElementFormSheetData<TSource, TObject>>;
    render(): Promise<string>;
    /**
     * Helper to update the item with the new rule data.
     * This function exists because array updates in foundry are currently clunky
     */
    updateItem(updates: Partial<TSource> | Record<string, unknown>): void;
    activateListeners(html: HTMLElement): void;
    updateObject(formData: Partial<RuleElementSource> & Record<string, unknown>): void;
}
interface RuleElementFormSheetData<TSource extends RuleElementSource, TObject extends RuleElementPF2e> extends RuleElementFormOptions<TSource, TObject> {
    label: string;
    recognized: boolean;
    basePath: string;
    /** A collection of additional handlebars functions */
    form: Record<string, unknown>;
}
export { RuleElementForm };
export type { RuleElementFormSheetData };
