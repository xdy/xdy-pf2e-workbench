import { UserVisibility } from "@scripts/ui/user-visibility";
import { DegreeOfSuccessString } from "@system/degree-of-success";
import { PredicatePF2e, RawPredicate } from "@system/predication";
export declare class RollNotePF2e {
    #private;
    /** The selector used to determine on which rolls the note will be shown for. */
    selector: string;
    /** The text content of this note. */
    text: string;
    /** If true, these dice are user-provided/custom. */
    predicate: PredicatePF2e;
    /** List of outcomes to show this note for; or all outcomes if none are specified */
    outcome: DegreeOfSuccessString[];
    /** An optional visibility restriction for the note */
    visibility: UserVisibility | null;
    constructor(params: RollNoteParams);
    clone(): RollNotePF2e;
}
interface RollNoteParams {
    selector: string;
    title?: string | null;
    text: string;
    predicate?: RawPredicate;
    outcome?: DegreeOfSuccessString[];
    visibility?: UserVisibility | null;
}
export {};
