/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { CharacterPF2e } from "@actor";
import { Abilities } from "@actor/creature/data";
import { AbilityString } from "@actor/types";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
export declare class AbilityBuilderPopup extends Application {
    #private;
    private actor;
    constructor(actor: CharacterPF2e);
    static get defaultOptions(): ApplicationOptions;
    get id(): string;
    getData(options?: Partial<FormApplicationOptions>): Promise<AbilityBuilderSheetData>;
    private calculateAncestryBoosts;
    private calculateBackgroundBoosts;
    private calculatedLeveledBoosts;
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
    ancestry: Embedded<AncestryPF2e> | null;
    background: Embedded<BackgroundPF2e> | null;
    class: Embedded<ClassPF2e> | null;
    manual: boolean;
    ancestryBoosts: AncestryBoosts | null;
    backgroundBoosts: BackgroundBoosts | null;
    keyOptions: AbilityString[] | null;
    levelBoosts: Record<number, LevelBoostData>;
    alternateAncestryBoosts: boolean;
    legacyFlaws: boolean;
}
interface BoostFlawState {
    lockedFlaw: boolean;
    lockedBoost: boolean;
    boosted: boolean;
    available: boolean;
    voluntary: {
        /** How many times this flaw was applied. Some ancestries allow multiple legacy flaws on the same stat */
        selected: number;
        disabled: boolean;
        /** Abilities with a locked boost can allow for 2 flaws with legacy flaws */
        canDoubleFlaw: boolean;
        secondFlawDisabled: boolean;
        boosted: boolean;
        boostDisabled: boolean;
    };
}
type BoostFlawRow = Record<AbilityString, BoostFlawState>;
interface AncestryBoosts {
    /** Whether or not the ancestry itself creates flaws */
    hasLockedFlaws: boolean;
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
