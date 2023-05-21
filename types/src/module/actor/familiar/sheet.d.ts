/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "@actor/creature/sheet.ts";
import { FamiliarPF2e } from "@actor/familiar/index.ts";
import { FamiliarSheetData } from "./types.ts";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e<TActor extends FamiliarPF2e> extends CreatureSheetPF2e<TActor> {
    /** There is currently no actor config for familiars */
    protected readonly actorConfigClass: null;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<FamiliarSheetData<TActor>>;
    activateListeners($html: JQuery): void;
}
