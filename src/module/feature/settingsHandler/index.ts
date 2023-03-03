// export function toggleSettings(_html: JQuery) {
// const settings: [string, any][] = Array.from(game.settings.settings.entries());
// settings.forEach((_setting: [string, any]) => {
//     // None right now
// });
// }

// export function toggleMenuSettings(html: JQuery, settings: SettingsMenuPF2eWorkbench) {
//     for (const key in settings["settings"]) {
//         const settingElement: PartialSettingsData = settings["settings"][key];
//         if (settingElement && settingElement["key"]) {
//             const settingName = settingElement["key"];
//
//             if (settingName !== `automatedAnimationOn` && settingName.startsWith(`automatedAnimation`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "automatedAnimationOn");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             // Disable all dependent actionsReminder settings
//             if (settingName !== `actionsReminderAllow` && settingName.startsWith(`actionsReminder`)) {
//                 const applyToggle = !(
//                     game.settings.get(MODULENAME, "actionsReminderAllow") === "none" ||
//                     (game.user?.isGM
//                         ? game.settings.get(MODULENAME, "actionsReminderAllow") === "players"
//                         : game.settings.get(MODULENAME, "actionsReminderAllow") === "gm")
//                 );
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
//             }
//
//             // Disable all dependent npcMystifier settings
//             if (settingName !== `npcMystifier` && settingName.startsWith(`npcMystifier`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "npcMystifier");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             // Disable all dependent persistentDamage settings
//             if (settingName !== `applyPersistentAllow` && settingName.startsWith(`applyPersistent`)) {
//                 const applyToggle = !(
//                     game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
//                     (game.user?.isGM
//                         ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
//                         : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
//                 );
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
//             }
//             if (settingName !== `autoRollDamageAllow` && settingName.startsWith(`autoRollDamage`)) {
//                 // const valueFunction = game.settings.get(MODULENAME, "autoRollDamage") === "none";
//                 const applyToggle = !(
//                     game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
//                     (game.user?.isGM
//                         ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
//                         : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
//                 );
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(applyToggle);
//             }
//
//             if (settingName !== `reminderCannotAttack` && settingName.startsWith(`reminderCannotAttack`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "reminderCannotAttack");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             if (settingName !== `addGmRKButtonToNpc` && settingName.startsWith(`addGmRKButtonToNpc`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "addGmRKButtonToNpc");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             if (settingName !== `heroPointHandler` && settingName.startsWith(`heroPointHandler`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "heroPointHandler");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             if (settingName !== `castPrivateSpell` && settingName.startsWith(`castPrivateSpell`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "castPrivateSpell");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//
//             if (settingName !== `tokenAnimation` && settingName.startsWith(`tokenAnimation`)) {
//                 const valueFunction = !game.settings.get(MODULENAME, "tokenAnimation");
//
//                 html.find(`input[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//                 html.find(`select[name="${settingName}"]`).parent().parent().toggle(!valueFunction);
//             }
//         }
//     }
// }
