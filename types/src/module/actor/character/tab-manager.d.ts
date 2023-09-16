import type { CharacterPF2e } from "./document.ts";
export declare class PCSheetTabManager {
    actor: CharacterPF2e;
    link: HTMLAnchorElement;
    constructor(actor: CharacterPF2e, link: HTMLAnchorElement);
    static initialize(actor: CharacterPF2e, link: HTMLAnchorElement): void;
    /** Set each checkbox to be checked according to its corresponding tab visibility */
    private onReady;
    /** Save to the actor flag when a checkbox is checked or unchecked */
    private handleOnChange;
    /** Hide all tab buttons selected requested be hidden */
    private onClose;
}
