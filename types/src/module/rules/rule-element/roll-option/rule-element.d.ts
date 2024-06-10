import { RuleElementOptions, RuleElementPF2e } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSource } from "../data.ts";
import { type RollOptionSchema } from "./data.ts";
/**
 * Set a roll option at a specificed domain
 * @category RuleElement
 */
declare class RollOptionRuleElement extends RuleElementPF2e<RollOptionSchema> {
    #private;
    constructor(source: RollOptionSource, options: RuleElementOptions);
    static defineSchema(): RollOptionSchema;
    static validateJoint(source: SourceFromSchema<RollOptionSchema>): void;
    /** Process this rule element during item pre-creation to inform subsequent choice sets. */
    preCreate(): Promise<void>;
    onApplyActiveEffects(): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Force false totm toggleable roll options if the totmToggles setting is disabled */
    resolveValue(): boolean;
    /**
     * Toggle the provided roll option (swapping it from true to false or vice versa).
     * @param value The new roll option value
     * @param [selection] The new suboption selection
     * @returns the new value if successful or otherwise `null`
     */
    toggle(value?: boolean, selection?: string | null): Promise<boolean | null>;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: Set<string>): void;
    /** Remove the parent effect if configured so */
    afterRoll({ domains, rollOptions }: RuleElementPF2e.AfterRollParams): Promise<void>;
}
interface RollOptionRuleElement extends RuleElementPF2e<RollOptionSchema>, ModelPropsFromRESchema<RollOptionSchema> {
    value: boolean | string;
}
interface RollOptionSource extends RuleElementSource {
    domain?: JSONValue;
    option?: JSONValue;
    toggleable?: JSONValue;
    suboptions?: JSONValue;
    value?: JSONValue;
    selection?: JSONValue;
    disabledIf?: JSONValue;
    disabledValue?: JSONValue;
    count?: JSONValue;
    removeAfterRoll?: JSONValue;
}
export { RollOptionRuleElement };
export type { RollOptionSource };
