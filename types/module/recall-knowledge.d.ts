/**
 * Implementation of Creature Identification
 * https://2e.aonprd.com/Rules.aspx?ID=566
 * https://2e.aonprd.com/Skills.aspx?ID=5&General=true
 *
 * See https://www.youtube.com/watch?v=UtNS1vM7czM for interpretations
 */
import { SkillAbbreviation } from "@actor/creature/data";
import { NPCSystemData } from "@actor/npc/data";
import { DCAdjustment, DCOptions } from "./dc";
export interface RecallKnowledgeDC {
    dc: number;
    progression: number[];
    start: DCAdjustment;
}
export interface IdentifyCreatureData {
    skill: RecallKnowledgeDC;
    specificLoreDC: RecallKnowledgeDC;
    unspecificLoreDC: RecallKnowledgeDC;
    skills: Set<SkillAbbreviation>;
}
export declare function identifyCreature(creature: {
    data: NPCSystemData;
}, { proficiencyWithoutLevel }?: DCOptions): IdentifyCreatureData;
