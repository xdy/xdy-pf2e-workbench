/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
/**
 * @category Other
 */
declare class DicePF2e {
    _rolled?: boolean;
    terms?: string[];
    /**
     * A standardized helper function for managing core PF2e "d20 rolls"
     *
     * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
     * This chooses the default options of a normal attack with no bonus, Advantage, or Disadvantage respectively
     *
     * @param event         The triggering event which initiated the roll
     * @param parts         The dice roll component parts, excluding the initial d20
     * @param actor         The Actor making the d20 roll
     * @param data          Actor or item data against which to parse the roll
     * @param template      The HTML template used to render the roll dialog
     * @param title         The dice roll UI window title
     * @param speaker       The ChatMessage speaker to pass when creating the chat
     * @param flavor        A callable function for determining the chat message flavor given parts and data
     * @param advantage     Allow rolling with advantage (and therefore also with disadvantage)
     * @param situational   Allow for an arbitrary situational bonus field
     * @param fastForward   Allow fast-forward advantage selection
     * @param onClose       Callback for actions to take when the dialog form is closed
     * @param dialogOptions Modal dialog options
     */
    static d20Roll({ event, item, parts, data, template, title, speaker, flavor, onClose, dialogOptions, rollMode, rollType, }: {
        event: MouseEvent | JQuery.TriggeredEvent;
        item?: ItemPF2e<ActorPF2e> | null;
        parts: (string | number)[];
        actor?: ActorPF2e;
        data: Record<string, unknown>;
        template?: string;
        title: string;
        speaker: foundry.documents.ChatSpeakerData;
        flavor?: (parts: (string | number | string[])[], data: Record<string, unknown>) => string;
        onClose?: (html: HTMLElement | JQuery, parts: (string | number)[], data: Record<string, unknown>) => void;
        dialogOptions?: Partial<ApplicationOptions>;
        rollMode?: RollMode;
        rollType?: string;
    }): Promise<unknown>;
    alter(add: number, multiply: number): this;
}
/**
 * Combines dice and flat values together in a condensed expression. Also repairs any + - and "- 3" errors.
 * For example, 3d4 + 2d4 + 3d6 + 5 + 2 is combined into 5d4 + 3d6 + 7. - 4 is corrected to -4.
 */
declare function simplifyFormula(formula: string): string;
export { DicePF2e, simplifyFormula };
