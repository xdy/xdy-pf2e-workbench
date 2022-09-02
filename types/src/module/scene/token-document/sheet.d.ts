/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { TokenDocumentPF2e } from ".";
export declare class TokenConfigPF2e<TDocument extends TokenDocumentPF2e> extends TokenConfig<TDocument> {
    #private;
    get template(): string;
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    /** Hide token-sight settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<TDocument | TDocument["actor"]>;
}
