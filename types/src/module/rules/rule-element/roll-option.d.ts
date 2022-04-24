import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { PredicatePF2e } from "@system/predication";
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
    value: string | boolean;
    /** Whether this roll option can be toggled by the user on an actor sheet */
    toggleable: boolean;
    /** Whether the toggle is interactable by the user. The `value` may still be true even if the toggle is disabled */
    enabledIf?: PredicatePF2e;
    /** Whether this roll option is countable - the roll option will have a numeric value counting how many rules added this option */
    count?: boolean;
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
    enabledIf?: unknown;
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
