import { DamageDicePF2e, DeferredValueParams, ModifierAdjustment, ModifierPF2e, TestableDeferredValueParams } from "@actor/modifiers.ts";
import { ConditionSource, EffectSource } from "@item/data/index.ts";
import { ActorPF2e, ItemPF2e } from "@module/documents.ts";
import { RollNotePF2e } from "@module/notes.ts";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success.ts";
import { RollTwiceOption } from "@system/rolls.ts";
import { BracketedValue } from "./rule-element/index.ts";
import { DamageDiceSynthetics, RollSubstitution, RollTwiceSynthetic, RuleElementSynthetics } from "./synthetics.ts";
/** Extracts a list of all cloned modifiers across all given keys in a single list. */
declare function extractModifiers(synthetics: Pick<RuleElementSynthetics, "modifierAdjustments" | "modifiers">, selectors: string[], options?: DeferredValueParams): ModifierPF2e[];
declare function extractModifierAdjustments(adjustmentsRecord: RuleElementSynthetics["modifierAdjustments"], selectors: string[], slug: string): ModifierAdjustment[];
/** Extracts a list of all cloned notes across all given keys in a single list. */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
declare function extractDamageDice(deferredDice: DamageDiceSynthetics, selectors: string[], options: TestableDeferredValueParams): DamageDicePF2e[];
declare function extractDamageSynthetics(actor: ActorPF2e, selectors: string[], options: TestableDeferredValueParams & {
    extraModifiers?: ModifierPF2e[];
}): {
    modifiers: ModifierPF2e[];
    dice: DamageDicePF2e[];
};
declare function extractEphemeralEffects({ affects, origin, target, item, domains, options, }: ExtractEphemeralEffectsParams): Promise<(ConditionSource | EffectSource)[]>;
interface ExtractEphemeralEffectsParams {
    affects: "target" | "origin";
    origin: ActorPF2e | null;
    target: Maybe<ActorPF2e>;
    item: ItemPF2e | null;
    domains: string[];
    options: Set<string> | string[];
}
declare function extractRollTwice(rollTwices: Record<string, RollTwiceSynthetic[]>, selectors: string[], options: Set<string>): RollTwiceOption;
declare function extractRollSubstitutions(substitutions: Record<string, RollSubstitution[]>, domains: string[], rollOptions: Set<string>): RollSubstitution[];
declare function extractDegreeOfSuccessAdjustments(synthetics: Pick<RuleElementSynthetics, "degreeOfSuccessAdjustments">, selectors: string[]): DegreeOfSuccessAdjustment[];
declare function isBracketedValue(value: unknown): value is BracketedValue;
declare function processPreUpdateActorHooks(changed: DocumentUpdateData<ActorPF2e>, { pack }: {
    pack: string | null;
}): Promise<void>;
export { extractDamageDice, extractDamageSynthetics, extractDegreeOfSuccessAdjustments, extractEphemeralEffects, extractModifierAdjustments, extractModifiers, extractNotes, extractRollSubstitutions, extractRollTwice, isBracketedValue, processPreUpdateActorHooks, };
