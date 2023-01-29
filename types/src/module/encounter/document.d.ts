import { RollInitiativeOptionsPF2e } from "@actor/data";
import { ScenePF2e } from "@scene";
import { CombatantPF2e, RolledCombatant } from "./combatant";
declare class EncounterPF2e extends Combat {
    #private;
    /** Sort combatants by initiative rolls, falling back to tiebreak priority and then finally combatant ID (random) */
    protected _sortCombatants(a: CombatantPF2e<this>, b: CombatantPF2e<this>): number;
    /** A public method to access _sortCombatants in order to get the combatant with the higher initiative */
    getCombatantWithHigherInit(a: RolledCombatant<this>, b: RolledCombatant<this>): RolledCombatant<this> | null;
    /** Exclude orphaned, loot-actor, and minion tokens from combat */
    createEmbeddedDocuments(embeddedName: "Combatant", data: PreCreate<foundry.data.CombatantSource>[], context?: DocumentModificationContext<CombatantPF2e>): Promise<CombatantPF2e<this>[]>;
    /** Roll initiative for PCs and NPCs using their prepared roll methods */
    rollInitiative(ids: string[], options?: RollInitiativeOptionsPF2e): Promise<this>;
    /** Set the initiative of multiple combatants */
    setMultipleInitiatives(initiatives: {
        id: string;
        value: number;
        overridePriority?: number | null;
    }[]): Promise<void>;
    /** Enable the initiative button on PC sheets */
    protected _onCreate(data: foundry.data.CombatSource, options: DocumentModificationContext<this>, userId: string): void;
    /** Call onTurnStart for each rule element on the new turn's actor */
    protected _onUpdate(changed: DeepPartial<foundry.data.CombatSource>, options: DocumentModificationContext<this>, userId: string): void;
    /** Disable the initiative button on PC sheets if this was the only encounter */
    protected _onDelete(options: DocumentModificationContext<this>, userId: string): void;
}
interface EncounterPF2e {
    readonly data: foundry.data.CombatData<this, CombatantPF2e>;
    turns: CombatantPF2e<this>[];
    get scene(): ScenePF2e | undefined;
    get combatant(): CombatantPF2e<this>;
    readonly combatants: foundry.abstract.EmbeddedCollection<CombatantPF2e<this>>;
    rollNPC(options: RollInitiativeOptionsPF2e): Promise<this>;
}
export { EncounterPF2e };
