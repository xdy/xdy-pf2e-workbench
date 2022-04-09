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
    constructor(data: RollOptionSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    private resolveOption;
    onApplyActiveEffects(): void;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: string[]): void;
    /** Clean up when this item is deleted */
    onDelete(actorUpdates: Record<string, unknown>): void;
}
interface RollOptionSource extends RuleElementSource {
    domain?: unknown;
    option?: unknown;
    toggleable?: unknown;
    enabledIf?: unknown;
}
export { RollOptionRuleElement };
