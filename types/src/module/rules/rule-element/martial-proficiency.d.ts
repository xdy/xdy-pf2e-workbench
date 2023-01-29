import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from ".";
import { CharacterPF2e } from "@actor";
import { MartialProficiency } from "@actor/character/data";
import { ActorType } from "@actor/data";
import { ItemPF2e } from "@item";
import { ProficiencyRank } from "@item/data";
import { WeaponCategory } from "@item/weapon/types";
import { PredicatePF2e, RawPredicate } from "@system/predication";
declare class MartialProficiencyRuleElement extends RuleElementPF2e {
    protected static validActorTypes: ActorType[];
    /** Predication test for whether a weapon matches this proficiency */
    definition: PredicatePF2e;
    constructor(data: MartialProficiencySource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    private validateData;
    onApplyActiveEffects(): void;
    /** Set this martial proficiency as an AELike value  */
    private createValue;
}
interface MartialProficiencyRuleElement extends RuleElementPF2e {
    data: MartialProficiencyData;
    get actor(): CharacterPF2e;
}
interface MartialProficiencyData extends RuleElementData {
    key: "MartialProficiency";
    /** The key to be used for this proficiency in `CharacterPF2e#data#data#martial` */
    slug: string;
    /** The criteria for matching qualifying weapons and other attacks */
    definition: RawPredicate;
    /** Whether this proficiency's rank can be manually changed */
    immutable: boolean;
    /** The attack category to which this proficiency's rank is linked */
    sameAs: WeaponCategory;
    /** The maximum rank this proficiency can reach, if any */
    maxRank?: Exclude<ProficiencyRank, "untrained">;
    /** Initially a number indicating rank, changed into a `MartialProficiency` object for overriding as an AE-like */
    value: number | MartialProficiency;
}
export interface MartialProficiencySource extends RuleElementSource {
    definition?: unknown;
    sameAs?: unknown;
    immutable?: unknown;
    maxRank?: unknown;
}
export { MartialProficiencyRuleElement };
