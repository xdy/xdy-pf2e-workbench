import { ArmorSource, ItemSourcePF2e } from "@item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Set the "hands" (usage) property of weapons */
export declare class Migration680SetWeaponHands extends MigrationBase {
    #private;
    static version: number;
    isShield(source: ItemSourcePF2e & {
        system: {
            armorType?: {
                value?: unknown;
            };
        };
    }): source is MaybeOldShieldData;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
interface MaybeOldShieldData extends ArmorSource {
    armorType?: {
        value?: unknown;
    };
}
export {};
