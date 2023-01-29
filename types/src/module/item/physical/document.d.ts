import { type ContainerPF2e, ItemPF2e } from "@item";
import { ItemSummaryData, PhysicalItemData, TraitChatData } from "@item/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { Rarity, Size } from "@module/data";
import { UserPF2e } from "@module/user";
import { Bulk } from "./bulk";
import { IdentificationStatus, ItemCarryType, MystifiedData, PhysicalItemTrait, Price } from "./data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
declare abstract class PhysicalItemPF2e extends ItemPF2e {
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
    get isShoddy(): boolean;
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
        frequency?: import("../data/base").Frequency | undefined;
        traits: import("@module/data").ValuesList<"attack" | "open" | "secret" | "move" | "time" | "scroll" | "hex" | "android" | "force" | "class" | "consumable" | "light" | "chaotic" | "evil" | "good" | "lawful" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "splash" | "abjuration" | "auditory" | "conjuration" | "curse" | "disease" | "divination" | "emotion" | "enchantment" | "evocation" | "healing" | "illusion" | "inhaled" | "magical" | "necromancy" | "nonlethal" | "olfactory" | "plant" | "polymorph" | "possession" | "radiation" | "scrying" | "sleep" | "transmutation" | "visual" | "water" | "air" | "earth" | "metal" | "arcane" | "divine" | "occult" | "primal" | "alchemist" | "barbarian" | "bard" | "champion" | "cleric" | "druid" | "fighter" | "gunslinger" | "inventor" | "investigator" | "magus" | "monk" | "oracle" | "psychic" | "ranger" | "rogue" | "sorcerer" | "summoner" | "swashbuckler" | "thaumaturge" | "witch" | "wizard" | "darkness" | "death" | "skill" | "general" | "archetype" | "clockwork" | "cursed" | "extradimensional" | "additive1" | "additive2" | "additive3" | "alchemical" | "aura" | "catalyst" | "contact" | "drug" | "elixir" | "fear" | "fey" | "fortune" | "fulu" | "gadget" | "incapacitation" | "infused" | "ingested" | "injury" | "kobold" | "mechanical" | "misfortune" | "morph" | "mutagen" | "oil" | "potion" | "precious" | "snare" | "structure" | "talisman" | "teleportation" | "trap" | "virulent" | "wand" | "consecration" | "detection" | "eidolon" | "revelation" | "half-elf" | "half-orc" | "aasimar" | "aberration" | "anadi" | "aphorite" | "automaton" | "azarketi" | "beastkin" | "catfolk" | "changeling" | "conrasu" | "dhampir" | "duskwalker" | "dwarf" | "elf" | "fetchling" | "fleshwarp" | "ganzi" | "geniekin" | "ghoran" | "gnoll" | "gnome" | "goblin" | "goloma" | "grippli" | "halfling" | "hobgoblin" | "human" | "ifrit" | "kashrishi" | "kitsune" | "leshy" | "lizardfolk" | "nagaji" | "orc" | "oread" | "poppet" | "ratfolk" | "shisk" | "shoony" | "skeleton" | "sprite" | "strix" | "suli" | "sylph" | "tengu" | "tiefling" | "undine" | "vanara" | "vishkanya" | "fungus" | "shadow" | "aftermath" | "concentrate" | "dedication" | "deviant" | "downtime" | "evolution" | "esoterica" | "exploration" | "finisher" | "flourish" | "lineage" | "manipulate" | "metamagic" | "mindshift" | "modification" | "multiclass" | "oath" | "pervasive-magic" | "press" | "rage" | "reckless" | "reflection" | "social" | "spellshot" | "stamina" | "stance" | "tandem" | "true-name" | "unstable" | "vigilante" | "amp" | "beast" | "cantrip" | "composition" | "contingency" | "cursebound" | "dream" | "incarnate" | "incorporeal" | "linguistic" | "litany" | "mindless" | "prediction" | "psyche" | "summoned" | "circus" | "summon">;
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
    getChatData(): Promise<ItemSummaryData>;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Include mystification-related rendering instructions for views that will display this data. */
    protected traitChatData(dictionary: Record<string, string>): TraitChatData[];
    /** Set to unequipped upon acquiring */
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface PhysicalItemPF2e {
    readonly data: PhysicalItemData;
    computeAdjustedPrice?(): CoinsPF2e | null;
}
export { PhysicalItemPF2e };
