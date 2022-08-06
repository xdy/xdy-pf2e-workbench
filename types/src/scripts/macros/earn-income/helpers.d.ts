/// <reference types="jquery" />
import { CharacterPF2e } from "@actor";
import { SkillAbbreviation } from "@actor/creature/data";
import { ZeroToFour } from "@module/data";
import { TrainedProficiency } from "./calculate";
declare function runEarnIncome({ actor, event, skill, level, days }: RunEarnIncomeParams): void;
interface RunEarnIncomeParams {
    actor: CharacterPF2e;
    event: JQuery.TriggeredEvent | undefined;
    skill: SkillBrief;
    level: number;
    days: number;
}
declare function getSkills(actor: CharacterPF2e): SkillBrief[];
declare function askSkillPopupTemplate(skills: SkillBrief[]): string;
interface SkillBrief {
    acronym: SkillAbbreviation;
    name: string;
    isLore: boolean;
    proficiency: TrainedProficiency;
    rank: ZeroToFour;
}
export { askSkillPopupTemplate, getSkills, runEarnIncome };
