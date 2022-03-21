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
    value: string | boolean;
    constructor(data: RollOptionSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    onApplyActiveEffects(): void;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: string[]): void;
}
interface RollOptionSource extends RuleElementSource {
    domain?: unknown;
    option?: unknown;
}
export { RollOptionRuleElement };
