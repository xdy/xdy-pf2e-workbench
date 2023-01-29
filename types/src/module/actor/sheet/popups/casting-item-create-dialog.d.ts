import { ActorPF2e } from "@actor/index";
import { SpellPF2e } from "@item";
import { SpellConsumableItemType } from "@item/consumable/spell-consumables";
import { OneToTen } from "@module/data";
interface FormInputData extends FormApplicationData<ActorPF2e> {
    itemTypeOptions?: Object;
    validLevels?: number[];
    itemType?: SpellConsumableItemType;
    level?: OneToTen;
}
type FormOutputData = {
    itemType: SpellConsumableItemType;
    level: OneToTen;
};
export declare class CastingItemCreateDialog extends FormApplication<ActorPF2e> {
    onSubmitCallback: CastingItemCreateCallback;
    spell: SpellPF2e;
    formDataCache: FormOutputData;
    constructor(object: ActorPF2e, options: Partial<FormApplicationOptions>, callback: CastingItemCreateCallback, spell: SpellPF2e);
    static get defaultOptions(): FormApplicationOptions;
    getData(): Promise<FormInputData>;
    _updateObject(event: Event, formData: FormOutputData): Promise<void>;
}
type CastingItemCreateCallback = (level: OneToTen, itemType: SpellConsumableItemType, spell: SpellPF2e) => Promise<void>;
export {};
