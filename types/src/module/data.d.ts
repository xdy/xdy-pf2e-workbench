import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
/** The size property of creatures and equipment */
declare const SIZES: readonly ["tiny", "sm", "med", "lg", "huge", "grg"];
declare const SIZE_SLUGS: readonly ["tiny", "small", "medium", "large", "huge", "gargantuan"];
declare type Size = typeof SIZES[number];
/** The rarity trait of creatures, equipment, spells, etc. */
declare const RARITIES: readonly ["common", "uncommon", "rare", "unique"];
declare type Rarity = typeof RARITIES[number];
interface ValuesList<T extends string = string> {
    value: T[];
    custom: string;
}
/** Generic { value, label, type } type used in various places in actor/items types. */
interface LabeledValue {
    label: string;
    value: number | string;
    type: string;
    exceptions?: string;
}
interface LabeledString extends LabeledValue {
    value: string;
}
interface LabeledNumber extends LabeledValue {
    value: number;
}
/** Literal numeric types */
declare type ZeroToTwo = 0 | 1 | 2;
declare type ZeroToThree = ZeroToTwo | 3;
declare type OneToThree = Exclude<ZeroToThree, 0>;
declare type TwoToThree = Exclude<OneToThree, 1>;
declare type ZeroToFour = ZeroToThree | 4;
declare type OneToFour = Exclude<ZeroToFour, 0>;
declare type ZeroToFive = ZeroToFour | 5;
declare type OneToFive = OneToThree | Extract<ZeroToFive, 4 | 5>;
declare type ZeroToTen = ZeroToFive | 6 | 7 | 8 | 9 | 10;
declare type OneToTen = Exclude<ZeroToTen, 0>;
declare type ZeroToEleven = ZeroToTen | 11;
interface ValueAndMaybeMax {
    value: number;
    max?: number;
}
declare type ValueAndMax = Required<ValueAndMaybeMax>;
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
declare type DocumentSchemaRecord = NewDocumentSchemaRecord | MigratedDocumentSchemaRecord;
export declare const PROFICIENCY_RANKS: readonly ["untrained", "trained", "expert", "master", "legendary"];
export declare const MATH_FUNCTION_NAMES: Set<MathFunctionName>;
declare type EnfolderableDocumentPF2e = ActorPF2e | ItemPF2e | Exclude<EnfolderableDocument, Actor | Item>;
export { DocumentSchemaRecord, EnfolderableDocumentPF2e, LabeledNumber, LabeledString, LabeledValue, OneToFive, OneToFour, OneToTen, OneToThree, RARITIES, Rarity, SIZES, SIZE_SLUGS, Size, TwoToThree, ValueAndMax, ValueAndMaybeMax, ValuesList, ZeroToEleven, ZeroToFive, ZeroToFour, ZeroToTen, ZeroToThree, ZeroToTwo, goesToEleven, };
