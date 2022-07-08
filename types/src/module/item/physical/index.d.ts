import { type ContainerPF2e, ItemPF2e } from "@item";
import { PhysicalItemData, TraitChatData } from "@item/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { Rarity, Size } from "@module/data";
import { UserPF2e } from "@module/user";
import { Bulk } from "./bulk";
import { IdentificationStatus, ItemCarryType, MystifiedData, PhysicalItemTrait, Price } from "./data";
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
    get price(): Price;
    /** The monetary value of the entire item stack */
    get assetValue(): CoinsPF2e;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isTemporary(): boolean;
    get isDamaged(): boolean;
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
    /** Returns the bulk of this item and all sub-containers */
    get bulk(): Bulk;
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
        traits: import("@module/data").ValuesList<"attack" | "open" | "secret" | "move" | "time" | "scroll" | "hex" | "android" | "force" | "chaotic" | "evil" | "good" | "lawful" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "air" | "earth" | "light" | "magical" | "water" | "emotion" | "arcane" | "divine" | "occult" | "primal" | "abjuration" | "conjuration" | "divination" | "enchantment" | "evocation" | "illusion" | "necromancy" | "transmutation" | "alchemist" | "barbarian" | "bard" | "champion" | "cleric" | "druid" | "fighter" | "gunslinger" | "inventor" | "investigator" | "magus" | "monk" | "oracle" | "ranger" | "rogue" | "sorcerer" | "summoner" | "swashbuckler" | "witch" | "wizard" | "darkness" | "death" | "healing" | "class" | "skill" | "general" | "archetype" | "curse" | "auditory" | "detection" | "disease" | "inhaled" | "olfactory" | "polymorph" | "possession" | "scrying" | "sleep" | "visual" | "ratfolk" | "revelation" | "shadow" | "shisk" | "shoony" | "skeleton" | "snare" | "social" | "spellshot" | "splash" | "sprite" | "stance" | "strix" | "structure" | "suli" | "summon" | "summoned" | "sylph" | "talisman" | "teleportation" | "tengu" | "tiefling" | "trap" | "true-name" | "undine" | "unstable" | "virulent" | "wand" | "aasimar" | "aberration" | "additive1" | "additive2" | "additive3" | "aftermath" | "alchemical" | "anadi" | "aphorite" | "aura" | "automaton" | "azarketi" | "beastkin" | "cantrip" | "catalyst" | "catfolk" | "changeling" | "clockwork" | "composition" | "concentrate" | "conrasu" | "consecration" | "consumable" | "contact" | "contingency" | "cursebound" | "dedication" | "dhampir" | "downtime" | "drug" | "duskwalker" | "dwarf" | "eidolon" | "elf" | "elixir" | "exploration" | "extradimensional" | "fear" | "fetchling" | "fey" | "finisher" | "fleshwarp" | "flourish" | "fortune" | "fulu" | "fungus" | "gadget" | "ganzi" | "geniekin" | "gnoll" | "gnome" | "goblin" | "goloma" | "grippli" | "halfling" | "half-elf" | "half-orc" | "hobgoblin" | "human" | "ifrit" | "incapacitation" | "incarnate" | "infused" | "ingested" | "injury" | "kitsune" | "kobold" | "leshy" | "linguistic" | "litany" | "lizardfolk" | "manipulate" | "mechanical" | "metamagic" | "mindless" | "misfortune" | "modification" | "morph" | "multiclass" | "mutagen" | "nonlethal" | "oath" | "oil" | "orc" | "oread" | "plant" | "poppet" | "potion" | "precious" | "prediction" | "press" | "rage" | "circus" | "beast" | "dream" | "radiation" | "evolution" | "lineage" | "pervasive-magic" | "reckless" | "stamina" | "tandem" | "vigilante">;
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
