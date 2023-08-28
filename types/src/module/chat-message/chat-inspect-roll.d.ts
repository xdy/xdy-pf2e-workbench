/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { DamageDicePF2e } from "@actor/modifiers.ts";
import { ChatContextFlag, ChatMessagePF2e } from "./index.ts";
import { PredicatePF2e, RawPredicate } from "@system/predication.ts";
declare class ChatInspectRoll extends Application {
    #private;
    private message;
    static get defaultOptions(): ApplicationOptions;
    constructor(message: ChatMessagePF2e, options?: Partial<ApplicationOptions>);
    getData(): ChatRollDetailsData;
    protected prepareModifiers(): PreparedModifier[] | null;
    activateListeners($html: JQuery<HTMLElement>): void;
    filterOptions(filter: string): void;
}
interface ChatRollDetailsData {
    context?: ChatContextFlag;
    domains?: string[];
    modifiers: PreparedModifier[];
    hasModifiers: boolean;
}
interface PreparedModifier extends Omit<Partial<DamageDicePF2e>, "critical" | "predicate"> {
    critical: string | null;
    predicate?: RawPredicate | PredicatePF2e;
}
export { ChatInspectRoll };
