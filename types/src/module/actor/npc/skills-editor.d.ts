/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type { NPCPF2e } from "@actor";
import { NPCSkillData } from "@actor/npc/data";
/** Specialized form to setup skills for an NPC character. */
export declare class NPCSkillsEditor extends FormApplication<NPCPF2e> {
    get npc(): NPCPF2e;
    static get defaultOptions(): FormApplicationOptions;
    /** Prepare data to be sent to HTML. */
    getData(): {
        trainedSkills: Record<string, NPCSkillData>;
        untrainedSkills: Record<string, NPCSkillData>;
        object?: object | NPCPF2e | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    } | {
        trainedSkills: Record<string, NPCSkillData>;
        untrainedSkills: Record<string, NPCSkillData>;
        then<TResult1 = FormApplicationData<NPCPF2e>, TResult2 = never>(onfulfilled?: ((value: FormApplicationData<NPCPF2e>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<FormApplicationData<NPCPF2e> | TResult>;
        finally(onfinally?: (() => void) | null | undefined): Promise<FormApplicationData<NPCPF2e>>;
        [Symbol.toStringTag]: string;
    };
    activateListeners($html: JQuery): void;
    private onClickAddSkill;
    private onClickRemoveSkill;
    private onClickAddLoreSkill;
    private onClickEditSkill;
    /**
     * Apply changes to the actor based on the data in the form.
     * @param event
     * @param formData
     */
    _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
    private isLoreSkill;
    /**
     * Checks if a skill is a regular skill or not.
     * @param skillId ID of the skill to check.
     */
    private isRegularSkill;
    /**
     * Converts from the 3-letter ID to the full, lower-letter name.
     * @param skillId ID of the skill.
     */
    private findSkillName;
    /**
     * Finds the skill item related to the skill provided.
     * Each skill in the characters has an item in the items collection
     * defining the skill. They are of 'lore' type, even for non-lore skills.
     * @param skillId ID of the skill to search for.
     */
    private findSkillItem;
}
