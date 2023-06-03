/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
export declare const InlineRollLinks: {
    injectRepostElement: (links: HTMLElement[], foundryDoc?: ClientDocument) => void;
    listen: ($html: HTMLElement | JQuery, foundryDoc?: ClientDocument) => void;
    makeRepostHtml: (target: HTMLElement, defaultVisibility: string) => string;
    repostAction: (target: HTMLElement, foundryDoc?: ActorPF2e | JournalEntry | JournalEntryPage<JournalEntry> | null) => void;
    /** Give inline damage-roll links from items flavor text of the item name */
    flavorDamageRolls(html: HTMLElement, actor?: ActorPF2e | null): void;
};
