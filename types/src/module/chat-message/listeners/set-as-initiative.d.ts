import type { ChatMessagePF2e } from "../document.ts";
/** Add a button to set a check roll as the roller's initiative */
export declare const SetAsInitiative: {
    listen: (message: ChatMessagePF2e, li: HTMLElement) => void;
};
