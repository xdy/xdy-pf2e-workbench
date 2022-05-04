import { ItemPF2e, ContainerPF2e } from "@item";
import { PhysicalItemData, TraitChatData } from "@item/data";
import { Rarity, Size } from "@module/data";
import { IdentificationStatus, ItemCarryType, MystifiedData, PhysicalItemTrait } from "./data";
import { UserPF2e } from "@module/user";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
export declare abstract class PhysicalItemPF2e extends ItemPF2e {
    private _container;
    get level(): number;
    get rarity(): Rarity;
    get traits(): Set<PhysicalItemTrait>;
    get quantity(): number;
    get size(): Size;
    get isEquipped(): boolean;
    get carryType(): ItemCarryType;
    get handsHeld(): number;
    get isHeld(): boolean;
    get price(): string;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isTemporary(): boolean;
    get material(): {
        precious: {
            type: PreciousMaterialType;
            grade: PreciousMaterialGrade;
        } | null;
    };
    get isInContainer(): boolean;
    get isStowed(): boolean;
    /** Get this item's container, returning null if it is not in a container */
    get container(): Embedded<ContainerPF2e> | null;
    get activations(): {
        id: string;
        description: {
            value: string;
        };
        actionCost: import("../data/base").ActionCost;
        components: {
            command: boolean;
            envision: boolean;
            interact: boolean;
            cast: boolean;
        };
        frequency: {
            value: number;
            max: number;
            duration: "day" | "PT1M" | "PT10M" | "PT1H" | "PT24H" | "P1W" | null;
        };
        traits: import("@module/data").ValuesList<"attack" | "open" | "secret" | "move" | "time" | "scroll" | "hex" | "range" | "android" | "force" | "abysium" | "adamantine" | "coldIron" | "darkwood" | "djezet" | "dragonhide" | "grisantian-pelt" | "inubrix" | "mithral" | "noqual" | "orichalcum" | "peachwood" | "siccatite" | "silver" | "sovereignSteel" | "warpglass" | "chaotic" | "evil" | "good" | "lawful" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "air" | "earth" | "light" | "magical" | "unarmed" | "water" | "emotion" | "bomb" | "staff" | "arcane" | "divine" | "occult" | "primal" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "alchemist" | "barbarian" | "bard" | "champion" | "cleric" | "druid" | "fighter" | "gunslinger" | "inventor" | "investigator" | "magus" | "monk" | "oracle" | "ranger" | "rogue" | "sorcerer" | "summoner" | "swashbuckler" | "witch" | "wizard" | "darkness" | "death" | "healing" | "range-5" | "range-10" | "range-15" | "range-20" | "range-25" | "range-30" | "range-40" | "range-50" | "range-60" | "range-70" | "range-80" | "range-90" | "range-100" | "range-120" | "range-150" | "range-180" | "range-200" | "range-240" | "range-300" | "range-500" | "range-increment-5" | "range-increment-10" | "range-increment-15" | "range-increment-20" | "range-increment-30" | "range-increment-40" | "range-increment-50" | "range-increment-60" | "range-increment-70" | "range-increment-75" | "range-increment-80" | "range-increment-90" | "range-increment-100" | "range-increment-110" | "range-increment-120" | "range-increment-130" | "range-increment-140" | "range-increment-150" | "range-increment-160" | "range-increment-170" | "range-increment-180" | "range-increment-190" | "range-increment-200" | "range-increment-210" | "range-increment-220" | "range-increment-230" | "range-increment-240" | "range-increment-250" | "range-increment-260" | "range-increment-270" | "range-increment-280" | "range-increment-290" | "range-increment-300" | "range-increment-310" | "range-increment-320" | "class" | "skill" | "general" | "archetype" | "curse" | "auditory" | "detection" | "disease" | "inhaled" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "trip" | "visual" | "consumable" | "cursed" | "extradimensional" | "invested" | "artifact" | "clockwork" | "intelligent" | "alchemical" | "aura" | "catalyst" | "contact" | "drug" | "elixir" | "fear" | "fey" | "fortune" | "fulu" | "gadget" | "incapacitation" | "infused" | "ingested" | "injury" | "kobold" | "mechanical" | "misfortune" | "morph" | "mutagen" | "oil" | "potion" | "precious" | "snare" | "splash" | "structure" | "talisman" | "teleportation" | "trap" | "virulent" | "wand" | "nonlethal" | "plant" | "radiation" | "eidolon" | "revelation" | "saggorak" | "half-elf" | "half-orc" | "aasimar" | "aberration" | "anadi" | "aphorite" | "automaton" | "azarketi" | "beastkin" | "catfolk" | "changeling" | "conrasu" | "dhampir" | "duskwalker" | "dwarf" | "elf" | "fetchling" | "fleshwarp" | "ganzi" | "geniekin" | "gnoll" | "gnome" | "goblin" | "goloma" | "grippli" | "halfling" | "hobgoblin" | "human" | "ifrit" | "kitsune" | "leshy" | "lizardfolk" | "orc" | "oread" | "poppet" | "ratfolk" | "shisk" | "shoony" | "skeleton" | "sprite" | "strix" | "suli" | "sylph" | "tengu" | "tiefling" | "undine" | "agile" | "attached-to-shield" | "attached-to-crossbow-or-firearm" | "backstabber" | "backswing" | "capacity-3" | "capacity-4" | "capacity-5" | "charm" | "climbing" | "cobbled" | "combination" | "concealable" | "concentrate" | "concussive" | "critical-fusion" | "deadly-d6" | "deadly-d8" | "deadly-2d8" | "deadly-3d8" | "deadly-4d8" | "deadly-d10" | "deadly-2d10" | "deadly-3d10" | "deadly-4d10" | "deadly-d12" | "deadly-2d12" | "deadly-3d12" | "deadly-4d12" | "disarm" | "double-barrel" | "fatal-aim-d10" | "fatal-aim-d12" | "fatal-d8" | "fatal-d10" | "fatal-d12" | "finesse" | "forceful" | "free-hand" | "fungus" | "grapple" | "hampering" | "injection" | "jousting-d6" | "kickback" | "modular" | "parry" | "propulsive" | "ranged-trip" | "reach" | "repeating" | "resonant" | "scatter-5" | "scatter-10" | "scatter-15" | "shadow" | "shove" | "sweep" | "telepathy" | "tethered" | "thrown" | "thrown-10" | "thrown-15" | "thrown-20" | "thrown-30" | "thrown-40" | "thrown-60" | "thrown-100" | "twin" | "two-hand-d6" | "two-hand-d8" | "two-hand-d10" | "two-hand-d12" | "versatile-acid" | "versatile-b" | "versatile-chaotic" | "versatile-cold" | "versatile-electricity" | "versatile-evil" | "versatile-fire" | "versatile-force" | "versatile-good" | "versatile-lawful" | "versatile-negative" | "versatile-p" | "versatile-positive" | "versatile-s" | "versatile-sonic" | "volley-20" | "volley-30" | "volley-50" | "circus" | "summon" | "brutal" | "reach-0" | "reach-10" | "reach-15" | "reach-20" | "reach-25" | "reach-30" | "reach-40" | "reach-50" | "reach-60" | "reach-100" | "reach-1000" | "reload-0" | "reload-1" | "reload-2" | "reload-1-min" | "beast" | "cantrip" | "composition" | "consecration" | "contingency" | "cursebound" | "dream" | "incarnate" | "linguistic" | "litany" | "metamagic" | "mindless" | "prediction" | "stance" | "summoned" | "true-name" | "additive1" | "additive2" | "additive3" | "dedication" | "downtime" | "evolution" | "exploration" | "finisher" | "flourish" | "lineage" | "manipulate" | "modification" | "multiclass" | "oath" | "pervasive-magic" | "press" | "rage" | "reckless" | "spellshot" | "stamina" | "tandem" | "unstable" | "vigilante">;
        componentsLabel: string;
    }[];
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    /** Refresh certain derived properties in case of special data preparation from subclasses */
    prepareDerivedData(): void;
    prepareSiblingData(this: Embedded<PhysicalItemPF2e>): void;
    /** Can the provided item stack with this item? */
    isStackableWith(item: PhysicalItemPF2e): boolean;
    getMystifiedData(status: IdentificationStatus, _options?: Record<string, boolean>): MystifiedData;
    getChatData(): Record<string, unknown>;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Include mystification-related rendering instructions for views that will display this data. */
    protected traitChatData(dictionary: Record<string, string>): TraitChatData[];
    /** Set to unequipped upon acquiring */
    protected _preCreate(data: PreDocumentId<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["data"]["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface PhysicalItemPF2e {
    readonly data: PhysicalItemData;
}
