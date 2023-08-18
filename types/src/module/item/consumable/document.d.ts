import { ActorPF2e } from "@actor";
import { PhysicalItemPF2e, SpellPF2e, WeaponPF2e } from "@item";
import { ItemSummaryData } from "@item/data/index.ts";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick.ts";
import { ValueAndMax } from "@module/data.ts";
import { RuleElementPF2e } from "@module/rules/index.ts";
import { ConsumableCategory, ConsumableSource, ConsumableSystemData } from "./data.ts";
import { OtherConsumableTag } from "./types.ts";
declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get isAmmunition(): boolean;
    get uses(): ValueAndMax;
    /** Should this item be automatically destroyed upon use */
    get autoDestroy(): boolean;
    get embeddedSpell(): SpellPF2e<ActorPF2e> | null;
    get formula(): string | null;
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
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
