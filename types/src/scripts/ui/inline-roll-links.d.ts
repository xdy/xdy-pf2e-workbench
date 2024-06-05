import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message/index.ts";

export declare const InlineRollLinks: {
    injectRepostElement: (links: HTMLElement[], foundryDoc: ClientDocument | null) => void;
    listen: (html: HTMLElement, foundryDoc?: ClientDocument | null) => void;
    makeRepostHtml: (target: HTMLElement, defaultVisibility: string) => string;
    _onClickInlineAction: (event: MouseEvent, link: HTMLAnchorElement | HTMLSpanElement) => void;
    _onClickInlineCheck: (event: MouseEvent, link: HTMLAnchorElement | HTMLSpanElement, foundryDoc: ClientDocument | null) => Promise<void>;
    _onClickInlineTemplate: (_event: MouseEvent, html: HTMLElement, link: HTMLAnchorElement | HTMLSpanElement, foundryDoc: ClientDocument | null) => void;
    repostAction: (target: HTMLElement, foundryDoc?: ClientDocument | null) => Promise<ChatMessagePF2e | undefined>;
    /** Give inline damage-roll links from items flavor text of the item name */
    flavorDamageRolls(html: HTMLElement, actor?: ActorPF2e | null): void;
};
