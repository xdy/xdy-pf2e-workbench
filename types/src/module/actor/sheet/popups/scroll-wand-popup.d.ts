import { ActorPF2e } from "@actor/index";
import { SpellPF2e } from "@item";
export declare class ScrollWandPopup extends FormApplication<ActorPF2e> {
    onSubmitCallback: ScrollWandCallback;
    spell?: SpellPF2e;
    constructor(object: ActorPF2e, options: Partial<FormApplicationOptions>, callback: ScrollWandCallback, spell: SpellPF2e);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<FormApplicationData<ActorPF2e>>;
    _updateObject(_event: Event, formData: {
        itemType: string;
        level: number;
    }): Promise<void>;
}
declare type ScrollWandCallback = (level: number, itemType: string, spell: SpellPF2e) => Promise<void>;
export {};
