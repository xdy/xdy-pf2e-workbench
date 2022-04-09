/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
export declare const InlineRollLinks: {
    injectRepostElement: ($links: JQuery) => void;
    listen: ($html: JQuery) => void;
    repostAction: (target: HTMLElement, actor?: ActorPF2e | null) => void;
};
