import { ActorPF2e } from "@actor";
import { ItemPF2e, type ContainerPF2e } from "@item";
import { ItemSummaryData, PhysicalItemSource, TraitChatData } from "@item/data/index.ts";
import { CoinsPF2e } from "@item/physical/helpers.ts";
import { Rarity, Size } from "@module/data.ts";
import { UserPF2e } from "@module/user/document.ts";
import { Bulk } from "./bulk.ts";
import { IdentificationStatus, ItemActivation, ItemCarryType, MystifiedData, PhysicalItemTrait, PhysicalSystemData, Price } from "./data.ts";
import { PreciousMaterialGrade, PreciousMaterialType } from "./types.ts";
declare abstract class PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    private _container;
    get level(): number;
    get rarity(): Rarity;
    get traits(): Set<PhysicalItemTrait>;
    get quantity(): number;
    get size(): Size;
    get isEquipped(): boolean;
    get carryType(): ItemCarryType;
    /** Whether the item is currently being held */
    get isHeld(): boolean;
    /** The number of hands being used to hold this item */
    get handsHeld(): number;
    /** Whether the item is currently being worn */
    get isWorn(): boolean;
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
    get activations(): (ItemActivation & {
        componentsLabel: string;
    })[];
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    protected _initialize(options?: Record<string, unknown>): void;
    prepareBaseData(): void;
    /** Refresh certain derived properties in case of special data preparation from subclasses */
    prepareDerivedData(): void;
    /** Increase the price if it is larger than medium and not magical. */
    protected adjustPriceForSize(): CoinsPF2e;
    prepareSiblingData(): void;
    /** After item alterations have occurred, ensure that this item's hit points are no higher than its maximum */
    onPrepareSynthetics(this: PhysicalItemPF2e<ActorPF2e>): void;
    /** Can the provided item stack with this item? */
    isStackableWith(item: PhysicalItemPF2e): boolean;
    /** Combine this item with a target item if possible */
    stackWith(targetItem: PhysicalItemPF2e): Promise<void>;
    /**
     * Move this item somewhere else in the inventory, possibly before or after another item or in or out of a container.
     * If this item and the target item are stackable they will be stacked automatically
     * @param options Options to control where this item is moved to
     * @param options.relativeTo An optional target item to sort this item relative to
     * @param options.sortBefore Should this item be sorted before or after the target item?
     * @param options.toContainer An optional container to move this item into. If the target item is in a container this can be omitted
     * @param options.render Render the update? Overridden by moving the item in or out of a container. Defaults to true
     * @returns
     */
    move({ relativeTo, sortBefore, toContainer, toStack, render, }: {
        relativeTo?: PhysicalItemPF2e;
        sortBefore?: boolean;
        toContainer?: ContainerPF2e<ActorPF2e> | null;
        toStack?: PhysicalItemPF2e;
        render?: boolean;
    }): Promise<void>;
    getMystifiedData(status: IdentificationStatus, _options?: Record<string, boolean>): MystifiedData;
    getChatData(): Promise<ItemSummaryData>;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Include mystification-related rendering instructions for views that will display this data. */
    protected traitChatData(dictionary: Record<string, string>): TraitChatData[];
    /** Set to unequipped upon acquiring */
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: PhysicalItemSource;
    system: PhysicalSystemData;
    computeAdjustedPrice?(): CoinsPF2e | null;
}
export { PhysicalItemPF2e };
