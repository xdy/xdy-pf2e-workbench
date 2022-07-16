import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** Ensure that the import JSON is actually importable and that the data is fully migrated */
declare function preImportJSON<T extends ActorPF2e | ItemPF2e>(document: T, json: string): Promise<string | null>;
export { preImportJSON };
