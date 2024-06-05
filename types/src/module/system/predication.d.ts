/**
 * Encapsulates logic to determine if a modifier should be active or not for a specific roll based
 * on a list of string values. This will often be based on traits, but that is not required - sneak
 * attack could be an option that is not a trait.
 * @category PF2
 */
declare class Predicate extends Array<PredicateStatement> {
    #private;
    /** Is the predicate data structurally valid? */
    readonly isValid: boolean;
    constructor(...statements: PredicateStatement[] | [PredicateStatement[]]);
    /** Structurally validate the predicates */
    static isValid(statements: unknown): statements is PredicateStatement[];
    /** Is this an array of predicatation statements? */
    static isArray(statements: unknown): statements is PredicateStatement[];
    /** Test if the given predicate passes for the given list of options. */
    static test(predicate: PredicateStatement[] | undefined, options: Set<string> | string[]): boolean;
    /** Test this predicate against a domain of discourse */
    test(options: Set<string> | string[]): boolean;
    toObject(): RawPredicate;
    clone(): Predicate;
}
declare class StatementValidator {
    #private;
    static isStatement(statement: unknown): statement is PredicateStatement;
    static isAtomic(statement: unknown): statement is Atom;
    static isBinaryOp(statement: unknown): statement is BinaryOperation;
    static isCompound(statement: unknown): statement is CompoundStatement;
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
type ExclusiveDisjunction = {
    xor: PredicateStatement[];
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
type Biconditional = {
    iff: PredicateStatement[];
};
type CompoundStatement = Conjunction | Disjunction | ExclusiveDisjunction | AlternativeDenial | JointDenial | Negation | Conditional | Biconditional;
type PredicateStatement = Atom | CompoundStatement;
type RawPredicate = PredicateStatement[];
export { Predicate, StatementValidator };
export type { PredicateStatement, RawPredicate };
