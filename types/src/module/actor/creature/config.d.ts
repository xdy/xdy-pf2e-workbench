import { SheetOptions } from "@module/sheet/helpers.ts";
import type { CreaturePF2e } from "./document.ts";
/** A DocumentSheet presenting additional, per-actor settings */
declare abstract class CreatureConfig<TActor extends CreaturePF2e> extends DocumentSheet<TActor> {
    get title(): string;
    get template(): string;
    get actor(): TActor;
    static get defaultOptions(): DocumentSheetOptions;
    getData(options?: Partial<DocumentSheetOptions>): Promise<CreatureConfigData<TActor>>;
    /** Remove stored property if it's set to default; otherwise, update */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface CreatureConfigData<TActor extends CreaturePF2e> extends DocumentSheetData<TActor> {
    alliances: SheetOptions;
}
export { CreatureConfig, type CreatureConfigData };
