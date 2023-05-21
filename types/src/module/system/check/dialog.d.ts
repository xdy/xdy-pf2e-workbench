/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ModifierPF2e, StatisticModifier } from "@actor/modifiers.ts";
import { RollSubstitution } from "@module/rules/synthetics.ts";
import { CheckRollContext } from "./types.ts";
/**
 * Dialog for excluding certain modifiers before rolling a check.
 * @category Other
 */
export declare class CheckModifiersDialog extends Application {
    /** The check which is being edited. */
    check: StatisticModifier;
    /** Relevant context for this roll, like roll options. */
    context: CheckRollContext;
    /** A Promise resolve method */
    resolve: (value: boolean) => void;
    /** Pre-determined D20 roll results */
    substitutions: RollSubstitution[];
    /** Has the promise been resolved? */
    isResolved: boolean;
    constructor(check: StatisticModifier, resolve: (value: boolean) => void, context?: CheckRollContext);
    static get defaultOptions(): ApplicationOptions;
    getData(): Promise<CheckDialogData>;
    activateListeners($html: JQuery): void;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    /** Overriden to add some additional first-render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface CheckDialogData {
    appId: string;
    modifiers: readonly ModifierPF2e[];
    totalModifier: number;
    rollModes: Record<RollMode, string>;
    rollMode: RollMode | "roll" | undefined;
    showRollDialogs: boolean;
    substitutions: RollSubstitution[];
    fortune: boolean;
    none: boolean;
    misfortune: boolean;
}
export {};
