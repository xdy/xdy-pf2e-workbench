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
        types: ("item" | "status" | "untyped" | "ability" | "circumstance" | "potency" | "proficiency")[];
        damageCategories: Pick<Record<"persistent" | "adamantine" | "cold-iron" | "darkwood" | "mithral" | "orichalcum" | "silver" | "sisterstone-dusk" | "sisterstone-scarlet" | "warpglass" | "precision" | "splash" | "alignment" | "energy" | "physical", string>, "persistent" | "precision" | "splash">;
        isDamage: boolean;
        value: {
            mode: string;
            data: unknown;
        };
        item: import("../../base").ItemPF2e;
        index: number;
        rule: FlatModifierSource;
        object: import("../../../rules/rule-element/base").RuleElementPF2e | null;
    }>;
    _updateObject(formData: Partial<FlatModifierSource>): void;
}
export { FlatModifierForm };
