import { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { ItemType } from "@item/base/data/index.ts";
import { ActiveEffectPF2e } from "@module/active-effect.ts";
import { UserPF2e } from "@module/user/document.ts";
import type { TokenDocumentPF2e } from "@scene/index.ts";
import { LootSource, LootSystemData } from "./data.ts";

declare class LootPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: null;
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
    /** A user can see a loot actor in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Anyone with Limited ownership can update a loot actor. */
    canUserModify(user: UserPF2e, action: UserAction): boolean;
    /** Hide this actor's token(s) when in loot (rather than merchant) mode, empty, and configured thus */
    toggleTokenHiding(): Promise<void>;
    /** Set base emphemeral data for later updating by derived-data preparation. */
    prepareBaseData(): void;
    /** Never process rules elements on loot actors */
    prepareDerivedData(): void;
    protected _onCreate(data: LootSource, options: DatabaseCreateOperation<TParent>, userId: string): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, userId: string): void;
    protected _onCreateDescendantDocuments(parent: this, collection: "effects" | "items", documents: ActiveEffectPF2e<this>[] | ItemPF2e<this>[], result: ActiveEffectPF2e<this>["_source"][] | ItemPF2e<this>["_source"][], operation: DatabaseCreateOperation<this>, userId: string): void;
    protected _onDeleteDescendantDocuments(parent: this, collection: "items" | "effects", documents: ActiveEffectPF2e<this>[] | ItemPF2e<this>[], ids: string[], operation: DatabaseDeleteOperation<this>, userId: string): void;
}
interface LootPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: LootSource;
    system: LootSystemData;
    readonly saves?: never;
    get hitPoints(): null;
}
export { LootPF2e };
