import { CreaturePF2e } from "@actor";
import type { Abilities } from "@actor/creature/data.ts";
import type { CreatureUpdateOperation } from "@actor/creature/index.ts";
import { ActorInitiative } from "@actor/initiative.ts";
import type { MeleePF2e } from "@item";
import type { ItemType } from "@item/base/data/index.ts";
import { RollNotePF2e } from "@module/notes.ts";
import { CreatureIdentificationData } from "@module/recall-knowledge.ts";
import type { UserPF2e } from "@module/user/document.ts";
import type { TokenDocumentPF2e } from "@scene";
import type { NPCFlags, NPCSource, NPCSystemData } from "./data.ts";
import type { VariantCloneParams } from "./types.ts";
declare class NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    initiative: ActorInitiative;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The level of this creature without elite/weak adjustments */
    get baseLevel(): number;
    /** This NPC's attribute modifiers */
    get abilities(): Abilities;
    get description(): string;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    get identificationDCs(): CreatureIdentificationData;
    /** A user can see an unlinked NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Non-owning users may be able to loot a dead NPC. */
    canUserModify(user: User, action: UserAction): boolean;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    private prepareSkills;
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
    protected _preUpdate(changed: DeepPartial<NPCSource>, operation: CreatureUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: NPCFlags;
    readonly _source: NPCSource;
    system: NPCSystemData;
}
export { NPCPF2e };
