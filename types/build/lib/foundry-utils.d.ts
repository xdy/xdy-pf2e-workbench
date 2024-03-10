/**
 * Learn the underlying data type of some variable. Supported identifiable types include:
 * undefined, null, number, string, boolean, function, Array, Set, Map, Promise, Error,
 * HTMLElement (client side only), Object (catchall for other object types)
 * @param variable A provided variable
 * @return The named type of the token
 */
export declare function getType(variable: unknown): string;
/**
 * Test whether a value is empty-like; either undefined or a content-less object.
 * @param value The value to test
 * @returns     Is the value empty-like?
 */
export declare function isEmpty(value: unknown): boolean;
