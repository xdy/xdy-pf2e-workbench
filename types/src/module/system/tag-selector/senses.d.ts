/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { SenseAcuity, SenseType } from "@actor/creature/types.ts";
import { BaseTagSelector, TagSelectorData, TagSelectorOptions } from "./base.ts";
import { SelectableTagField } from "./index.ts";
declare class SenseSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    protected objectProperty: string;
    static get defaultOptions(): TagSelectorOptions;
    protected get configTypes(): readonly SelectableTagField[];
    getData(options?: Partial<TagSelectorOptions>): Promise<SenseSelectorData<TActor>>;
    activateListeners($html: JQuery): void;
    /** Clear checkboxes with empty range inputs */
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions | undefined): Promise<Record<string, unknown> | false>;
    protected _updateObject(event: Event, formData: SenseFormData): Promise<void>;
}
interface SenseSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    choices: Record<SenseType, string>;
}
interface SenseSelectorData<TActor extends ActorPF2e> extends TagSelectorData<TActor> {
    hasExceptions: boolean;
    choices: Record<string, SenseChoiceData>;
    senseAcuities: typeof CONFIG.PF2E.senseAcuities;
    vision: {
        value: boolean;
        editable: boolean;
        source: string | null;
    };
}
interface SenseChoiceData {
    selected: boolean;
    acuity: SenseAcuity;
    label: string;
    range: number | null;
    canSetAcuity: boolean;
    canSetRange: boolean;
    source: string | null;
}
type SenseFormData = {
    "system.perception.vision"?: boolean;
} & Record<string, [boolean, string, number | null]>;
export { SenseSelector };
