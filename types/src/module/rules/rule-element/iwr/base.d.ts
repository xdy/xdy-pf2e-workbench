import { RuleElementPF2e, RuleElementSource, RuleElementOptions } from "../";
import { ItemPF2e } from "@item";
import { ImmunityData, ResistanceData, WeaknessData } from "@actor/data/iwr";
/** @category RuleElement */
declare abstract class IWRRuleElement extends RuleElementPF2e {
    type: string[];
    exceptions: string[];
    /** Whether to override an existing value even if it's higher */
    override: boolean;
    constructor(data: IWRRuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    protected abstract dictionary: Record<string, string | undefined>;
    abstract get property(): unknown[];
    validate(value: unknown): boolean;
    abstract getIWR(value?: number): ImmunityData[] | WeaknessData[] | ResistanceData[];
    beforePrepareData(): void;
}
interface IWRRuleElementSource extends RuleElementSource {
    type?: unknown;
    exceptions?: unknown;
    override?: unknown;
}
export { IWRRuleElement, IWRRuleElementSource };
