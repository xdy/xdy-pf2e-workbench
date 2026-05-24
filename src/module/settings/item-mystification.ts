import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";

export class WorkbenchItemMystificationSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "itemMystificationSettings";

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
        };
    }
}
