import { CharacterPF2e, NPCPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { AttributeString } from "@actor/types.ts";
import { NPCAttackTrait } from "@item/melee/data.ts";
import { BaseWeaponType, OtherWeaponTag, WeaponCategory, WeaponGroup } from "@item/weapon/types.ts";
import { DamageDieSize, DamageType } from "@system/damage/index.ts";
import type { ArrayField, BooleanField, FilePathField, NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * Create an ephemeral strike on an actor
 * @category RuleElement
 */
declare class StrikeRuleElement extends RuleElementPF2e<StrikeSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    constructor(source: StrikeSource, options: RuleElementOptions);
    static defineSchema(): StrikeSchema;
    /** Allow shorthand `fist` StrikeRuleElement data to pass `DataModel` validation */
    validate(options?: {
        changes?: Record<string, unknown>;
        clean?: boolean;
        fallback?: boolean;
        strict?: boolean;
        fields?: boolean;
        joint?: boolean;
    }): boolean;
    /** Keep shorthand `fist` source data to its minimum form */
    protected _initializeSource(source: object, options: RuleElementOptions): this["_source"];
    protected _initialize(options?: Record<string, unknown>): void;
    /** Temporary workaround until real migration */
    static migrateData<TSource extends {
        range?: unknown;
        maxRange?: unknown;
    }>(source: TSource): TSource;
    beforePrepareData(): void;
    /** Exclude other strikes if this rule element specifies that its strike replaces all others */
    afterPrepareData(): void;
    /** Toggle the modular or versatile trait of this strike's weapon */
    toggleTrait({ trait, selection }: UpdateToggleParams): Promise<void>;
}
interface StrikeRuleElement extends RuleElementPF2e<StrikeSchema>, ModelPropsFromSchema<StrikeSchema> {
    slug: string;
    fist: boolean;
    options: string[];
    get actor(): CharacterPF2e | NPCPF2e;
}
type StrikeSchema = RuleElementSchema & {
    /** A weapon category */
    category: StringField<WeaponCategory, WeaponCategory, true, false, true>;
    /** A weapon group */
    group: StringField<WeaponGroup, WeaponGroup, true, true, true>;
    /** A weapon base type */
    baseType: StringField<BaseWeaponType, BaseWeaponType, true, true, true>;
    /** Permit NPC attack traits to sneak in for battle forms */
    traits: ArrayField<StringField<NPCAttackTrait, NPCAttackTrait, true, false, false>>;
    traitToggles: SchemaField<{
        modular: StringField<DamageType, DamageType, true, true, true>;
        versatile: StringField<DamageType, DamageType, true, true, true>;
    }, {
        modular: DamageType | null;
        versatile: DamageType | null;
    }, {
        modular: DamageType | null;
        versatile: DamageType | null;
    }, true, false, true>;
    otherTags: ArrayField<StringField<OtherWeaponTag, OtherWeaponTag, true, false, false>, OtherWeaponTag[], OtherWeaponTag[], false, false, true>;
    /**
     * A fixed attack modifier: usable only if the strike is generated for an NPC
     * Also causes the damage to not be recalculated when converting the resulting weapon to an NPC attack
     */
    attackModifier: NumberField<number, number, false, true, true>;
    range: SchemaField<{
        increment: NumberField<number, number, true, false, true>;
        max: NumberField<number, number, false, true, true>;
    }, {
        increment: number;
        max: number | null;
    }, {
        increment: number;
        max: number | null;
    } | null, false, true, true>;
    damage: SchemaField<{
        base: SchemaField<{
            damageType: StringField<string, string, true, false, true>;
            dice: ResolvableValueField<true, false, true>;
            die: StringField<DamageDieSize, DamageDieSize, true, false, true>;
            modifier: NumberField<number, number, false, false, true>;
        }>;
    }>;
    ability: StringField<AttributeString, AttributeString, false, true, true>;
    /** A representative icon for the strike */
    img: FilePathField<ImageFilePath, ImageFilePath, true, false, true>;
    /** Whether to replace all other strike actions */
    replaceAll: BooleanField<boolean, boolean, false, false, false>;
    /** Whether to replace the "basic unarmed" strike action */
    replaceBasicUnarmed: BooleanField<boolean, boolean, false, false, false>;
    /** Whether this attack is from a battle form */
    battleForm: BooleanField<boolean, boolean, false, false, true>;
    options: ArrayField<StringField<string, string, true, false, false>, string[], string[], false, false, false>;
    /** Whether this was a request for a standard fist attack */
    fist: BooleanField<boolean, boolean, false, false, false>;
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
    selection: DamageType | null;
}
export { StrikeRuleElement };
