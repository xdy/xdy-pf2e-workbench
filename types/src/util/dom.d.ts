/**  DOM helper functions that return HTMLElement(s) (or `null`) */
import { Optional } from "./misc";
declare function htmlQuery<K extends keyof HTMLElementTagNameMap>(parent: Optional<Element | EventTarget>, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlQuery(parent: Optional<Element | EventTarget>, selectors: string): HTMLElement | null;
declare function htmlQuery<E extends HTMLElement = HTMLElement>(parent: Optional<Element | EventTarget>, selectors: string): E | null;
declare function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(parent: Optional<Element | EventTarget>, selectors: K): HTMLElementTagNameMap[K][] | null;
declare function htmlQueryAll(parent: Optional<Element | EventTarget>, selectors: string): HTMLElement[];
declare function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: Optional<Element | EventTarget>, selectors: string): E[] | null;
declare function htmlClosest<K extends keyof HTMLElementTagNameMap>(parent: Element | EventTarget | null, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlClosest(child: Element | EventTarget | null, selectors: string): HTMLElement | null;
declare function htmlClosest<E extends HTMLElement = HTMLElement>(parent: Element | EventTarget | null, selectors: string): E | null;
export { htmlClosest, htmlQuery, htmlQueryAll };
