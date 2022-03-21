/**
 * Encapsulates logic to determine if a modifier should be active or not for a specific roll based
 * on a list of string values. This will often be based on traits, but that is not required - sneak
 * attack could be an option that is not a trait.
 * @category PF2
 */
declare class PredicatePF2e implements RawPredicate {
    /** Every statement in the array is true */
    all: PredicateStatement[];
    /** At least one statement in the array is true */
    any: PredicateStatement[];
    /** None of the statements in the array are true */
    not: PredicateStatement[];
    /** A label for this predicate, to be displayed in certain (currently limited) contexts */
    label?: string;
    /** Is the predicate data structurally valid? */
    isValid: boolean;
    /** Test if the given predicate passes for the given list of options. */
    static test(predicate: RawPredicate | undefined, options: string[]): boolean;
    constructor(param?: RawPredicate);
    /** Structurally validate the predicates */
    private validate;
    /** Test this predicate against a domain of discourse */
    test(options: string[]): boolean;
    /** Is the provided statement true? */
    private isTrue;
    private testBinaryOp;
    /** Is the provided compound statement true? */
    private testCompound;
}
declare type EqualTo = {
    eq: [string, string | number];
};
declare type GreaterThan = {
    gt: [string, string | number];
};
declare type GreaterThanEqualTo = {
    gte: [string, string | number];
};
declare type LessThan = {
    lt: [string, string | number];
};
declare type LessThanEqualTo = {
    lte: [string, string | number];
};
declare type BinaryOperation = EqualTo | GreaterThan | GreaterThanEqualTo | LessThan | LessThanEqualTo;
declare type Atom = string | BinaryOperation;
declare type Conjunction = {
    and: PredicateStatement[];
};
declare type Disjunction = {
    or: PredicateStatement[];
};
declare type Negation = {
    not: PredicateStatement;
};
declare type JointDenial = {
    nor: PredicateStatement[];
};
declare type Conditional = {
    if: PredicateStatement;
    then: PredicateStatement;
};
declare type CompoundStatement = Conjunction | Disjunction | JointDenial | Negation | Conditional;
declare type PredicateStatement = Atom | CompoundStatement;
interface RawPredicate {
    all?: PredicateStatement[];
    any?: PredicateStatement[];
    not?: PredicateStatement[];
    label?: string;
}
export { PredicateStatement, PredicatePF2e, RawPredicate };
