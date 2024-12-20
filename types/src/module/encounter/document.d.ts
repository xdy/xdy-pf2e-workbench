import type { ActorPF2e } from "@actor";
import { RollInitiativeOptionsPF2e } from "@actor/data/index.ts";
import { SkillSlug } from "@actor/types.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene/index.ts";
import { ThreatRating } from "@scripts/macros/xp/index.ts";
import type { CombatantPF2e, RolledCombatant } from "./combatant.ts";

declare class EncounterPF2e extends Combat {
    /** Has this document completed `DataModel` initialization? */
    initialized: boolean;
    /** Threat assessment and XP award of this encounter */
    metrics: EncounterMetrics | null;
    /** Sort combatants by initiative rolls, falling back to tiebreak priority and then finally combatant ID (random) */
    protected _sortCombatants(a: CombatantPF2e<this, TokenDocumentPF2e>, b: CombatantPF2e<this, TokenDocumentPF2e>): number;
    /** A public method to access _sortCombatants in order to get the combatant with the higher initiative */
    getCombatantWithHigherInit(a: RolledCombatant<this>, b: RolledCombatant<this>): RolledCombatant<this> | null;
    /** Determine threat rating and XP award for this encounter */
    analyze(): EncounterMetrics | null;
    protected _initialize(options?: Record<string, unknown>): void;
    /**
     * Prevent double data preparation of child documents.
     * @todo remove in V13
     */
    prepareData(): void;
    prepareDerivedData(): void;
    /** Exclude orphaned, loot-actor, and minion tokens from combat */
    createEmbeddedDocuments(embeddedName: "Combatant", data: PreCreate<foundry.documents.CombatantSource>[], operation?: Partial<DatabaseCreateOperation<this>>): Promise<CombatantPF2e<this, TokenDocumentPF2e<ScenePF2e>>[]>;
    /** Roll initiative for PCs and NPCs using their prepared roll methods */
    rollInitiative(ids: string[], options?: RollInitiativeOptionsPF2e): Promise<this>;
    /** Set the initiative of multiple combatants */
    setMultipleInitiatives(initiatives: SetInitiativeData[]): Promise<void>;
    setInitiative(id: string, value: number, statistic?: string): Promise<void>;
    /**
     * Rerun data preparation for participating actors
     * `async` since this is usually called from CRUD hooks, which are called prior to encounter/combatant data resets
     */
    resetActors(): Promise<void>;
    /** Enable the initiative button on PC sheets */
    protected _onCreate(data: this["_source"], operation: DatabaseCreateOperation<null>, userId: string): void;
    /** Call onTurnStart for each rule element on the new turn's actor */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<null>, userId: string): void;
    /** Disable the initiative link on PC sheets if this was the only encounter */
    protected _onDelete(operation: DatabaseDeleteOperation<null>, userId: string): void;
}
interface EncounterPF2e extends Combat {
    readonly combatants: foundry.abstract.EmbeddedCollection<CombatantPF2e<this, TokenDocumentPF2e | null>>;
    scene: ScenePF2e;
    rollNPC(options: RollInitiativeOptionsPF2e): Promise<this>;
}
interface EncounterMetrics {
    threat: ThreatRating;
    budget: {
        spent: number;
        max: number;
        partyLevel: number;
    };
    award: {
        xp: number;
        recipients: ActorPF2e[];
    };
    participants: {
        party: ActorPF2e[];
        opposition: ActorPF2e[];
    };
}
interface SetInitiativeData {
    id: string;
    value: number;
    statistic?: SkillSlug | "perception" | null;
    overridePriority?: number | null;
}
export { EncounterPF2e };
