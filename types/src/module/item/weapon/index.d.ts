import { ConsumablePF2e, MeleePF2e, PhysicalItemPF2e } from "@item";
import { IdentificationStatus, MystifiedData } from "@item/physical/data";
import { MaterialGradeData } from "@item/physical/materials";
import { RuneValuationData } from "../runes";
import { WeaponData, WeaponMaterialData } from "./data";
import { BaseWeaponType, WeaponCategory, WeaponGroup, WeaponRangeIncrement, WeaponReloadTime, WeaponTrait } from "./types";
declare class WeaponPF2e extends PhysicalItemPF2e {
    get isEquipped(): boolean;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory;
    get hands(): "0" | "1" | "1+" | "2";
    /** The range increment of this weapon, or null if a melee weapon */
    get rangeIncrement(): WeaponRangeIncrement | null;
    /** The maximum range of this weapon: `null` if melee, and usually 6 * range increment if ranged */
    get maxRange(): number | null;
    get reload(): WeaponReloadTime | null;
    get isSpecific(): boolean;
    get isMelee(): boolean;
    get isRanged(): boolean;
    get isThrown(): boolean;
    get material(): WeaponMaterialData;
    /** Does this weapon require ammunition in order to make a strike? */
    get requiresAmmo(): boolean;
    get ammo(): Embedded<ConsumablePF2e> | null;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    processMaterialAndRunes(): void;
    getRunesData(): RuneValuationData[];
    getMaterialData(): MaterialGradeData | null;
    getChatData(this: Embedded<WeaponPF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
    /** Generate a weapon name base on precious-material composition and runes */
    generateMagicName(): string;
    getMystifiedData(status: IdentificationStatus, { source }?: {
        source?: boolean | undefined;
    }): MystifiedData;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /**
     * Get the "alternative usages" of a weapon: melee (in the case of combination weapons) and thrown (in the case
     * of thrown melee weapons)
     * @param [options.recurse=true] Whether to get the alternative usages of alternative usages
     */
    getAltUsages(options?: {
        recurse?: boolean;
    }): this[];
    /** Generate a clone of this thrown melee weapon with its thrown usage overlain, or `null` if not applicable */
    private toThrownUsage;
    /** Generate a clone of this combination weapon with its melee usage overlain, or `null` if not applicable */
    private toMeleeUsage;
    /** Generate a melee item from this weapon for use by NPCs */
    toNPCAttacks(this: Embedded<WeaponPF2e>): Embedded<MeleePF2e>[];
}
interface WeaponPF2e {
    readonly data: WeaponData;
    get traits(): Set<WeaponTrait>;
}
export { WeaponPF2e };
