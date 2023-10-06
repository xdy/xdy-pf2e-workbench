// TODO Possibly remove and replace with the more flexible version on the shelf?
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export function patchI8nTexts() {
    game.i18n.translations.PF2E["Item"].Weapon.CriticalSpecialization.flail = game.i18n.localize(
        `${MODULENAME}.SETTINGS.houseRulerI18n.flailCritical`,
    );
    game.i18n.translations.PF2E["Item"].Weapon.CriticalSpecialization.hammer = game.i18n.localize(
        `${MODULENAME}.SETTINGS.houseRulerI18n.hammerCritical`,
    );
    ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.houseRulerI18n.info`));
}
