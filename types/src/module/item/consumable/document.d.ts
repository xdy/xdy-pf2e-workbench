import { ActorPF2e } from "@actor";
import { ItemPF2e, PhysicalItemPF2e, SpellPF2e } from "@item";
import { ItemSummaryData } from "@item/data";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
import { ValueAndMax } from "@module/data";
import { RuleElementPF2e } from "@module/rules";
import { ConsumableCategory, ConsumableSystemData, ConsumableSource } from "./data";
import { OtherConsumableTag } from "./types";
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
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions, rollOptions?: Record<string, unknown>): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    getRollOptions(prefix?: string): string[];
    isAmmoFor(weapon: ItemPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(this: ConsumablePF2e<ActorPF2e>): Promise<void>;
    castEmbeddedSpell(this: ConsumablePF2e<ActorPF2e>, trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
