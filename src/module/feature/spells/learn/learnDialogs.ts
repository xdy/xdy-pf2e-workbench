import type { ActorPF2e } from "foundry-pf2e";
import {
    formatLearningTime,
    getActorLevel,
    hasLearnFailureAtCurrentLevel,
    I18N_LEARN,
    I18N_SHARED,
} from "../helpers.ts";
import { getLearnFailureEntry } from "../flags.ts";
import { formatCostForDisplay } from "../economyHandler.ts";
import { showConfirm } from "../dialogHelper.ts";

export async function promptOverrideLearnFailure(actor: ActorPF2e, ident: string, spellName: string): Promise<boolean> {
    if (!hasLearnFailureAtCurrentLevel(actor, ident)) return true;
    const failureLevel = getLearnFailureEntry(actor, ident)?.level ?? getActorLevel(actor);
    return showConfirm(
        `${I18N_LEARN}.overrideLearnFailureTitle`,
        `${I18N_LEARN}.overrideLearnFailureMessage`,
        { spellName, level: failureLevel },
        { yes: `${I18N_LEARN}.overrideLearnFailureYes`, no: `${I18N_LEARN}.overrideLearnFailureNo` },
    );
}

export async function showLearnSpellDialog(
    spellName: string,
    costCopper: number,
    hours: number,
    entryInfo?: { name: string; tradition: string; type: string },
): Promise<"yes" | "no" | null> {
    const entryText = entryInfo
        ? `<br>${game.i18n.format(`${I18N_LEARN}.learnSpellDialogEntry`, {
              entryName: entryInfo.name,
              tradition: entryInfo.tradition,
              type: entryInfo.type,
          })}`
        : "";
    const content = `<p>${game.i18n.format(`${I18N_SHARED}.learnSpellDialogMessage`, {
        spellName,
        cost: formatCostForDisplay(costCopper),
        time: formatLearningTime(hours),
    })}${entryText}</p>`;
    return showLearnChoiceDialog(`${I18N_SHARED}.learnSpellDialogTitle`, content);
}

export async function showBatchLearnSpellDialog(
    count: number,
    totalCostCopper: number,
    totalHours: number,
): Promise<"yes" | "no" | null> {
    const content = `<p>${game.i18n.format(`${I18N_SHARED}.learnSpellBatchDialogMessage`, {
        count,
        cost: formatCostForDisplay(totalCostCopper),
        time: formatLearningTime(totalHours),
    })}</p>`;
    return showLearnChoiceDialog(`${I18N_SHARED}.learnSpellBatchDialogTitle`, content);
}

async function showLearnChoiceDialog(titleKey: string, contentHtml: string): Promise<"yes" | "no" | null> {
    const choice = await foundry.applications.api.DialogV2.wait({
        window: { title: game.i18n.localize(titleKey) },
        content: contentHtml,
        buttons: [
            {
                action: "yes",
                label: game.i18n.localize(`${I18N_SHARED}.learnSpellYes`),
                icon: "fa-solid fa-graduation-cap",
            },
            {
                action: "no",
                label: game.i18n.localize(`${I18N_SHARED}.learnSpellNo`),
                icon: "fa-solid fa-check",
            },
        ],
    });
    if (!choice) return null;
    return choice as "yes" | "no";
}

export async function promptBatchOverrideLearnFailure(actor: ActorPF2e, spellNames: string[]): Promise<boolean> {
    const spellList = spellNames.join(", ");
    return showConfirm(
        `${I18N_LEARN}.overrideLearnFailureTitle`,
        `${I18N_LEARN}.overrideLearnFailureBatchMessage`,
        { spellName: spellList, level: getActorLevel(actor) },
        { yes: `${I18N_LEARN}.overrideLearnFailureYes`, no: `${I18N_LEARN}.overrideLearnFailureNo` },
    );
}
