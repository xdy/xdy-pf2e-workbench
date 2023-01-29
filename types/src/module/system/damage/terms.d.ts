import { DamageInstance } from "./roll";
declare class ArithmeticExpression extends RollTerm<ArithmeticExpressionData> {
    operator: ArithmeticOperator;
    operands: RollTerm[];
    constructor(termData: ArithmeticExpressionData);
    static SERIALIZE_ATTRIBUTES: string[];
    static fromData<TTerm extends RollTerm>(this: ConstructorOf<TTerm>, data: TermDataOf<TTerm>): TTerm;
    static totalOf(operator: ArithmeticOperator, left: number | undefined, right: number | undefined): number | undefined;
    get dice(): DiceTerm[];
    /**
     * Simplify the expression if this term is deterministic and not multiplication.
     * Multiplication is almost always going to be critical-hit doubling, which must be preserved for IWR analysis.
     */
    get expression(): string;
    /** Preserve flavor of inner terms */
    get formula(): string;
    get total(): number | undefined;
    get critImmuneTotal(): number | undefined;
    get isDeterministic(): boolean;
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    /** Construct a string for an HTML rendering of this term */
    render(): DocumentFragment;
    protected _evaluate(options?: {
        minimize?: boolean;
        maximize?: boolean;
    }): Promise<Evaluated<this>>;
    toJSON(): ArithmeticExpressionData;
}
interface ArithmeticExpressionData extends RollTermData {
    class?: "ArithmeticExpression";
    operator: ArithmeticOperator;
    operands: [RollTermData, RollTermData];
}
type ArithmeticOperator = "+" | "-" | "*" | "/" | "%";
/** A parenthetically-exclosed expression as a single arithmetic term or number */
declare class Grouping extends RollTerm<GroupingData> {
    term: RollTerm;
    constructor(termData: GroupingData);
    static SERIALIZE_ATTRIBUTES: string[];
    static fromData<TTerm extends RollTerm>(this: ConstructorOf<TTerm>, data: TermDataOf<TTerm>): TTerm;
    get dice(): DiceTerm[];
    get expression(): string;
    /** Preserve flavor of inner terms */
    get formula(): string;
    get total(): number | undefined;
    get critImmuneTotal(): number | undefined;
    get isDeterministic(): boolean;
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    protected _evaluate(options?: {
        minimize?: boolean;
        maximize?: boolean;
    }): Promise<Evaluated<this>>;
    toJSON(): GroupingData;
    /** Construct a string for an HTML rendering of this term */
    render(): DocumentFragment;
}
interface GroupingData extends RollTermData {
    class?: "Grouping";
    term: RollTermData;
}
declare class IntermediateDie extends RollTerm<IntermediateDieData> {
    number: NumericTerm | MathTerm | Grouping;
    faces: NumericTerm | MathTerm | Grouping;
    die: Evaluated<Die> | null;
    constructor(data: IntermediateDieData);
    static SERIALIZE_ATTRIBUTES: string[];
    get expression(): string;
    get total(): number | undefined;
    get dice(): [Evaluated<Die>] | never[];
    /** `MathTerm` incorrectly reports as being deterministic, so consider them to always not be so */
    get isDeterministic(): boolean;
    get minimumValue(): number;
    /** Not able to get an expected value from a Math term */
    get expectedValue(): number;
    get maximumValue(): number;
    protected _evaluate(): Promise<Evaluated<this>>;
    toJSON(): IntermediateDieData;
}
interface IntermediateDieData extends RollTermData {
    class?: "IntermediateDie";
    number: NumericTermData | MathTermData | GroupingData;
    faces: NumericTermData | MathTermData | GroupingData;
    die?: DieData | null;
}
declare class InstancePool extends PoolTerm {
    /** Work around upstream bug in which method attempts to construct `Roll`s from display formulas */
    static fromRolls<TTerm extends PoolTerm>(this: ConstructorOf<TTerm>, rolls?: Roll[]): TTerm;
}
interface InstancePool extends PoolTerm {
    rolls: DamageInstance[];
}
export { ArithmeticExpression, Grouping, GroupingData, InstancePool, IntermediateDie };
