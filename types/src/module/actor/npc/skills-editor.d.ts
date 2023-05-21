/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { NPCPF2e } from "@actor";
import { NPCSkillData } from "@actor/npc/data.ts";
/** Specialized form to setup skills for an NPC character. */
export declare class NPCSkillsEditor extends FormApplication<NPCPF2e> {
    #private;
    get npc(): NPCPF2e;
    static get defaultOptions(): FormApplicationOptions;
    /** Prepare data to be sent to HTML. */
    getData(): Promise<EditorData>;
    activateListeners($html: JQuery): void;
    /**
     * Apply changes to the actor based on the data in the form.
     * @param event
     * @param formData
     */
    _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface EditorData extends FormApplicationData {
    trainedSkills: Record<string, NPCSkillData>;
    untrainedSkills: Record<string, NPCSkillData>;
}
export {};
