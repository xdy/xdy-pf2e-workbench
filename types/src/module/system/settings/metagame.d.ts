import { SettingsMenuPF2e } from "./menu.ts";
declare const MetagameSettingsConfig: {
    showDC: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
    showResults: {
        prefix: string;
        name: string;
        hint: string;
        default: true;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
    showBreakdowns: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
    secretDamage: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
    };
    secretCondition: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
    };
    partyVision: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
    showPartyStats: {
        prefix: string;
        name: string;
        hint: string;
        default: true;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
    tokenSetsNameVisibility: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
        onChange: (value: unknown) => Promise<void>;
    };
    secretChecks: {
        prefix: string;
        name: string;
        hint: string;
        default: false;
        type: BooleanConstructor;
        onChange: (value: unknown) => void;
    };
};
declare class MetagameSettings extends SettingsMenuPF2e {
    static namespace: string;
    static get settings(): typeof MetagameSettingsConfig;
    static get SETTINGS(): string[];
}
export { MetagameSettings };
