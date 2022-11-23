import { StrikeSelf, AttackTarget } from "@actor/creature/types";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { BaseRollContext } from "@system/rolls";
import { DamageDieSize } from "./types";
declare function nextDamageDieSize(next: {
    upgrade: DamageDieSize;
}): DamageDieSize;
declare function nextDamageDieSize(next: {
    downgrade: DamageDieSize;
}): DamageDieSize;
/** Provides constants for typical damage categories, as well as a simple API for adding custom damage types and categories. */
declare const DamageCategorization: {
    /**
     * Map a damage type to it's corresponding damage category. If the type has no category, the type itself will be
     * returned.
     */
    readonly fromDamageType: (damageType: string) => "adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "ghostTouch" | "alignment" | "coldiron" | "energy" | "physical" | "precision" | "salt" | "salt-water";
    /** Get a set of all damage categories (both base and custom). */
    readonly allCategories: () => Set<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "ghostTouch" | "alignment" | "coldiron" | "energy" | "physical" | "precision" | "salt" | "salt-water">;
    /** Get a set of all of the base rule damage types. */
    readonly baseCategories: () => Set<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "ghostTouch" | "alignment" | "coldiron" | "energy" | "physical" | "precision" | "salt" | "salt-water">;
    /** Map a damage category to the set of damage types in it. */
    readonly toDamageTypes: (category: string) => Set<string>;
};
interface DamageRollContext extends BaseRollContext {
    type: "damage-roll";
    outcome?: DegreeOfSuccessString;
    self?: StrikeSelf | null;
    target?: AttackTarget | null;
    options: Set<string>;
    secret?: boolean;
}
export { DamageCategorization, DamageRollContext, nextDamageDieSize };
