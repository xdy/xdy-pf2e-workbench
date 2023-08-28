import { CreaturePF2e, FamiliarPF2e } from "@actor";
import { CreatureSpeeds, LabeledSpeed } from "@actor/creature/data.ts";
import { CreatureUpdateContext } from "@actor/creature/types.ts";
import { StrikeData } from "@actor/data/base.ts";
import { ActorInitiative } from "@actor/initiative.ts";
import { StatisticModifier } from "@actor/modifiers.ts";
import { AttackItem, AttributeString, MovementType, RollContext, RollContextParams } from "@actor/types.ts";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e, WeaponPF2e } from "@item";
import { ItemType } from "@item/data/index.ts";
import { MagicTradition } from "@item/spell/types.ts";
import { ZeroToTwo } from "@module/data.ts";
import { UserPF2e } from "@module/user/document.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { RollParameters } from "@system/rolls.ts";
import { Statistic, StatisticCheck } from "@system/statistic/index.ts";
import { CraftingEntry, CraftingFormula } from "./crafting/index.ts";
import { BaseWeaponProficiencyKey, CharacterAbilities, CharacterFlags, CharacterSource, CharacterStrike, CharacterSystemData, ClassDCData, WeaponGroupProficiencyKey } from "./data.ts";
import { CharacterFeats } from "./feats.ts";
import { CharacterHitPointsSummary, CharacterSkills, GuaranteedGetStatisticSlug } from "./types.ts";
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
    /** All class DCs, including the primary */
    classDCs: Record<string, Statistic>;
    /** Skills for the character, built during data prep */
    skills: CharacterSkills;
    initiative: ActorInitiative;
    get allowedItemTypes(): (ItemType | "physical")[];
    get keyAttribute(): AttributeString;
    /** @deprecated */
    get keyAbility(): AttributeString;
    /** This PC's ability scores */
    get abilities(): CharacterAbilities;
    get handsFree(): ZeroToTwo;
    /** The number of hands this PC "really" has free: this is, ignoring allowances for the Free Hand trait */
    get handsReallyFree(): ZeroToTwo;
    get hitPoints(): CharacterHitPointsSummary;
    get heroPoints(): {
        value: number;
        max: number;
    };
    /** Retrieve lore skills, class statistics, and tradition-specific spellcasting */
    getStatistic(slug: GuaranteedGetStatisticSlug): Statistic;
    getStatistic(slug: string): Statistic | null;
    getCraftingFormulas(): Promise<CraftingFormula[]>;
    getCraftingEntries(formulas?: CraftingFormula[]): Promise<CraftingEntry[]>;
    getCraftingEntry(selector: string): Promise<CraftingEntry | null>;
    performDailyCrafting(): Promise<void>;
    protected _initialize(options?: Record<string, unknown>): void;
    /** If one exists, prepare this character's familiar */
    prepareData(): void;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    /** After AE-likes have been applied, set numeric roll options */
    prepareEmbeddedDocuments(): void;
    /**
     * Immediately after boosts from this PC's ancestry, background, and class have been acquired, set attribute
     * modifiers according to them.
     */
    prepareDataFromItems(): void;
    prepareDerivedData(): void;
    private setAttributeModifiers;
    /** Set roll operations for ability scores, proficiency ranks, and number of hands free */
    protected setNumericRollOptions(): void;
    private createArmorStatistic;
    private prepareSaves;
    private prepareSkills;
    prepareSpeed(movementType: "land"): CreatureSpeeds;
    prepareSpeed(movementType: Exclude<MovementType, "land">): (LabeledSpeed & StatisticModifier) | null;
    prepareSpeed(movementType: MovementType): CreatureSpeeds | (LabeledSpeed & StatisticModifier) | null;
    private prepareFeats;
    prepareClassDC(slug: string, classDC: Pick<ClassDCData, "label" | "ability" | "rank" | "primary">): Statistic;
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
    protected getRollContext<TStatistic extends StatisticCheck | StrikeData | null, TItem extends AttackItem | null>(params: RollContextParams<TStatistic, TItem>): Promise<RollContext<this, TStatistic, TItem>>;
    consumeAmmo(weapon: WeaponPF2e<this>, params: RollParameters): boolean;
    /** Prepare stored and synthetic martial proficiencies */
    prepareMartialProficiencies(): void;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addAttackProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    protected _preUpdate(changed: DeepPartial<CharacterSource>, options: CreatureUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Toggle between boost-driven and manual management of ability scores */
    toggleAttributeManagement(): Promise<void>;
}
interface CharacterPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: CharacterFlags;
    readonly _source: CharacterSource;
    system: CharacterSystemData;
}
export { CharacterPF2e };
