/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { BaseTagSelector } from "./base";
import { SelectableTagField } from ".";
export declare class SenseSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    protected objectProperty: string;
    static get defaultOptions(): FormApplicationOptions;
    protected get configTypes(): readonly SelectableTagField[];
    getData(): Promise<SenseSelectorData<TActor>>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: SenseFormData): Promise<void>;
}
interface SenseSelectorData<TActor extends ActorPF2e> extends FormApplicationData<TActor> {
    hasExceptions: boolean;
    choices: Record<string, SenseChoiceData>;
    senseAcuity: Record<string, string>;
}
interface SenseChoiceData {
    acuity: string;
    disabled: string;
    label: string;
    selected: boolean;
    value: string;
}
declare type SenseFormData = Record<string, [boolean, string, string | null] | boolean>;
export {};
