import { BaseRawModifier, DamageDicePF2e } from "@actor/modifiers.ts";
import { ChatContextFlag, ChatMessagePF2e } from "./index.ts";
import { PredicatePF2e, RawPredicate } from "@system/predication.ts";
declare class ChatRollDetails extends Application {
    private message;
    static get defaultOptions(): ApplicationOptions;
    constructor(message: ChatMessagePF2e, options?: Partial<ApplicationOptions>);
    getData(): ChatRollDetailsData;
    protected prepareModifiers(modifiers: (BaseRawModifier | DamageDicePF2e)[]): PreparedModifier[];
}
interface ChatRollDetailsData {
    context?: ChatContextFlag;
    domains?: string[];
    modifiers: PreparedModifier[];
    rollOptions: string[];
    hasModifiers: boolean;
}
interface PreparedModifier extends Omit<Partial<DamageDicePF2e>, "critical" | "predicate"> {
    critical: string | null;
    predicate?: RawPredicate | PredicatePF2e;
}
export { ChatRollDetails };
