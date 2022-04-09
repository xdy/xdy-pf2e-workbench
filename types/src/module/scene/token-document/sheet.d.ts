/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { TokenDocumentPF2e } from ".";
export declare class TokenConfigPF2e<TDocument extends TokenDocumentPF2e = TokenDocumentPF2e> extends TokenConfig<TDocument> {
    get template(): string;
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    /** Show token data in config sheet that is unmodified by `TokenDocumentPF2e` */
    getData(options?: Partial<FormApplicationOptions>): Promise<TokenConfigData<TDocument>>;
    /** Hide token-sight settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
    /** Disable the range input for token scale and style to indicate as much */
    private disableScale;
    /** Reenable range input for token scale and restore normal styling */
    private enableScale;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<TDocument | TDocument["actor"]>;
}
