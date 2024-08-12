import { MigrationBase } from "@module/migration/base.ts";
import { CustomDamageData, HomebrewTraitKey, ModuleHomebrewData } from "./data.ts";
/** User-defined type guard for checking that an object is a well-formed flag category of module-provided homebrew elements */
declare function isHomebrewFlagCategory(value: unknown): value is Record<string, string | LabelAndDescription>;
declare function isHomebrewCustomDamage(value: object): value is Record<string, CustomDamageData>;
interface LabelAndDescription {
    label: string;
    description: string;
}
declare function prepareReservedTerms(): ReservedTermsRecord;
type ReservedTermsRecord = Record<HomebrewTraitKey | "damageTypes" | "skills", Set<string>>;
/** Reads homebrew settings from all modules */
declare function readModuleHomebrewSettings(): ModuleHomebrewData;
declare function prepareCleanup(listKey: HomebrewTraitKey, deletions: string[]): MigrationBase;
export { isHomebrewCustomDamage, isHomebrewFlagCategory, prepareCleanup, prepareReservedTerms, readModuleHomebrewSettings, type ReservedTermsRecord, };
