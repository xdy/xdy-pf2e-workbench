import { ItemPF2e } from "@item";
import { UserVisibility } from "@scripts/ui/user-visibility.ts";
import { DegreeOfSuccessString } from "@system/degree-of-success.ts";
import type { ArrayField, ModelPropsFromSchema, StringField } from "types/foundry/common/data/fields.d.ts";
import { BracketedValue, RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./index.ts";
import { ActorPF2e } from "@actor";
declare class RollNoteRuleElement extends RuleElementPF2e<RollNoteSchema> {
    #private;
    static defineSchema(): RollNoteSchema;
    /** The main text of the note */
    text: string | BracketedValue<string>;
    constructor(source: RollNoteSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    beforePrepareData(): void;
}
interface RollNoteRuleElement extends RuleElementPF2e<RollNoteSchema>, ModelPropsFromSchema<RollNoteSchema> {
}
type RollNoteSchema = RuleElementSchema & {
    /** The statistic(s) slugs of the rolls for which this note will be appended */
    selector: StringField<string, string, true, false, false>;
    /** An optional title prepended to the note */
    title: StringField<string, string, true, true, true>;
    /** An optional limitation of the notes visibility to GMs */
    visibility: StringField<UserVisibility, UserVisibility, true, true, true>;
    /** Applicable degree-of-success outcomes for the note */
    outcome: ArrayField<StringField<DegreeOfSuccessString, DegreeOfSuccessString, true, false, false>>;
};
interface RollNoteSource extends RuleElementSource {
    selector?: unknown;
    outcome?: unknown;
    title?: unknown;
    text?: unknown;
    visibility?: unknown;
}
export { RollNoteRuleElement };
