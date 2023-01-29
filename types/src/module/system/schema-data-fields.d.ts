import { PredicatePF2e, PredicateStatement, RawPredicate } from "@system/predication";
import { DataModel } from "types/foundry/common/abstract/data.mjs";
import { ArrayFieldOptions, CleanFieldOptions, DataFieldOptions, DataSchema, StringFieldOptions } from "types/foundry/common/data/fields.mjs";
declare const fields: typeof import("types/foundry/common/data/fields.mjs");
/** A `SchemaField` that preserves fields not declared in its `DataSchema` */
declare class LaxSchemaField<TSourceProp extends DataSchema = DataSchema> extends fields.SchemaField<TSourceProp> {
    protected _cleanType(data: Record<string, unknown>, options?: CleanFieldOptions): TSourceProp;
}
/** A sluggified string field */
declare class SlugField<TNullable extends boolean = true> extends fields.StringField<string, string, TNullable> {
    protected static get _defaults(): StringFieldOptions<string, boolean>;
    protected _cleanType(value: Maybe<string>, options?: CleanFieldOptions): Maybe<string>;
}
declare class PredicateStatementField extends fields.DataField<PredicateStatement, PredicateStatement> {
    /** A `PredicateStatement` is always required (not `undefined`) and never nullable */
    constructor(options?: DataFieldOptions<PredicateStatement, false>);
    protected _validateType(value: unknown): boolean;
    /** No casting is available for a predicate statement */
    protected _cast(value: unknown): unknown;
    protected _cleanType(value: PredicateStatement): PredicateStatement;
}
declare class PredicateField<TNullable extends boolean = false> extends fields.ArrayField<PredicateStatementField, RawPredicate, RawPredicate, TNullable> {
    constructor(options?: Pick<ArrayFieldOptions<PredicateStatementField, TNullable>, "initial" | "nullable">);
    /** Construct a `PredicatePF2e` from the initialized `PredicateStatement[]` */
    initialize(value: RawPredicate, model: ConstructorOf<DataModel>, options?: ArrayFieldOptions<PredicateStatementField, TNullable>): TNullable extends true ? PredicatePF2e | null : PredicatePF2e;
}
export { LaxSchemaField, PredicateField, SlugField };
