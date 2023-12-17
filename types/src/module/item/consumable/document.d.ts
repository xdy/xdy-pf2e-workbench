import type { ActorPF2e } from "@actor";
import type { WeaponPF2e } from "@item";
import { PhysicalItemPF2e, SpellPF2e } from "@item";
import { ItemSummaryData } from "@item/base/data/index.ts";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick.ts";
import { ValueAndMax } from "@module/data.ts";
import type { RuleElementPF2e } from "@module/rules/index.ts";
import type { UserPF2e } from "@module/user/document.ts";
import { ConsumableSource, ConsumableSystemData } from "./data.ts";
import { ConsumableCategory, OtherConsumableTag } from "./types.ts";
declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get isAmmo(): boolean;
    get uses(): ValueAndMax;
    get embeddedSpell(): SpellPF2e<ActorPF2e> | null;
    prepareBaseData(): void;
    /** Rule elements cannot be executed from consumable items, but they can be used to generate effects */
    prepareRuleElements(): RuleElementPF2e[];
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions, rollOptions?: Record<string, unknown>): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    getRollOptions(prefix?: string): string[];
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(): Promise<void>;
    castEmbeddedSpell(trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
