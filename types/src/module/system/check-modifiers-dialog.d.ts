/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ModifierPF2e, StatisticModifier } from "../actor/modifiers";
import { CheckRollContext } from "./rolls";
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
    /** Has the promise been resolved? */
    isResolved: boolean;
    constructor(check: StatisticModifier, resolve: (value: boolean) => void, context?: CheckRollContext);
    getData(): {
        appId: string;
        modifiers: ModifierPF2e[];
        totalModifier: number;
        rollModes: Record<RollMode, string>;
        rollMode: RollMode | undefined;
        showRollDialogs: boolean;
        fortune: boolean;
        none: boolean;
        misfortune: boolean;
    };
    activateListeners($html: JQuery): void;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    onAddModifier(event: JQuery.ClickEvent): void;
    onChangeRollMode(event: JQuery.ChangeEvent): void;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
}
