import { ActivatedEffectData, BasePhysicalItemData, BasePhysicalItemSource, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "@item/physical/data";
import { SpellSource } from "@item/spell/data";
import type { ConsumablePF2e } from ".";
export declare type ConsumableSource = BasePhysicalItemSource<"consumable", ConsumableSystemSource>;
export declare class ConsumableData extends BasePhysicalItemData<ConsumablePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ConsumableData extends Omit<ConsumableSource, "effects" | "flags"> {
    type: ConsumableSource["type"];
    data: ConsumableSystemData;
    readonly _source: ConsumableSource;
}
export declare type ConsumableType = keyof ConfigPF2e["PF2E"]["consumableTypes"];
export declare type ConsumableTrait = keyof ConfigPF2e["PF2E"]["consumableTraits"];
declare type ConsumableTraits = PhysicalItemTraits<ConsumableTrait>;
interface ConsumableSystemSource extends PhysicalSystemSource, ActivatedEffectData {
    traits: ConsumableTraits;
    consumableType: {
        value: ConsumableType;
    };
    uses: {
        value: number;
        max: number;
        per: any;
        autoUse: boolean;
        autoDestroy: boolean;
    };
    charges: {
        value: number;
        max: number;
    };
    consume: {
        value: string;
        _deprecated: boolean;
    };
    autoUse: {
        value: boolean;
    };
    autoDestroy: {
        value: boolean;
        _deprecated: boolean;
    };
    spell: {
        data?: SpellSource | null;
        heightenedLevel?: number | null;
    };
}
declare type ConsumableSystemData = ConsumableSystemSource & PhysicalSystemData;
export {};
