import { PredicatePF2e, PredicateStatement, RawPredicate } from "@system/predication.ts";
import { SlugCamel } from "@util";
import type { ArrayFieldOptions, CleanFieldOptions, DataField, DataFieldOptions, DataFieldValidationOptions, DataSchema, MaybeSchemaProp, ModelPropFromDataField, NumberField, ObjectFieldOptions, SourcePropFromDataField, StringField, StringFieldOptions } from "types/foundry/common/data/fields.d.ts";
import type { DataModelValidationFailure } from "types/foundry/common/data/validation-failure.d.ts";
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
    protected _cast(value: unknown): unknown;
    /** Parent method assumes array-wrapping: pass through unchanged */
    protected _cleanType(value: unknown): unknown;
    /** Construct a `PredicatePF2e` from the initialized `PredicateStatement[]` */
    initialize(value: RawPredicate, model: ConstructorOf<foundry.abstract.DataModel>, options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>): MaybeSchemaProp<PredicatePF2e, TRequired, TNullable, THasInitial>;
}
type RecordFieldModelProp<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField> = Partial<Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>>;
type RecordFieldSourceProp<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField> = Partial<Record<SourcePropFromDataField<TKeyField>, SourcePropFromDataField<TValueField>>>;
declare class RecordField<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField, TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.ObjectField<RecordFieldSourceProp<TKeyField, TValueField>, RecordFieldModelProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial> {
    static recursive: boolean;
    keyField: TKeyField;
    valueField: TValueField;
    constructor(keyField: TKeyField, valueField: TValueField, options: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial>);
    protected _isValidKeyFieldType(keyField: unknown): keyField is StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>;
    protected _validateValues(values: Record<string, unknown>, options?: DataFieldValidationOptions): DataModelValidationFailure | void;
    protected _validateType(values: unknown, options?: DataFieldValidationOptions): boolean | DataModelValidationFailure | void;
    initialize(values: object | null | undefined, model: ConstructorOf<foundry.abstract.DataModel>, options?: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial>): MaybeSchemaProp<RecordFieldModelProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial>;
}
export { LaxSchemaField, PredicateField, RecordField, SlugField };
