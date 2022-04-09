import { AbilityString } from "@actor/data/base";
import { ABCSystemData } from "@item/abc/data";
import { ItemTraits } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { ZeroToFour } from "@module/data";
import type { ClassPF2e } from ".";
export declare type ClassSource = BaseNonPhysicalItemSource<"class", ClassSystemData>;
export declare class ClassData extends BaseNonPhysicalItemData<ClassPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ClassData extends Omit<ClassSource, "effects" | "flags"> {
    type: ClassSource["type"];
    data: ClassSource["data"];
    readonly _source: ClassSource;
}
interface ClassSystemData extends ABCSystemData {
    traits: ItemTraits;
    keyAbility: {
        value: AbilityString[];
    };
    hp: number;
    perception: ZeroToFour;
    savingThrows: {
        fortitude: ZeroToFour;
        reflex: ZeroToFour;
        will: ZeroToFour;
    };
    attacks: {
        simple: ZeroToFour;
        martial: ZeroToFour;
        advanced: ZeroToFour;
        unarmed: ZeroToFour;
        other: {
            name: string;
            rank: ZeroToFour;
        };
    };
    defenses: {
        unarmored: ZeroToFour;
        light: ZeroToFour;
        medium: ZeroToFour;
        heavy: ZeroToFour;
    };
    trainedSkills: {
        value: string[];
        additional: number;
    };
    classDC: ZeroToFour;
    ancestryFeatLevels: {
        value: number[];
    };
    classFeatLevels: {
        value: number[];
    };
    generalFeatLevels: {
        value: number[];
    };
    skillFeatLevels: {
        value: number[];
    };
    skillIncreaseLevels: {
        value: number[];
    };
    abilityBoostLevels: {
        value: number[];
    };
}
export declare const CLASS_TRAITS: readonly ["alchemist", "barbarian", "bard", "champion", "cleric", "druid", "fighter", "gunslinger", "inventor", "investigator", "magus", "monk", "oracle", "ranger", "rogue", "sorcerer", "summoner", "swashbuckler", "witch", "wizard"];
export declare type ClassTrait = typeof CLASS_TRAITS[number];
export {};
