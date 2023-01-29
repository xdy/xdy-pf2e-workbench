import { ActorPF2e } from "@actor/base";
import { PhysicalItemPF2e } from "@item/physical";
import { ItemPF2e } from "@item/base";
import { UserPF2e } from "@module/user";
import { LootData, LootSource } from "./data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { ItemSourcePF2e, ItemType } from "@item/data";
declare class LootPF2e extends ActorPF2e {
    get allowedItemTypes(): (ItemType | "physical")[];
    get isLoot(): boolean;
    get isMerchant(): boolean;
    /** Should this actor's token(s) be hidden when there are no items in its inventory? */
    get hiddenWhenEmpty(): boolean;
    /** Loot actors can never benefit from rule elements */
    get canHostRuleElements(): boolean;
    /** It's a box. */
    get canAct(): false;
    /** It's a sturdy box. */
    isAffectedBy(): false;
    /** Anyone with Limited permission can update a loot actor */
    canUserModify(user: UserPF2e, action: UserAction): boolean;
    /** A user can see a loot actor in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    transferItemToActor(targetActor: ActorPF2e, item: Embedded<ItemPF2e>, quantity: number, containerId?: string, newStack?: boolean): Promise<Embedded<PhysicalItemPF2e> | null>;
    /** Hide this actor's token(s) when in loot (rather than merchant) mode, empty, and configured thus */
    toggleTokenHiding(): Promise<void>;
    protected _onCreate(data: LootSource, options: DocumentModificationContext<this>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<this>, userId: string): void;
    protected _onCreateEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", documents: ActiveEffectPF2e[] | ItemPF2e[], result: foundry.data.ActiveEffectSource[] | ItemSourcePF2e[], options: DocumentModificationContext<ActiveEffectPF2e | ItemPF2e>, userId: string): void;
    protected _onDeleteEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", documents: ActiveEffectPF2e[] | ItemPF2e[], result: foundry.data.ActiveEffectSource[] | ItemSourcePF2e[], options: DocumentModificationContext<ActiveEffectPF2e | ItemPF2e>, userId: string): void;
}
interface LootPF2e extends ActorPF2e {
    readonly data: LootData;
    readonly saves?: never;
    get hitPoints(): null;
}
export { LootPF2e };
