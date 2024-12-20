import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type * as fields from "types/foundry/common/data/fields.d.ts";

/** The size property of creatures and equipment */
declare const SIZES: readonly ["tiny", "sm", "med", "lg", "huge", "grg"];
declare const SIZE_SLUGS: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
type Size = (typeof SIZES)[number];
/** The rarity trait of creatures, equipment, spells, etc. */
declare const RARITIES: readonly ["common", "uncommon", "rare", "unique"];
type Rarity = (typeof RARITIES)[number];
interface ValuesList<T extends string = string> {
    value: T[];
}
interface LabeledValueAndMax extends ValueAndMax {
    label: string;
}
interface LabeledNumber {
    label: string;
    value: number;
    type: string;
}
interface TypeAndValue<TType extends string> {
    type: TType;
    value: number;
}
interface TraitsWithRarity<T extends string> {
    value: T[];
    rarity: Rarity;
}
/** Literal numeric types */
type ZeroToTwo = 0 | 1 | 2;
type ZeroToThree = ZeroToTwo | 3;
type OneToThree = Exclude<ZeroToThree, 0>;
type TwoToThree = Exclude<OneToThree, 1>;
type ZeroToFour = ZeroToThree | 4;
type OneToFour = Exclude<ZeroToFour, 0>;
type ZeroToFive = ZeroToFour | 5;
type OneToFive = OneToFour | Extract<ZeroToFive, 5>;
type ZeroToSix = ZeroToFive | 6;
type OneToSix = Exclude<ZeroToSix, 0>;
type ZeroToTen = ZeroToFive | 6 | 7 | 8 | 9 | 10;
type OneToTen = Exclude<ZeroToTen, 0>;
type ZeroToEleven = ZeroToTen | 11;
interface ValueAndMaybeMax {
    value: number;
    max?: number;
}
interface ValueAndMax extends Required<ValueAndMaybeMax> {
}
declare function goesToEleven(value: number): value is ZeroToEleven;
/** The tracked schema data of actors and items */
interface NewDocumentMigrationRecord {
    version: null;
    previous: null;
}
type MigrationDataField = fields.SchemaField<{
    version: fields.NumberField<number, number, true, true, true>;
    previous: fields.SchemaField<{
        foundry: fields.StringField<string, string, true, true, true>;
        system: fields.StringField<string, string, true, true, true>;
        schema: fields.NumberField<number, number, true, true, true>;
    }, {
        foundry: string | null;
        system: string | null;
        schema: number | null;
    }, {
        foundry: string | null;
        system: string | null;
        schema: number | null;
    }, true, true, true>;
}>;
type MigratedDocumentMigrationRecord = fields.SourcePropFromDataField<MigrationDataField>;
type MigrationRecord = NewDocumentMigrationRecord | MigratedDocumentMigrationRecord;
interface PublicationData {
    title: string;
    authors: string;
    license: "ORC" | "OGL";
    remaster: boolean;
}
export declare const PROFICIENCY_RANKS: readonly ["untrained", "trained", "expert", "master", "legendary"];
export declare const MATH_FUNCTION_NAMES: Set<MathFunctionName>;
type EnfolderableDocumentPF2e = ActorPF2e<null> | ItemPF2e<null> | Exclude<EnfolderableDocument, Actor<null> | Item<null>>;
export { RARITIES, SIZES, SIZE_SLUGS, goesToEleven };
export type { EnfolderableDocumentPF2e, LabeledNumber, LabeledValueAndMax, MigrationDataField, MigrationRecord, OneToFive, OneToFour, OneToSix, OneToTen, OneToThree, PublicationData, Rarity, Size, TraitsWithRarity, TwoToThree, TypeAndValue, ValueAndMax, ValueAndMaybeMax, ValuesList, ZeroToEleven, ZeroToFive, ZeroToFour, ZeroToSix, ZeroToTen, ZeroToThree, ZeroToTwo, };
