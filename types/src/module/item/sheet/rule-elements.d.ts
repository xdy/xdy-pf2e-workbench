declare class RuleElementForm {
    static template: string;
    activateListeners(_html: HTMLElement): void;
    _updateObject(_formData: Partial<Record<string, unknown>>): void;
}
declare const RULE_ELEMENT_FORMS: Partial<Record<string, typeof RuleElementForm & {
    new (): RuleElementForm;
}>>;
export { RuleElementForm, RULE_ELEMENT_FORMS };
