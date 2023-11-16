import type { ActorPF2e } from "@actor";
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
export declare class DistributeCoinsPopup extends FormApplication<ActorPF2e, DistributeCoinsOptions> {
    constructor(actor: ActorPF2e, options?: Partial<DistributeCoinsOptions>);
    static get defaultOptions(): FormApplicationOptions;
    getData(options?: Partial<DistributeCoinsOptions>): Promise<PopupData>;
    _updateObject(_event: Event, formData: Record<string, unknown> & PopupFormData): Promise<void>;
    /** Prevent Foundry from converting the actor IDs to boolean values */
    protected _onSubmit(event: Event, options?: OnSubmitFormOptions): Promise<Record<string, unknown> | false>;
}
interface DistributeCoinsOptions extends FormApplicationOptions {
    /** An optional initial list of recipients to receive coins */
    recipients?: ActorPF2e[];
}
export {};
