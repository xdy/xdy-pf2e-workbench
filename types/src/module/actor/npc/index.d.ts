import { CreaturePF2e } from "@actor";
import { VisionLevel } from "@actor/creature/data";
import { MeleeData } from "@item/data";
import { RollNotePF2e } from "@module/notes";
import { NPCData } from "./data";
import { NPCSheetPF2e } from "./sheet";
export declare class NPCPF2e extends CreaturePF2e {
    static get schema(): typeof NPCData;
    /** This NPC's ability scores */
    get abilities(): import("@actor/creature/data").Abilities;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    /** NPCs with sufficient permissions can always see (for now) */
    get visionLevel(): VisionLevel;
    /** Users with limited permission can loot a dead NPC */
    canUserModify(user: User, action: UserAction): boolean;
    /** A user can see a synthetic NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    get isLootable(): boolean;
    /** Grant all users at least limited permission on dead NPCs */
    get permission(): PermissionLevel;
    /** Grant players limited permission on dead NPCs */
    testUserPermission(user: User, permission: DocumentPermission | DocumentPermissionNumber, options?: {
        exact?: boolean;
    }): boolean;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    /** The NPC level needs to be known before the rest of the weak/elite adjustments */
    prepareEmbeddedDocuments(): void;
    prepareDerivedData(): void;
    prepareSaves(): void;
    protected getAttackEffects(sourceItemData: MeleeData): Promise<RollNotePF2e[]>;
    protected getHpAdjustment(level: number, adjustment: "elite" | "weak" | "normal"): number;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | "normal"): Promise<void>;
    getBaseLevel(): number;
}
export interface NPCPF2e {
    readonly data: NPCData;
    get sheet(): NPCSheetPF2e;
    _sheet: NPCSheetPF2e | null;
}
