import { PredicatePF2e, PredicateStatement, RawPredicate } from "@system/predication.ts";
import { SlugCamel } from "@util";
import type { ArrayFieldOptions, CleanFieldOptions, DataFieldOptions, DataSchema, MaybeSchemaProp, StringField, StringFieldOptions } from "types/foundry/common/data/fields.d.ts";
declare const fields: typeof import("types/foundry/common/data/fields.d.ts");
/** A `SchemaField` that preserves fields not declared in its `DataSchema` */
declare class LaxSchemaField<TDataSchema extends DataSchema> extends fields.SchemaField<TDataSchema> {
    protected _cleanType(data: Record<string, unknown>, options?: CleanFieldOptions): SourceFromSchema<TDataSchema>;
}
/** A sluggified string field */
declare class SlugField<TRequired extends boolean = true, TNullable extends boolean = true, THasInitial extends boolean = true> extends fields.StringField<string, string, TRequired, TNullable, THasInitial> {
    constructor(options?: SlugFieldOptions<TRequired, TNullable, THasInitial>);
    protected static get _defaults(): SlugFieldOptions<boolean, boolean, boolean>;
    protected _cleanType(value: Maybe<string>, options?: CleanFieldOptions): MaybeSchemaProp<string, TRequired, TNullable, THasInitial>;
}
interface SlugField<TRequired extends boolean = true, TNullable extends boolean = true, THasInitial extends boolean = true> extends StringField<string, string, TRequired, TNullable, THasInitial> {
    options: SlugFieldOptions<TRequired, TNullable, THasInitial>;
}
interface SlugFieldOptions<TRequired extends boolean, TNullable extends boolean, THasInitial extends boolean> extends StringFieldOptions<string, TRequired, TNullable, THasInitial> {
    camel?: SlugCamel;
}
declare class PredicateStatementField extends fields.DataField<PredicateStatement, PredicateStatement, true, false, false> {
    /** A `PredicateStatement` is always required (not `undefined`) and never nullable */
    constructor(options?: DataFieldOptions<PredicateStatement, true, false, false>);
    protected _validateType(value: unknown): boolean;
    /** No casting is available for a predicate statement */
    protected _cast(value: unknown): unknown;
    protected _cleanType(value: PredicateStatement): PredicateStatement;
}
declare class PredicateField<TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.ArrayField<PredicateStatementField, RawPredicate, PredicatePF2e, TRequired, TNullable, THasInitial> {
    constructor(options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>);
    /** Don't wrap a non-array in an array */
    _cast(value: unknown): unknown;
    /** Construct a `PredicatePF2e` from the initialized `PredicateStatement[]` */
    initialize(value: RawPredicate, model: ConstructorOf<foundry.abstract.DataModel>, options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>): MaybeSchemaProp<PredicatePF2e, TRequired, TNullable, THasInitial>;
}
export { LaxSchemaField, PredicateField, SlugField };
