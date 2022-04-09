import { CreatureTrait, Language } from "@actor/creature/data";
import { AbilityString } from "@actor/data/base";
import { ABCSystemData } from "@item/abc/data";
import { ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { Size, ValuesList } from "@module/data";
import type { AncestryPF2e } from ".";
export declare type AncestrySource = BaseNonPhysicalItemSource<"ancestry", AncestrySystemData>;
export declare class AncestryData extends BaseNonPhysicalItemData<AncestryPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface AncestryData extends Omit<AncestrySource, "effects" | "flags"> {
    type: AncestrySource["type"];
    data: AncestrySource["data"];
    readonly _source: AncestrySource;
}
export declare type CreatureTraits = ItemTraits<CreatureTrait>;
export interface AncestrySystemData extends ABCSystemData {
    traits: CreatureTraits;
    additionalLanguages: {
        count: number;
        value: string[];
        custom: string;
    };
    boosts: {
        [key: string]: {
            value: AbilityString[];
        };
    };
    flaws: {
        [key: string]: {
            value: AbilityString[];
        };
    };
    hp: number;
    languages: ValuesList<Language>;
    speed: number;
    size: Size;
    reach: number;
    vision: "normal" | "darkvision" | "lowLightVision";
}
