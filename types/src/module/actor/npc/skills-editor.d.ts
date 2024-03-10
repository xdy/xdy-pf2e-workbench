/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { NPCPF2e } from "@actor";
import { NPCSkillData } from "@actor/npc/data.ts";
/** Specialized form to setup skills for an NPC character. */
export declare class NPCSkillsEditor extends DocumentSheet<NPCPF2e> {
    get actor(): NPCPF2e;
    static get defaultOptions(): DocumentSheetOptions;
    get title(): string;
    /** Prepare data to be sent to HTML. */
    getData(options?: Partial<DocumentSheetOptions>): Promise<EditorData>;
    activateListeners($html: JQuery): void;
    /** Maintain focus since upstream only operates on named elements */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
}
interface EditorData extends DocumentSheetData<NPCPF2e> {
    actor: NPCPF2e;
    trainedSkills: NPCSkillData[];
    untrainedSkills: NPCSkillData[];
}
export {};
