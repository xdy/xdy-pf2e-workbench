import type { ActorType, CharacterPF2e, NPCPF2e } from "@actor";
import type { NPCAttackTrait } from "@item/melee/types.ts";
import { BaseShieldType } from "@item/shield/types.ts";
import type { BaseWeaponType, OtherWeaponTag, WeaponCategory } from "@item/weapon/types.ts";
import type { DamageDieSize, DamageType } from "@system/damage/index.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

/**
 * Create an ephemeral strike on an actor
 * @category RuleElement
 */
declare class StrikeRuleElement extends RuleElementPF2e<StrikeSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    graspingAppendage: boolean;
    constructor(source: StrikeSource, options: RuleElementOptions);
    static defineSchema(): StrikeSchema;
    protected _initialize(options?: Record<string, unknown>): void;
    beforePrepareData(): void;
    /** Exclude other strikes if this rule element specifies that its strike replaces all others */
    afterPrepareData(): void;
    /** Toggle the modular or versatile trait of this strike's weapon */
    toggleTrait({ trait, selected }: UpdateToggleParams): Promise<void>;
}
interface StrikeRuleElement extends RuleElementPF2e<StrikeSchema>, ModelPropsFromRESchema<StrikeSchema> {
    slug: string;
    fist: boolean;
    options: string[];
    get actor(): CharacterPF2e | NPCPF2e;
}
type NonShieldWeaponType = Exclude<BaseWeaponType, BaseShieldType>;
type StrikeSchema = RuleElementSchema & {
    /** A weapon category */
    category: fields.StringField<WeaponCategory, WeaponCategory, true, false, true>;
    /** A weapon group */
    group: fields.StringField<string, string, true, true, true>;
    /** A weapon base type */
    baseType: fields.StringField<NonShieldWeaponType, NonShieldWeaponType, true, true, true>;
    /** Permit NPC attack traits to sneak in for battle forms */
    traits: fields.ArrayField<fields.StringField<NPCAttackTrait, NPCAttackTrait, true, false, false>>;
    traitToggles: fields.SchemaField<{
        modular: fields.StringField<DamageType, DamageType, true, true, true>;
        versatile: fields.StringField<DamageType, DamageType, true, true, true>;
    }, {
        modular: DamageType | null;
        versatile: DamageType | null;
    }, {
        modular: DamageType | null;
        versatile: DamageType | null;
    }, true, false, true>;
    otherTags: fields.ArrayField<fields.StringField<OtherWeaponTag, OtherWeaponTag, true, false, false>, OtherWeaponTag[], OtherWeaponTag[], false, false, true>;
    /**
     * A fixed attack modifier: usable only if the strike is generated for an NPC
     * Also causes the damage to not be recalculated when converting the resulting weapon to an NPC attack
     */
    attackModifier: fields.NumberField<number, number, false, true, true>;
    range: fields.SchemaField<{
        increment: fields.NumberField<number, number, false, true, true>;
        max: fields.NumberField<number, number, false, true, true>;
    }, {
        increment: number | null;
        max: number | null;
    }, {
        increment: number | null;
        max: number | null;
    }, false, true, true>;
    damage: fields.SchemaField<{
        base: fields.SchemaField<{
            damageType: fields.StringField<string, string, true, false, true>;
            dice: ResolvableValueField<true, false, true>;
            die: fields.StringField<DamageDieSize, DamageDieSize, true, false, true>;
            modifier: fields.NumberField<number, number, false, false, true>;
        }>;
    }>;
    ability: fields.StringField<string, string, false, true, true>;
    /** A representative icon for the strike */
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false, true>;
    /** Whether to replace all other strike actions */
    replaceAll: fields.BooleanField<boolean, boolean, false, false, false>;
    /** Whether to replace the "basic unarmed" strike action */
    replaceBasicUnarmed: fields.BooleanField<boolean, boolean, false, false, false>;
    /** Whether this attack is from a battle form */
    battleForm: fields.BooleanField<boolean, boolean, false, false, true>;
    options: fields.ArrayField<fields.StringField<string, string, true, false, false>, string[], string[], false, false, false>;
    /** Whether this was a request for a standard fist attack */
    fist: fields.BooleanField<boolean, boolean, false, false, true>;
    /** Whether the unarmed attack is a grasping appendage */
    graspingAppendage: fields.BooleanField<boolean, boolean, false, false, false>;
};
interface StrikeSource extends RuleElementSource {
    img?: unknown;
    category?: unknown;
    group?: unknown;
    baseType?: unknown;
    damage?: unknown;
    range?: unknown;
    maxRange?: unknown;
    traits?: unknown;
    traitToggles?: unknown;
    replaceAll?: unknown;
    replaceBasicUnarmed?: unknown;
    battleForm?: unknown;
    options?: unknown;
    fist?: unknown;
}
interface UpdateToggleParams {
    trait: "modular" | "versatile";
    selected: DamageType | null;
}
export { StrikeRuleElement };
