/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
export declare const InlineRollLinks: {
    injectRepostElement: (links: HTMLElement[], foundryDoc?: ClientDocument) => void;
    listen: ($html: HTMLElement | JQuery, foundryDoc?: ClientDocument) => void;
    repostAction: (target: HTMLElement, document?: ActorPF2e | JournalEntry | JournalEntryPage | null) => void;
    /** Give inline damage-roll links from items flavor text of the item name */
    flavorDamageRolls(html: HTMLElement, actor?: ActorPF2e | null): void;
};
