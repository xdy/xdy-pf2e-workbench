import { MODULENAME } from "../xdy-pf2e-workbench";
import { debouncedReload } from "./index";
import { SettingsMenuPF2eWorkbench } from "./menu";

export class WorkbenchQolWorldSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "qolWorldSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            creatureBuilder: {
                name: `${MODULENAME}.SETTINGS.creatureBuilder.name`,
                hint: `${MODULENAME}.SETTINGS.creatureBuilder.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            npcScaler: {
                name: `${MODULENAME}.SETTINGS.npcScaler.name`,
                hint: `${MODULENAME}.SETTINGS.npcScaler.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            npcRoller: {
                name: `${MODULENAME}.SETTINGS.npcRoller.name`,
                hint: `${MODULENAME}.SETTINGS.npcRoller.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            quickQuantities: {
                name: `${MODULENAME}.SETTINGS.quickQuantities.name`,
                hint: `${MODULENAME}.SETTINGS.quickQuantities.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            playerItemsRarityColour: {
                name: `${MODULENAME}.SETTINGS.playerItemsRarityColour.name`,
                hint: `${MODULENAME}.SETTINGS.playerItemsRarityColour.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            castPrivateSpell: {
                name: `${MODULENAME}.SETTINGS.castPrivateSpell.name`,
                hint: `${MODULENAME}.SETTINGS.castPrivateSpell.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            castPrivateSpellAlwaysForNPC: {
                name: `${MODULENAME}.SETTINGS.castPrivateSpellAlwaysForNPC.name`,
                hint: `${MODULENAME}.SETTINGS.castPrivateSpellAlwaysForNPC.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            castPrivateSpellWithPublicMessage: {
                name: `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.name`,
                hint: `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            castPrivateSpellWithPublicMessageShowTraits: {
                name: `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.name`,
                hint: `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            addGmRKButtonToNpc: {
                name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.name`,
                hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            addGmRKButtonToNpcHideNpcName: {
                name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideNpcName`,
                hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideNpcName`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
            addGmRKButtonToNpcHideSkill: {
                name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideSkill`,
                hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideSkill`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => debouncedReload(),
            },
        };
    }
}
