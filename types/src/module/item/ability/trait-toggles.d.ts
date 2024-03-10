import type { AbilityItemPF2e, FeatPF2e } from "@item";
import { DamageAlteration } from "@module/rules/rule-element/damage-alteration/alteration.ts";
/** A helper class to handle toggleable ability traits */
declare class AbilityTraitToggles {
    parent: AbilityItemPF2e | FeatPF2e;
    mindshift: {
        selected: boolean;
    } | null;
    constructor(item: AbilityItemPF2e | FeatPF2e);
    get item(): AbilityItemPF2e | FeatPF2e;
    get operableTraits(): "mindshift"[];
    getDamageAlterations(): DamageAlteration[];
    getSheetData(): TraitToggleViewData[];
    update({ trait, selected }: {
        trait: "mindshift";
        selected: boolean;
    }): Promise<boolean>;
}
interface TraitToggleViewData {
    trait: string;
    selected: boolean;
    icon: string;
    classes: string;
    tooltip: string;
}
export { AbilityTraitToggles, type TraitToggleViewData };
