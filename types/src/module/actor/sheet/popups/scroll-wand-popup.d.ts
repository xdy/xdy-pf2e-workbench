import { ActorPF2e } from "@actor/index";
import { SpellPF2e } from "@item";
import { OneToTen } from "@module/data";
export declare class ScrollWandPopup extends FormApplication<ActorPF2e> {
    onSubmitCallback: ScrollWandCallback;
    spell?: SpellPF2e;
    constructor(object: ActorPF2e, options: Partial<FormApplicationOptions>, callback: ScrollWandCallback, spell: SpellPF2e);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<FormApplicationData<ActorPF2e>>;
    _updateObject(_event: Event, formData: {
        itemType: string;
        level: OneToTen;
    }): Promise<void>;
}
type ScrollWandCallback = (level: OneToTen, itemType: string, spell: SpellPF2e) => Promise<void>;
export {};
