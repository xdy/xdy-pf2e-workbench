import { ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move armor and weapon runes to a single object. */
export declare class Migration907RestructureArmorWeaponRunes extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: MaybeWithRuneDeletions): Promise<void>;
}
type OldRunePropertyKey = "potencyRune" | "resiliencyRune" | "strikingRune" | "propertyRune1" | "propertyRune2" | "propertyRune3" | "propertyRune4";
type MaybeWithRuneDeletions = ItemSourcePF2e & {
    system: {
        [K in `-=${OldRunePropertyKey}`]?: null;
    };
};
export {};
