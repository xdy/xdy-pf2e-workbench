import { ActorPF2e } from "@actor";
export declare const InlineRollLinks: {
    injectRepostElement: (links: HTMLElement[], foundryDoc: ClientDocument | null) => void;
    listen: (html: HTMLElement, foundryDoc?: ClientDocument | null) => void;
    makeRepostHtml: (target: HTMLElement, defaultVisibility: string) => string;
    repostAction: (target: HTMLElement, foundryDoc?: ClientDocument | null) => void;
    /** Give inline damage-roll links from items flavor text of the item name */
    flavorDamageRolls(html: HTMLElement, actor?: ActorPF2e | null): void;
};
