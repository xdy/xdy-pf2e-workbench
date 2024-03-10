import { ItemPF2e } from "@item";
import { type RuleElementPF2e, type RuleElementSource } from "@module/rules/index.ts";
import { RuleElementSchema } from "@module/rules/rule-element/data.ts";
import type { LaxSchemaField } from "@system/schema-data-fields.ts";
import type { ItemSheetPF2e } from "../index.ts";
interface RuleElementFormOptions<TSource extends RuleElementSource, TObject extends RuleElementPF2e | null> {
    sheet: ItemSheetPF2e<ItemPF2e>;
    index: number;
    rule: TSource;
    object: TObject;
}
/** Base Rule Element form handler. Form handlers intercept sheet events to support new UI */
declare class RuleElementForm<TSource extends RuleElementSource = RuleElementSource, TObject extends RuleElementPF2e | null = RuleElementPF2e | null> {
    #private;
    template: string;
    sheet: ItemSheetPF2e<ItemPF2e>;
    index: number;
    rule: TSource;
    object: TObject;
    schema: LaxSchemaField<RuleElementSchema> | null;
    element: HTMLElement;
    /** Tab configuration data */
    protected tabs: RuleElementFormTabData | null;
    /** Base proprety path for the contained rule */
    get basePath(): string;
    constructor(options: RuleElementFormOptions<TSource, TObject>);
    initialize(options: RuleElementFormOptions<TSource, TObject>): void;
    get item(): ItemPF2e;
    get fieldIdPrefix(): string;
    /** Returns the initial value of the schema. Arrays are stripped due to how they're handled in forms */
    protected getInitialValue(): object;
    getData(): Promise<RuleElementFormSheetData<TSource, TObject>>;
    render(): Promise<string>;
    /**
     * Helper to update the item with the new rule data.
     * This function exists because array updates in foundry are currently clunky
     */
    updateItem(updates: Partial<TSource> | Record<string, JSONValue>): Promise<void>;
    activateListeners(html: HTMLElement): void;
    protected onDrop(event: DragEvent, _element: HTMLElement): Promise<ItemPF2e | null>;
    protected activateTab(html: HTMLElement, tabName: Maybe<string>): void;
    updateObject(source: TSource & Partial<Record<string, JSONValue>>): void;
}
interface RuleElementFormSheetData<TSource extends RuleElementSource, TObject extends RuleElementPF2e | null> extends Omit<RuleElementFormOptions<TSource, TObject>, "sheet"> {
    item: ItemPF2e;
    label: string;
    /** A prefix for use in label-input/select pairs */
    fieldIdPrefix: string;
    recognized: boolean;
    basePath: string;
    fields: RuleElementSchema | undefined;
    /** A collection of additional handlebars functions */
    form: Record<string, unknown>;
    validationFailures: string[];
}
interface RuleElementFormTabData {
    /** Valid tab names for this form */
    names: string[];
    /** The display style applied to active tabs */
    displayStyle: "block" | "flex" | "grid";
}
export { RuleElementForm };
export type { RuleElementFormOptions, RuleElementFormSheetData, RuleElementFormTabData };
