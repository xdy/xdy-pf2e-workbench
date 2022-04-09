import { CreatureAttributes, BaseCreatureData, BaseCreatureSource, CreatureSystemData, SkillAbbreviation, CreatureSystemSource, CreatureTraitsData } from "@actor/creature/data";
import { AbilityString, Rollable } from "@actor/data/base";
import { StatisticModifier } from "@actor/modifiers";
import type { FamiliarPF2e } from ".";
export declare type FamiliarSource = BaseCreatureSource<"familiar", FamiliarSystemSource>;
export declare class FamiliarData extends BaseCreatureData<FamiliarPF2e, FamiliarSystemData> {
    static DEFAULT_ICON: ImagePath;
}
export interface FamiliarData extends Omit<FamiliarSource, "effects" | "flags" | "items" | "token"> {
    readonly type: FamiliarSource["type"];
    data: FamiliarSystemData;
    readonly _source: FamiliarSource;
}
export interface FamiliarSystemSource extends Pick<CreatureSystemSource, "schema"> {
    details: {
        creature: {
            value: string;
        };
    };
    attributes: {
        hp: {
            value: number;
        };
    };
    master: {
        id: string | null;
        ability: AbilityString | null;
    };
}
/** The raw information contained within the actor data object for familiar actors. */
export interface FamiliarSystemData extends Omit<FamiliarSystemSource, "toggles" | "traits">, CreatureSystemData {
    details: CreatureSystemData["details"] & {
        creature: {
            value: string;
        };
    };
    actions?: undefined;
    attack: StatisticModifier & Rollable;
    attributes: FamiliarAttributes;
    skills: FamiliarSkills;
    master: {
        id: string | null;
        ability: AbilityString | null;
    };
    traits: CreatureTraitsData;
}
interface FamiliarAttributes extends CreatureAttributes {
    ac: {
        value: number;
        breakdown: string;
        check?: number;
    };
    perception: FamiliarPerception;
}
declare type FamiliarPerception = {
    value: number;
} & StatisticModifier & Rollable;
declare type FamiliarSkill = StatisticModifier & Rollable & {
    value: number;
};
declare type FamiliarSkills = Record<SkillAbbreviation, FamiliarSkill>;
export {};
