import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "@actor/actions/index.ts";
declare const PERFORM_VARIANT_TRAITS: {
    readonly acting: readonly ["auditory", "linguistic", "visual"];
    readonly comedy: readonly ["auditory", "linguistic", "visual"];
    readonly dance: readonly ["move", "visual"];
    readonly keyboards: readonly ["auditory", "manipulate"];
    readonly oratory: readonly ["auditory", "linguistic"];
    readonly percussion: readonly ["auditory", "manipulate"];
    readonly singing: readonly ["auditory", "linguistic"];
    readonly strings: readonly ["auditory", "manipulate"];
    readonly winds: readonly ["auditory", "manipulate"];
};
type PerformVariant = keyof typeof PERFORM_VARIANT_TRAITS;
declare function perform(options: {
    variant: PerformVariant;
} & SkillActionOptions): void;
declare const action: SingleCheckAction;
export { perform as legacy, action };
