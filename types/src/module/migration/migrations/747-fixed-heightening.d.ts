import type { SpellPF2e } from "@item";
import { ItemSourcePF2e, SpellSource } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Handle spells gaining fixed level heightening */
export declare class Migration747FixedHeightening extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    protected overwriteDamage(spell: SpellSource, newSpell: SpellPF2e): void;
    protected loadSpells(): Promise<Record<string, SpellPF2e | undefined>>;
    fixedHeightenSpells: Set<DocumentUUID>;
}
