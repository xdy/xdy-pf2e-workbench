import { GrantItemSource } from "@module/rules/rule-element/grant-item/rule-element";
import { RuleElementForm } from "./base";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource> {
    template: string;
    getData(): Promise<{
        granted: ClientDocument<foundry.abstract.Document> | null;
        allowDuplicate: {};
        item: import("../../base").ItemPF2e;
        index: number;
        rule: GrantItemSource;
        object: import("../../../rules/rule-element/base").RuleElementPF2e | null;
    }>;
    _updateObject(ruleData: DeepPartial<GrantItemSource>): void;
}
export { GrantItemForm };
