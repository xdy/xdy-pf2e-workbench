import { RuleElementPF2e, RuleElementData, RuleElementSource, RuleElementOptions } from "../";
import { ItemPF2e } from "@item";
/** @category RuleElement */
declare abstract class IWRRuleElement extends RuleElementPF2e {
    constructor(data: IWRRuleElementSource, item: Embedded<ItemPF2e>, options?: RuleElementOptions);
    abstract dictionary: Record<string, string | undefined>;
    abstract get property(): unknown[];
    validate(value: unknown): boolean;
    abstract getIWR(value?: unknown): string | object | null;
    beforePrepareData(): void;
}
interface IWRRuleElement extends RuleElementPF2e {
    data: IWRRuleElementData;
}
interface IWRRuleElementSource extends RuleElementSource {
    type?: unknown;
    except?: unknown;
    override?: unknown;
}
export interface IWRRuleElementData extends RuleElementData {
    type: string;
    /** Exceptions to the IWR */
    except?: string;
    /** Whether to override an existing value even if it's higher */
    override: boolean;
}
export { IWRRuleElement };
