import { ActorPF2e } from "@actor";
import { DamageDicePF2e, DeferredValueParams, ModifierAdjustment, ModifierPF2e } from "@actor/modifiers";
import { RollNotePF2e } from "@module/notes";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success";
import { RollTwiceOption } from "@system/rolls";
import { BracketedValue } from "./rule-element/data";
import { DamageDiceSynthetics, RollSubstitution, RollTwiceSynthetic, RuleElementSynthetics } from "./synthetics";
/** Extracts a list of all cloned modifiers across all given keys in a single list. */
declare function extractModifiers(synthetics: Pick<RuleElementSynthetics, "modifierAdjustments" | "statisticsModifiers">, selectors: string[], options?: DeferredValueParams): ModifierPF2e[];
/** */
declare function extractDamageModifiers(...args: Parameters<typeof extractModifiers>): {
    persistent: ModifierPF2e[];
    main: ModifierPF2e[];
};
declare function extractModifierAdjustments(adjustmentsRecord: RuleElementSynthetics["modifierAdjustments"], selectors: string[], slug: string): ModifierAdjustment[];
/** Extracts a list of all cloned notes across all given keys in a single list. */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
declare function extractDamageDice(deferredDice: DamageDiceSynthetics, selectors: string[], options?: DeferredValueParams): DamageDicePF2e[];
declare function extractRollTwice(rollTwices: Record<string, RollTwiceSynthetic[]>, selectors: string[], options: Set<string>): RollTwiceOption;
declare function extractRollSubstitutions(substitutions: Record<string, RollSubstitution[]>, domains: string[], rollOptions: Set<string>): RollSubstitution[];
declare function extractDegreeOfSuccessAdjustments(synthetics: Pick<RuleElementSynthetics, "degreeOfSuccessAdjustments">, selectors: string[]): DegreeOfSuccessAdjustment[];
declare function isBracketedValue(value: unknown): value is BracketedValue;
declare function processPreUpdateActorHooks(changed: DocumentUpdateData<ActorPF2e>, { pack }: {
    pack: string | null;
}): Promise<void>;
export { extractDamageDice, extractDamageModifiers, extractDegreeOfSuccessAdjustments, extractModifierAdjustments, extractModifiers, extractNotes, extractRollSubstitutions, extractRollTwice, isBracketedValue, processPreUpdateActorHooks, };
