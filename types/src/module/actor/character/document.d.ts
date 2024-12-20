import { CreaturePF2e, type FamiliarPF2e } from "@actor";
import { CreatureSpeeds, LabeledSpeed } from "@actor/creature/data.ts";
import { CreatureUpdateOperation, ResourceData } from "@actor/creature/types.ts";
import { ActorInitiative } from "@actor/initiative.ts";
import { StatisticModifier } from "@actor/modifiers.ts";
import { AttributeString, MovementType } from "@actor/types.ts";
import type { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e } from "@item";
import { WeaponPF2e } from "@item";
import type { ItemType } from "@item/base/data/index.ts";
import { ZeroToTwo } from "@module/data.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { RollParameters } from "@system/rolls.ts";
import { Statistic } from "@system/statistic/index.ts";
import { CharacterCrafting } from "./crafting/index.ts";
import {
    BaseWeaponProficiencyKey,
    CharacterAbilities,
    CharacterFlags,
    CharacterSource,
    CharacterStrike,
    CharacterSystemData,
    WeaponGroupProficiencyKey,
} from "./data.ts";
import { CharacterFeats } from "./feats/index.ts";
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
    divineIntercessions: FeatPF2e<this>[];
    /** The primary class DC */
    classDC: Statistic | null;
    /** All class DCs, including the primary */
    classDCs: Record<string, Statistic>;
    /** Skills for the character, built during data prep */
    skills: CharacterSkills<this>;
    initiative: ActorInitiative;
    crafting: CharacterCrafting;
    get allowedItemTypes(): (ItemType | "physical")[];
    get keyAttribute(): AttributeString;
    /** This PC's ability scores */
    get abilities(): CharacterAbilities;
    get handsFree(): ZeroToTwo;
    /** The number of hands this PC "really" has free, ignoring allowances for shields and the Free-Hand trait */
    get handsReallyFree(): ZeroToTwo;
    get hitPoints(): CharacterHitPointsSummary;
    get heroPoints(): {
        value: number;
        max: number;
    };
    /** Retrieve lore skills, class statistics, and tradition-specific spellcasting */
    getStatistic(slug: GuaranteedGetStatisticSlug): Statistic<this>;
    getStatistic(slug: string): Statistic<this> | null;
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
    private prepareBuildData;
    /** Set roll operations for ability scores, proficiency ranks, and number of hands free */
    protected setNumericRollOptions(): void;
    private createArmorStatistic;
    private prepareSaves;
    private prepareSkills;
    prepareSpeed(movementType: "land"): CreatureSpeeds;
    prepareSpeed(movementType: Exclude<MovementType, "land">): (LabeledSpeed & StatisticModifier) | null;
    prepareSpeed(movementType: MovementType): CreatureSpeeds | (LabeledSpeed & StatisticModifier) | null;
    private prepareFeats;
    private prepareClassDC;
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
    consumeAmmo(weapon: WeaponPF2e<CharacterPF2e>, params: RollParameters): boolean;
    /** Prepare stored and synthetic martial proficiencies */
    prepareMartialProficiencies(): void;
    /** Toggle the invested state of an owned magical item */
    toggleInvested(itemId: string): Promise<boolean>;
    /** Add a proficiency in a weapon group or base weapon */
    addAttackProficiency(key: BaseWeaponProficiencyKey | WeaponGroupProficiencyKey): Promise<void>;
    protected _preUpdate(changed: DeepPartial<CharacterSource>, options: CreatureUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface CharacterPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: CharacterFlags;
    readonly _source: CharacterSource;
    system: CharacterSystemData;
    getResource(resource: "hero-points" | "mythic-points" | "focus" | "investiture" | "infused-reagents"): ResourceData;
    getResource(resource: string): ResourceData | null;
}
export { CharacterPF2e };
