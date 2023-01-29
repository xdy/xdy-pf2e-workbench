import { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { WeaponDamage } from "@item/weapon/data";
import { BaseWeaponType, OtherWeaponTag, WeaponCategory, WeaponGroup, WeaponTrait } from "@item/weapon/types";
import { RuleElementData, RuleElementPF2e, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
/**
 * Create an ephemeral strike on an actor
 * @category RuleElement
 */
declare class StrikeRuleElement extends RuleElementPF2e {
    #private;
    protected static validActorTypes: ActorType[];
    slug: string;
    category: WeaponCategory;
    group: WeaponGroup;
    baseType: BaseWeaponType | null;
    traits: WeaponTrait[];
    otherTags: OtherWeaponTag[];
    range: {
        increment: number;
        max: number | null;
    } | null;
    /** Whether this attack is from a battle form */
    battleForm: boolean;
    constructor(data: StrikeSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
    /** Exclude other strikes if this rule element specifies that its strike replaces all others */
    afterPrepareData(): void;
    private constructWeapon;
}
interface StrikeRuleElement {
    data: StrikeData;
    get actor(): CharacterPF2e | NPCPF2e;
}
interface StrikeSource extends RuleElementSource {
    img?: unknown;
    category?: unknown;
    group?: unknown;
    baseType?: unknown;
    damage?: unknown;
    range?: unknown;
    maxRange?: unknown;
    traits?: unknown;
    otherTags?: unknown;
    replaceAll?: unknown;
    replaceBasicUnarmed?: unknown;
    battleForm?: unknown;
    options?: unknown;
}
interface StrikeData extends RuleElementData {
    slug?: string;
    img?: ImageFilePath;
    damage?: {
        base?: WeaponDamage;
    };
    replaceAll: boolean;
    replaceBasicUnarmed: boolean;
    options?: string[];
}
export { StrikeRuleElement };
