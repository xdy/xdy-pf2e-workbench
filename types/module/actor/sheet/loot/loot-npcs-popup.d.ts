import { ActorPF2e } from "@actor/base";
interface PopupData extends FormApplicationData<ActorPF2e> {
    tokenInfo: Array<{
        id: string;
        name: string;
        checked: boolean;
    }>;
}
export declare class LootNPCsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    _updateObject(_event: Event, formData: Record<string, unknown> & {
        selection?: boolean;
    }): Promise<void>;
    getData(): Promise<PopupData>;
}
export {};
