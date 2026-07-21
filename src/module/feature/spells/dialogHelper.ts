import { getActorLevel, hasLearnFailureAtCurrentLevel, I18N } from "./helpers.ts";
import { getLearnFailureLevel, sanitizeFlagKey } from "./flags.ts";
import { formatCostForDisplay } from "./economyHandler.ts";

import type { ActorPF2e } from "foundry-pf2e";

function formatI18n(key: string, formatData?: Record<string, string | number>): string {
    return formatData ? game.i18n.format(`${I18N}.${key}`, formatData) : game.i18n.localize(`${I18N}.${key}`);
}

function formatLearningTime(hours: number): string {
    if (hours < 1) return game.i18n.format(`${I18N}.learnSpellTime10Minutes`, { minutes: Math.round(hours * 60) });
    return game.i18n.format(`${I18N}.learnSpellTimeHours`, { hours });
}

export async function showConfirm(
    titleKey: string,
    messageKey: string,
    formatData?: Record<string, string | number>,
    buttonLabels?: { yes?: string; no?: string },
): Promise<boolean> {
    const yesLabel = buttonLabels?.yes
        ? game.i18n.localize(`${I18N}.${buttonLabels.yes}`)
        : game.i18n.localize(`${I18N}.yes`);
    const noLabel = buttonLabels?.no
        ? game.i18n.localize(`${I18N}.${buttonLabels.no}`)
        : game.i18n.localize(`${I18N}.no`);

    return await foundry.applications.api.DialogV2.confirm({
        window: { title: formatI18n(titleKey, formatData) },
        content: `<p>${formatI18n(messageKey, formatData)}</p>`,
        yes: { label: yesLabel },
        no: { label: noLabel },
    });
}

interface OverrideLearnFailureResult {
    allowed: boolean;
    didOverride: boolean;
}

export async function promptOverrideLearnFailure(
    actor: ActorPF2e,
    ident: string,
    spellName: string,
): Promise<OverrideLearnFailureResult> {
    const key = sanitizeFlagKey(ident);
    if (!hasLearnFailureAtCurrentLevel(actor, key)) return { allowed: true, didOverride: false };
    const failureLevel = getLearnFailureLevel(actor, key) ?? getActorLevel(actor);
    const confirmed = await showConfirm(
        "overrideLearnFailureTitle",
        "overrideLearnFailureMessage",
        { spellName, level: failureLevel },
        { yes: "overrideLearnFailureYes", no: "overrideLearnFailureNo" },
    );
    return { allowed: confirmed, didOverride: confirmed };
}

export async function showLearnSpellDialog(
    spellName: string,
    costCopper: number,
    hours: number,
    entryInfo?: { name: string; tradition: string; type: string },
): Promise<"yes" | "no" | null> {
    const entryText = entryInfo
        ? `<br>${game.i18n.format(`${I18N}.learnSpellDialogEntry`, {
              entryName: entryInfo.name,
              tradition: entryInfo.tradition,
              type: entryInfo.type,
          })}`
        : "";
    const choice = await foundry.applications.api.DialogV2.wait({
        window: {
            title: game.i18n.localize(`${I18N}.learnSpellDialogTitle`),
        },
        content: `<p>${game.i18n.format(`${I18N}.learnSpellDialogMessage`, { spellName, cost: formatCostForDisplay(costCopper), time: formatLearningTime(hours) })}${entryText}</p>`,
        buttons: [
            {
                action: "yes",
                label: game.i18n.localize(`${I18N}.learnSpellYes`),
                icon: "fa-solid fa-graduation-cap",
            },
            {
                action: "no",
                label: game.i18n.localize(`${I18N}.learnSpellNo`),
                icon: "fa-solid fa-check",
            },
            {
                action: "cancel",
                label: game.i18n.localize(`${I18N}.learnSpellCancel`),
                icon: "fa-solid fa-times",
            },
        ],
    });
    if (!choice || choice === "cancel") return null;
    return choice as "yes" | "no";
}
