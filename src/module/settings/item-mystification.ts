import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";
import { SettingsMenuPF2eWorkbench } from "./menu.js";
import { capitalize, MAX_ABSOLUTE_LEVEL, NOT_MYSTIFIED_VALUE } from "../utils.js";
import { SettingRegistration } from "foundry/client/helpers/client-settings.mts";

function buildPlThresholdChoices(): Record<string, string> {
    return {
        [NOT_MYSTIFIED_VALUE]: game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.notMystified`),
        "4": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.plus4`),
        "3": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.plus3`),
        "2": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.plus2`),
        "1": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.plus1`),
        "0": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.plus0`),
        "-1": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.minus1`),
        "-2": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.minus2`),
        "-3": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.minus3`),
        "-4": game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.minus4`),
    };
}

function buildAbsThresholdChoices(): Record<string, string> {
    const choices: Record<string, string> = {
        [NOT_MYSTIFIED_VALUE]: game.i18n.localize(`${MODULENAME}.SETTINGS.mystifyThreshold.notMystified`),
    };
    for (let i = 0; i <= MAX_ABSOLUTE_LEVEL; i++) {
        choices[String(i)] = String(i);
    }
    return choices;
}

const PL_THRESHOLD_ORDER = ["999", "4", "3", "2", "1", "0", "-1", "-2", "-3", "-4"];

function sortPlThresholdOptions(select: HTMLSelectElement): void {
    const orderIndex = new Map(PL_THRESHOLD_ORDER.map((val, idx) => [val, idx]));
    const all = [...select.options];
    all.sort((a, b) => {
        const ai = orderIndex.get(a.value) ?? 9999;
        const bi = orderIndex.get(b.value) ?? 9999;
        return ai - bi;
    });
    for (const opt of all) {
        select.appendChild(opt);
    }
}

const RARITIES = ["common", "uncommon", "rare", "unique"] as const;

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
            npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel: {
                name: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel.name`,
                hint: `${MODULENAME}.SETTINGS.npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel.hint`,
                scope: "world",
                default: false,
                type: Boolean,
            },
            ...WorkbenchItemMystificationSettings.thresholdSettings("Pl", buildPlThresholdChoices),
            ...WorkbenchItemMystificationSettings.thresholdSettings("Abs", buildAbsThresholdChoices),
        };
    }

    private static thresholdSettings(
        suffix: "Pl" | "Abs",
        choicesBuilder: () => Record<string, string>,
    ): Record<string, SettingRegistration> {
        const choices = choicesBuilder();
        const result: Record<string, SettingRegistration> = {};
        for (const rarity of RARITIES) {
            const cap = capitalize(rarity);
            result[`mystifyThreshold${cap}${suffix}`] = {
                name: `${MODULENAME}.SETTINGS.mystifyThreshold.name${suffix}${cap}`,
                hint: `${MODULENAME}.SETTINGS.mystifyThreshold.hint${suffix}`,
                scope: "world",
                default: NOT_MYSTIFIED_VALUE,
                type: String,
                choices,
            };
        }
        return result;
    }

    static override readonly hidelist = {
        npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel: {
            type: "input",
            falsy: false,
            list: RARITIES.flatMap((r) => {
                const cap = capitalize(r);
                return [`mystifyThreshold${cap}Pl`];
            }),
        },
    };

    override _onRender(context: object, options: object): void {
        super._onRender(context, options);

        const absSettingKey = "npcMystifyAllPhysicalMagicalItemsOfThisLevelOrGreaterUsingPartyLevel";

        const applyAbsVisibility = (usingPartyLevel: boolean): void => {
            for (const rarity of RARITIES) {
                const cap = capitalize(rarity);
                const absForm = this.element.querySelector<HTMLElement>(
                    `.form-group:has(.form-fields [name="mystifyThreshold${cap}Abs"])`,
                );
                SettingsMenuPF2eWorkbench.hideForm(absForm, !usingPartyLevel);
            }
        };

        applyAbsVisibility(Boolean(game.settings.get(MODULENAME, absSettingKey)));

        const checkbox = this.element.querySelector<HTMLInputElement>(`.form-fields [name="${absSettingKey}"]`);
        checkbox?.addEventListener("change", () => applyAbsVisibility(checkbox.checked));

        for (const rarity of RARITIES) {
            const cap = capitalize(rarity);
            const plSelect = this.element.querySelector<HTMLSelectElement>(
                `.form-fields [name="mystifyThreshold${cap}Pl"]`,
            );
            if (plSelect) {
                sortPlThresholdOptions(plSelect);
            }
        }
    }
}
