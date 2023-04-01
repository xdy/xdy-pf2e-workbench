import { RollInitiativeOptionsPF2e } from "@actor/data";
import { SkillLongForm } from "@actor/types";
import { ScenePF2e, TokenDocumentPF2e } from "@scene";
import { CombatantPF2e, RolledCombatant } from "./combatant";
declare class EncounterPF2e extends Combat {
    /** Sort combatants by initiative rolls, falling back to tiebreak priority and then finally combatant ID (random) */
    protected _sortCombatants(a: CombatantPF2e<this, TokenDocumentPF2e>, b: CombatantPF2e<this, TokenDocumentPF2e>): number;
    /** A public method to access _sortCombatants in order to get the combatant with the higher initiative */
    getCombatantWithHigherInit(a: RolledCombatant<this>, b: RolledCombatant<this>): RolledCombatant<this> | null;
    /** Exclude orphaned, loot-actor, and minion tokens from combat */
    createEmbeddedDocuments(embeddedName: "Combatant", data: PreCreate<foundry.documents.CombatantSource>[], context?: DocumentModificationContext<this>): Promise<CombatantPF2e<this, TokenDocumentPF2e<ScenePF2e>>[]>;
    /** Roll initiative for PCs and NPCs using their prepared roll methods */
    rollInitiative(ids: string[], options?: RollInitiativeOptionsPF2e): Promise<this>;
    /** Set the initiative of multiple combatants */
    setMultipleInitiatives(initiatives: SetInitiativeData[]): Promise<void>;
    setInitiative(id: string, value: number): Promise<void>;
    /**
     * Rerun data preparation for participating actors
     * `async` since this is usually called from CRUD hooks, which are called prior to encounter/combatant data resets
     */
    resetActors(): Promise<void>;
    /** Enable the initiative button on PC sheets */
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<null>, userId: string): void;
    /** Call onTurnStart for each rule element on the new turn's actor */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<null>, userId: string): void;
    /** Disable the initiative button on PC sheets if this was the only encounter */
    protected _onDelete(options: DocumentModificationContext<null>, userId: string): void;
}
interface EncounterPF2e extends Combat {
    readonly combatants: foundry.abstract.EmbeddedCollection<CombatantPF2e<this, TokenDocumentPF2e>>;
    rollNPC(options: RollInitiativeOptionsPF2e): Promise<this>;
}
interface SetInitiativeData {
    id: string;
    value: number;
    statistic?: SkillLongForm | "perception" | null;
    overridePriority?: number | null;
}
export { EncounterPF2e };
