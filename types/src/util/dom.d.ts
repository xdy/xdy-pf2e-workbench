/**  DOM helper functions that return HTMLElement(s) (or `null`) */
type MaybeHTML = Maybe<Document | Element | EventTarget>;
/**
 * Create an `HTMLElement` with classes, dataset, and children
 * @param nodeName  A valid HTML element tag name,
 * @param [options] Additional options for adjusting the created element
 * @param [options.classes=[]]  A list of class names
 * @param [options.dataset={}]  An object of keys and values with which to populate the `dataset`: nullish values will
 *                              be excluded.
 * @param [options.children=[]] A list of child elements as well as strings that will be converted to text nodes
 * @returns The HTML element with all options applied
 */
declare function createHTMLElement<K extends keyof HTMLElementTagNameMap>(nodeName: K, { classes, dataset, children }?: CreateHTMLElementOptions): HTMLElementTagNameMap[K];
interface CreateHTMLElementOptions {
    classes?: string[];
    dataset?: Record<string, string | number | null | undefined>;
    children?: (HTMLElement | string)[];
}
declare function htmlQuery<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
declare function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K][];
declare function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[];
declare function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E[];
declare function htmlClosest<K extends keyof HTMLElementTagNameMap>(parent: MaybeHTML, selectors: K): HTMLElementTagNameMap[K] | null;
declare function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
declare function htmlClosest<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
export { createHTMLElement, htmlClosest, htmlQuery, htmlQueryAll };
