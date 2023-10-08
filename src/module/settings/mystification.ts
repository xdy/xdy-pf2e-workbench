import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";

export let mystifyRandomPropertyType: string;
export let mystifyModifierKey: string;

export class WorkbenchMystificationSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "mystificationSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            npcMystifyAllPhysicalMagicalItems: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItems.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItems.hint`,
                scope: "world",
                default: "no",
                type: String,
                choices: {
                    no: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItems.no`),
                    onScene: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItems.onScene`),
                    onZeroHp: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItems.onZeroHp`),
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreater.hint`,
                scope: "world",
                default: -1,
                type: Number,
            },
            npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterMultiplier: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterMultiplier.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterMultiplier.hint`,
                scope: "world",
                default: "1.0",
                type: String,
            },
            npcMystifyAllPhysicalMagicalItemsOfThisRarityOrGreater: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisRarityOrGreater.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisRarityOrGreater.hint`,
                scope: "world",
                default: "common",
                type: String,
                choices: {
                    common: game.i18n.localize("PF2E.TraitCommon"),
                    uncommon: game.i18n.localize("PF2E.TraitUncommon"),
                    rare: game.i18n.localize("PF2E.TraitRare"),
                    unique: game.i18n.localize("PF2E.TraitUnique"),
                },
            },
            npcMystifier: {
                name: `${MODULENAME}.SETTINGS.npcMystifier.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifier.hint`,
                scope: "world",
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            npcMystifierDemystifyAllTokensBasedOnTheSameActor: {
                name: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierAddRandomProperty: {
                name: `${MODULENAME}.SETTINGS.npcMystifierAddRandomProperty.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierAddRandomProperty.hint`,
                scope: "world",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomProperty.none`),
                    numberPostfix: game.i18n.localize(
                        `${MODULENAME}.SETTINGS.npcMystifierAddRandomProperty.numberPostfix`,
                    ),
                    wordPrefix: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomProperty.wordPrefix`),
                },
                default: "none",
                onChange: (key) => {
                    mystifyRandomPropertyType = <string>key;
                },
            },
            npcMystifierRandomWordPrefixRollTable: {
                name: `${MODULENAME}.SETTINGS.npcMystifierWordPrefix.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierWordPrefix.hint`,
                scope: "world",
                default: "",
                type: String,
            },
            npcMystifierKeepRandomProperty: {
                name: `${MODULENAME}.SETTINGS.npcMystifierKeepRandomProperty.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierKeepRandomProperty.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierRandomPropertySkipForUnique: {
                name: `${MODULENAME}.SETTINGS.npcMystifierRandomPropertySkipForUnique.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierRandomPropertySkipForUnique.hint`,
                scope: "world",
                default: true,
                type: Boolean,
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
                default: "Workbench Adjectives",
            },
            npcMystifierUseSize: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseSize.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseSize.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierUseRarities: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseRarities.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseRarities.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierUseRaritiesReplacement: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseRaritiesReplacement.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseRaritiesReplacement.hint`,
                scope: "world",
                default: "",
                type: String,
            },
            npcMystifierUseEliteWeak: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseEliteWeak.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseEliteWeak.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierUseCreatureTypesTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseCreatureTypesTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseCreatureTypesTraits.hint`,
                scope: "world",
                default: true,
                type: Boolean,
            },
            npcMystifierUseCreatureTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseCreatureTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseCreatureTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierUseAlignmentTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseAlignmentTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseAlignmentTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierUseOtherTraits: {
                name: `${MODULENAME}.SETTINGS.npcMystifierUseOtherTraits.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierUseOtherTraits.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            npcMystifierBlacklist: {
                name: `${MODULENAME}.SETTINGS.npcMystifierBlacklist.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierBlacklist.hint`,
                scope: "world",
                default: "",
                type: String,
            },
            npcMystifierNoMatch: {
                name: `${MODULENAME}.SETTINGS.npcMystifierNoMatch.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierNoMatch.hint`,
                scope: "world",
                default: "...",
                type: String,
                onChange: async (choice) => {
                    if (choice?.length === 0) {
                        // Sleep a bit, then set to a sane value...
                        await new Promise((resolve) => setTimeout(resolve, 250));
                        game.settings.set(MODULENAME, "npcMystifierNoMatch", "...");
                    }
                },
            },
            npcMystifierModifierKey: {
                name: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.hint`,
                scope: "world",
                type: String,
                choices: {
                    ALWAYS: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierModifierKey.always`),
                    DISABLED: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierModifierKey.disabled`),
                    ALT: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierModifierKey.alt`),
                    CONTROL: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierModifierKey.control`),
                    META: game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierModifierKey.meta`),
                },
                default: "CONTROL",
                onChange: (key) => {
                    mystifyModifierKey = <string>key;
                },
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
        mystifyModifierKey = String(game.settings.get(MODULENAME, "npcMystifierModifierKey"));
        mystifyRandomPropertyType = String(game.settings.get(MODULENAME, "npcMystifierAddRandomProperty"));
    }
}
