/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { DegreeOfSuccessIndex } from "@system/degree-of-success.ts";
import { DamageCategoryUnique, DamageDamageContext, DamageFormulaData, DamageType } from "./types.ts";
/**
 * Dialog for excluding certain modifiers before rolling damage.
 * @category Other
 */
declare class DamageModifierDialog extends Application {
    #private;
    formulaData: DamageFormulaData;
    context: DamageDamageContext;
    /** The base damage type of this damage roll */
    baseDamageType: DamageType;
    /** Is this critical damage? */
    degree: DegreeOfSuccessIndex;
    /** Was the roll button pressed? */
    isRolled: boolean;
    constructor(params: DamageDialogParams);
    static get defaultOptions(): ApplicationOptions;
    get title(): string;
    get isCritical(): boolean;
    getData(): Promise<DamageDialogData>;
    activateListeners($html: JQuery): void;
    /** Show the damage roll dialog and wait for it to close */
    resolve(): Promise<boolean>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    /** Overriden to add some additional first-render behavior */
    protected _injectHTML($html: JQuery<HTMLElement>): void;
}
interface DamageDialogParams {
    formulaData: DamageFormulaData;
    context: DamageDamageContext;
}
interface BaseData {
    idx: number;
    label: string;
    enabled: boolean;
    ignored: boolean;
    critical: boolean | null;
    damageType: string | null;
    typeLabel: string | null;
    category: DamageCategoryUnique | string | null;
    icon: string;
}
interface DialogDiceData extends BaseData {
    diceLabel: string;
}
interface ModifierData extends BaseData {
    type: string | null;
    modifier: number;
    hideIfDisabled: boolean;
}
interface DamageDialogData {
    appId: string;
    baseFormula: string;
    modifiers: ModifierData[];
    dice: DialogDiceData[];
    overrides: DialogDiceData[];
    isCritical: boolean;
    damageTypes: typeof CONFIG.PF2E.damageTypes;
    damageSubtypes: Pick<ConfigPF2e["PF2E"]["damageCategories"], DamageCategoryUnique>;
    rollModes: Record<RollMode, string>;
    rollMode: RollMode | "roll" | undefined;
    showDamageDialogs: boolean;
    formula: string;
}
export { DamageModifierDialog };
