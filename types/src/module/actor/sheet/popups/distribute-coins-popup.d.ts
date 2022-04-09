import { ActorPF2e } from "../../base";
interface PopupData extends FormApplicationData<ActorPF2e> {
    selection?: string[];
    actorInfo?: {
        id: string;
        name: string;
        checked: boolean;
    }[];
}
interface PopupFormData extends FormData {
    actorIds: string[];
    breakCoins: boolean;
}
/**
 * @category Other
 */
export declare class DistributeCoinsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    _updateObject(_event: Event, formData: Record<string, unknown> & PopupFormData): Promise<void>;
    /** Prevent Foundry from converting the actor IDs to boolean values */
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions): Promise<Record<string, unknown>>;
    getData(): Promise<PopupData>;
}
export {};
