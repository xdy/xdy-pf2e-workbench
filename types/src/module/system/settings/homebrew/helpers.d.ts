import { ConfigPF2eHomebrewRecord } from ".";
/** User-defined type guard for checking that an object is a well-formed flag of module-provided homebrew elements */
export declare function isHomebrewFlag(flag: object & {
    [K in string]?: unknown;
}): flag is Record<ConfigPF2eHomebrewRecord, Record<string, string | LabelAndDescription> | undefined>;
interface LabelAndDescription {
    label: string;
    description: string;
}
export {};
