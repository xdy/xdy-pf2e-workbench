/// <reference types="jquery" />
import { ItemPF2e } from "@item";
import { ActorPF2e } from "../module/actor/base";
/**
 * @category Other
 */
export declare class DicePF2e {
    _rolled?: boolean;
    terms?: string[];
    _formula: any;
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
        parts: any[];
        actor?: ActorPF2e;
        data: any;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        flavor?: any;
        onClose?: any;
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
     */
    static damageRoll({ event, item, partsCritOnly, parts, data, template, title, speaker, flavor, critical, onClose, dialogOptions, combineTerms, }: {
        event: JQuery.Event;
        item?: Embedded<ItemPF2e> | null;
        partsCritOnly?: any[];
        parts: (string | number)[];
        actor?: ActorPF2e;
        data: Record<string, any>;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        flavor?: any;
        critical?: boolean;
        onClose?: any;
        dialogOptions?: object;
        combineTerms?: boolean;
    }): Promise<unknown> | Roll<{
        [x: string]: any;
    }>;
    /** Sum constant values and combine alike dice into single `NumericTerm` and `Die` terms, respectively */
    static combineTerms(formula: string): Roll;
    alter(add: number, multiply: number): this;
    private static getTraitMarkup;
}
