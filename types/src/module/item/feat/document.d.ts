import type { ActorPF2e } from "@actor";
import type { CraftingAbility } from "@actor/character/crafting/ability.ts";
import type { FeatGroup } from "@actor/character/feats/index.ts";
import { type HeritagePF2e, ItemPF2e } from "@item";
import { ActionCost, Frequency, RawItemChatData } from "@item/base/data/index.ts";
import { Rarity } from "@module/data.ts";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import { FeatSource, FeatSystemData } from "./data.ts";
import { FeatOrFeatureCategory, FeatTrait } from "./types.ts";

declare class FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup | null;
    grants: (FeatPF2e<ActorPF2e> | HeritagePF2e<ActorPF2e>)[];
    /** If this ability can craft, what is the crafting ability */
    crafting: CraftingAbility | null;
    /** If suppressed, this feature should not be assigned to any feat category nor create rule elements */
    suppressed: boolean;
    static get validTraits(): Record<FeatTrait, string>;
    get category(): FeatOrFeatureCategory;
    get level(): number;
    get traits(): Set<FeatTrait>;
    get rarity(): Rarity;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    get isFeature(): boolean;
    get isFeat(): boolean;
    /** Whether this feat must be taken at character level 1 */
    get onlyLevel1(): boolean;
    /** The maximum number of times this feat can be taken */
    get maxTakable(): number;
    /** Returns the number of times this feat was taken, limited by maxTakable */
    get timesTaken(): number;
    prepareBaseData(): void;
    prepareActorData(): void;
    /** Assigns the grants of this item based on the given item. */
    establishHierarchy(): void;
    prepareSiblingData(): void;
    onPrepareSynthetics(this: FeatPF2e<ActorPF2e>): void;
    /** Overriden to not create rule elements when suppressed */
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElementPF2e[];
    getChatData(this: FeatPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    protected embedHTMLString(_config: DocumentHTMLEmbedConfig, _options: EnrichmentOptions): string;
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, operation: DatabaseCreateOperation<TParent>, userId: string): void;
}
interface FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: FeatSource;
    system: FeatSystemData;
    /** Interface alignment with other "attack items" */
    readonly range?: never;
}
export { FeatPF2e };
