/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { SelectableTagField } from ".";
import { TagSelectorBase } from "./base";
export declare class ResistanceSelector extends TagSelectorBase<ActorPF2e> {
    objectProperty: string;
    static get defaultOptions(): FormApplicationOptions;
    private get actor();
    protected get configTypes(): readonly SelectableTagField[];
    getData(): any;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    protected getUpdateData(formData: Record<string, unknown>): Record<string, unknown>[];
}
