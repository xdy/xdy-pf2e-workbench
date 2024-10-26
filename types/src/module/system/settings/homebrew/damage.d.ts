import { CustomDamageData } from "./data.ts";

/**
 * To update all custom damage types in the system, we need to ensure that all collections are added to and cleaned.
 * This reduces the scope of all damage related operations so that its easier to identify when something goes wrong.
 */
export declare class DamageTypeManager {
    collections: {
        physicalConfig: Record<string, string>;
        energyConfig: Record<string, string>;
        physical: string[];
        energy: string[];
        DAMAGE_TYPES: Set<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped">;
        BASE_DAMAGE_TYPES_TO_CATEGORIES: Record<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", "abysium" | "adamantine" | "dawnsilver" | "djezet" | "duskwood" | "energy" | "inubrix" | "noqual" | "orichalcum" | "physical" | "siccatite" | "silver" | "precision" | "splash" | "cold-iron" | "keep-stone" | "peachwood" | "sisterstone-dusk" | "sisterstone-scarlet" | "sovereign-steel" | "warpglass" | "persistent" | null>;
        DAMAGE_TYPE_ICONS: Record<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", string | null>;
        damageTypesLocalization: Record<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", string>;
        damageRollFlavorsLocalization: Record<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", string>;
        immunityTypes: Record<string, string>;
        weaknessTypes: Record<string, string>;
        resistanceTypes: Record<string, string>;
    };
    addCustomDamage(data: CustomDamageData, options?: {
        slug?: string;
    }): void;
    updateSettings(): void;
}
