/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { IdentifyAlchemyDCs, IdentifyMagicDCs, GenericIdentifyDCs } from "@item/identification";
import { PhysicalItemPF2e } from "@item/physical";
export declare class IdentifyItemPopup extends FormApplication<PhysicalItemPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    get item(): PhysicalItemPF2e;
    getData(): Promise<IdentifyPopupData>;
    activateListeners($form: JQuery<HTMLFormElement>): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface IdentifyPopupData extends FormApplicationData {
    isMagic: boolean;
    isAlchemical: boolean;
    dcs: GenericIdentifyDCs | IdentifyMagicDCs | IdentifyAlchemyDCs;
}
export {};
