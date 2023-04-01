import { CreaturePF2e, FamiliarPF2e } from "@actor";
import { Abilities, CreatureSpeeds, LabeledSpeed, MovementType } from "@actor/creature/data";
import { CreatureUpdateContext } from "@actor/creature/types";
import { ActorInitiative } from "@actor/initiative";
import { StatisticModifier } from "@actor/modifiers";
import { AbilityString, AttackItem, AttackRollContext, AttackRollContextParams, StrikeRollContext, StrikeRollContextParams } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e, WeaponPF2e } from "@item";
import { ItemType } from "@item/data";
import { MagicTradition } from "@item/spell/types";
import { UserPF2e } from "@module/user";
import { TokenDocumentPF2e } from "@scene";
import { RollParameters } from "@system/rolls";
import { Statistic, StatisticCheck } from "@system/statistic";
import { CraftingEntry, CraftingFormula } from "./crafting";
import { AuxiliaryAction, BaseWeaponProficiencyKey, CharacterFlags, CharacterSource, CharacterStrike, CharacterSystemData, ClassDCData, WeaponGroupProficiencyKey } from "./data";
import { CharacterFeats } from "./feats";
import { CharacterHitPointsSummary, CharacterSkills, CreateAuxiliaryParams } from "./types";
declare class CharacterPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    /** Core singular embeds for PCs */
    ancestry: AncestryPF2e<this> | null;
    heritage: HeritagePF2e<this> | null;
    background: BackgroundPF2e<this> | null;
    class: ClassPF2e<this> | null;
    deity: DeityPF2e<this> | null;
    /** A cached reference to this PC's familiar */
    familiar: FamiliarPF2e | null;
    feats: CharacterFeats<this>;
    pfsBoons: FeatPF2e<this>[];
    deityBoonsCurses: FeatPF2e<this>[];
    /** All base casting tradition proficiences, which spellcasting build off of */
    traditions: Record<MagicTradition, Statistic>;
    /** The primary class DC */
    classDC: Statistic | null;
    /** All class DCs regardless of whether or not its the primary */
    classDCs: Record<string, Statistic>;
    initiative: ActorInitiative;
    protected _skills: CharacterSkills | null;
    get allowedItemTypes(): (ItemType | "physical")[];
    get keyAbility(): AbilityString;
    /** This PC's ability scores */
    get abilities(): Abilities;
    get hitPoints(): CharacterHitPointsSummary;
    get skills(): CharacterSkills;
    get heroPoints(): {
        value: number;
        max: number;
    };
    getCraftingFormulas(): Promise<CraftingFormula[]>;
    getCraftingEntries(): Promise<CraftingEntry[]>;
    getCraftingEntry(selector: string): Promise<CraftingEntry | null>;
    performDailyCrafting(): Promise<void>;
    /** If one exists, prepare this character's familiar */
    prepareData(): void;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    /** After AE-likes have been applied, set numeric roll options */
    prepareEmbeddedDocuments(): void;
    /**
     * Immediately after boosts from this PC's ancestry, background, and class have been acquired, set ability scores
     * according to them.
     */
    prepareDataFromItems(): void;
    prepareDerivedData(): void;
    /** Using a string, attempts to retrieve a statistic proficiency */
    getProficiencyStatistic(slug: string): Statistic | null;
    private setAbilityScores;
    /** Set roll operations for ability scores, proficiency ranks, and number of hands free */
    protected setNumericRollOptions(): void;
    private prepareArmorClass;
    private prepareSaves;
    private prepareSkills;
    prepareSpeed(movementType: "land"): CreatureSpeeds;
    prepareSpeed(movementType: Exclude<MovementType, "land">): (LabeledSpeed & StatisticModifier) | null;
    prepareSpeed(movementType: MovementType): CreatureSpeeds | (LabeledSpeed & StatisticModifier) | null;
    prepareFeats(): void;
    prepareClassDC(slug: string, classDC: Pick<ClassDCData, "label" | "ability" | "rank" | "primary">): Statistic;
    /** Create an "auxiliary" action, an Interact or Release action using a weapon */
    createAuxAction({ weapon, action, purpose, hands }: CreateAuxiliaryParams): AuxiliaryAction;
    /** Prepare this character's strike actions */
    prepareStrikes({ includeBasicUnarmed }?: {
        includeBasicUnarmed?: boolean | undefined;
    }): CharacterStrike[];
    /** Prepare a strike action from a weapon */
    private prepareStrike;
    getStrikeDescription(weapon: WeaponPF2e): {
        description: string;
        criticalSuccess: string;
        success: string;
    };
    /** Modify this weapon from AdjustStrike rule elements */
    getRollContext<TStatistic extends StatisticModifier | StatisticCheck | null, TItem extends AttackItem | null>(params: StrikeRollContextParams<TStatistic, TItem>): Promise<StrikeRollContext<this, TStatistic, TItem>>;
    /** Create attack-roll modifiers from weapon traits */
    getCheckRollContext<TStatistic extends StatisticCheck | StatisticModifier, TItem extends AttackItem | null>(params: AttackRollContextParams<TStatistic, TItem>): Promise<AttackRollContext<this, TStatistic, TItem>>;
    consumeAmmo(weapon: WeaponPF2e<this>, params: RollParameters): boolean;
    /** Prepare stored and synthetic martial proficiencies */
    prepareMartialProficiencies(): void;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addAttackProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    protected _preUpdate(changed: DeepPartial<CharacterSource>, options: CreatureUpdateContext<TParent>, user: UserPF2e): Promise<void>;
    /** Toggle between boost-driven and manual management of ability scores */
    toggleAbilityManagement(): Promise<void>;
}
interface CharacterPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: CharacterFlags;
    readonly _source: CharacterSource;
    system: CharacterSystemData;
}
export { CharacterPF2e };
