import { ActorPF2e } from "@actor/base";
interface MoveLootOptions extends FormApplicationOptions {
    maxQuantity: number;
    newStack: boolean;
    lockStack: boolean;
}
interface MoveLootFormData extends FormData {
    quantity: number;
    newStack: boolean;
}
declare type MoveLootCallback = (quantity: number, newStack: boolean) => void;
export declare class MoveLootPopup extends FormApplication<{}, MoveLootOptions> {
    onSubmitCallback: MoveLootCallback;
    constructor(object: ActorPF2e, options: Partial<MoveLootOptions>, callback: MoveLootCallback);
    getData(): Promise<{
        maxQuantity: number;
        newStack: boolean;
        lockStack: boolean;
        object?: object | {} | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    }>;
    static get defaultOptions(): MoveLootOptions;
    _updateObject(_event: ElementDragEvent, formData: Record<string, unknown> & MoveLootFormData): Promise<void>;
}
export {};
