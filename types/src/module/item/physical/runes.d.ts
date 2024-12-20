import type { CreatureTrait } from "@actor/creature/index.ts";
import {
    DamageDiceParameters,
    DamageDicePF2e,
    ModifierAdjustment,
    ModifierObjectParams,
    ModifierPF2e,
} from "@actor/modifiers.ts";
import { ResistanceType } from "@actor/types.ts";
import type { ArmorPF2e, MeleePF2e, PhysicalItemPF2e, WeaponPF2e } from "@item";
import { ArmorPropertyRuneType, ResilientRuneType } from "@item/armor/types.ts";
import { SpellTrait } from "@item/spell/types.ts";
import { StrikingRuneType, WeaponPropertyRuneType } from "@item/weapon/types.ts";
import { OneToFour, Rarity, ZeroToFour, ZeroToSix } from "@module/data.ts";
import { RollNoteSource } from "@module/notes.ts";
import { StrikeAdjustment } from "@module/rules/synthetics.ts";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success.ts";

declare function getPropertyRuneSlots(item: WeaponPF2e | ArmorPF2e): ZeroToFour;
/** Remove duplicate and lesser versions from an array of property runes */
declare function prunePropertyRunes<T extends string>(runes: (string | null)[], validTypes: Record<T, unknown>): T[];
declare function getRuneValuationData(item: PhysicalItemPF2e): RuneData[];
declare function getPropertyRuneDegreeAdjustments(item: WeaponPF2e): DegreeOfSuccessAdjustment[];
declare function getPropertyRuneDamage(weapon: WeaponPF2e | MeleePF2e, runes: WeaponPropertyRuneType[], options: Set<string>): (DamageDicePF2e | ModifierPF2e)[];
declare function getPropertyRuneStrikeAdjustments(runes: WeaponPropertyRuneType[]): StrikeAdjustment[];
declare function getPropertyRuneModifierAdjustments(runes: WeaponPropertyRuneType[]): ModifierAdjustment[];
type RuneDiceProperty = "slug" | "damageType" | "category" | "predicate" | "critical";
type RuneAdditionalDamageDice = Partial<Pick<DamageDiceParameters, RuneDiceProperty>> & Required<Pick<DamageDiceParameters, "diceNumber" | "dieSize">>;
type RuneAdditionalDamageModifier = Omit<ModifierObjectParams, "modifier"> & {
    modifier: string | number;
};
type RuneAdditionalDamage = RuneAdditionalDamageDice | RuneAdditionalDamageModifier;
type RuneTrait = SpellTrait | CreatureTrait | "saggorak";
interface RuneData {
    name: string;
    level: number;
    price: number;
    rarity: Rarity;
    traits: RuneTrait[];
}
interface PotencyRuneData extends RuneData {
    value: OneToFour;
}
interface SecondaryFundamentalRuneData<TSlug extends string> extends RuneData {
    slug: TSlug;
}
interface ReinforcingRuneData extends RuneData {
    hardness: {
        increase: number;
        max: number;
    };
    maxHP: {
        increase: number;
        max: number;
    };
}
type FundamentalShieldRuneData = {
    reinforcing: Record<ZeroToSix, ReinforcingRuneData | null>;
};
interface PropertyRuneData<TSlug extends string> extends RuneData {
    slug: TSlug;
}
interface ArmorPropertyRuneData<TSlug extends ArmorPropertyRuneType> extends PropertyRuneData<TSlug> {
}
interface WeaponPropertyRuneData<TSlug extends WeaponPropertyRuneType> extends PropertyRuneData<TSlug> {
    attack?: {
        /** Degree-of-success adjustments */
        dosAdjustments?: DegreeOfSuccessAdjustment[];
        notes?: RuneNoteData[];
    };
    damage?: {
        additional?: RuneAdditionalDamage[];
        notes?: RuneNoteData[];
        adjustments?: ModifierAdjustment[];
        /**
         * A list of resistances this weapon's damage will ignore--not limited to damage from the rune.
         * If `max` is numeric, the resistance ignored will be equal to the lower of the provided maximum and the
         * target's resistance.
         */
        ignoredResistances?: {
            type: ResistanceType;
            max: number;
        }[];
    };
    strikeAdjustments?: Pick<StrikeAdjustment, "adjustTraits" | "adjustWeapon">[];
}
/** Title and text are mandatory for these notes */
interface RuneNoteData extends Pick<RollNoteSource, "outcome" | "predicate" | "title" | "text"> {
    title: string;
    text: string;
}
export declare const ARMOR_PROPERTY_RUNES: {
    [T in ArmorPropertyRuneType]: ArmorPropertyRuneData<T>;
};
declare const RUNE_DATA: {
    armor: {
        property: {
            shadow: ArmorPropertyRuneData<"shadow">;
            ethereal: ArmorPropertyRuneData<"ethereal">;
            portable: ArmorPropertyRuneData<"portable">;
            acidResistant: ArmorPropertyRuneData<"acidResistant">;
            advancing: ArmorPropertyRuneData<"advancing">;
            aimAiding: ArmorPropertyRuneData<"aimAiding">;
            antimagic: ArmorPropertyRuneData<"antimagic">;
            assisting: ArmorPropertyRuneData<"assisting">;
            bitter: ArmorPropertyRuneData<"bitter">;
            coldResistant: ArmorPropertyRuneData<"coldResistant">;
            deathless: ArmorPropertyRuneData<"deathless">;
            electricityResistant: ArmorPropertyRuneData<"electricityResistant">;
            energyAdaptive: ArmorPropertyRuneData<"energyAdaptive">;
            fireResistant: ArmorPropertyRuneData<"fireResistant">;
            fortification: ArmorPropertyRuneData<"fortification">;
            glamered: ArmorPropertyRuneData<"glamered">;
            gliding: ArmorPropertyRuneData<"gliding">;
            greaterAcidResistant: ArmorPropertyRuneData<"greaterAcidResistant">;
            greaterAdvancing: ArmorPropertyRuneData<"greaterAdvancing">;
            greaterColdResistant: ArmorPropertyRuneData<"greaterColdResistant">;
            greaterDread: ArmorPropertyRuneData<"greaterDread">;
            greaterElectricityResistant: ArmorPropertyRuneData<"greaterElectricityResistant">;
            greaterFireResistant: ArmorPropertyRuneData<"greaterFireResistant">;
            greaterFortification: ArmorPropertyRuneData<"greaterFortification">;
            greaterInvisibility: ArmorPropertyRuneData<"greaterInvisibility">;
            greaterQuenching: ArmorPropertyRuneData<"greaterQuenching">;
            greaterReady: ArmorPropertyRuneData<"greaterReady">;
            greaterShadow: ArmorPropertyRuneData<"greaterShadow">;
            greaterSlick: ArmorPropertyRuneData<"greaterSlick">;
            greaterStanching: ArmorPropertyRuneData<"greaterStanching">;
            greaterSwallowSpike: ArmorPropertyRuneData<"greaterSwallowSpike">;
            greaterWinged: ArmorPropertyRuneData<"greaterWinged">;
            immovable: ArmorPropertyRuneData<"immovable">;
            implacable: ArmorPropertyRuneData<"implacable">;
            invisibility: ArmorPropertyRuneData<"invisibility">;
            lesserDread: ArmorPropertyRuneData<"lesserDread">;
            magnetizing: ArmorPropertyRuneData<"magnetizing">;
            majorQuenching: ArmorPropertyRuneData<"majorQuenching">;
            majorShadow: ArmorPropertyRuneData<"majorShadow">;
            majorSlick: ArmorPropertyRuneData<"majorSlick">;
            majorStanching: ArmorPropertyRuneData<"majorStanching">;
            majorSwallowSpike: ArmorPropertyRuneData<"majorSwallowSpike">;
            malleable: ArmorPropertyRuneData<"malleable">;
            misleading: ArmorPropertyRuneData<"misleading">;
            moderateDread: ArmorPropertyRuneData<"moderateDread">;
            quenching: ArmorPropertyRuneData<"quenching">;
            raiment: ArmorPropertyRuneData<"raiment">;
            ready: ArmorPropertyRuneData<"ready">;
            rockBraced: ArmorPropertyRuneData<"rockBraced">;
            sinisterKnight: ArmorPropertyRuneData<"sinisterKnight">;
            sizeChanging: ArmorPropertyRuneData<"sizeChanging">;
            slick: ArmorPropertyRuneData<"slick">;
            soaring: ArmorPropertyRuneData<"soaring">;
            stanching: ArmorPropertyRuneData<"stanching">;
            swallowSpike: ArmorPropertyRuneData<"swallowSpike">;
            trueQuenching: ArmorPropertyRuneData<"trueQuenching">;
            trueStanching: ArmorPropertyRuneData<"trueStanching">;
            winged: ArmorPropertyRuneData<"winged">;
        };
        potency: Record<ZeroToFour, PotencyRuneData | null>;
        resilient: Record<ZeroToFour, SecondaryFundamentalRuneData<ResilientRuneType> | null>;
    };
    shield: FundamentalShieldRuneData;
    weapon: {
        property: {
            holy: WeaponPropertyRuneData<"holy">;
            unholy: WeaponPropertyRuneData<"unholy">;
            vorpal: WeaponPropertyRuneData<"vorpal">;
            astral: WeaponPropertyRuneData<"astral">;
            speed: WeaponPropertyRuneData<"speed">;
            ancestralEchoing: WeaponPropertyRuneData<"ancestralEchoing">;
            anchoring: WeaponPropertyRuneData<"anchoring">;
            ashen: WeaponPropertyRuneData<"ashen">;
            authorized: WeaponPropertyRuneData<"authorized">;
            bane: WeaponPropertyRuneData<"bane">;
            bloodbane: WeaponPropertyRuneData<"bloodbane">;
            bloodthirsty: WeaponPropertyRuneData<"bloodthirsty">;
            brilliant: WeaponPropertyRuneData<"brilliant">;
            called: WeaponPropertyRuneData<"called">;
            coating: WeaponPropertyRuneData<"coating">;
            conducting: WeaponPropertyRuneData<"conducting">;
            corrosive: WeaponPropertyRuneData<"corrosive">;
            crushing: WeaponPropertyRuneData<"crushing">;
            cunning: WeaponPropertyRuneData<"cunning">;
            dancing: WeaponPropertyRuneData<"dancing">;
            deathdrinking: WeaponPropertyRuneData<"deathdrinking">;
            decaying: WeaponPropertyRuneData<"decaying">;
            demolishing: WeaponPropertyRuneData<"demolishing">;
            disrupting: WeaponPropertyRuneData<"disrupting">;
            earthbinding: WeaponPropertyRuneData<"earthbinding">;
            energizing: WeaponPropertyRuneData<"energizing">;
            extending: WeaponPropertyRuneData<"extending">;
            fanged: WeaponPropertyRuneData<"fanged">;
            fearsome: WeaponPropertyRuneData<"fearsome">;
            flaming: WeaponPropertyRuneData<"flaming">;
            flickering: WeaponPropertyRuneData<"flickering">;
            flurrying: WeaponPropertyRuneData<"flurrying">;
            frost: WeaponPropertyRuneData<"frost">;
            ghostTouch: WeaponPropertyRuneData<"ghostTouch">;
            giantKilling: WeaponPropertyRuneData<"giantKilling">;
            greaterGiantKilling: WeaponPropertyRuneData<"greaterGiantKilling">;
            greaterAnchoring: WeaponPropertyRuneData<"greaterAnchoring">;
            greaterAshen: WeaponPropertyRuneData<"greaterAshen">;
            greaterAstral: WeaponPropertyRuneData<"greaterAstral">;
            greaterBloodbane: WeaponPropertyRuneData<"greaterBloodbane">;
            greaterBrilliant: WeaponPropertyRuneData<"greaterBrilliant">;
            greaterCorrosive: WeaponPropertyRuneData<"greaterCorrosive">;
            greaterCrushing: WeaponPropertyRuneData<"greaterCrushing">;
            greaterDecaying: WeaponPropertyRuneData<"greaterDecaying">;
            greaterDisrupting: WeaponPropertyRuneData<"greaterDisrupting">;
            greaterExtending: WeaponPropertyRuneData<"greaterExtending">;
            greaterFanged: WeaponPropertyRuneData<"greaterFanged">;
            greaterFearsome: WeaponPropertyRuneData<"greaterFearsome">;
            greaterFlaming: WeaponPropertyRuneData<"greaterFlaming">;
            greaterFrost: WeaponPropertyRuneData<"greaterFrost">;
            greaterHauling: WeaponPropertyRuneData<"greaterHauling">;
            greaterImpactful: WeaponPropertyRuneData<"greaterImpactful">;
            greaterRooting: WeaponPropertyRuneData<"greaterRooting">;
            greaterShock: WeaponPropertyRuneData<"greaterShock">;
            greaterThundering: WeaponPropertyRuneData<"greaterThundering">;
            grievous: WeaponPropertyRuneData<"grievous">;
            hauling: WeaponPropertyRuneData<"hauling">;
            hopeful: WeaponPropertyRuneData<"hopeful">;
            hooked: WeaponPropertyRuneData<"hooked">;
            impactful: WeaponPropertyRuneData<"impactful">;
            impossible: WeaponPropertyRuneData<"impossible">;
            keen: WeaponPropertyRuneData<"keen">;
            kinWarding: WeaponPropertyRuneData<"kinWarding">;
            majorFanged: WeaponPropertyRuneData<"majorFanged">;
            majorRooting: WeaponPropertyRuneData<"majorRooting">;
            merciful: WeaponPropertyRuneData<"merciful">;
            nightmare: WeaponPropertyRuneData<"nightmare">;
            pacifying: WeaponPropertyRuneData<"pacifying">;
            returning: WeaponPropertyRuneData<"returning">;
            rooting: WeaponPropertyRuneData<"rooting">;
            serrating: WeaponPropertyRuneData<"serrating">;
            shifting: WeaponPropertyRuneData<"shifting">;
            shock: WeaponPropertyRuneData<"shock">;
            shockwave: WeaponPropertyRuneData<"shockwave">;
            spellStoring: WeaponPropertyRuneData<"spellStoring">;
            swarming: WeaponPropertyRuneData<"swarming">;
            thundering: WeaponPropertyRuneData<"thundering">;
            trueRooting: WeaponPropertyRuneData<"trueRooting">;
            underwater: WeaponPropertyRuneData<"underwater">;
            wounding: WeaponPropertyRuneData<"wounding">;
        };
        potency: Record<ZeroToFour, PotencyRuneData | null>;
        striking: Record<ZeroToFour, SecondaryFundamentalRuneData<StrikingRuneType> | null>;
    };
};
export { RUNE_DATA, getPropertyRuneDamage, getPropertyRuneDegreeAdjustments, getPropertyRuneModifierAdjustments, getPropertyRuneSlots, getPropertyRuneStrikeAdjustments, getRuneValuationData, prunePropertyRunes, };
export type { RuneData, WeaponPropertyRuneData };
