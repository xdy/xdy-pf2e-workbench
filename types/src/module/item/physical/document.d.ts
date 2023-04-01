import { ActorPF2e } from "@actor";
import { type ContainerPF2e, ItemPF2e } from "@item";
import { ItemSummaryData, PhysicalItemSource, TraitChatData } from "@item/data";
import { CoinsPF2e } from "@item/physical/helpers";
import { Rarity, Size } from "@module/data";
import { UserPF2e } from "@module/user";
import { Bulk } from "./bulk";
import { IdentificationStatus, ItemCarryType, MystifiedData, PhysicalItemTrait, PhysicalSystemData, Price } from "./data";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types";
declare abstract class PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
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
    get container(): ContainerPF2e<ActorPF2e> | null;
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
        traits: import("@module/data").ValuesList<"attack" | "open" | "secret" | "move" | "time" | "scroll" | "class" | "hex" | "android" | "force" | "darkness" | "chaotic" | "evil" | "good" | "lawful" | "acid" | "cold" | "electricity" | "fire" | "sonic" | "positive" | "negative" | "mental" | "poison" | "splash" | "abjuration" | "auditory" | "conjuration" | "curse" | "disease" | "divination" | "emotion" | "enchantment" | "evocation" | "healing" | "illusion" | "inhaled" | "light" | "magical" | "necromancy" | "nonlethal" | "olfactory" | "plant" | "polymorph" | "possession" | "radiation" | "scrying" | "sleep" | "transmutation" | "visual" | "water" | "air" | "earth" | "metal" | "arcane" | "divine" | "occult" | "primal" | "alchemist" | "barbarian" | "bard" | "champion" | "cleric" | "druid" | "fighter" | "gunslinger" | "inventor" | "investigator" | "magus" | "monk" | "oracle" | "psychic" | "ranger" | "rogue" | "sorcerer" | "summoner" | "swashbuckler" | "thaumaturge" | "witch" | "wizard" | "death" | "skill" | "general" | "ratfolk" | "reflection" | "revelation" | "shadow" | "shisk" | "shoony" | "skeleton" | "snare" | "social" | "spellgun" | "spellshot" | "sprite" | "stance" | "strix" | "structure" | "suli" | "summon" | "summoned" | "sylph" | "talisman" | "teleportation" | "tengu" | "tiefling" | "trap" | "true-name" | "undine" | "unstable" | "vanara" | "vishkanya" | "virulent" | "wand" | "aasimar" | "aberration" | "additive1" | "additive2" | "additive3" | "aftermath" | "alchemical" | "anadi" | "aphorite" | "archetype" | "artifact" | "aura" | "automaton" | "azarketi" | "beastkin" | "cantrip" | "catalyst" | "catfolk" | "changeling" | "clockwork" | "composition" | "concentrate" | "conrasu" | "consecration" | "consumable" | "contact" | "contingency" | "cursebound" | "cursed" | "dedication" | "detection" | "deviant" | "dhampir" | "downtime" | "drug" | "duskwalker" | "dwarf" | "eidolon" | "elf" | "elixir" | "esoterica" | "expandable" | "exploration" | "extradimensional" | "fear" | "fetchling" | "fey" | "finisher" | "fleshwarp" | "flourish" | "fortune" | "fulu" | "fungus" | "gadget" | "ganzi" | "geniekin" | "ghoran" | "gnoll" | "gnome" | "goblin" | "goloma" | "grippli" | "halfling" | "half-elf" | "half-orc" | "hobgoblin" | "human" | "ifrit" | "incapacitation" | "incarnate" | "incorporeal" | "infused" | "ingested" | "injury" | "kashrishi" | "kitsune" | "kobold" | "leshy" | "linguistic" | "litany" | "lizardfolk" | "lozenge" | "manipulate" | "mechanical" | "metamagic" | "mindless" | "mindshift" | "misfortune" | "missive" | "modification" | "morph" | "multiclass" | "mutagen" | "nagaji" | "oath" | "oil" | "orc" | "oread" | "poppet" | "potion" | "precious" | "prediction" | "press" | "psyche" | "rage" | "circus" | "amp" | "beast" | "dream" | "processed" | "evolution" | "lineage" | "pervasive-magic" | "reckless" | "stamina" | "tandem" | "vigilante">;
        componentsLabel: string;
    }[];
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    /** Refresh certain derived properties in case of special data preparation from subclasses */
    prepareDerivedData(): void;
    /** Increase the price if it is larger than medium and not magical. */
    protected adjustPriceForSize(): CoinsPF2e;
    prepareSiblingData(): void;
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
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<void>;
}
interface PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: PhysicalItemSource;
    system: PhysicalSystemData;
    computeAdjustedPrice?(): CoinsPF2e | null;
}
export { PhysicalItemPF2e };
