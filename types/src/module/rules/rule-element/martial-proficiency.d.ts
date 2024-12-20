import type { ActorType, CharacterPF2e } from "@actor";
import { ArmorCategory } from "@item/armor/types.ts";
import { ProficiencyRank } from "@item/base/data/index.ts";
import { WeaponCategory } from "@item/weapon/types.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import { RuleElementOptions, RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;

declare class MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema> {
    protected static validActorTypes: ActorType[];
    slug: string;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): MartialProficiencySchema;
    onApplyActiveEffects(): void;
}
interface MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema>, ModelPropsFromRESchema<MartialProficiencySchema> {
    get actor(): CharacterPF2e;
}
type MartialProficiencySchema = RuleElementSchema & {
    /** Whether the proficiency is an attack or defense */
    kind: fields.StringField<"attack" | "defense", "attack" | "defense", true, false, true>;
    /** The criteria for matching qualifying weapons and other attacks */
    definition: PredicateField<true, false, false>;
    /** The attack category to which this proficiency's rank is linked */
    sameAs: fields.StringField<WeaponCategory | ArmorCategory, WeaponCategory | ArmorCategory, false, false, false>;
    /** The maximum rank this proficiency can reach, if any */
    maxRank: fields.StringField<Exclude<ProficiencyRank, "untrained">, Exclude<ProficiencyRank, "untrained">, false, false, false>;
    /** Initially a number indicating rank, changed into a `MartialProficiency` object for overriding as an AE-like */
    value: ResolvableValueField<false, false, false>;
};
export { MartialProficiencyRuleElement };
