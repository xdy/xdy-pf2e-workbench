/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { StatusEffectIconTheme } from "@scripts/config";
import { ActorPF2e } from "@actor/base";
import { TokenPF2e } from "@module/canvas/token";
/** Handle interaction with the TokenHUD */
export declare class StatusEffects {
    /** Set the theme for condition icons on tokens */
    static setIconTheme(): void;
    /** Link status effect icons to conditions */
    static init(): void;
    static get conditions(): {
        group: {
            detection: string;
            attitudes: string;
            senses: string;
            death: string;
        };
        blinded: {
            name: string;
            rules: string;
            summary: string;
        };
        broken: {
            name: string;
            rules: string;
            summary: string;
        };
        clumsy: {
            name: string;
            rules: string;
            summary: string;
        };
        concealed: {
            name: string;
            rules: string;
            summary: string;
        };
        confused: {
            name: string;
            rules: string;
            summary: string;
        };
        controlled: {
            name: string;
            rules: string;
            summary: string;
        };
        dazzled: {
            name: string;
            rules: string;
            summary: string;
        };
        deafened: {
            name: string;
            rules: string;
            summary: string;
        };
        doomed: {
            name: string;
            rules: string;
            summary: string;
        };
        drained: {
            name: string;
            rules: string;
            summary: string;
        };
        dying: {
            name: string;
            rules: string;
            summary: string;
        };
        encumbered: {
            name: string;
            rules: string;
            summary: string;
        };
        enfeebled: {
            name: string;
            rules: string;
            summary: string;
        };
        fascinated: {
            name: string;
            rules: string;
            summary: string;
        };
        fatigued: {
            name: string;
            rules: string;
            summary: string;
        };
        "flat-footed": {
            name: string;
            rules: string;
            summary: string;
        };
        fleeing: {
            name: string;
            rules: string;
            summary: string;
        };
        friendly: {
            name: string;
            rules: string;
            summary: string;
        };
        frightened: {
            name: string;
            rules: string;
            summary: string;
        };
        grabbed: {
            name: string;
            rules: string;
            summary: string;
        };
        helpful: {
            name: string;
            rules: string;
            summary: string;
        };
        hidden: {
            name: string;
            rules: string;
            summary: string;
        };
        hostile: {
            name: string;
            rules: string;
            summary: string;
        };
        immobilized: {
            name: string;
            rules: string;
            summary: string;
        };
        indifferent: {
            name: string;
            rules: string;
            summary: string;
        };
        invisible: {
            name: string;
            rules: string;
            summary: string;
        };
        observed: {
            name: string;
            rules: string;
            summary: string;
        };
        paralyzed: {
            name: string;
            rules: string;
            summary: string;
        };
        "persistent-damage": {
            name: string;
            rules: string;
            summary: string;
        };
        petrified: {
            name: string;
            rules: string;
            summary: string;
        };
        prone: {
            name: string;
            rules: string;
            summary: string;
        };
        quickened: {
            name: string;
            rules: string;
            summary: string;
        };
        restrained: {
            name: string;
            rules: string;
            summary: string;
        };
        sickened: {
            name: string;
            rules: string;
            summary: string;
        };
        slowed: {
            name: string;
            rules: string;
            summary: string;
        };
        stunned: {
            name: string;
            rules: string;
            summary: string;
        };
        stupefied: {
            name: string;
            rules: string;
            summary: string;
        };
        unconscious: {
            name: string;
            rules: string;
            summary: string;
        };
        undetected: {
            name: string;
            rules: string;
            summary: string;
        };
        unfriendly: {
            name: string;
            rules: string;
            summary: string;
        };
        unnoticed: {
            name: string;
            rules: string;
            summary: string;
        };
        wounded: {
            name: string;
            rules: string;
            summary: string;
        };
    };
    static get SETTINGOPTIONS(): {
        iconTypes: {
            default: {
                effectsIconFolder: string;
                effectsIconFileType: string;
            };
            blackWhite: {
                effectsIconFolder: string;
                effectsIconFileType: string;
            };
            legacy: {
                effectsIconFolder: string;
                effectsIconFileType: string;
            };
        };
    };
    /** Hook PF2e's status effects into FoundryVTT */
    static hookIntoFoundry(): void;
    static setPF2eStatusEffectControls(html: JQuery, token: TokenPF2e): void;
    /** Updates the core CONFIG.statusEffects with the new icons */
    private static updateStatusIcons;
    private static hookOnRenderTokenHUD;
    static updateHUD(html: JQuery, actor: ActorPF2e): Promise<void>;
    /** Show the Status Effect name and summary on mouseover of the token HUD */
    private static showStatusLabel;
    /**
     * A click event handler to increment or decrement valued conditions.
     * @param event    The window click event
     */
    private static setStatusValue;
    private static toggleStatus;
    /** Recreating TokenHUD._onToggleOverlay. Handle assigning a status effect icon as the overlay effect */
    private static onToggleOverlay;
    /** Creates a ChatMessage with the Actors current status effects. */
    static _createChatMessage(token: TokenPF2e, whisper?: boolean): void;
    /**
     * If the system setting statusEffectType is changed, we need to upgrade CONFIG
     * And migrate all statusEffect URLs of all Tokens
     */
    static migrateStatusEffectUrls(chosenSetting: StatusEffectIconTheme): Promise<void>;
    /** Helper to get status effect name from image url */
    static getSlugFromImg(url: string): string;
}
