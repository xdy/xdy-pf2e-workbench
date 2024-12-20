import type { ActorPF2e } from "@actor";
import type { CraftingAbility } from "@actor/character/crafting/ability.ts";
import { ItemPF2e } from "@item";
import type { ActionCost, Frequency, RawItemChatData } from "@item/base/data/index.ts";
import type { RangeData } from "@item/types.ts";
import type { UserPF2e } from "@module/user/index.ts";
import type { AbilitySource, AbilitySystemData } from "./data.ts";
import type { AbilityTrait } from "./types.ts";

declare class AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    range?: RangeData | null;
    isMelee?: boolean;
    /** If this ability can craft, what is the crafting ability */
    crafting?: CraftingAbility | null;
    static get validTraits(): Record<AbilityTrait, string>;
    get traits(): Set<AbilityTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    prepareActorData(): void;
    onPrepareSynthetics(this: AbilityItemPF2e<ActorPF2e>): void;
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    getChatData(this: AbilityItemPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AbilitySource;
    system: AbilitySystemData;
}
export { AbilityItemPF2e };
