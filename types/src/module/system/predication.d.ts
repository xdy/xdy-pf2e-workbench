/**
 * Encapsulates logic to determine if a modifier should be active or not for a specific roll based
 * on a list of string values. This will often be based on traits, but that is not required - sneak
 * attack could be an option that is not a trait.
 * @category PF2
 */
declare class PredicatePF2e extends Array<PredicateStatement> {
    /** Is the predicate data structurally valid? */
    readonly isValid: boolean;
    constructor(...statements: PredicateStatement[] | [PredicateStatement[]]);
    /** Structurally validate the predicates */
    static isValid(statements: unknown): statements is PredicateStatement[];
    /** Is this an array of predicatation statements? */
    static isArray(statements: unknown): statements is PredicateStatement[];
    /** Test if the given predicate passes for the given list of options. */
    static test(predicate: PredicateStatement[] | undefined, options: Set<string> | string[]): boolean;
    /** Create a predicate from unknown data, with deprecation support for legacy objects */
    static create(data: unknown, warn?: boolean): PredicatePF2e;
    /** Test this predicate against a domain of discourse */
    test(options: Set<string> | string[]): boolean;
    toObject(): RawPredicate;
    clone(): PredicatePF2e;
    /** Is the provided statement true? */
    private isTrue;
    private testBinaryOp;
    /** Is the provided compound statement true? */
    private testCompound;
}
declare function convertLegacyData(predicate: OldRawPredicate): RawPredicate;
interface OldRawPredicate {
    label?: unknown;
    all?: PredicateStatement[];
    any?: PredicateStatement[];
    not?: PredicateStatement[];
}
type EqualTo = {
    eq: [string, string | number];
};
type GreaterThan = {
    gt: [string, string | number];
};
type GreaterThanEqualTo = {
    gte: [string, string | number];
};
type LessThan = {
    lt: [string, string | number];
};
type LessThanEqualTo = {
    lte: [string, string | number];
};
type BinaryOperation = EqualTo | GreaterThan | GreaterThanEqualTo | LessThan | LessThanEqualTo;
type Atom = string | BinaryOperation;
type Conjunction = {
    and: PredicateStatement[];
};
type Disjunction = {
    or: PredicateStatement[];
};
type Negation = {
    not: PredicateStatement;
};
type AlternativeDenial = {
    nand: PredicateStatement[];
};
type JointDenial = {
    nor: PredicateStatement[];
};
type Conditional = {
    if: PredicateStatement;
    then: PredicateStatement;
};
type CompoundStatement = Conjunction | Disjunction | AlternativeDenial | JointDenial | Negation | Conditional;
type PredicateStatement = Atom | CompoundStatement;
type RawPredicate = PredicateStatement[];
export { PredicatePF2e, PredicateStatement, RawPredicate, convertLegacyData };
