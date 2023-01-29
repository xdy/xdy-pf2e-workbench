import { ClassSource } from "@item/data";
import { MigrationBase } from "../base";
export declare class Migration604FixClassItem extends MigrationBase {
    static version: number;
    updateItem(item: MaybeWithAbilityBoosLevels): Promise<void>;
}
type MaybeWithAbilityBoosLevels = ClassSource & {
    system: {
        abilityBoostLevels: unknown;
    };
};
export {};
