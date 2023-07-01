/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { PartyPF2e } from "../document.ts";
import { getKingdomABCData } from "./values.ts";
import { KingdomAbility, KingdomCHG } from "./data.ts";
import { Kingdom } from "./model.ts";
import { BoostFlawState } from "@actor/sheet/popups/ability-builder.ts";
declare const KINGDOM_BUILD_CATEGORIES: readonly ["charter", "heartland", "government"];
type KingdomBuildCategory = (typeof KINGDOM_BUILD_CATEGORIES)[number];
type CurrentSelections = Record<KingdomBuildCategory, string | null>;
/** Dialog used to create and edit the charter, heartland, government, and ability scores  */
declare class KingdomBuilder extends FormApplication<Kingdom> {
    #private;
    selected: CurrentSelections;
    static get defaultOptions(): FormApplicationOptions;
    constructor(kingdom: Kingdom);
    get id(): string;
    get kingdom(): Kingdom;
    get actor(): PartyPF2e;
    get isEditable(): boolean;
    getData(): Promise<KingdomBuilderSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<unknown>;
}
interface KingdomBuilderSheetData {
    options: {
        editable: boolean;
    };
    kingdom: Kingdom;
    database: ReturnType<typeof getKingdomABCData>;
    categories: Record<KingdomBuildCategory, CategorySheetData>;
    abilities: Record<string, string>;
    build: KingdomAbilityBuilderData;
    finished: boolean;
}
interface CategorySheetData {
    /** Selected refers to the one the user is viewing. Can be null for custom ones */
    selected: string | null;
    active?: KingdomCHG;
    stale: boolean;
}
interface KingdomAbilityBuilderData {
    charter: KingdomBoostFlawRow | null;
    heartland: KingdomBoostFlawRow | null;
    government: KingdomBoostFlawRow | null;
    levelBoosts: Record<number, KingdomLevelRow>;
}
interface KingdomBoostFlawRow {
    buttons: Record<KingdomAbility, BoostFlawState>;
    remaining: number;
}
interface KingdomLevelRow extends KingdomBoostFlawRow {
    eligible: boolean;
}
export { KingdomBuilder };
