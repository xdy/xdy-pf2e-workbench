/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { MovementType } from "@actor/types.ts";
import { BaseTagSelector, type TagSelectorData } from "./base.ts";
import type { SelectableTagField, TagSelectorOptions } from "./index.ts";
declare class SpeedSelector<TActor extends ActorPF2e> extends BaseTagSelector<TActor> {
    static get defaultOptions(): TagSelectorOptions;
    protected objectProperty: string;
    choices: Omit<Record<"land" | "burrow" | "climb" | "fly" | "swim", string>, "land">;
    protected get configTypes(): readonly SelectableTagField[];
    getData(options?: Partial<TagSelectorOptions>): Promise<SpeedSelectorData<TActor>>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface SpeedSelectorData<TActor extends ActorPF2e> extends TagSelectorData<TActor> {
    hasExceptions: boolean;
    choices: Record<Exclude<MovementType, "land">, ChoiceData>;
}
interface ChoiceData {
    selected: boolean;
    disabled: boolean;
    label: string;
    value: number | string;
}
export { SpeedSelector };
