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
 * @param [options.innerHTML]   A string to set as the inner HTML of the created element. Only one of `children` and
 *                              `innerHTML` can be used.
 * @returns The HTML element with all options applied
 */
declare function createHTMLElement<K extends keyof HTMLElementTagNameMap>(nodeName: K, options?: CreateHTMLElementOptionsWithChildren): HTMLElementTagNameMap[K];
declare function createHTMLElement<K extends keyof HTMLElementTagNameMap>(nodeName: K, options?: CreateHTMLElementOptionsWithInnerHTML): HTMLElementTagNameMap[K];
declare function createHTMLElement<K extends keyof HTMLElementTagNameMap>(nodeName: K, options?: CreateHTMLElementOptionsWithNeither): HTMLElementTagNameMap[K];
interface CreateHTMLElementOptions {
    classes?: string[];
    dataset?: Record<string, Maybe<string | number | boolean>>;
    children?: (HTMLElement | string)[];
    innerHTML?: string;
}
interface CreateHTMLElementOptionsWithChildren extends CreateHTMLElementOptions {
    children: (HTMLElement | string)[];
    innerHTML?: never;
}
interface CreateHTMLElementOptionsWithInnerHTML extends CreateHTMLElementOptions {
    children?: never;
    innerHTML: string;
}
interface CreateHTMLElementOptionsWithNeither extends CreateHTMLElementOptions {
    children?: never;
    innerHTML?: never;
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
/** Create a reasonably specific selector for an HTML element */
declare function htmlSelectorFor(element: HTMLElement): string;
export { createHTMLElement, htmlClosest, htmlQuery, htmlQueryAll, htmlSelectorFor };
