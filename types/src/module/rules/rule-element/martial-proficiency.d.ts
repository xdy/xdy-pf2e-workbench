import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ArmorCategory } from "@item/armor/types.ts";
import { ProficiencyRank } from "@item/base/data/index.ts";
import { WeaponCategory } from "@item/weapon/types.ts";
import { PredicateField, StrictStringField } from "@system/schema-data-fields.ts";
import { ResolvableValueField } from "./data.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
declare class MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema> {
    protected static validActorTypes: ActorType[];
    slug: string;
    static defineSchema(): MartialProficiencySchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    onApplyActiveEffects(): void;
}
interface MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema>, ModelPropsFromSchema<MartialProficiencySchema> {
    get actor(): CharacterPF2e;
}
type MartialProficiencySchema = RuleElementSchema & {
    /** Whether the proficiency is an attack or defense */
    kind: StrictStringField<"attack" | "defense", "attack" | "defense", true, false, true>;
    /** The criteria for matching qualifying weapons and other attacks */
    definition: PredicateField<true, false, false>;
    /** The attack category to which this proficiency's rank is linked */
    sameAs: StrictStringField<WeaponCategory | ArmorCategory, WeaponCategory | ArmorCategory, false, false, false>;
    /** The maximum rank this proficiency can reach, if any */
    maxRank: StrictStringField<Exclude<ProficiencyRank, "untrained">, Exclude<ProficiencyRank, "untrained">, false, false, false>;
    /** Initially a number indicating rank, changed into a `MartialProficiency` object for overriding as an AE-like */
    value: ResolvableValueField<false, false, false>;
};
export { MartialProficiencyRuleElement };
