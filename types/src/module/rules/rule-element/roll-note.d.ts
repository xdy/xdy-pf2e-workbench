import { ItemPF2e } from "@item";
import { RuleElementPF2e, RuleElementSource } from "./";
import { RuleElementOptions } from "./base";
export declare class RollNoteRuleElement extends RuleElementPF2e {
    #private;
    private selector;
    /** An optional title prepended to the note */
    private title;
    /** The text of the note */
    private text;
    /** Applicable degree-of-success outcomes for the note */
    private outcomes;
    /** An optional visibility setting for the note */
    private visibility;
    constructor(data: RollNoteSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface RollNoteSource extends RuleElementSource {
    selector?: unknown;
    outcome?: unknown;
    title?: unknown;
    text?: unknown;
    visibility?: unknown;
}
export {};
