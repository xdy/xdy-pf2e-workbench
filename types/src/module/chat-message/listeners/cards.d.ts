/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ItemPF2e } from "@item";
export declare const ChatCards: {
    listen: ($html: JQuery) => void;
    /**
     * Apply rolled dice damage to the token or tokens which are currently controlled.
     * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
     */
    rollActorSaves: (ev: JQuery.ClickEvent, item: Embedded<ItemPF2e>) => Promise<void>;
};
