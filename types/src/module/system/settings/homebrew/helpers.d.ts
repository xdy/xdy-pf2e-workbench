import { MigrationBase } from "@module/migration/base";
import { CustomDamageData, HomebrewTraitKey } from "./data";
/** User-defined type guard for checking that an object is a well-formed flag category of module-provided homebrew elements */
export declare function isHomebrewFlagCategory(value: object & {
    [K in string]?: unknown;
}): value is Record<string, string | LabelAndDescription>;
export declare function isHomebrewCustomDamage(value: object): value is Record<string, CustomDamageData>;
interface LabelAndDescription {
    label: string;
    description: string;
}
export declare function prepareCleanup(listKey: HomebrewTraitKey, deletions: string[]): MigrationBase;
export {};
