import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { CombatantPF2e } from "./encounter/index.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
/** Ensure that the import JSON is actually importable and that the data is fully migrated */
declare function preImportJSON<TDocument extends ActorPF2e | ItemPF2e>(document: TDocument, json: string): Promise<string | null>;
declare function combatantAndTokenDoc(document: CombatantPF2e | TokenDocumentPF2e): {
    combatant: CombatantPF2e | null;
    tokenDoc: TokenDocumentPF2e | null;
};
export { combatantAndTokenDoc, preImportJSON };
