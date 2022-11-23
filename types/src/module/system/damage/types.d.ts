import { DAMAGE_CATEGORIES, DAMAGE_DIE_FACES, DAMAGE_TYPES } from "./values";
declare type DamageCategory = SetElement<typeof DAMAGE_CATEGORIES>;
declare type DamageDieSize = SetElement<typeof DAMAGE_DIE_FACES>;
declare type DamageType = SetElement<typeof DAMAGE_TYPES>;
export { DamageCategory, DamageDieSize, DamageType };
