import { ActorPF2e } from "@actor/base";
declare class MoveLootPopup extends FormApplication<{}, MoveLootOptions> {
    onSubmitCallback: MoveLootCallback;
    constructor(object: ActorPF2e, options: Partial<MoveLootOptions>, callback: MoveLootCallback);
    getData(): Promise<{
        maxQuantity: number;
        newStack: boolean;
        lockStack: boolean;
        prompt: string;
        buttonLabel: string;
        object?: object | {} | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    }>;
    static get defaultOptions(): MoveLootOptions;
    _updateObject(_event: ElementDragEvent, formData: Record<string, unknown> & MoveLootFormData): Promise<void>;
}
interface MoveLootOptions extends FormApplicationOptions {
    maxQuantity: number;
    newStack: boolean;
    lockStack: boolean;
    isPurchase: boolean;
}
interface MoveLootFormData extends FormData {
    quantity: number;
    newStack: boolean;
}
type MoveLootCallback = (quantity: number, newStack: boolean) => void;
export { MoveLootPopup };
