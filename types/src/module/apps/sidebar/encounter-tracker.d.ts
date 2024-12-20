/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import type { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.ts";
import type { TokenDocumentPF2e } from "@scene/index.ts";

export declare class EncounterTrackerPF2e<TEncounter extends EncounterPF2e | null> extends CombatTracker<TEncounter> {
    #private;
    /** Show encounter analysis data if obtainable */
    protected _renderInner(data: object, options: RenderOptions): Promise<JQuery>;
    /** Make the combatants sortable */
    activateListeners($html: JQuery): void;
    /** Refresh the list of users targeting a combatant's token as well as the active state of the target toggle */
    refreshTargetDisplay(combatantOrToken: CombatantPF2e | TokenDocumentPF2e, trackers?: HTMLElement[]): void;
    /** Allow CTRL-clicking to make the rolls blind */
    protected _onCombatControl(event: JQuery.ClickEvent<HTMLElement, HTMLElement, HTMLElement>): Promise<void>;
    /** Allow CTRL-clicking to make the roll blind */
    protected _onCombatantControl(event: JQuery.ClickEvent<HTMLElement, HTMLElement, HTMLElement>): Promise<void>;
    /** Replace parent method with system-specific procedure */
    protected _onToggleDefeatedStatus(combatant: CombatantPF2e<TEncounter>): Promise<void>;
}
