import { PhysicalItemHitPoints } from "@item/physical/data";
import { PhysicalItemPF2e } from "../physical";
import { ArmorCategory, ArmorData, ArmorGroup, BaseArmorType } from "./data";
export declare class ArmorPF2e extends PhysicalItemPF2e {
    static get schema(): typeof ArmorData;
    isStackableWith(item: PhysicalItemPF2e): boolean;
    get isShield(): boolean;
    get isArmor(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number | null;
    get strength(): number | null;
    get checkPenalty(): number | null;
    get speedPenalty(): number;
    get acBonus(): number;
    get hitPoints(): PhysicalItemHitPoints;
    get hardness(): number;
    get isBroken(): boolean;
    get isDestroyed(): boolean;
    /** Given this is a shield, is it raised? */
    get isRaised(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: Embedded<ArmorPF2e>): void;
    getChatData(this: Embedded<ArmorPF2e>, htmlOptions?: EnrichHTMLOptions): Record<string, unknown>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
export interface ArmorPF2e {
    readonly data: ArmorData;
}
