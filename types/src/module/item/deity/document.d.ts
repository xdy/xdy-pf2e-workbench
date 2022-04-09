import { ItemPF2e } from "@item";
import { BaseWeaponType } from "@item/weapon/data";
import { DeityData } from "./data";
import { DeitySheetPF2e } from "./sheet";
declare class DeityPF2e extends ItemPF2e {
    static get schema(): typeof DeityData;
    get favoredWeapons(): BaseWeaponType[];
    prepareActorData(this: Embedded<DeityPF2e>): void;
    /** If applicable, set a trained proficiency with this deity's favored weapon */
    setFavoredWeaponRank(this: Embedded<DeityPF2e>): void;
}
interface DeityPF2e extends ItemPF2e {
    readonly data: DeityData;
    readonly _sheet: DeitySheetPF2e;
}
export { DeityPF2e };
