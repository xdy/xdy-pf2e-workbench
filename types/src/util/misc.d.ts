import type { ActionCost } from "@item/base/data/system.ts";
import type Sortable from "sortablejs";

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
/** Given an object, returns a new object with the same keys, but with each value converted by a function. */
declare function mapValues<K extends string | number | symbol, V, R>(object: Record<K, V>, mapping: (value: V, key: K) => R): Record<K, R>;
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
declare function tupleHasValue<const A extends readonly unknown[]>(array: A, value: unknown): value is A[number];
/** Check if an element is present in the provided set. Especially useful for checking against literal sets */
declare function setHasElement<T extends Set<unknown>>(set: T, value: unknown): value is SetElement<T>;
/**
 * Return an integer string of a number, always with sign (+/-)
 * @param value The number to convert to a string
 * @param options.emptyStringZero If the value is zero, return an empty string
 * @param options.zeroIsNegative Treat zero as a negative value
 */
declare function signedInteger(value: number, { emptyStringZero, zeroIsNegative }?: {
    emptyStringZero?: boolean | undefined;
    zeroIsNegative?: boolean | undefined;
}): string;
/**
 * The system's sluggification algorithm for labels and other terms.
 * @param text The text to sluggify
 * @param [options.camel=null] The sluggification style to use
 */
declare function sluggify(text: string, { camel }?: {
    camel?: SlugCamel;
}): string;
type SlugCamel = "dromedary" | "bactrian" | null;
/** Parse a string containing html */
declare function parseHTML(unparsed: string): HTMLElement;
declare function getActionTypeLabel(type: Maybe<"action" | "free" | "reaction" | "passive">, cost: Maybe<number>): string | null;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImageFilePath): ImageFilePath;
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImageFilePath | null): ImageFilePath | null;
declare function getActionIcon(actionType: string | ActionCost | null): ImageFilePath;
/**
 * Returns a character that can be used with the Pathfinder action font
 * to display an icon. If null it returns empty string.
 */
declare function getActionGlyph(action: string | number | null | ActionCost): string;
declare function ErrorPF2e(message: string): Error;
/** Returns the number in an ordinal format, like 1st, 2nd, 3rd, 4th, etc. */
declare function ordinalString(value: number): string;
/** Localizes a list of strings into a (possibly comma-delimited) list for the current language */
declare function localizeList(items: string[], { conjunction }?: {
    conjunction?: "and" | "or";
}): string;
/**
 * Split and sanitize a list in string form. The empty string is always excluded from the resulting array.
 * @param [options.delimiter] The delimiter by which to split (default of ",")
 * @param [options.unique]    Whether to ensure the uniqueness of the resulting array's elements (default of true)
 */
declare function splitListString(str: string, { delimiter, unique }?: SplitListStringOptions): string[];
interface SplitListStringOptions {
    delimiter?: string | RegExp;
    unique?: boolean;
}
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
/** Localize the values of a `Record<string, string>` and sort by those values */
declare function sortStringRecord<T extends Record<string, string>>(record: T): T;
/** JSON.stringify with recursive key sorting */
declare function sortObjByKey(value: unknown): unknown;
/** Walk an object tree and replace any string values found according to a provided function */
declare function recursiveReplaceString<T>(source: T, replace: (s: string) => string): T;
/** Create a localization function with a prefixed localization object path */
declare function localizer(prefix: string): (...args: Parameters<Localization["format"]>) => string;
/** Walk a localization object and recursively map the keys as localization strings starting with a given prefix */
declare function configFromLocalization<T extends Record<string, TranslationDictionaryValue>>(localization: T, prefix: string): T;
/** Does the parameter look like an image file path? */
declare function isImageFilePath(path: unknown): path is ImageFilePath;
/** Does the parameter look like a video file path? */
declare function isVideoFilePath(path: unknown): path is VideoFilePath;
declare function isImageOrVideoPath(path: unknown): path is ImageFilePath | VideoFilePath;
declare const SORTABLE_BASE_OPTIONS: Sortable.Options;
export { ErrorPF2e, SORTABLE_BASE_OPTIONS, applyNTimes, configFromLocalization, fontAwesomeIcon, getActionGlyph, getActionIcon, getActionTypeLabel, groupBy, isImageFilePath, isImageOrVideoPath, isObject, isVideoFilePath, localizeList, localizer, mapValues, objectHasKey, ordinalString, padArray, parseHTML, recursiveReplaceString, setHasElement, signedInteger, sluggify, sortLabeledRecord, sortObjByKey, sortStringRecord, splitListString, tupleHasValue, type SlugCamel, };
