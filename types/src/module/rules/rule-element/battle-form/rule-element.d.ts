import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { DiceModifierPF2e, ModifierPF2e } from "@actor/modifiers.ts";
import { WeaponPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e } from "../index.ts";
import { BattleFormSource } from "./types.ts";
import { BattleFormRuleSchema } from "./schema.ts";
declare class BattleFormRuleElement extends RuleElementPF2e<BattleFormRuleSchema> {
    #private;
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    protected static validActorTypes: ActorType[];
    static defineSchema(): BattleFormRuleSchema;
    constructor(data: BattleFormSource, options: RuleElementOptions);
    static defaultIcons: Record<string, ImageFilePath | undefined>;
    preCreate({ itemSource, ruleSource }: RuleElementPF2e.PreCreateParams): Promise<void>;
    /** Set temporary hit points */
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Remove temporary hit points */
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Disable ineligible damage adjustments (modifiers, bonuses, additional damage) */
    applyDamageExclusion(weapon: WeaponPF2e, modifiers: (DiceModifierPF2e | ModifierPF2e)[]): void;
    /** Process compendium query and construct full strike object using retrieved weapon */
    private resolveStrikeQueries;
}
interface BattleFormRuleElement extends RuleElementPF2e<BattleFormRuleSchema>, ModelPropsFromSchema<BattleFormRuleSchema> {
    get actor(): CharacterPF2e;
}
export { BattleFormRuleElement };
