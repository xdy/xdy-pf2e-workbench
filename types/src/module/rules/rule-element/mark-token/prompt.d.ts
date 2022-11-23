import { TokenDocumentPF2e } from "@scene";
import { PredicatePF2e } from "@system/predication";
/** Prompt the user to target a token */
declare class MarkTargetPrompt {
    #private;
    prompt: string;
    requirements: TargetRequirements | null;
    constructor(params: PromptParameters);
    resolveTarget(): Promise<TokenDocumentPF2e | null>;
    activateListeners(): void;
}
interface PromptParameters {
    prompt: string | null;
    requirements: TargetRequirements | null;
}
interface TargetRequirements {
    label: string;
    predicate: PredicatePF2e;
}
export { MarkTargetPrompt };
