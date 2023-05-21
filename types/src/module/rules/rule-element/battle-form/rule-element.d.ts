import { ActorPF2e, CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data/index.ts";
import { DiceModifierPF2e, ModifierPF2e } from "@actor/modifiers.ts";
import { ItemPF2e, WeaponPF2e } from "@item";
import { RuleElementData, RuleElementOptions, RuleElementPF2e } from "../index.ts";
import { BattleFormAC, BattleFormOverrides, BattleFormSource } from "./types.ts";
export declare class BattleFormRuleElement extends RuleElementPF2e {
    #private;
    overrides: this["data"]["overrides"];
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    /** Whether the actor uses its own unarmed attacks while in battle form */
    ownUnarmed: boolean;
    protected static validActorTypes: ActorType[];
    constructor(data: BattleFormSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defaultIcons: Record<string, ImageFilePath | undefined>;
    /** Fill in base override data */
    private initialize;
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
export interface BattleFormRuleElement extends RuleElementPF2e {
    get actor(): CharacterPF2e;
    data: BattleFormData;
}
type PickedProperties = "overrides" | "canCast" | "canSpeak" | "hasHands" | "ownUnarmed";
type RequiredBattleFormSource = Required<Pick<BattleFormSource, PickedProperties>>;
interface BattleFormData extends RuleElementData, RequiredBattleFormSource {
    key: "BattleForm";
    overrides: Required<BattleFormOverrides> & {
        armorClass: Required<BattleFormAC>;
    };
}
export {};
