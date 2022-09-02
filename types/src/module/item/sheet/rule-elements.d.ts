import { RuleElementSource } from "@module/rules";
declare class RuleElementForm<TSource extends RuleElementSource = RuleElementSource> {
    protected index: number;
    protected rule: TSource;
    template: string;
    constructor(index: number, rule: TSource);
    getData(): Promise<object>;
    render(): Promise<string>;
    activateListeners(_html: HTMLElement): void;
    _updateObject(_formData: Partial<Record<string, unknown>>): void;
}
declare const RULE_ELEMENT_FORMS: Partial<Record<string, ConstructorOf<RuleElementForm>>>;
export { RuleElementForm, RULE_ELEMENT_FORMS };
