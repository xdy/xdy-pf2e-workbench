import { DamageInstance } from "./roll";
declare class ArithmeticExpression extends RollTerm<ArithmeticExpressionData> {
    operator: ArithmeticOperator;
    operands: RollTerm[];
    constructor(termData: ArithmeticExpressionData);
    static SERIALIZE_ATTRIBUTES: string[];
    static totalOf(operator: ArithmeticOperator, left: number, right: number): number;
    get dice(): DiceTerm[];
    get expression(): string;
    get total(): number | undefined;
    get isDeterministic(): boolean;
    get expectedValue(): number;
    /** Construct a string for an HTML rendering of this term */
    render(): DocumentFragment;
    protected _evaluate(options?: {
        minimize?: boolean;
        maximize?: boolean;
    }): Promise<Evaluated<this>>;
    protected _evaluateSync(): never;
}
type ArithmeticOperator = "+" | "-" | "*" | "/" | "%";
/** A parenthetically-exclosed expression as a single arithmetic term or number */
declare class Grouping extends RollTerm<GroupingData> {
    term: RollTerm;
    constructor(termData: GroupingData);
    static SERIALIZE_ATTRIBUTES: string[];
    get dice(): DiceTerm[];
    get expression(): string;
    get total(): number | undefined;
    get isDeterministic(): boolean;
    get expectedValue(): number;
    protected _evaluate(options?: {
        minimize?: boolean;
        maximize?: boolean;
    }): Promise<Evaluated<this>>;
    protected _evaluateSync(): never;
}
declare class InstancePool extends PoolTerm {
    /** Work around upstream bug in which method attempts to construct `Roll`s from display formulas */
    static fromRolls<TTerm extends PoolTerm>(this: ConstructorOf<TTerm>, rolls?: Roll[]): TTerm;
}
interface InstancePool extends PoolTerm {
    rolls: DamageInstance[];
}
interface ArithmeticExpressionData extends RollTermData {
    operator: ArithmeticOperator;
    operands: [RollTermData, RollTermData];
}
interface GroupingData extends RollTermData {
    term: RollTermData;
}
export { ArithmeticExpression, Grouping, InstancePool };
