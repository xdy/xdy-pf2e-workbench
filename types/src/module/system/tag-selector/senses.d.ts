/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { BaseTagSelector } from "./base.ts";
import { SelectableTagField } from "./index.ts";
export declare class SenseSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    protected objectProperty: string;
    static get defaultOptions(): FormApplicationOptions;
    protected get configTypes(): readonly SelectableTagField[];
    getData(options?: FormApplicationOptions): Promise<SenseSelectorData<TActor>>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: SenseFormData): Promise<void>;
}
interface SenseSelectorData<TActor extends ActorPF2e> extends FormApplicationData<TActor> {
    hasExceptions: boolean;
    choices: Record<string, SenseChoiceData>;
    senseAcuity: Record<string, string>;
}
interface SenseChoiceData {
    selected: boolean;
    disabled: boolean;
    acuity: string;
    mandatoryAcuity: boolean;
    label: string;
    value: string;
}
type SenseFormData = Record<string, [boolean, string, string | null] | boolean>;
export {};
