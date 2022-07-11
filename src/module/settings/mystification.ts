import { MODULENAME } from "../xdy-pf2e-workbench";
import { debouncedReload } from "./index";
import { SettingsMenuPF2eWorkbench } from "./menu";

export let mystifyModifierKey: string;

export class WorkbenchMystificationSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "mystificationSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            npcMystifier: {
                name: `${MODULENAME}.SETTINGS.npcMystifier.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifier.hint`,
                scope: "world",
                default: true,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            npcMystifierMethod: {
                name: `${MODULENAME}.SETTINGS.npcMystifierMethod.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierMethod.hint`,
                scope: "world",
                default: "traits",
                type: String,
                choices: {
                    traits: `${MODULENAME}.SETTINGS.npcMystifierMethod.traits`,
                },
            },
            npcMystifierPrefix: {
                name: `${MODULENAME}.SETTINGS.npcMystifierPrefix.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierPrefix.hint`,
                scope: "world",
                type: String,
                default: "",
            },
            npcMystifierPostfix: {
                name: `${MODULENAME}.SETTINGS.npcMystifierPostfix.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierPostfix.hint`,
                scope: "world",
                type: String,
                default: "",
            },
            npcMystifierDemystifyAllTokensBasedOnTheSameActor: {
                name: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierModifierKey: {
                name: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.hint`,
                scope: "world",
                type: String,
                choices: {
                    ALWAYS: "Always",
                    DISABLED: "Disabled",
                    ALT: "Alt",
                    CONTROL: "Ctrl",
                },
                default: "CONTROL",
                onChange: (key) => {
                    mystifyModifierKey = <string>key;
                },
            },
            npcMystifierAddRandomNumber: {
                name: `${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierSkipRandomNumberForUnique: {
                name: `${MODULENAME}.SETTINGS.npcMystifierSkipRandomNumberForUnique.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierSkipRandomNumberForUnique.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierKeepNumberAtEndOfName: {
                name: `${MODULENAME}.SETTINGS.npcMystifierKeepNumberAtEndOfName.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierKeepNumberAtEndOfName.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierUseSize: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseSize.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseSize.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierFilterRarities: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterRarities.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterRarities.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierFilterRaritiesReplacement: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterRaritiesReplacement.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterRaritiesReplacement.hint`,
                scope: "world",
                default: "",
                type: String,
            },
            npcMystifierFilterEliteWeak: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterEliteWeak.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterEliteWeak.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierFilterCreatureTypesTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureTypesTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureTypesTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierFilterCreatureFamilyTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureFamilyTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureFamilyTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierFilterAlignmentTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterAlignmentTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterAlignmentTraits.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierFilterOtherTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterOtherTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterOtherTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierFilterBlacklist: {
                name: `${MODULENAME}.SETTINGS.npcMystifierFilterBlacklist.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierFilterBlacklist.hint`,
                scope: "world",
                default: "",
                type: String,
            },
            npcMystifierUseMystifiedNameInChat: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
        };
    }

    static override registerSettings(): void {
        super.registerSettings();
        mystifyModifierKey = <string>game.settings.get(MODULENAME, "npcMystifierModifierKey");
    }
}
