import { GrantItemSource } from "@module/rules/rule-element/grant-item/rule-element";
import { RuleElementForm } from "./base";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource> {
    template: string;
    getData(): Promise<{
        granted: ClientDocument | null;
        allowDuplicate: {};
        item: import("../../base").ItemPF2e<import("../../../actor/base").ActorPF2e<import("../../../scene/token-document/document").TokenDocumentPF2e<import("../../../scene/document").ScenePF2e | null> | null>>;
        index: number;
        rule: GrantItemSource;
        object: import("../../../rules/rule-element/base").RuleElementPF2e<import("../../../rules/rule-element/data").RuleElementSchema> | null;
    }>;
    _updateObject(ruleData: DeepPartial<GrantItemSource>): void;
}
export { GrantItemForm };
