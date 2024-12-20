/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { CharacterPF2e } from "@actor";
import type { AttributeString } from "@actor/types.ts";
import type { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";

declare class AttributeBuilder extends Application {
    #private;
    actor: CharacterPF2e;
    constructor(actor: CharacterPF2e);
    static get defaultOptions(): ApplicationOptions;
    get id(): string;
    getData(options?: Partial<FormApplicationOptions>): Promise<AttributeBuilderSheetData>;
    /** Maintain focus on manual entry inputs */
    protected _render(force?: boolean, options?: RenderOptions): Promise<void>;
    /** Remove this application from the actor's apps on close */
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    activateListeners($html: JQuery): void;
}
interface AttributeBuilderSheetData {
    actor: CharacterPF2e;
    attributeModifiers: Record<AttributeString, {
        label: string;
        mod: string;
    }>;
    manualKeyAttribute: AttributeString;
    attributes: Record<AttributeString, string>;
    ancestry: AncestryPF2e<CharacterPF2e> | null;
    background: BackgroundPF2e<CharacterPF2e> | null;
    class: ClassPF2e<CharacterPF2e> | null;
    manual: boolean;
    ancestryBoosts: AncestryBoosts | null;
    voluntaryFlaws: VoluntaryFlaws | null;
    backgroundBoosts: BackgroundBoosts | null;
    keyOptions: AttributeString[] | null;
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
    partial?: boolean;
    second?: Omit<BuilderButton, "second">;
}
interface BoostFlawRow {
    buttons: Record<AttributeString, BoostFlawState>;
    remaining: number;
    isApex?: boolean;
}
interface AncestryBoosts extends BoostFlawRow {
    alternate: boolean;
    labels: string[];
    flawLabels: string[];
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
export { AttributeBuilder, type BoostFlawState };
