import { ActorPF2e } from "@actor/base.ts";
declare class MoveLootPopup extends FormApplication<{}, MoveLootOptions> {
    onSubmitCallback: MoveLootCallback;
    constructor(object: ActorPF2e, options: Partial<MoveLootOptions>, callback: MoveLootCallback);
    getData(): Promise<PopupData>;
    static get defaultOptions(): MoveLootOptions;
    _updateObject(_event: DragEvent, formData: Record<string, unknown> & MoveLootFormData): Promise<void>;
}
interface MoveLootOptions extends FormApplicationOptions {
    quantity: {
        default: number;
        max: number;
    };
    newStack: boolean;
    lockStack: boolean;
    isPurchase: boolean;
}
interface MoveLootFormData extends FormData {
    quantity: number;
    newStack: boolean;
}
interface PopupData extends FormApplicationData {
    quantity: {
        default: number;
        max: number;
    };
    newStack: boolean;
    lockStack: boolean;
    prompt: string;
    buttonLabel: string;
}
type MoveLootCallback = (quantity: number, newStack: boolean) => void;
export { MoveLootPopup };
