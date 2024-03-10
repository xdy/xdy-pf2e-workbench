import type { ActorType, CharacterPF2e } from "@actor";
import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers.ts";
import { WeaponPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema } from "../data.ts";
import { BattleFormRuleSchema } from "./schema.ts";
import { BattleFormSource } from "./types.ts";
declare class BattleFormRuleElement extends RuleElementPF2e<BattleFormRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    constructor(data: BattleFormSource, options: RuleElementOptions);
    static defineSchema(): BattleFormRuleSchema;
    preCreate({ itemSource, ruleSource }: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Set temporary hit points */
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Remove temporary hit points */
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Disable ineligible damage adjustments (modifiers, bonuses, additional damage) */
    applyDamageExclusion(weapon: WeaponPF2e, modifiers: (DamageDicePF2e | ModifierPF2e)[]): void;
}
interface BattleFormRuleElement extends RuleElementPF2e<BattleFormRuleSchema>, ModelPropsFromRESchema<BattleFormRuleSchema> {
    get actor(): CharacterPF2e;
}
export { BattleFormRuleElement };
