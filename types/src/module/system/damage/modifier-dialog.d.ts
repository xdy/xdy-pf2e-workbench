/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { DamageDicePF2e, ModifierPF2e } from "@actor/modifiers.ts";
import { BaseDamageData, DamageCategoryUnique, CreateDamageFormulaParams, DamageRollContext, DamageType } from "./types.ts";
/**
 * Dialog for excluding certain modifiers before rolling damage.
 * @category Other
 */
declare class DamageModifierDialog extends Application {
    #private;
    base: BaseDamageData[];
    /** The modifiers which are being edited. */
    modifiers: ModifierPF2e[];
    /** The damage dice that are being edited. */
    dice: DamageDicePF2e[];
    /** The base damage type of this damage roll */
    baseDamageType: DamageType;
    /** Relevant context for this roll, like roll options. */
    context: Partial<DamageRollContext>;
    /** Is this critical damage? */
    isCritical: boolean;
    /** Was the roll button pressed? */
    isRolled: boolean;
    constructor(params: DamageDialogParams);
    static get defaultOptions(): ApplicationOptions;
    get title(): string;
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
    damage: CreateDamageFormulaParams;
    context: Partial<DamageRollContext>;
}
interface BaseData {
    label: string;
    enabled: boolean;
    ignored: boolean;
    critical: boolean | null;
    damageType: string | null;
    typeLabel: string | null;
    category: DamageCategoryUnique | string | null;
    categoryIcon: string | null;
    show: boolean;
    icon: string | null;
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
    modifiers: ModifierData[];
    dice: DialogDiceData[];
    isCritical: boolean;
    hasVisibleDice: boolean;
    hasVisibleModifiers: boolean;
    damageTypes: typeof CONFIG.PF2E.damageTypes;
    damageSubtypes: Pick<ConfigPF2e["PF2E"]["damageCategories"], DamageCategoryUnique>;
    rollModes: Record<RollMode, string>;
    rollMode: RollMode | "roll" | undefined;
    formula: string;
}
export { DamageModifierDialog };
