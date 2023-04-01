import { CreaturePF2e } from "@actor";
import { Abilities } from "@actor/creature/data";
import { ActorInitiative } from "@actor/initiative";
import { MeleePF2e } from "@item";
import { ItemType } from "@item/data";
import { RollNotePF2e } from "@module/notes";
import { TokenDocumentPF2e } from "@scene";
import { NPCFlags, NPCSource, NPCSystemData } from "./data";
import { NPCSheetPF2e } from "./sheet";
import { VariantCloneParams } from "./types";
declare class NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    initiative: ActorInitiative;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The level of this creature without elite/weak adjustments */
    get baseLevel(): number;
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
    prepareDerivedData(): void;
    private prepareSaves;
    getAttackEffects(attack: MeleePF2e): Promise<RollNotePF2e[]>;
    private getHpAdjustment;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | null): Promise<void>;
    /** Create a variant clone of this NPC, adjusting any of name, description, and images */
    variantClone(params: VariantCloneParams & {
        save?: false;
    }): this;
    variantClone(params: VariantCloneParams & {
        save: true;
    }): Promise<this>;
    variantClone(params: VariantCloneParams): this | Promise<this>;
}
interface NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: NPCFlags;
    readonly _source: NPCSource;
    system: NPCSystemData;
    get sheet(): NPCSheetPF2e<this>;
}
export { NPCPF2e };
