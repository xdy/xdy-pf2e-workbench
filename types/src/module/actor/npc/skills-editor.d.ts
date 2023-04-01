/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import type { NPCPF2e } from "@actor";
import { NPCSkillData } from "@actor/npc/data";
/** Specialized form to setup skills for an NPC character. */
export declare class NPCSkillsEditor extends FormApplication<NPCPF2e> {
    #private;
    get npc(): NPCPF2e;
    static get defaultOptions(): FormApplicationOptions;
    /** Prepare data to be sent to HTML. */
    getData(): {
        trainedSkills: Record<string, NPCSkillData>;
        untrainedSkills: Record<string, NPCSkillData>;
        object?: object | NPCPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null> | undefined;
        options?: Partial<FormApplicationOptions> | undefined;
        title?: string | undefined;
    } | {
        trainedSkills: Record<string, NPCSkillData>;
        untrainedSkills: Record<string, NPCSkillData>;
        then<TResult1 = FormApplicationData<NPCPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null>>, TResult2 = never>(onfulfilled?: ((value: FormApplicationData<NPCPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null>>) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<FormApplicationData<NPCPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null>> | TResult>;
        finally(onfinally?: (() => void) | null | undefined): Promise<FormApplicationData<NPCPF2e<import("../../scene/token-document/document").TokenDocumentPF2e<import("../../scene/document").ScenePF2e | null> | null>>>;
        [Symbol.toStringTag]: string;
    };
    activateListeners($html: JQuery): void;
    /**
     * Apply changes to the actor based on the data in the form.
     * @param event
     * @param formData
     */
    _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
