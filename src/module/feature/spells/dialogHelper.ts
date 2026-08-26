import { I18N_SHARED } from "./helpers.ts";

export async function showConfirm(
    titleKey: string,
    messageKey: string,
    formatData?: Record<string, string | number>,
    buttonLabels?: { yes?: string; no?: string },
): Promise<boolean> {
    const yesLabel = buttonLabels?.yes
        ? game.i18n.localize(buttonLabels.yes)
        : game.i18n.localize(`${I18N_SHARED}.yes`);
    const noLabel = buttonLabels?.no ? game.i18n.localize(buttonLabels.no) : game.i18n.localize(`${I18N_SHARED}.no`);

    return foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize(titleKey) },
        content: `${formatData ? game.i18n.format(messageKey, formatData) : game.i18n.localize(messageKey)}`,
        yes: { label: yesLabel },
        no: { label: noLabel },
    });
}
