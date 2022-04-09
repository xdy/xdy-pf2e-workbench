import { PhysicalItemPF2e } from "../physical";
import { RuneValuationData } from "../runes";
import { BaseWeaponType, WeaponCategory, WeaponData, WeaponGroup, WeaponRangeIncrement, WeaponTrait } from "./data";
import { MaterialGradeData } from "@item/physical/materials";
import { IdentificationStatus, MystifiedData } from "@item/physical/data";
import { MeleePF2e } from "@item/melee";
import { ConsumablePF2e } from "@item";
export declare class WeaponPF2e extends PhysicalItemPF2e {
    static get schema(): typeof WeaponData;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    get baseType(): BaseWeaponType | null;
    get group(): WeaponGroup | null;
    get category(): WeaponCategory;
    get hands(): "0" | "1" | "1+" | "2";
    /** The range of this weapon, or null if a melee weapon */
    get rangeIncrement(): WeaponRangeIncrement | null;
    get reload(): string | null;
    get isSpecific(): boolean;
    get isMelee(): boolean;
    get isRanged(): boolean;
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
    /** Generate a clone of this combination weapon with its melee usage overlain, or `null` if not applicable */
    toMeleeUsage(this: Embedded<WeaponPF2e>): Embedded<WeaponPF2e> | null;
    toMeleeUsage(this: WeaponPF2e): WeaponPF2e | null;
    /** Generate a melee item from this weapon for use by NPCs */
    toNPCAttack(this: Embedded<WeaponPF2e>): Embedded<MeleePF2e>;
}
export interface WeaponPF2e {
    readonly data: WeaponData;
    get traits(): Set<WeaponTrait>;
}
