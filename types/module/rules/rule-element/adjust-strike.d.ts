import { ActorType } from "@actor/data";
import { ItemPF2e, MeleePF2e, WeaponPF2e } from "@item";
import { ActionTrait } from "@item/action/data";
import { WeaponMaterialEffect } from "@item/weapon/types";
import { PredicatePF2e } from "@system/predication";
import { AELikeData, AELikeRuleElement, AELikeSource } from "./ae-like";
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
    adjustDamageRoll?: (weapon: WeaponPF2e | MeleePF2e, { materials }: {
        materials?: Set<WeaponMaterialEffect>;
    }) => void;
    adjustWeapon?: (weapon: Embedded<WeaponPF2e>) => void;
    adjustTraits?: (weapon: WeaponPF2e | MeleePF2e, traits: ActionTrait[]) => void;
}
export { AdjustStrikeRuleElement, StrikeAdjustment };
