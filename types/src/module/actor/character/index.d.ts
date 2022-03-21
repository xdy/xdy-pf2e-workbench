/// <reference types="jquery" />
import { ItemPF2e } from "@item/base";
import { StatisticModifier } from "@actor/modifiers";
import { RollParameters } from "@system/rolls";
import {
    AuxiliaryAction,
    BaseWeaponProficiencyKey,
    CharacterData,
    CharacterStrike,
    WeaponGroupProficiencyKey
} from "./data";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e, ConsumablePF2e, HeritagePF2e, WeaponPF2e } from "@item";
import { CreaturePF2e } from "../index";
import { WeaponCategory } from "@item/weapon/data";
import { AbilityString } from "@actor/data/base";
import { CreatureSpeeds, LabeledSpeed, MovementType } from "@actor/creature/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { CharacterSource } from "@actor/data";
import { UserPF2e } from "@module/user";
import { CraftingEntry, CraftingFormula } from "./crafting";
import { AttackItem, AttackRollContext, StrikeRollContext, StrikeRollContextParams } from "@actor/creature/types";
import { CharacterHitPointsSummary, CreateAuxiliaryParams } from "./types";

declare class CharacterPF2e extends CreaturePF2e {
    static get schema(): typeof CharacterData;
    get ancestry(): Embedded<AncestryPF2e> | null;
    get background(): Embedded<BackgroundPF2e> | null;
    get class(): Embedded<ClassPF2e> | null;
    get heritage(): Embedded<HeritagePF2e> | null;
    get keyAbility(): AbilityString;
    /** This PC's ability scores */
    get abilities(): import("@actor/creature/data").Abilities;
    get hitPoints(): CharacterHitPointsSummary;
    get heroPoints(): {
        value: number;
        max: number;
    };
    getCraftingFormulas(): Promise<CraftingFormula[]>;
    getCraftingEntries(): Promise<CraftingEntry[]>;
    getCraftingEntry(selector: string): Promise<CraftingEntry | undefined>;
    performDailyCrafting(): Promise<void>;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    /** After AE-likes have been applied, compute ability modifiers and set numeric roll options */
    prepareEmbeddedDocuments(): void;
    prepareDerivedData(): void;
    /** Set roll operations for ability scores and proficiency ranks */
    protected setNumericRollOptions(): void;
    prepareSaves(): void;
    prepareSpeed(movementType: "land"): CreatureSpeeds;
    prepareSpeed(movementType: Exclude<MovementType, "land">): LabeledSpeed & StatisticModifier;
    prepareSpeed(movementType: MovementType): CreatureSpeeds | (LabeledSpeed & StatisticModifier);
    /** Create an "auxiliary" action, an Interact or Release action using a weapon */
    createAuxAction({ weapon, action, purpose, hands }: CreateAuxiliaryParams): AuxiliaryAction;
    /** Prepare a strike action from a weapon */
    prepareStrike(weapon: Embedded<WeaponPF2e>, options: {
        categories: WeaponCategory[];
        ammos?: Embedded<ConsumablePF2e>[];
    }): CharacterStrike;
    /** Possibly modify this weapon depending on its */
    protected getStrikeRollContext<I extends AttackItem>(params: StrikeRollContextParams<I>): StrikeRollContext<this, I>;
    /** Create attack-roll modifiers from weapon traits */
    getAttackRollContext<I extends AttackItem>(params: StrikeRollContextParams<I>): AttackRollContext<this, I>;
    consumeAmmo(weapon: WeaponPF2e, args: RollParameters): boolean;
    /** Prepare stored and synthetic martial proficiencies */
    prepareMartialProficiencies(): void;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addCombatProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    removeCombatProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    /**
     * Roll a Recovery Check
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     */
    rollRecovery(event: JQuery.TriggeredEvent): void;
    protected _preUpdate(changed: DeepPartial<CharacterSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface CharacterPF2e {
    readonly data: CharacterData;
    deleteEmbeddedDocuments(embeddedName: "ActiveEffect", dataId: string[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    deleteEmbeddedDocuments(embeddedName: "Item", dataId: string[], context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    deleteEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", dataId: string[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
export { CharacterPF2e };
