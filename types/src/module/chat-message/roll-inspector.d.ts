/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { RawDamageDice, RawModifier } from "@actor/modifiers.ts";
import type { ChatContextFlag, ChatMessagePF2e } from "./index.ts";

declare class RollInspector extends Application {
    message: ChatMessagePF2e;
    constructor(message: ChatMessagePF2e, options?: Partial<ApplicationOptions>);
    static get defaultOptions(): ApplicationOptions;
    get dice(): RawDamageDice[];
    get modifiers(): RawModifier[];
    getData(): ChatRollDetailsData;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Roll options search */
    protected _onSearchFilter(_event: KeyboardEvent, query: string, _rgx: RegExp, html: HTMLElement | null): void;
}
interface ChatRollDetailsData {
    context?: ChatContextFlag;
    domains: string[];
    modifiers: PreparedModifier[];
    dice: PreparedDice[];
    rollOptions: string[];
    contextualOptions: {
        header: string;
        options: string[];
    }[];
}
interface PreparedModifier extends Omit<Partial<RawModifier>, "critical"> {
    value: string;
    critical: string | null;
}
interface PreparedDice extends Omit<Partial<RawDamageDice>, "critical"> {
    value: string;
    critical: string | null;
}
export { RollInspector };
