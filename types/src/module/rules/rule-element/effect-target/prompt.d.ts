import { ItemPF2e } from "@item";
import { PickAThingConstructorArgs, PickableThing, PickAThingPrompt } from "@module/apps/pick-a-thing-prompt";
/** Prompt the user for the target of the effect they just added to an actor */
export declare class EffectTargetPrompt extends PickAThingPrompt<Embedded<ItemPF2e>> {
    private scope;
    constructor(data: TargetPromptData);
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    /** Collect all options within the specified scope and then eliminate any that fail the predicate test */
    protected getChoices(): PickableThing<Embedded<ItemPF2e>>[];
}
interface TargetPromptData extends PickAThingConstructorArgs<Embedded<ItemPF2e>> {
    scope: string;
}
export {};
