import { MODULENAME } from "../../xdy-pf2e-workbench";
import { SettingsMenuPF2eWorkbench } from "../../settings/menu";

export function toggleSettings(html: JQuery) {
    const settings: [string, any][] = Array.from(game.settings.settings.entries());
    settings.forEach((setting: [string, any]) => {
        const settingName = setting[0];

        if (
            settingName !== `${MODULENAME}.automatedAnimationOn` &&
            setting[0].startsWith(`${MODULENAME}.automatedAnimation`)
        ) {
            const valueFunction = !game.settings.get(MODULENAME, "automatedAnimationOn");

            html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
        }
    });
}

export function toggleMenuSettings(html: JQuery, settings: SettingsMenuPF2eWorkbench) {
    for (const key in settings["settings"]) {
        const settingName = settings["settings"][key].key;
        //Disable all dependent actionsReminder settings
        if (settingName !== `actionsReminderAllow` && settingName.startsWith(`actionsReminder`)) {
            const applyToggle = !(
                game.settings.get(MODULENAME, "actionsReminderAllow") === "none" ||
                (game.user?.isGM
                    ? game.settings.get(MODULENAME, "actionsReminderAllow") === "players"
                    : game.settings.get(MODULENAME, "actionsReminderAllow") === "gm")
            );
            html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
        }

        //Disable all dependent persistentDamage settings
        if (settingName !== `applyPersistentAllow` && settingName.startsWith(`applyPersistent`)) {
            const applyToggle = !(
                game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                (game.user?.isGM
                    ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                    : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
            );
            html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
        }
        //Disable all dependent persistentHealing settings
        if (settingName !== `applyPersistentAllow` && settingName.startsWith(`applyPersistent`)) {
            const applyToggle = !(
                game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                (game.user?.isGM
                    ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                    : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
            );
            // const valueFunction = game.settings.get(MODULENAME, "applyPersistentAllow") === "none";

            html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
        }
        if (settingName !== `autoRollDamageAllow` && settingName.startsWith(`autoRollDamage`)) {
            // const valueFunction = game.settings.get(MODULENAME, "autoRollDamage") === "none";
            const applyToggle = !(
                game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
                (game.user?.isGM
                    ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
                    : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
            );

            html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            html.find(`select[name="${settingName}"]`).parent().parent().toggle(applyToggle);
        }
        if (settingName !== `addGmRKButtonToNpc` && settingName.startsWith(`addGmRKButtonToNpc`)) {
            const valueFunction = !game.settings.get(MODULENAME, "addGmRKButtonToNpc");

            html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
            html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
        }
    }
}
