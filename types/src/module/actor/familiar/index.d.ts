import { CreaturePF2e, CharacterPF2e } from "@actor";
import { ItemSourcePF2e } from "@item/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { ItemPF2e } from "@item";
import { FamiliarData } from "./data";
export declare class FamiliarPF2e extends CreaturePF2e {
    static get schema(): typeof FamiliarData;
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    prepareData({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation */
    prepareBaseData(): void;
    /** Active effects on a familiar require a master, so wait until embedded documents are prepared */
    applyActiveEffects(): void;
    prepareDerivedData(): void;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
export interface FamiliarPF2e {
    readonly data: FamiliarData;
    createEmbeddedDocuments(embeddedName: "ActiveEffect", data: PreCreate<foundry.data.ActiveEffectSource>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    createEmbeddedDocuments(embeddedName: "Item", data: PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    createEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", data: PreCreate<foundry.data.ActiveEffectSource>[] | Partial<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
