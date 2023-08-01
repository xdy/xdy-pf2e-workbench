import { ModifierPF2e } from "@actor/modifiers.ts";
import { MeleePF2e, WeaponPF2e } from "@item";
import { CreaturePF2e } from "./document.ts";
/** A static class of helper functions for applying automation for certain weapon traits on attack rolls */
declare class StrikeAttackTraits {
    protected static getLabel(traitOrTag: string): string;
    protected static getUnannotatedTrait(trait: string): string;
    static createAttackModifiers({ weapon }: {
        weapon: WeaponPF2e | MeleePF2e;
    }): ModifierPF2e[];
}
/** Set immunities for creatures with traits call for them */
declare function setImmunitiesFromTraits(actor: CreaturePF2e): void;
declare function imposeEncumberedCondition(actor: CreaturePF2e): void;
export { StrikeAttackTraits, imposeEncumberedCondition, setImmunitiesFromTraits };
