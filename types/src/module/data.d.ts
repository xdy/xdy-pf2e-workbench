import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** The size property of creatures and equipment */
declare const SIZES: readonly ["tiny", "sm", "med", "lg", "huge", "grg"];
declare const SIZE_SLUGS: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
type Size = typeof SIZES[number];
/** The rarity trait of creatures, equipment, spells, etc. */
declare const RARITIES: readonly ["common", "uncommon", "rare", "unique"];
type Rarity = typeof RARITIES[number];
interface ValuesList<T extends string = string> {
    value: T[];
    custom: string;
}
/** Generic { value, label, type } type used in various places in actor/items types. */
interface LabeledValue {
    label: string;
    value: number | string;
    type: string;
}
interface LabeledString extends LabeledValue {
    value: string;
}
interface LabeledNumber extends LabeledValue {
    value: number;
}
interface TypeAndValue<TType extends string> {
    type: TType;
    value: number;
}
interface TraitsWithRarity<T extends string> extends ValuesList<T> {
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
type OneToFive = OneToThree | Extract<ZeroToFive, 4 | 5>;
type ZeroToTen = ZeroToFive | 6 | 7 | 8 | 9 | 10;
type OneToTen = Exclude<ZeroToTen, 0>;
type ZeroToEleven = ZeroToTen | 11;
interface ValueAndMaybeMax {
    value: number;
    max?: number;
}
type ValueAndMax = Required<ValueAndMaybeMax>;
declare function goesToEleven(value: number): value is ZeroToEleven;
/** The tracked schema data of actors and items */
interface NewDocumentSchemaRecord {
    version: null;
    lastMigration: null;
}
interface MigratedDocumentSchemaRecord {
    version: number;
    lastMigration: {
        datetime: string;
        version: {
            schema: number | null;
            system?: string;
            foundry?: string;
        };
    } | null;
}
type DocumentSchemaRecord = NewDocumentSchemaRecord | MigratedDocumentSchemaRecord;
export declare const PROFICIENCY_RANKS: readonly ["untrained", "trained", "expert", "master", "legendary"];
export declare const MATH_FUNCTION_NAMES: Set<MathFunctionName>;
type EnfolderableDocumentPF2e = ActorPF2e | ItemPF2e | Exclude<EnfolderableDocument, Actor | Item>;
export { DocumentSchemaRecord, EnfolderableDocumentPF2e, LabeledNumber, LabeledString, LabeledValue, OneToFive, OneToFour, OneToTen, OneToThree, RARITIES, Rarity, SIZES, SIZE_SLUGS, Size, TraitsWithRarity, TwoToThree, TypeAndValue, ValueAndMax, ValueAndMaybeMax, ValuesList, ZeroToEleven, ZeroToFive, ZeroToFour, ZeroToTen, ZeroToThree, ZeroToTwo, goesToEleven, };
