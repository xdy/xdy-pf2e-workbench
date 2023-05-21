/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { PhysicalItemPF2e } from "@item";
declare class SelectItemDialog extends Application {
    #private;
    private constructor();
    static get defaultOptions(): ApplicationOptions;
    get template(): string;
    get title(): string;
    getData(options?: Partial<ApplicationOptions>): Promise<{
        item: PhysicalItemPF2e | null;
    }>;
    activateListeners($html: JQuery): void;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    static getItem(action: ItemAction): Promise<PhysicalItemPF2e | null>;
}
type ItemAction = "craft" | "repair";
export { SelectItemDialog };
