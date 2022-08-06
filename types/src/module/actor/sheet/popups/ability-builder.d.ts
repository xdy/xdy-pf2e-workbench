/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CharacterPF2e } from "@actor";
import { Abilities } from "@actor/creature/data";
import { AbilityString } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
export declare class AbilityBuilderPopup extends Application {
    private actor;
    constructor(actor: CharacterPF2e);
    static get defaultOptions(): ApplicationOptions;
    get id(): string;
    getData(options?: Partial<FormApplicationOptions>): Promise<PopupData>;
    private calculateAncestryBoosts;
    private calculateBackgroundBoosts;
    private calculatedLeveledBoosts;
    private calculateBoostLabels;
    /** Remove this application from the actor's apps on close */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
}
interface PopupData {
    actor: CharacterPF2e;
    abilityScores: Abilities;
    manualKeyAbility: AbilityString;
    abilities: Record<AbilityString, string>;
    ancestry: Embedded<AncestryPF2e> | null;
    background: Embedded<BackgroundPF2e> | null;
    class: Embedded<ClassPF2e> | null;
    manual: boolean;
    ancestryBoosts: AncestryBoosts | null;
    backgroundBoosts: BackgroundBoosts | null;
    keyOptions: AbilityString[] | null;
    levelBoosts: Record<number, LevelBoostData>;
    voluntaryFlaw: boolean;
}
interface BoostFlawState {
    lockedFlaw: boolean;
    lockedBoost: boolean;
    boosted: boolean;
    available: boolean;
    voluntaryFlaws: number;
    canVoluntaryFlaw: boolean;
    canVoluntaryFlawAgain: boolean;
    voluntaryBoost: boolean;
    canVoluntaryBoost: boolean;
}
declare type BoostFlawRow = Record<AbilityString, BoostFlawState>;
interface AncestryBoosts {
    boosts: BoostFlawRow;
    remaining: number;
    voluntaryBoostsRemaining: number;
    labels: string[];
    flawLabels: string[];
}
interface BackgroundBoosts {
    boosts: BoostFlawRow;
    remaining: number;
    labels: string[];
    tooltip: string | null;
}
interface LevelBoostData {
    boosts: {
        ability: string;
        taken: boolean;
    }[];
    full: boolean;
    eligible: boolean;
    remaining: number;
}
export {};
