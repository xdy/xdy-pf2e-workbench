import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { ProficiencyRank } from "@item/data/index.ts";
import { WeaponCategory } from "@item/weapon/types.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import type { BooleanField, StringField } from "types/foundry/common/data/fields.d.ts";
import { PredicateField } from "@system/schema-data-fields.ts";
import { ResolvableValueField } from "./data.ts";
declare class MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): MartialProficiencySchema;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    onApplyActiveEffects(): void;
}
interface MartialProficiencyRuleElement extends RuleElementPF2e<MartialProficiencySchema>, ModelPropsFromSchema<MartialProficiencySchema> {
    slug: string;
    get actor(): CharacterPF2e;
}
type MartialProficiencySchema = RuleElementSchema & {
    /** The criteria for matching qualifying weapons and other attacks */
    definition: PredicateField<true, false, false>;
    /** Whether this proficiency's rank can be manually changed */
    immutable: BooleanField<boolean, boolean, false, false, true>;
    /** The attack category to which this proficiency's rank is linked */
    sameAs: StringField<WeaponCategory, WeaponCategory, false, false, false>;
    /** The maximum rank this proficiency can reach, if any */
    maxRank: StringField<Exclude<ProficiencyRank, "untrained">, Exclude<ProficiencyRank, "untrained">, false, false, false>;
    /** Initially a number indicating rank, changed into a `MartialProficiency` object for overriding as an AE-like */
    value: ResolvableValueField<false, false, false>;
};
export { MartialProficiencyRuleElement };
