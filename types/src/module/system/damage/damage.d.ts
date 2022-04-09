import { StrikeSelf, AttackTarget } from "@actor/creature/types";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { BaseRollContext } from "@system/rolls";
/** The possible standard damage die sizes. */
export declare const DAMAGE_DIE_FACES: Set<"d10" | "d12" | "d4" | "d6" | "d8">;
export declare type DamageDieSize = SetElement<typeof DAMAGE_DIE_FACES>;
export declare function nextDamageDieSize(dieSize: DamageDieSize): "d10" | "d12" | "d6" | "d8";
/** Provides constants for typical damage categories, as well as a simple API for adding custom damage types and categories. */
export declare const DamageCategorization: {
    /**
     * Physical damage; one of bludgeoning, piercing, or slashing, and usually caused by a physical object hitting you.
     */
    readonly PHYSICAL: "physical";
    /**
     * Energy damage; one of acid, cold, electricity, fire, or sonic. Generally caused by either magic or strong natural
     * phenomena (like storms, harsh weather, etc).
     */
    readonly ENERGY: "energy";
    /**
     * Alignment damage; one of chaotic, evil, good, or lawful. Generally caused by special magic weapons and by some
     * extraplanar creatures.
     */
    readonly ALIGNMENT: "alignment";
    /**
     * Map a damage type to it's corresponding damage category. If the type has no category, the type itself will be
     * returned.
     */
    readonly fromDamageType: (damageType: string) => string;
    /** Adds a custom damage type -> category mapping. This method can be used to override base damage type/category mappings. */
    readonly addCustomDamageType: (category: string, type: string) => void;
    /** Removes the custom mapping for the given type. */
    readonly removeCustomDamageType: (type: string) => boolean;
    /** Get a set of all damage categories (both base and custom). */
    readonly allCategories: () => Set<string>;
    /** Get a set of all of the base rule damage types. */
    readonly baseCategories: () => Set<string>;
    /** Get a set of all custom damage categories (exluding the base damage types). */
    readonly customCategories: () => Set<string>;
    /** Get the full current map of damage types -> their current damage category (taking custom mappings into account). */
    readonly currentTypeMappings: () => Record<string | number, string>;
    /** Map a damage category to the set of damage types in it. */
    readonly toDamageTypes: (category: string) => Set<string>;
    /** Clear all custom damage type mappings. */
    readonly clearCustom: () => void;
};
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
export declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Readonly<Record<string, string>>;
/** Custom damage type mappings; maps damage types to their damage category. */
export declare const CUSTOM_DAMAGE_TYPES_TO_CATEGORIES: Record<string, string>;
interface DamageRollContext extends BaseRollContext {
    type: "damage-roll";
    outcome?: DegreeOfSuccessString;
    self?: StrikeSelf | null;
    target?: AttackTarget | null;
    options: string[];
    secret?: boolean;
}
export { DamageRollContext };
