import type { NumberField, SchemaField } from "types/foundry/common/data/fields.d.ts";
import { CoinsPF2e } from "./coins.ts";
declare const fields: typeof foundry.data.fields;
declare class PriceField extends fields.SchemaField<PriceSchema> {
    constructor();
    initialize(source: SourceFromSchema<PriceSchema>): PriceData;
}
type CoinsField = SchemaField<CoinsSchema, SourceFromSchema<CoinsSchema>, CoinsPF2e, true, false, true>;
type CoinsSchema = {
    cp: NumberField<number, number, false, false, false>;
    sp: NumberField<number, number, false, false, false>;
    gp: NumberField<number, number, false, false, false>;
    pp: NumberField<number, number, false, false, false>;
};
type PriceSchema = {
    value: CoinsField;
    per: NumberField<number, number, true, false, true>;
};
type PriceData = {
    value: CoinsPF2e;
    per: number;
};
export { PriceField };
