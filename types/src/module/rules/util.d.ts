import { DeferredValueParams, ModifierAdjustment, ModifierPF2e } from "@actor/modifiers";
import { RollNotePF2e } from "@module/notes";
import { RollTwiceOption } from "@system/rolls";
import { RollSubstitution, RollTwiceSynthetic, RuleElementSynthetics } from "./synthetics";
/** Extracts a list of all cloned modifiers across all given keys in a single list. */
declare function extractModifiers(synthetics: Pick<RuleElementSynthetics, "modifierAdjustments" | "statisticsModifiers">, selectors: string[], options?: DeferredValueParams): ModifierPF2e[];
declare function extractModifierAdjustments(adjustmentsRecord: Record<string, ModifierAdjustment[]>, selectors: string[], slug: string): ModifierAdjustment[];
/** Extracts a list of all cloned notes across all given keys in a single list. */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
declare function extractRollTwice(rollTwices: Record<string, RollTwiceSynthetic[]>, selectors: string[], options: Set<string>): RollTwiceOption;
declare function extractRollSubstitutions(substitutions: Record<string, RollSubstitution[]>, domains: string[], rollOptions: Set<string>): RollSubstitution[];
export { extractModifierAdjustments, extractModifiers, extractNotes, extractRollSubstitutions, extractRollTwice };
