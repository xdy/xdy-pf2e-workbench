import { CharacterPF2e, CreaturePF2e } from "@actor";
import { FamiliarData } from "./data";
declare class FamiliarPF2e extends CreaturePF2e {
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    get masterAbilityModifier(): number | null;
    prepareData({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Familiars cannot have item bonuses. Nor do they have ability mods nor proficiency (sans master level) */
    private stripInvalidModifiers;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
interface FamiliarPF2e {
    readonly data: FamiliarData;
}
export { FamiliarPF2e };
