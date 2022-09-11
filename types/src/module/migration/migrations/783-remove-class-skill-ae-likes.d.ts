import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove class AE-likes setting skill proficiencies to trained */
export declare class Migration783RemoveClassSkillAELikes extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
