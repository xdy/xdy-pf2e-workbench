import { ActorPF2e } from "@actor";
import {
    DamageDicePF2e,
    DeferredDamageDiceOptions,
    DeferredValueParams,
    ModifierAdjustment,
    ModifierPF2e,
} from "@actor/modifiers.ts";
import { ItemPF2e } from "@item";
import { ConditionSource, EffectSource } from "@item/base/data/index.ts";
import { RollNotePF2e } from "@module/notes.ts";
import { BaseDamageData } from "@system/damage/index.ts";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success.ts";
import { RollTwiceOption } from "@system/rolls.ts";
import { DamageAlteration } from "./rule-element/damage-alteration/alteration.ts";
import { BracketedValue, RuleElementPF2e } from "./rule-element/index.ts";
import { DamageDiceSynthetics, RollSubstitution, RollTwiceSynthetic, RuleElementSynthetics } from "./synthetics.ts";

/** Extracts a list of all cloned modifiers across all given keys in a single list. */
declare function extractModifiers(synthetics: RuleElementSynthetics, domains: string[], options?: DeferredValueParams): ModifierPF2e[];
declare function extractModifierAdjustments(adjustmentsRecord: RuleElementSynthetics["modifierAdjustments"], selectors: string[], slug: string): ModifierAdjustment[];
declare function extractDamageAlterations(alterationsRecord: Record<string, DamageAlteration[]>, selectors: string[], slug: string): DamageAlteration[];
/** Extracts a list of all cloned notes across all given keys in a single list. */
declare function extractNotes(rollNotes: Record<string, RollNotePF2e[]>, selectors: string[]): RollNotePF2e[];
declare function extractDamageDice(synthetics: DamageDiceSynthetics, options: DeferredDamageDiceOptions): DamageDicePF2e[];
declare function processDamageCategoryStacking(base: BaseDamageData[], options: {
    modifiers: ModifierPF2e[];
    dice: DamageDicePF2e[];
    test: Set<string>;
}): {
    modifiers: ModifierPF2e[];
    dice: DamageDicePF2e[];
};
declare function extractEphemeralEffects({ affects, origin, target, item, domains, options, }: ExtractEphemeralEffectsParams): Promise<(ConditionSource | EffectSource)[]>;
interface ExtractEphemeralEffectsParams {
    affects: "target" | "origin";
    origin: ActorPF2e | null;
    target: ActorPF2e | null;
    item: ItemPF2e | null;
    domains: string[];
    options: Set<string> | string[];
}
declare function extractRollTwice(rollTwices: Record<string, RollTwiceSynthetic[]>, selectors: string[], options: Set<string>): RollTwiceOption;
declare function extractRollSubstitutions(substitutions: Record<string, RollSubstitution[]>, domains: string[], rollOptions: Set<string>): RollSubstitution[];
declare function extractDegreeOfSuccessAdjustments(synthetics: Pick<RuleElementSynthetics, "degreeOfSuccessAdjustments">, selectors: string[]): DegreeOfSuccessAdjustment[];
declare function isBracketedValue(value: unknown): value is BracketedValue;
declare function processPreUpdateActorHooks(changed: Record<string, unknown>, { pack }: {
    pack: string | null;
}): Promise<void>;
/** Gets the item update info that applies an update to all given rules */
declare function createBatchRuleElementUpdate(rules: RuleElementPF2e[], update: Record<string, unknown>): EmbeddedDocumentUpdateData[];
export { createBatchRuleElementUpdate, extractDamageAlterations, extractDamageDice, extractDegreeOfSuccessAdjustments, extractEphemeralEffects, extractModifierAdjustments, extractModifiers, extractNotes, extractRollSubstitutions, extractRollTwice, isBracketedValue, processDamageCategoryStacking, processPreUpdateActorHooks, };
