import { CoinsPF2e } from "./coins.ts";
import type { Price } from "./index.ts";
import fields = foundry.data.fields;

declare class PriceField extends fields.SchemaField<PriceSchema, SourceFromSchema<PriceSchema>, Price> {
    constructor();
    initialize(source: SourceFromSchema<PriceSchema>): Price;
}
type CoinsField = fields.SchemaField<CoinsSchema, SourceFromSchema<CoinsSchema>, CoinsPF2e, true, false, true>;
type CoinsSchema = {
    cp: fields.NumberField<number, number, false, false, false>;
    sp: fields.NumberField<number, number, false, false, false>;
    gp: fields.NumberField<number, number, false, false, false>;
    pp: fields.NumberField<number, number, false, false, false>;
};
type PriceSchema = {
    value: CoinsField;
    per: fields.NumberField<number, number, true, false, true>;
    sizeSensitive: fields.BooleanField<boolean, boolean, false, false, false>;
};
export { PriceField };
