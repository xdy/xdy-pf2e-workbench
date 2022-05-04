import { ActorType } from "@actor/data";
import { ItemPF2e, WeaponPF2e } from "@item";
import { WeaponMaterialEffect } from "@item/weapon/types";
import { PredicatePF2e } from "@system/predication";
import { AELikeRuleElement, AELikeData, AELikeSource } from "./ae-like";
import { RuleElementOptions } from "./base";
declare class AdjustStrikeRuleElement extends AELikeRuleElement {
    protected static validActorTypes: ActorType[];
    private static VALID_PROPERTIES;
    /** The property of the strike to adjust */
    private property;
    /** The definition of the strike in terms of its item (weapon) roll options */
    private definition;
    constructor(data: AdjustStrikeSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected validateData(): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
}
interface AdjustStrikeRuleElement extends AELikeRuleElement {
    data: AdjustStrikeData;
}
interface AdjustStrikeData extends Exclude<AELikeData, "path"> {
    /** Whether the actor is eligible to receive the strike adjustment */
    predicate: PredicatePF2e;
}
interface AdjustStrikeSource extends Exclude<AELikeSource, "path"> {
    property?: unknown;
    definition?: unknown;
}
interface StrikeAdjustment {
    adjustDamageRoll?: (weapon: Embedded<WeaponPF2e>, { materials }: {
        materials?: Set<WeaponMaterialEffect>;
    }) => void;
    adjustWeapon?: (weapon: Embedded<WeaponPF2e>) => void;
}
export { AdjustStrikeRuleElement, StrikeAdjustment };
