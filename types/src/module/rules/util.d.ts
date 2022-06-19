import { DeferredValueParams, ModifierPF2e } from "@actor/modifiers";
import { RollNotePF2e } from "@module/notes";
import { RollTwiceOption } from "@system/rolls";
import { DeferredModifier, RollSubstitution, RollTwiceSynthetic } from "./rule-element/data";
/** Extracts a list of all cloned modifiers across all given keys in a single list. */
declare function extractModifiers(modifiers: Record<string, DeferredModifier[]>, selectors: string[], options?: DeferredValueParams): ModifierPF2e[];
/** Extracts a list of all cloned notes across all given keys in a single list. */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
declare function extractRollTwice(rollTwices: Record<string, RollTwiceSynthetic[]>, selectors: string[], options: string[]): RollTwiceOption;
declare function extractRollSubstitutions(substitutions: Record<string, RollSubstitution[]>, domains: string[], rollOptions: string[]): RollSubstitution[];
export { extractModifiers, extractNotes, extractRollSubstitutions, extractRollTwice };
