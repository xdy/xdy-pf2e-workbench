import { CharacterPF2e, CreaturePF2e } from "@actor";
import { FamiliarData } from "./data";
export declare class FamiliarPF2e extends CreaturePF2e {
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    prepareData({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
export interface FamiliarPF2e {
    readonly data: FamiliarData;
}
