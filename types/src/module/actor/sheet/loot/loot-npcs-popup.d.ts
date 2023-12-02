import type { ActorPF2e } from "@actor";
declare class LootNPCsPopup extends FormApplication<ActorPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<PopupData>;
    _updateObject(_event: Event, formData: Record<string, unknown> & {
        selection?: boolean;
    }): Promise<void>;
}
interface PopupData extends FormApplicationData<ActorPF2e> {
    tokenInfo: {
        id: string;
        name: string;
        checked: boolean;
    }[];
}
export { LootNPCsPopup };
