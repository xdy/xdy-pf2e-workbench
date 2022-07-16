import { DamageRollContext, DamageTemplate } from ".";
/** Dialog for excluding certain modifiers before rolling for damage. */
export declare class DamageRollModifiersDialog extends Application {
    private static DAMAGE_TYPE_ICONS;
    static roll(damage: DamageTemplate, context: DamageRollContext, callback?: Function): Promise<void>;
    private static getDamageTypeIcon;
}
