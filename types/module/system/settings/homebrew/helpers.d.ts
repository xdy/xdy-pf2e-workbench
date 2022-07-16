/** User-defined type guard for checking that an object is a well-formed flag category of module-provided homebrew elements */
export declare function isHomebrewFlagCategory(value: object & {
    [K in string]?: unknown;
}): value is Record<string, string | LabelAndDescription>;
interface LabelAndDescription {
    label: string;
    description: string;
}
export {};
