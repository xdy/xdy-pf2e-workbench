import type { ActorPF2e } from "@actor";
import type { SpellPF2e } from "@item";
import { SpellCollection } from "./collection.ts";
import { BaseSpellcastingEntry, CastOptions, SpellcastingSheetData } from "./types.ts";
/** An in-memory spellcasting entry for rituals */
export declare class RitualSpellcasting<TActor extends ActorPF2e> implements BaseSpellcastingEntry<TActor> {
    actor: TActor;
    spells: SpellCollection<TActor>;
    constructor(actor: TActor);
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
    get isEphemeral(): true;
    canCast(spell: SpellPF2e): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData(): Promise<SpellcastingSheetData>;
}
