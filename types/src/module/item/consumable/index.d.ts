import { ConsumableData, ConsumableType } from "./data";
import { ItemPF2e, PhysicalItemPF2e, SpellPF2e } from "@item";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
declare class ConsumablePF2e extends PhysicalItemPF2e {
    get consumableType(): ConsumableType;
    get isAmmunition(): boolean;
    get charges(): {
        value: number;
        current: number;
        max: number;
    };
    /** Should this item be automatically destroyed upon use */
    get autoDestroy(): boolean;
    get embeddedSpell(): Embedded<SpellPF2e> | null;
    getChatData(this: Embedded<ConsumablePF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    isAmmoFor(weapon: ItemPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(this: Embedded<ConsumablePF2e>): Promise<void>;
    castEmbeddedSpell(this: Embedded<ConsumablePF2e>, trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
}
interface ConsumablePF2e {
    readonly data: ConsumableData;
}
export { ConsumablePF2e };
