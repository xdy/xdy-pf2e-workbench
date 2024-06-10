import type { ActorPF2e } from "@actor";
import type { SpellPF2e, WeaponPF2e } from "@item";
import { PhysicalItemPF2e } from "@item";
import { RawItemChatData } from "@item/base/data/index.ts";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick.ts";
import type { ValueAndMax } from "@module/data.ts";
import type { UserPF2e } from "@module/user/document.ts";
import type { ConsumableSource, ConsumableSystemData } from "./data.ts";
import type { ConsumableCategory, ConsumableTrait, OtherConsumableTag } from "./types.ts";
declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ConsumableTrait, string>;
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get isAmmo(): boolean;
    get uses(): ValueAndMax;
    get embeddedSpell(): SpellPF2e<NonNullable<TParent>> | null;
    prepareBaseData(): void;
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions, rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    castEmbeddedSpell(trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
