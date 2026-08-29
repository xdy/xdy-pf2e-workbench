import type { ActorPF2e, SpellcastingEntryPF2e, SpellPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../constants.ts";
import { getLearnFailureEntry } from "./flags.ts";
import { actorHasItemBySlug, getModuleSetting } from "../../utils.ts";

export const I18N_SHARED = `${MODULENAME}.spellShared` as const;
export const I18N_LEARN = `${MODULENAME}.spellLearn` as const;

export type I18nPrefix = typeof I18N_SHARED | typeof I18N_LEARN;

export function notify(
    level: "info" | "warn",
    prefix: I18nPrefix,
    i18nKey: string,
    data?: Record<string, string | number | boolean>,
): void {
    const key = `${prefix}.${i18nKey}`;
    ui.notifications[level](data ? game.i18n.format(key, data) : game.i18n.localize(key));
}

export function isBindableSpellcastingEntry(entry: SpellcastingEntryPF2e): boolean {
    if (entry.isEphemeral || entry.isFocusPool || !entry.id) return false;
    return (entry.system as { prepared?: { value?: string } })?.prepared?.value !== "innate";
}

export function formatLearningTime(hours: number): string {
    if (hours < 1) {
        return game.i18n.format(`${I18N_SHARED}.learnSpellTime10Minutes`, { minutes: Math.round(hours * 60) });
    }
    const wholeHours = Math.floor(hours);
    const remainingMinutes = Math.round((hours - wholeHours) * 60);
    if (remainingMinutes === 0) {
        return game.i18n.format(`${I18N_SHARED}.learnSpellTimeHours`, { hours: wholeHours });
    }
    return game.i18n.format(`${I18N_SHARED}.learnSpellTimeHoursMinutes`, {
        hours: wholeHours,
        minutes: remainingMinutes,
    });
}

export const RANK_CANTRIP = "cantrip";

export const OUTCOME_I18N_KEYS = {
    criticalSuccess: "learnResultCriticalSuccess",
    success: "learnResultSuccess",
    failure: "learnResultFailure",
    criticalFailure: "learnResultCriticalFailure",
    skipped: "learnSpellSkipped",
    alreadyKnown: "learnSpellBatchLearnAlreadyKnown",
} as const satisfies Record<string, string>;

export function getSpellcastingEntries(actor: ActorPF2e): SpellcastingEntryPF2e[] {
    const sc = actor.spellcasting;
    return sc ? ([...sc] as unknown as SpellcastingEntryPF2e[]) : [];
}

export function getSpellcastingEntryById(actor: ActorPF2e, entryId: string): SpellcastingEntryPF2e | undefined {
    for (const entry of getSpellcastingEntries(actor)) {
        if (entry.id === entryId) return entry;
    }
    return undefined;
}

export function getActorXp(actor: ActorPF2e): number {
    return (actor.system.details as { xp?: { value?: number } }).xp?.value ?? 0;
}

export function getActorLevel(actor: ActorPF2e): number {
    return actor.system.details.level.value;
}

export function inCharacterCreation(actor: ActorPF2e): boolean {
    return getActorLevel(actor) === 1 && getActorXp(actor) === 0;
}

export function shouldAutoSkipLearnSpellDialog(actor: ActorPF2e): boolean {
    return getModuleSetting<boolean>("autoSkipLearnSpellAtLevelOne") && inCharacterCreation(actor);
}

export function hasLearnFailureAtCurrentLevel(actor: ActorPF2e, identifier: string): boolean {
    const entry = getLearnFailureEntry(actor, identifier);
    if (!entry) return false;
    if (getActorLevel(actor) > entry.level) return false;
    if (actorHasItemBySlug(actor, "magical-shorthand")) {
        const ONE_WEEK_SECONDS = 604800;
        if (game.time.worldTime - entry.timestamp >= ONE_WEEK_SECONDS) return false;
    }
    return true;
}

export function getTargetEntryIdFromData(spell: SpellPF2e): string | undefined {
    return spell.system?.location?.value as string | undefined;
}
