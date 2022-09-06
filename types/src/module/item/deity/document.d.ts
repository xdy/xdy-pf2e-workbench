import { Alignment } from "@actor/creature/types";
import { ItemPF2e } from "@item";
import { BaseWeaponType } from "@item/weapon/types";
import { DeityData } from "./data";
declare class DeityPF2e extends ItemPF2e {
    get category(): "deity" | "pantheon" | "philosophy";
    get alignment(): Alignment | null;
    get favoredWeapons(): BaseWeaponType[];
    prepareBaseData(): void;
    prepareActorData(this: Embedded<DeityPF2e>): void;
    /** If applicable, set a trained proficiency with this deity's favored weapon */
    setFavoredWeaponRank(this: Embedded<DeityPF2e>): void;
    getRollOptions(prefix?: string): string[];
}
interface DeityPF2e extends ItemPF2e {
    readonly data: DeityData;
}
export { DeityPF2e };
