/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { IdentifyAlchemyDCs, IdentifyMagicDCs } from "@item/identification";
import { PhysicalItemPF2e } from "@item/physical";
export declare class IdentifyItemPopup extends FormApplication<PhysicalItemPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    get item(): PhysicalItemPF2e;
    getData(): Promise<{
        isMagic: boolean;
        isAlchemical: boolean;
        dcs: IdentifyMagicDCs | IdentifyAlchemyDCs | import("@item/identification").GenericIdentifyDCs;
        object?: object | PhysicalItemPF2e | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    }>;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
