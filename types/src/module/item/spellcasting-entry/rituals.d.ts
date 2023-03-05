import { ActorPF2e } from "@actor";
import { SpellPF2e } from "@item/spell";
import { SpellCollection } from "./collection";
import { BaseSpellcastingEntry, CastOptions, SpellcastingSheetData } from "./types";
/** An in-memory spellcasting entry for rituals */
export declare class RitualSpellcasting implements BaseSpellcastingEntry {
    actor: ActorPF2e;
    spells: SpellCollection;
    constructor(actor: ActorPF2e, rituals: Embedded<SpellPF2e>[]);
    get id(): string;
    get name(): string;
    get sort(): number;
    get category(): "ritual";
    get tradition(): null;
    get isFlexible(): false;
    get isFocusPool(): false;
    get isInnate(): false;
    get isPrepared(): false;
    get isRitual(): true;
    get isSpontaneous(): false;
    canCast(spell: SpellPF2e): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData(): Promise<SpellcastingSheetData>;
}
