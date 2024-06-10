import { Predicate, PredicateStatement, RawPredicate } from "@system/predication.ts";
import { SlugCamel } from "@util";
import type DataModel from "types/foundry/common/abstract/data.d.ts";
import type { ArrayFieldOptions, CleanFieldOptions, DataField, DataFieldOptions, DataFieldValidationOptions, DataSchema, MaybeSchemaProp, ModelPropFromDataField, NumberField, ObjectFieldOptions, SourcePropFromDataField, StringField, StringFieldOptions } from "types/foundry/common/data/fields.d.ts";
import type { DataModelValidationFailure } from "types/foundry/common/data/validation-failure.d.ts";
declare const fields: typeof foundry.data.fields;
/** A `SchemaField` that preserves fields not declared in its `DataSchema` */
declare class LaxSchemaField<TDataSchema extends DataSchema> extends fields.SchemaField<TDataSchema> {
    protected _cleanType(data: Record<string, unknown>, options?: CleanFieldOptions): SourceFromSchema<TDataSchema>;
}
/** A `SchemaField` that does not cast the source value to an object */
declare class StrictSchemaField<TDataSchema extends DataSchema> extends fields.SchemaField<TDataSchema> {
    protected _cast(value: unknown): SourceFromSchema<TDataSchema>;
    protected _cleanType(data: object, options?: CleanFieldOptions): SourceFromSchema<TDataSchema>;
}
/** A `StringField` that does not cast the source value */
declare class StrictStringField<TSourceProp extends string, TModelProp extends NonNullable<JSONValue> = TSourceProp, TRequired extends boolean = false, TNullable extends boolean = false, THasInitial extends boolean = boolean> extends fields.StringField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
/** A `NumberField` that does not cast the source value */
declare class StrictNumberField<TSourceProp extends number, TModelProp extends NonNullable<JSONValue> = TSourceProp, TRequired extends boolean = false, TNullable extends boolean = true, THasInitial extends boolean = true> extends fields.NumberField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
/** A `BooleanField` that does not cast the source value */
declare class StrictBooleanField<TRequired extends boolean = false, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.BooleanField<boolean, boolean, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
declare class StrictArrayField<TElementField extends DataField, TSourceProp extends Partial<SourcePropFromDataField<TElementField>>[] = SourcePropFromDataField<TElementField>[], TModelProp extends object = ModelPropFromDataField<TElementField>[], TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.ArrayField<TElementField, TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    /** Don't wrap a non-array in an array */
    protected _cast(value: unknown): unknown;
    /** Parent method assumes array-wrapping: pass through unchanged */
    protected _cleanType(value: unknown): unknown;
    initialize(value: JSONValue, model: ConstructorOf<DataModel>, options: ArrayFieldOptions<TSourceProp, TRequired, TNullable, THasInitial>): MaybeSchemaProp<TModelProp, TRequired, TNullable, THasInitial>;
}
/** An array field that will prune invalid elements without complaint */
declare class LaxArrayField<TElementField extends DataField, TSourceProp extends Partial<SourcePropFromDataField<TElementField>>[] = SourcePropFromDataField<TElementField>[], TModelProp extends object = ModelPropFromDataField<TElementField>[], TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.ArrayField<TElementField, TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _validateElements(value: unknown[], options?: DataFieldValidationOptions): void | DataModelValidationFailure;
}
declare class StrictObjectField<TSourceProp extends object, TModelProp extends object = TSourceProp, TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends fields.ObjectField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
declare class DataUnionField<TField extends DataField, TRequired extends boolean = boolean, TNullable extends boolean = boolean, THasInitial extends boolean = boolean> extends fields.DataField<TField extends DataField<infer TSourceProp> ? TSourceProp : never, TField extends DataField<infer _TSourceProp, infer TModelProp> ? TModelProp : never, TRequired, TNullable, THasInitial> {
    fields: TField[];
    constructor(fields: TField[], options: DataFieldOptions<TField extends DataField<infer TSourceProp> ? TSourceProp : never, TRequired, TNullable, THasInitial>);
    protected _cast(value?: unknown): unknown;
    clean(value: unknown, options?: CleanFieldOptions | undefined): MaybeUnionSchemaProp<TField, TRequired, TNullable, THasInitial>;
    validate(value: unknown, options?: DataFieldValidationOptions | undefined): void | DataModelValidationFailure;
    initialize(value: unknown, model?: ConstructorOf<DataModel> | undefined, options?: object | undefined): MaybeUnionSchemaProp<TField, TRequired, TNullable, THasInitial>;
}
type MaybeUnionSchemaProp<TField extends DataField, TRequired extends boolean, TNullable extends boolean, THasInitial extends boolean> = MaybeSchemaProp<TField extends DataField<infer _TSourceProp, infer TModelProp, boolean, boolean, boolean> ? TModelProp : never, TRequired, TNullable, THasInitial>;
/** A sluggified string field */
declare class SlugField<TRequired extends boolean = true, TNullable extends boolean = boolean, THasInitial extends boolean = boolean> extends StrictStringField<string, string, TRequired, TNullable, THasInitial> {
    constructor(options?: SlugFieldOptions<TRequired, TNullable, THasInitial>);
    protected static get _defaults(): SlugFieldOptions<boolean, boolean, boolean>;
    protected _cleanType(value: Maybe<string>, options?: CleanFieldOptions): MaybeSchemaProp<string, TRequired, TNullable, THasInitial>;
}
interface SlugField<TRequired extends boolean = true, TNullable extends boolean = boolean, THasInitial extends boolean = boolean> extends StrictStringField<string, string, TRequired, TNullable, THasInitial> {
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
declare class PredicateField<TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends StrictArrayField<PredicateStatementField, RawPredicate, Predicate, TRequired, TNullable, THasInitial> {
    constructor(options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>);
    /** Construct a `PredicatePF2e` from the initialized `PredicateStatement[]` */
    initialize(value: RawPredicate, model: ConstructorOf<foundry.abstract.DataModel>, options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>): MaybeSchemaProp<Predicate, TRequired, TNullable, THasInitial>;
}
type RecordFieldModelProp<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField, TDense extends boolean = false> = TDense extends true ? Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>> : TDense extends false ? Partial<Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>> : Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>> | Partial<Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>>;
type RecordFieldSourceProp<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField, 
/** Whether this is to be treated as a "dense" record; i.e., any valid key should return a value */
TDense extends boolean = false> = TDense extends true ? Record<SourcePropFromDataField<TKeyField>, SourcePropFromDataField<TValueField>> : TDense extends false ? Partial<Record<SourcePropFromDataField<TKeyField>, SourcePropFromDataField<TValueField>>> : Record<SourcePropFromDataField<TKeyField>, SourcePropFromDataField<TValueField>> | Partial<Record<SourcePropFromDataField<TKeyField>, SourcePropFromDataField<TValueField>>>;
declare class RecordField<TKeyField extends StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>, TValueField extends DataField, TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true, TDense extends boolean = false> extends fields.ObjectField<RecordFieldSourceProp<TKeyField, TValueField, TDense>, RecordFieldModelProp<TKeyField, TValueField, TDense>, TRequired, TNullable, THasInitial> {
    static recursive: boolean;
    keyField: TKeyField;
    valueField: TValueField;
    constructor(keyField: TKeyField, valueField: TValueField, options?: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField, TDense>, TRequired, TNullable, THasInitial>);
    protected _isValidKeyFieldType(keyField: unknown): keyField is StringField<string, string, true, false, false> | NumberField<number, number, true, false, false>;
    protected _validateValues(values: Record<string, unknown>, options?: DataFieldValidationOptions): DataModelValidationFailure | void;
    protected _cleanType(values: Record<string, unknown>, options?: CleanFieldOptions | undefined): Record<string, unknown>;
    protected _validateType(values: unknown, options?: DataFieldValidationOptions): boolean | DataModelValidationFailure | void;
    initialize(values: object | null | undefined, model: ConstructorOf<foundry.abstract.DataModel>, options?: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial>): MaybeSchemaProp<RecordFieldModelProp<TKeyField, TValueField, TDense>, TRequired, TNullable, THasInitial>;
}
/** A field that always results in a value of `null` */
declare class NullField extends fields.DataField<null, null, true, true, true> {
    constructor();
    protected _cast(): null;
}
export { DataUnionField, LaxArrayField, LaxSchemaField, NullField, PredicateField, RecordField, SlugField, StrictArrayField, StrictBooleanField, StrictNumberField, StrictObjectField, StrictSchemaField, StrictStringField, };
