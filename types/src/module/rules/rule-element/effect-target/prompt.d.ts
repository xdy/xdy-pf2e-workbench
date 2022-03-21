import { ItemPF2e } from "@item";
import { PromptChoice, RulesElementPrompt, RulesElementPromptData } from "@module/rules/apps/prompt";

/** Prompt the user for the target of the effect they just added to an actor */
export declare class EffectTargetPrompt extends RulesElementPrompt<Embedded<ItemPF2e>> {
    private scope;
    constructor(data: TargetPromptData);
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    /** Collect all options within the specified scope and then eliminate any that fail the predicate test */
    protected getChoices(): PromptChoice<Embedded<ItemPF2e>>[];
}
interface TargetPromptData extends RulesElementPromptData<Embedded<ItemPF2e>> {
    scope: string;
}
export {};
