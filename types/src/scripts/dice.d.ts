/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
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
        event: JQuery.Event;
        item?: Embedded<ItemPF2e> | null;
        parts: (string | number)[];
        actor?: ActorPF2e;
        data: Record<string, unknown>;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        flavor?: Function;
        onClose?: Function;
        dialogOptions?: Partial<ApplicationOptions>;
        rollMode?: RollMode;
        rollType?: string;
    }): Promise<unknown>;
    /**
     * A standardized helper function for managing PF2e damage rolls
     *
     * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
     * This chooses the default options of a normal attack with no bonus, Critical, or no bonus respectively
     *
     * @param event         The triggering event which initiated the roll
     * @param partsCritOnly The dice roll component parts only added on a crit
     * @param parts         The dice roll component parts
     * @param actor         The Actor making the damage roll
     * @param data          Actor or item data against which to parse the roll
     * @param template      The HTML template used to render the roll dialog
     * @param title         The dice roll UI window title
     * @param speaker       The ChatMessage speaker to pass when creating the chat
     * @param flavor        A callable function for determining the chat message flavor given parts and data
     * @param critical      Allow critical hits to be chosen
     * @param onClose       Callback for actions to take when the dialog form is closed
     * @param dialogOptions Modal dialog options
     * @param simplify      Whether alike terms should be combined
     */
    static damageRoll({ event, item, partsCritOnly, parts, data, template, title, speaker, flavor, critical, onClose, dialogOptions, simplify, }: {
        event: JQuery.Event;
        item?: Embedded<ItemPF2e> | null;
        partsCritOnly?: (string | number)[];
        parts: (string | number)[];
        actor?: ActorPF2e;
        data: Record<string, unknown>;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        flavor?: Function;
        critical?: boolean;
        onClose?: Function;
        dialogOptions?: Partial<ApplicationOptions>;
        simplify?: boolean;
    }): Promise<Rolled<Roll> | null>;
    alter(add: number, multiply: number): this;
    private static getTraitMarkup;
}
/** Sum constant values and combine alike dice into single `NumericTerm` and `Die` terms, respectively */
declare function combineTerms(formula: string): Roll;
export { DicePF2e, combineTerms };
