import { RuleElementPF2e, RuleElementData, RuleElementOptions } from "../";
import { BattleFormAC, BattleFormOverrides, BattleFormSource } from "./types";
import { CharacterPF2e } from "@actor";
import { ActorType } from "@actor/data";
import { ItemPF2e, WeaponPF2e } from "@item";
import { DiceModifierPF2e, ModifierPF2e } from "@actor/modifiers";
export declare class BattleFormRuleElement extends RuleElementPF2e {
    overrides: this["data"]["overrides"];
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    /** Whether the actor uses its own unarmed attacks while in battle form */
    ownUnarmed: boolean;
    protected static validActorTypes: ActorType[];
    constructor(data: BattleFormSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
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
    private setRollOptions;
    /** Override the character's AC and ignore speed penalties if necessary */
    private prepareAC;
    /** Add new senses the character doesn't already have */
    private prepareSenses;
    /** Adjust the character's size category */
    private prepareSize;
    /** Add, replace and/or adjust non-land speeds */
    private prepareSpeeds;
    private prepareSkills;
    /** Clear out existing strikes and replace them with the form's stipulated ones, if any */
    private prepareStrikes;
    /** Immunity, weakness, and resistance */
    private prepareIWR;
    /** Disable ineligible check modifiers */
    private suppressModifiers;
    private suppressNotes;
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
