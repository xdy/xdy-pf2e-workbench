/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { TokenDocumentPF2e } from "./index.ts";
declare class TokenConfigPF2e<TDocument extends TokenDocumentPF2e> extends TokenConfig<TDocument> {
    #private;
    static get defaultOptions(): DocumentSheetOptions;
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    get rulesBasedVision(): boolean;
    getData(options?: DocumentSheetOptions): Promise<TokenConfigDataPF2e<TDocument>>;
    protected _getFilePickerOptions(event: PointerEvent): FilePickerOptions;
    /** Hide token-sight settings when rules-based vision is enabled */
    activateListeners($html: JQuery): void;
    /** Readd scale property to form data if input is disabled: necessary for mirroring checkboxes to function */
    protected _getSubmitData(updateData?: Record<string, unknown> | null): Record<string, unknown>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface TokenConfigDataPF2e<TDocument extends TokenDocumentPF2e> extends TokenConfigData<TDocument> {
    /** Whether the token can be linked to its actor's size */
    sizeLinkable: boolean;
    linkToSizeTitle: string;
    autoscaleTitle: string;
}
export { TokenConfigPF2e };
