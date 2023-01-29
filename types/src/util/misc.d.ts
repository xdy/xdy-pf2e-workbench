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
/** Sorts an array given the natural sorting behavior of the result of a mapping function */
declare function sortBy<T, J>(array: T[], mapping: (value: T) => J): T[];
/**
 * Given an array, adds a certain amount of elements to it
 * until the desired length is being reached
 */
declare function padArray<T>(array: T[], requiredLength: number, padWith: T): T[];
type Optional<T> = T | null | undefined;
/**
 * Returns true if the string is null, undefined or only consists of 1..n spaces
 */
declare function isBlank(text: Optional<string>): text is null | undefined | "";
/** Returns a formatted number string with a preceding + if non-negative */
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
/** Returns a subset of an object with explicitly defined keys */
declare function pick<T extends object, K extends keyof T>(obj: T, keys: Iterable<K>): Pick<T, K>;
/** Returns a subset of an object with explicitly excluded keys */
declare function omit<T extends object, K extends keyof T>(obj: T, keys: Iterable<K>): Omit<T, K>;
/**
 * The system's sluggification algorithm for labels and other terms.
 * @param text The text to sluggify
 * @param [options.camel=null] The sluggification style to use
 */
declare function sluggify(text: string, { camel }?: {
    camel?: "dromedary" | "bactrian" | null;
}): string;
/** Parse a string containing html */
declare function parseHTML(unparsed: string): HTMLElement;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImageFilePath): ImageFilePath;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImageFilePath | null): ImageFilePath | null;
declare function getActionIcon(actionType: string | ActionCost | null): ImageFilePath;
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
type FontAwesomeStyle = "solid" | "regular" | "duotone";
declare function fontAwesomeIcon(glyph: string, { style, fixedWidth }?: {
    style?: FontAwesomeStyle;
    fixedWidth?: boolean;
}): HTMLElement;
/** Short form of type and non-null check */
declare function isObject<T extends object>(value: unknown): value is DeepPartial<T>;
declare function isObject<T extends string>(value: unknown): value is {
    [K in T]?: unknown;
};
/** Create a copy of a record with its insertion order sorted by label */
declare function sortLabeledRecord<T extends Record<string, {
    label: string;
}>>(record: T): T;
declare function sortStringRecord<T extends Record<string, string>>(record: T): T;
/** JSON.stringify with recursive key sorting */
declare function sortObjByKey(value: unknown): unknown;
declare function sortedStringify(obj: object): string;
/** Walk an object tree and replace any string values found according to a provided function */
declare function recursiveReplaceString<T>(source: T, replace: (s: string) => string): T;
export { ErrorPF2e, Fraction, Optional, addSign, applyNTimes, fontAwesomeIcon, getActionGlyph, getActionIcon, groupBy, isBlank, isObject, localizeList, objectHasKey, omit, ordinal, padArray, parseHTML, pick, recursiveReplaceString, setHasElement, sluggify, sortBy, sortLabeledRecord, sortObjByKey, sortStringRecord, sortedStringify, sum, tupleHasValue, zip, };
