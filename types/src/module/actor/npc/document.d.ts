import { CreaturePF2e } from "@actor";
import { Abilities } from "@actor/creature/data";
import { MeleePF2e } from "@item";
import { ItemType } from "@item/data";
import { RollNotePF2e } from "@module/notes";
import { NPCData, NPCFlags } from "./data";
import { NPCSheetPF2e } from "./sheet";
import { VariantCloneParams } from "./types";
declare class NPCPF2e extends CreaturePF2e {
    get allowedItemTypes(): (ItemType | "physical")[];
    /** This NPC's ability scores */
    get abilities(): Abilities;
    get description(): string;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    /** Users with limited permission can loot a dead NPC */
    canUserModify(user: User, action: UserAction): boolean;
    /** A user can see a synthetic NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    get isLootable(): boolean;
    /** Grant all users at least limited permission on dead NPCs */
    get permission(): DocumentOwnershipLevel;
    /** Grant players limited permission on dead NPCs */
    testUserPermission(user: User, permission: DocumentOwnershipString | DocumentOwnershipLevel, options?: {
        exact?: boolean;
    }): boolean;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    /** The NPC level needs to be known before the rest of the weak/elite adjustments */
    prepareEmbeddedDocuments(): void;
    prepareDerivedData(): void;
    prepareSaves(): void;
    getAttackEffects(attack: MeleePF2e): Promise<RollNotePF2e[]>;
    protected getHpAdjustment(level: number, adjustment: "elite" | "weak" | null): number;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | null): Promise<void>;
    /** Returns the base level of a creature, as this gets modified on elite and weak adjustments */
    getBaseLevel(): number;
    /** Create a variant clone of this NPC, adjusting any of name, description, and images */
    variantClone(params: VariantCloneParams & {
        save?: false;
    }): this;
    variantClone(params: VariantCloneParams & {
        save: true;
    }): Promise<this>;
    variantClone(params: VariantCloneParams): this | Promise<this>;
}
interface NPCPF2e {
    readonly data: NPCData;
    flags: NPCFlags;
    _sheet: NPCSheetPF2e<this> | null;
    get sheet(): NPCSheetPF2e<this>;
}
export { NPCPF2e };
