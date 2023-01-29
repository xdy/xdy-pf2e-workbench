import { Optional } from "./misc";
/**  DOM helper functions that return HTMLElement(s) (or `null`) */
type MaybeHTML = Optional<Document | Element | EventTarget>;
declare function htmlQuery<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
declare function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K][];
declare function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[];
declare function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E[];
declare function htmlClosest<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlClosest<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
export { htmlClosest, htmlQuery, htmlQueryAll };
