import type { CharacterPF2e } from "./document.ts";

export declare class PCSheetTabManager {
    #private;
    actor: CharacterPF2e;
    link: HTMLElement;
    constructor(actor: CharacterPF2e, link: HTMLAnchorElement);
    initialize(): Promise<void>;
}
