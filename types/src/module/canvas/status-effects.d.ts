import { ConditionSlug } from "@item/condition/types.ts";
import type { EncounterPF2e } from "@module/encounter/index.ts";
import { StatusEffectIconTheme } from "@scripts/config/index.ts";
/** Handle interaction with the TokenHUD's status effects menu */
export declare class StatusEffects {
    #private;
    /** Set the theme for condition icons on tokens */
    static initialize(): void;
    /** Update status icons and tokens due to certain potential changes */
    static reset(): void;
    static get conditions(): Record<ConditionSlug, {
        name: string;
        rules: string;
        summary: string;
    }>;
    /**
     * If the system setting statusEffectType is changed, we need to upgrade CONFIG
     * And migrate all statusEffect URLs of all Tokens
     */
    static migrateStatusEffectUrls(chosenSetting: StatusEffectIconTheme): Promise<void>;
    static onRenderTokenHUD(html: HTMLElement, tokenData: TokenHUDData): Promise<void>;
    /** Called by `EncounterPF2e#_onUpdate` */
    static onUpdateEncounter(encounter: EncounterPF2e): void;
    /** Re-render the token HUD */
    static refresh(): void;
}
