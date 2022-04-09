/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { TagSelectorBase } from "./base";
import { SelectableTagField } from ".";
export declare class WeaknessSelector extends TagSelectorBase<ActorPF2e> {
    objectProperty: string;
    static get defaultOptions(): import("./base").TagSelectorOptions & {
        template: string;
        title: string;
    };
    private get actor();
    protected get configTypes(): readonly SelectableTagField[];
    getData(): any;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    protected getUpdateData(formData: Record<string, unknown>): Record<string, unknown>[];
}
