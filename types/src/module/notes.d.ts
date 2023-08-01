import { UserVisibility } from "@scripts/ui/user-visibility.ts";
import { DegreeOfSuccessString } from "@system/degree-of-success.ts";
import { PredicatePF2e, RawPredicate } from "@system/predication.ts";
import { RuleElementPF2e } from "./rules/index.ts";
declare class RollNotePF2e {
    #private;
    /** The selector used to determine on which rolls the note will be shown for. */
    selector: string;
    /** If true, these dice are user-provided/custom. */
    predicate: PredicatePF2e;
    /** List of outcomes to show this note for; or all outcomes if none are specified */
    outcome: DegreeOfSuccessString[];
    /** An optional visibility restriction for the note */
    visibility: UserVisibility | null;
    /** The originating rule element of this modifier, if any: used to retrieve "parent" item roll options */
    rule: RuleElementPF2e | null;
    constructor(params: RollNoteParams);
    get text(): string;
    clone(): RollNotePF2e;
    toObject(): RollNoteSource;
}
interface RollNoteSource {
    selector: string;
    title?: string | null;
    text: string;
    predicate?: RawPredicate;
    outcome?: DegreeOfSuccessString[];
    visibility?: UserVisibility | null;
}
interface RollNoteParams extends RollNoteSource {
    rule?: RuleElementPF2e | null;
}
export { RollNotePF2e, RollNoteSource };
