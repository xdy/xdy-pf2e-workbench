import { RawDamageDice, RawModifier } from "@actor/modifiers.ts";
import { ChatContextFlag, ChatMessagePF2e } from "./index.ts";
declare class RollInspector extends Application {
    private message;
    static get defaultOptions(): ApplicationOptions;
    constructor(message: ChatMessagePF2e, options?: Partial<ApplicationOptions>);
    getData(): ChatRollDetailsData;
    /** Roll options search */
    protected _onSearchFilter(_event: KeyboardEvent, query: string, _rgx: RegExp, html: HTMLElement | null): void;
}
interface ChatRollDetailsData {
    context?: ChatContextFlag;
    domains: string[];
    modifiers: PreparedModifier[];
    dice: PreparedDice[];
    rollOptions: string[];
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
