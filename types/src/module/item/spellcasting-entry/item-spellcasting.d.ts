import type { CreaturePF2e } from "@actor";
import { AttributeString } from "@actor/types.ts";
import type { PhysicalItemPF2e, SpellPF2e } from "@item";
import { MagicTradition } from "@item/spell/types.ts";
import type { Predicate } from "@system/predication.ts";
import type { Statistic } from "@system/statistic/statistic.ts";
import { SpellCollection } from "./collection.ts";
import type { CastOptions, SpellcastingEntry, SpellcastingSheetData } from "./types.ts";
/** An in-memory spellcasting entry for items-only spellcasting */
declare class ItemSpellcasting<TActor extends CreaturePF2e = CreaturePF2e> implements SpellcastingEntry<TActor> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition: MagicTradition | null;
    /** A predicate to test against a physical item to determine whether its contained spell can be cast */
    castPredicate: Predicate;
    constructor({ id, name, actor, statistic, tradition, castPredicate }: ItemsSpellcastingConstructorParams<TActor>);
    get counteraction(): Statistic;
    get attribute(): AttributeString;
    get category(): "items";
    get sort(): number;
    get spells(): null;
    get isFlexible(): false;
    get isFocusPool(): false;
    get isInnate(): false;
    get isPrepared(): false;
    get isSpontaneous(): false;
    get isRitual(): false;
    get isEphemeral(): true;
    canCast(spell: SpellPF2e, { origin }?: {
        origin?: Maybe<PhysicalItemPF2e>;
    }): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData({ spells }?: {
        spells?: SpellCollection<TActor>;
    }): Promise<SpellcastingSheetData>;
}
interface ItemsSpellcastingConstructorParams<TActor extends CreaturePF2e> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition?: Maybe<MagicTradition>;
    castPredicate: Predicate;
}
export { ItemSpellcasting };
