/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { CharacterPF2e } from "@actor";
import { Abilities } from "@actor/creature/data.ts";
import { AbilityString } from "@actor/types.ts";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
declare class AbilityBuilderPopup extends Application {
    #private;
    private actor;
    constructor(actor: CharacterPF2e);
    static get defaultOptions(): ApplicationOptions;
    get id(): string;
    getData(options?: Partial<FormApplicationOptions>): Promise<AbilityBuilderSheetData>;
    /** Remove this application from the actor's apps on close */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
}
interface AbilityBuilderSheetData {
    actor: CharacterPF2e;
    abilityScores: Abilities;
    manualKeyAbility: AbilityString;
    abilities: Record<AbilityString, string>;
    ancestry: AncestryPF2e<CharacterPF2e> | null;
    background: BackgroundPF2e<CharacterPF2e> | null;
    class: ClassPF2e<CharacterPF2e> | null;
    manual: boolean;
    ancestryBoosts: AncestryBoosts | null;
    voluntaryFlaws: VoluntaryFlaws | null;
    backgroundBoosts: BackgroundBoosts | null;
    keyOptions: AbilityString[] | null;
    levelBoosts: LevelBoostData[];
    legacyFlaws: boolean;
}
interface BoostFlawState {
    ability: string;
    flaw?: BuilderButton;
    boost?: BuilderButton;
}
interface BuilderButton {
    selected?: boolean;
    locked?: boolean;
    disabled?: boolean;
    second?: Omit<BuilderButton, "second">;
}
interface BoostFlawRow {
    buttons: Record<AbilityString, BoostFlawState>;
    remaining: number;
}
interface AncestryBoosts extends BoostFlawRow {
    alternate: boolean;
    labels: string[];
}
interface VoluntaryFlaws extends BoostFlawRow {
    voluntaryBoostsRemaining: number;
    labels: string[];
}
interface BackgroundBoosts extends BoostFlawRow {
    labels: string[];
    tooltip: string | null;
}
interface LevelBoostData extends BoostFlawRow {
    level: number;
    eligible: boolean;
    minLevel: number;
}
export { AbilityBuilderPopup, BoostFlawState };
