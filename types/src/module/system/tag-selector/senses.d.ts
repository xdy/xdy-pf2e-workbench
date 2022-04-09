/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor/index";
import { TagSelectorBase } from "./base";
import { SelectableTagField } from ".";
export declare class SenseSelector extends TagSelectorBase<ActorPF2e> {
    objectProperty: string;
    static get defaultOptions(): import("./base").TagSelectorOptions & {
        template: string;
        title: string;
    };
    protected get configTypes(): readonly SelectableTagField[];
    getData(): any;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: SenseFormData): Promise<void>;
    protected getUpdateData(formData: SenseFormData): SenseUpdateData[];
}
declare type SenseFormData = Record<string, [boolean, string, string?] | boolean>;
interface SenseUpdateData {
    type: string;
    acuity?: string;
    value?: number;
}
export {};
