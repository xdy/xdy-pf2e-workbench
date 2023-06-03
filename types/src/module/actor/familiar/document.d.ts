import { CharacterPF2e, CreaturePF2e } from "@actor";
import { ItemType } from "@item/data/index.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { FamiliarSource, FamiliarSystemData } from "./data.ts";
declare class FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    get masterAbilityModifier(): number | null;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Familiars cannot have item bonuses. Nor do they have ability mods nor proficiency (sans master level) */
    private stripInvalidModifiers;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    readonly _source: FamiliarSource;
    readonly abilities?: never;
    system: FamiliarSystemData;
}
export { FamiliarPF2e };
