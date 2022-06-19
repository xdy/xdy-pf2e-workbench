import { ChatMessagePF2e } from ".";
declare class ChatRollDetails extends Application {
    private message;
    static get defaultOptions(): ApplicationOptions;
    constructor(message: ChatMessagePF2e, options?: Partial<ApplicationOptions>);
    getData(): {
        context: import("../system/rolls").CheckRollContextFlag | undefined;
        modifiers: import("../actor/modifiers").RawModifier[] | undefined;
        rollOptions: string[];
    };
}
export { ChatRollDetails };
