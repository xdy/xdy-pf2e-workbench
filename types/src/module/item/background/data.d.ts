import { SkillAbbreviation } from "@actor/creature/data";
import { AbilityString } from "@actor/data/base";
import { ABCSystemData } from "@item/abc/data";
import { ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { BackgroundPF2e } from ".";
export declare type BackgroundSource = BaseNonPhysicalItemSource<"background", BackgroundSystemData>;
export declare class BackgroundData extends BaseNonPhysicalItemData<BackgroundPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface BackgroundData extends Omit<BackgroundSource, "effects" | "flags"> {
    type: BackgroundSource["type"];
    data: BackgroundSource["data"];
    readonly _source: BackgroundSource;
}
interface BackgroundSystemData extends ABCSystemData {
    traits: ItemTraits;
    boosts: {
        [key: string]: {
            value: AbilityString[];
        };
    };
    trainedLore: string;
    trainedSkills: {
        value: SkillAbbreviation[];
    };
}
export {};
