import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { BaseWeaponType } from "@item/weapon/types.ts";
import { DeityCategory, DeitySource, DeitySystemData } from "./data.ts";

declare class DeityPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    get category(): DeityCategory;
    get favoredWeapons(): BaseWeaponType[];
    prepareBaseData(): void;
    prepareActorData(this: DeityPF2e<ActorPF2e>): void;
    /** If applicable, set a trained proficiency with this deity's favored weapon */
    setFavoredWeaponRank(this: DeityPF2e<ActorPF2e>): void;
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    private getSanctificationRollOptions;
}
interface DeityPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: DeitySource;
    system: DeitySystemData;
}
export { DeityPF2e };
