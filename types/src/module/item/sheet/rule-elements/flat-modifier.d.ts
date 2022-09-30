import { FlatModifierSource } from "@module/rules/rule-element/flat-modifier";
import { RuleElementForm } from "./base";
/** Form handler for the flat modifier rule element */
declare class FlatModifierForm extends RuleElementForm<FlatModifierSource> {
    template: string;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<{
        selectorIsArray: boolean;
        abilities: {
            str: string;
            dex: string;
            con: string;
            int: string;
            wis: string;
            cha: string;
        };
        types: ("item" | "status" | "untyped" | "ability" | "proficiency" | "circumstance" | "potency")[];
        damageCategories: Record<"adamantine" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "ghostTouch" | "alignment" | "coldiron" | "energy" | "physical" | "precision" | "salt" | "salt-water", string>;
        value: {
            mode: string;
            data: unknown;
        };
        index: number;
        rule: FlatModifierSource;
    }>;
    _updateObject(formData: Partial<FlatModifierSource>): void;
}
export { FlatModifierForm };
