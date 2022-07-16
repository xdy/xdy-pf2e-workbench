import { ItemSourcePF2e } from "@item/data";
import { Migration731TogglePropertyToRollOption } from "./731-toggle-property-to-roll-option";
/** Ensure RE keys do not begin with PF2E.RuleElement, rerun migration 731 */
export declare class Migration737NormalizeRuleElementKeys extends Migration731TogglePropertyToRollOption {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
