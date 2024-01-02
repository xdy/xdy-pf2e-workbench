import type { ActorPF2e } from "@actor";
import type { NumberField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { SenseData } from "./data.ts";
import type { SenseAcuity, SenseType } from "./index.ts";
declare class Sense extends foundry.abstract.DataModel<ActorPF2e, SenseSchema> {
    constructor(data: SenseConstructorParams, options: DataModelConstructionOptions<ActorPF2e>);
    static defineSchema(): SenseSchema;
    /** The localized label of the sense */
    get label(): string | null;
    /** Whether to emphasize the label when displayed on actor sheets */
    get emphasizeLabel(): boolean;
    isMoreAcuteThan(sense: {
        acuity: SenseAcuity;
    }): boolean;
    toObject(source?: true): this["_source"];
    toObject(source: false): LabeledSenseData<this>;
    toObject(source?: boolean): this["_source"] | LabeledSenseData;
}
interface Sense extends foundry.abstract.DataModel<ActorPF2e, SenseSchema>, ModelPropsFromSchema<SenseSchema> {
    range: number;
}
type SenseConstructorParams = Partial<Omit<SenseData, "range" | "type">> & {
    type: SenseType;
    range?: number | null;
};
type SenseSchema = {
    type: StringField<SenseType, SenseType, true, false, false>;
    acuity: StringField<SenseAcuity, SenseAcuity, true, false, true>;
    range: NumberField<number, number, true, true, true>;
    source: StringField<string, string, false, true, true>;
};
type LabeledSenseData<TModel extends Sense = Sense> = RawObject<TModel> & {
    range: number;
    label: string | null;
    emphasizeLabel: boolean;
};
export { Sense, type LabeledSenseData };
