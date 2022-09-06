/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { BaseTagSelector } from "./base";
import { SelectableTagField } from ".";
export declare class WeaknessSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    protected objectProperty: string;
    static get defaultOptions(): FormApplicationOptions;
    private get actor();
    protected get configTypes(): readonly SelectableTagField[];
    getData(): Promise<WeaknessSelectorData<TActor>>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface WeaknessSelectorData<TActor extends ActorPF2e> extends FormApplicationData<TActor> {
    choices: Record<string, ChoiceData>;
    hasExceptions: boolean;
}
interface ChoiceData {
    label: string;
    selected: boolean;
    value: number;
    exceptions: string;
}
export {};
