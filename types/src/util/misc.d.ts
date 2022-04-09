import { ActionCost } from "@item/data/base";
/**
 * Given an array and a key function, create a map where the key is the value that
 * gets returned when each item is pushed into the function. Accumulate
 * items in an array that have the same key
 * @param array
 * @param criterion
 * @return
 */
declare function groupBy<T, R>(array: T[], criterion: (value: T) => R): Map<R, T[]>;
/**
 * Given an array, adds a certain amount of elements to it
 * until the desired length is being reached
 */
declare function padArray<T>(array: T[], requiredLength: number, padWith: T): T[];
/**
 * Return a new object that combines all the keys and values from
 * both. If both have the same key, assign the value of the merge function.
 * Example:
 *     // returns {a: 3, b: 5, c: 0}
 *     combineObjects({a: 3, b: 4}, {b: 1, c: 0}, (a, b) => a+b)
 * @param first
 * @param second
 * @param mergeFunction if duplicate keys exist, both values
 * are passed into this function to return the result
 * @return
 */
declare function combineObjects<V>(first: Record<RecordKey, V>, second: Record<RecordKey, V>, mergeFunction: (first: V, second: V) => V): Record<RecordKey, V>;
declare type RecordKey = string | number;
declare type Optional<T> = T | null | undefined;
/**
 * Returns true if the string is null, undefined or only consists of 1..n spaces
 */
declare function isBlank(text: Optional<string>): text is null | undefined | "";
/** Used as a function reference */
declare function add(x: number, y: number): number;
/**
 * Adds a + if positive, nothing if 0 or - if negative
 */
declare function addSign(number: number): string;
/**
 * No idea why this isn't built in
 */
declare function sum(values: number[]): number;
/**
 * Zip to arrays together based on a given zip function
 * @param a
 * @param b
 * @param zipFunction
 */
declare function zip<A, B, R>(a: A[], b: B[], zipFunction: (a: A, b: B) => R): R[];
interface Fraction {
    numerator: number;
    denominator: number;
}
/**
 * Continually apply a function on the result of itself until times is reached
 *
 * @param func
 * @param times
 * @param start start element, also result if times is 0
 */
declare function applyNTimes<T>(func: (val: T) => T, times: number, start: T): T;
/**
 * Check if a key is present in a given object in a type safe way
 *
 * @param obj The object to check
 * @param key The key to check
 */
declare function objectHasKey<O extends object>(obj: O, key: unknown): key is keyof O;
/** Check if a value is present in the provided array. Especially useful for checking against literal tuples */
declare function tupleHasValue<A extends readonly unknown[]>(array: A, value: unknown): value is A[number];
/** Check if an element is present in the provided set. Especially useful for checking against literal sets */
declare function setHasElement<T extends Set<unknown>>(set: T, value: unknown): value is SetElement<T>;
/**
 * The system's sluggification algorithm for labels and other terms.
 * @param [camel=null] The sluggification style to use: null is default, and there are otherwise two camel options.
 */
declare function sluggify(str: string, { camel }?: {
    camel?: "dromedary" | "bactrian" | null;
}): string;
/** Parse a string containing html */
declare function parseHTML(unparsed: string): HTMLElement;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImagePath): ImagePath;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImagePath | null): ImagePath | null;
declare function getActionIcon(actionType: string | ActionCost | null): ImagePath;
/**
 * Returns a character that can be used with the Pathfinder action font
 * to display an icon. If null it returns empty string.
 */
declare function getActionGlyph(action: string | number | null | {
    type: string;
    value: string | number | null;
}): string;
declare function ErrorPF2e(message: string): Error;
/** Returns the number in an ordinal format, like 1st, 2nd, 3rd, 4th, etc */
declare function ordinal(value: number): string;
/** Localizes a list of strings into a comma delimited list for the current language */
declare function localizeList(items: string[]): string;
/** Generate and return an HTML element for a FontAwesome icon */
declare function fontAwesomeIcon(glyph: string, style?: "solid" | "regular"): HTMLElement;
/** Short form of type and non-null check */
declare function isObject<T extends object>(value: unknown): value is DeepPartial<T>;
declare function isObject<T extends string>(value: unknown): value is {
    [K in T]?: unknown;
};
/** JSON.stringify with recursive key sorting */
declare function sortObjByKey(value: unknown): unknown;
declare function sortedStringify(obj: object): string;
export { ErrorPF2e, Fraction, add, addSign, applyNTimes, combineObjects, fontAwesomeIcon, getActionGlyph, getActionIcon, groupBy, isBlank, isObject, localizeList, objectHasKey, ordinal, Optional, padArray, parseHTML, setHasElement, sluggify, sortObjByKey, sortedStringify, sum, tupleHasValue, zip, };
