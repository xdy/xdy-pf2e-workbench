import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { RuleElementOptions, RuleElementPF2e } from "./base";
import { RuleElementSource } from "./data";
/**
 * Set a roll option at a specificed domain
 * @category RuleElement
 */
declare class RollOptionRuleElement extends RuleElementPF2e {
    domain: string;
    option: string;
    /**
     * The value of the roll option: either a boolean or a string resolves to a boolean
     * If omitted, it defaults to `true` unless also `togglable`, in which case to `false`.
     */
    private value;
    /** Whether this roll option can be toggled by the user on an actor sheet */
    private toggleable;
    /** An optional predicate to determine whether the toggle is interactable by the user */
    private disabledIf?;
    /** The value of the roll option if its toggle is disabled: null indicates the pre-disabled value is preserved */
    private disabledValue?;
    /** Whether this roll option is countable: it will have a numeric value counting how many rules added this option */
    private count?;
    constructor(data: RollOptionSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    private resolveOption;
    onApplyActiveEffects(): void;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: string[]): void;
    /**
     * Toggle the provided roll option (swapping it from true to false or vice versa).
     * @returns the new value if successful or otherwise `null`
     */
    static toggleOption({ domain, option, actor, itemId, value, }: ToggleParameters): Promise<boolean | null>;
}
interface RollOptionSource extends RuleElementSource {
    domain?: unknown;
    option?: unknown;
    toggleable?: unknown;
    disabledIf?: unknown;
    disabledValue?: unknown;
    count?: unknown;
}
interface ToggleParameters {
    domain: string;
    option: string;
    actor: ActorPF2e;
    itemId?: string | null;
    value?: boolean;
}
export { RollOptionRuleElement };
