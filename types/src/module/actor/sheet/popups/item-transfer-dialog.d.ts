/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { PhysicalItemPF2e } from "@item";
declare class ItemTransferDialog extends FormApplication<PhysicalItemPF2e, MoveLootOptions> {
    #private;
    static get defaultOptions(): MoveLootOptions;
    get title(): string;
    get item(): PhysicalItemPF2e;
    getData(): Promise<PopupData>;
    /**
     * Shows the dialog and resolves how many to transfer and what action to perform.
     * In situations where there are no choices (quantity is 1 and its a player purchasing), this returns immediately.
     */
    resolve(): Promise<MoveLootFormData | null>;
    activateListeners($html: JQuery<HTMLElement>): void;
    _updateObject(event: SubmitEvent, formData: Record<string, unknown> & MoveLootFormData): Promise<void>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
}
interface MoveLootOptions extends FormApplicationOptions {
    targetActor?: ActorPF2e;
    newStack: boolean;
    lockStack: boolean;
    isPurchase: boolean;
}
interface MoveLootFormData {
    quantity: number;
    newStack: boolean;
    isPurchase: boolean;
}
interface PopupData extends FormApplicationData {
    item: PhysicalItemPF2e;
    quantity: number;
    canGift: boolean;
    newStack: boolean;
    lockStack: boolean;
    prompt: string;
}
export { ItemTransferDialog };
