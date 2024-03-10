/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { BoostFlawState } from "@actor/character/attribute-builder.ts";
import { PartyPF2e } from "../document.ts";
import { Kingdom } from "./model.ts";
import { KingdomAbility, KingdomCHG } from "./types.ts";
import { KingdomCHGData } from "./values.ts";
declare const KINGDOM_BUILD_CATEGORIES: readonly ["charter", "heartland", "government"];
type KingdomBuildCategory = (typeof KINGDOM_BUILD_CATEGORIES)[number];
type CurrentSelections = Record<KingdomBuildCategory, string | null>;
/** Dialog used to create and edit the charter, heartland, government, and ability scores  */
declare class KingdomBuilder extends FormApplication<Kingdom> {
    #private;
    selected: CurrentSelections;
    static get defaultOptions(): FormApplicationOptions;
    static showToPlayers(options: {
        uuid: string;
        tab?: string;
    }): void;
    constructor(kingdom: Kingdom);
    get id(): string;
    get kingdom(): Kingdom;
    get actor(): PartyPF2e;
    get isEditable(): boolean;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    getData(): Promise<KingdomBuilderSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<unknown>;
    protected _render(force?: boolean, options?: KingdomBuilderRenderOptions): Promise<void>;
}
interface KingdomBuilder extends FormApplication<Kingdom> {
    render(force?: boolean, options?: KingdomBuilderRenderOptions): this;
}
interface KingdomBuilderRenderOptions extends RenderOptions {
    tab?: string | null;
}
interface KingdomBuilderSheetData {
    options: {
        editable: boolean;
    };
    kingdom: Kingdom;
    database: KingdomCHGData;
    categories: Record<KingdomBuildCategory, CategorySheetData>;
    abilityLabels: Record<string, string>;
    skillLabels: Record<string, string>;
    build: KingdomAbilityBuilderData;
    finished: boolean;
}
interface CategorySheetData {
    /** The active build entry slug (the one that's been saved) */
    active: string | null;
    /** Selected refers to the one the user is viewing. Can be null for custom ones */
    selected: string | null;
    /** The build entry currently being viewed (aka selected) */
    buildEntry?: KingdomCHG;
    /** The feat item the selected build entry will grant */
    featLink: string | null;
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
