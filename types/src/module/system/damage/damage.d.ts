import { StrikeSelf, AttackTarget } from "@actor/creature/types";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { BaseRollContext } from "@system/rolls";
declare const DAMAGE_DIE_FACES: Set<"d10" | "d12" | "d4" | "d6" | "d8">;
declare type DamageDieSize = SetElement<typeof DAMAGE_DIE_FACES>;
declare function nextDamageDieSize(next: {
    upgrade: DamageDieSize;
}): DamageDieSize;
declare function nextDamageDieSize(next: {
    downgrade: DamageDieSize;
}): DamageDieSize;
/** Provides constants for typical damage categories, as well as a simple API for adding custom damage types and categories. */
declare const DamageCategorization: {
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
    /** Get a set of all damage categories (both base and custom). */
    readonly allCategories: () => Set<string>;
    /** Get a set of all of the base rule damage types. */
    readonly baseCategories: () => Set<string>;
    /** Map a damage category to the set of damage types in it. */
    readonly toDamageTypes: (category: string) => Set<string>;
};
/** Maps damage types to their damage category; these are the immutable base mappings used if there is no override. */
declare const BASE_DAMAGE_TYPES_TO_CATEGORIES: Readonly<Record<string, string>>;
interface DamageRollContext extends BaseRollContext {
    type: "damage-roll";
    outcome?: DegreeOfSuccessString;
    self?: StrikeSelf | null;
    target?: AttackTarget | null;
    options: Set<string>;
    secret?: boolean;
}
export { BASE_DAMAGE_TYPES_TO_CATEGORIES, DAMAGE_DIE_FACES, DamageCategorization, DamageDieSize, DamageRollContext, nextDamageDieSize, };
