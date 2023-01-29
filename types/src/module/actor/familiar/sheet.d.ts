/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CreatureSheetPF2e } from "@actor/creature/sheet";
import { FamiliarPF2e } from "@actor/familiar";
import { FamiliarSheetData } from "./types";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e extends CreatureSheetPF2e<FamiliarPF2e> {
    /** There is currently no actor config for familiars */
    protected readonly actorConfigClass: null;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<FamiliarSheetData>;
    activateListeners($html: JQuery): void;
}
