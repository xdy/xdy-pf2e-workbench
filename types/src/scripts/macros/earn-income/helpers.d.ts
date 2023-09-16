/// <reference types="jquery" resolution-mode="require"/>
import type { CharacterPF2e } from "@actor";
import type { Statistic } from "@system/statistic/index.ts";
declare function runEarnIncome({ actor, event, skill, level, days }: RunEarnIncomeParams): void;
interface RunEarnIncomeParams {
    actor: CharacterPF2e;
    event: JQuery.TriggeredEvent | undefined;
    skill: Statistic;
    level: number;
    days: number;
}
declare function askSkillPopupTemplate(skills: Statistic[]): string;
export { askSkillPopupTemplate, runEarnIncome };
