import { UserVisibility } from "@scripts/ui/user-visibility.ts";
import { DegreeOfSuccessString } from "@system/degree-of-success.ts";
import { DataUnionField, StrictStringField } from "@system/schema-data-fields.ts";
import type { ArrayField, StringField } from "types/foundry/common/data/fields.d.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
declare class RollNoteRuleElement extends RuleElementPF2e<RollNoteSchema> {
    static defineSchema(): RollNoteSchema;
    beforePrepareData(): void;
}
interface RollNoteRuleElement extends RuleElementPF2e<RollNoteSchema>, ModelPropsFromRESchema<RollNoteSchema> {
}
type RollNoteSchema = RuleElementSchema & {
    /** The statistic(s) slugs of the rolls for which this note will be appended */
    selector: ArrayField<StringField<string, string, true, false, false>, string[], string[], true, false, true>;
    /** An optional title prepended to the note */
    title: StringField<string, string, false, true, true>;
    /** An optional limitation of the notes visibility to GMs */
    visibility: StringField<UserVisibility, UserVisibility, true, true, true>;
    /** Applicable degree-of-success outcomes for the note */
    outcome: ArrayField<StringField<DegreeOfSuccessString, DegreeOfSuccessString, true, false, false>>;
    /** The main text of the note */
    text: DataUnionField<StrictStringField<string, string, true, false, false> | ResolvableValueField<true, false, false>>;
};
interface NoteRESource extends RuleElementSource {
    selector?: unknown;
    outcome?: unknown;
    title?: unknown;
    text?: unknown;
    visibility?: unknown;
}
export { RollNoteRuleElement, type NoteRESource };
