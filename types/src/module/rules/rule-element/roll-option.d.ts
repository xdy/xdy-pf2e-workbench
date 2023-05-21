import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicateField } from "@system/schema-data-fields.ts";
import type { ArrayField, BooleanField, ModelPropsFromSchema, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import { ResolvableValueField } from "./data.ts";
/**
 * Set a roll option at a specificed domain
 * @category RuleElement
 */
declare class RollOptionRuleElement extends RuleElementPF2e<RollOptionSchema> {
    #private;
    /**
     * Whether this roll option can be toggled by the user on an actor sheet: "totm" indicates it will only be present
     * if the Theather of the Mind Toggles setting is enabled
     */
    toggleable: boolean | "totm";
    constructor(source: RollOptionSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defineSchema(): RollOptionSchema;
    protected _validateModel(source: SourceFromSchema<RollOptionSchema>): void;
    onApplyActiveEffects(): void;
    /** Force false totm toggleable roll options if the totmToggles setting is disabled */
    protected resolveValue(): boolean;
    /**
     * Toggle the provided roll option (swapping it from true to false or vice versa).
     * @returns the new value if successful or otherwise `null`
     */
    toggle(newValue?: boolean, newSuboption?: string | null): Promise<boolean | null>;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: Set<string>): void;
    /** Remove the parent effect if configured so */
    afterRoll({ domains, rollOptions }: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface RollOptionRuleElement extends RuleElementPF2e<RollOptionSchema>, ModelPropsFromSchema<RollOptionSchema> {
    value: boolean | string;
}
type RollOptionSchema = RuleElementSchema & {
    scope: StringField<string, string, false, false, true>;
    domain: StringField<string, string, true, false, true>;
    option: StringField<string, string, true, false, false>;
    /** Suboptions for a toggle, appended to the option string */
    suboptions: ArrayField<SchemaField<SuboptionData, SourceFromSchema<SuboptionData>, SourceFromSchema<SuboptionData>, true, false, true>>;
    /**
     * The value of the roll option: either a boolean or a string resolves to a boolean If omitted, it defaults to
     * `true` unless also `togglable`, in which case to `false`.
     */
    value: ResolvableValueField<false, false, false>;
    /** An optional predicate to determine whether the toggle is interactable by the user */
    disabledIf: PredicateField<false, false, false>;
    /** The value of the roll option if its toggle is disabled: null indicates the pre-disabled value is preserved */
    disabledValue: BooleanField<boolean, boolean, false, false, false>;
    /** Whether this roll option is countable: it will have a numeric value counting how many rules added this option */
    count: BooleanField<boolean, boolean, false, false, false>;
    /** If the hosting item is an effect, remove or expire it after a matching roll is made */
    removeAfterRoll: BooleanField<boolean, boolean, false, false, false>;
};
type SuboptionData = {
    label: StringField<string, string, true, false, false>;
    value: StringField<string, string, true, false, false>;
    selected: BooleanField<boolean, boolean, true, false, true>;
};
interface RollOptionSource extends RuleElementSource {
    scope?: unknown;
    domain?: unknown;
    option?: unknown;
    toggleable?: unknown;
    suboptions?: unknown;
    disabledIf?: unknown;
    disabledValue?: unknown;
    count?: unknown;
    removeAfterRoll?: unknown;
}
export { RollOptionRuleElement };
