// Made by esheyw, source: https://discord.com/channels/880968862240239708/880969304365994034/1161188968424018020
// And lightly typescriptified by me

/**
 * Checks if a spell is available for a given actor.
 *
 * @param {any} actor - The actor to check if they are a spellcaster.
 * @param {any} spell - The spell to check availability for.
 * @param {object} options - Optional parameters for the function.
 * @param {boolean} options.readyToCast - Indicates if the spell should be ready to cast. Default is true.
 * @param {number} options.spellRank - The rank of the spell. Must be between 1 and 11.
 * @param {string} options.spellcastingEntry - The name of the spellcasting entry to use. If provided, only this entry will be checked.
 * @return {boolean} Returns true if the spell is available, false otherwise.
 */
export function isSpellAvailable(
    actor: any,
    spell: any,
    {
        readyToCast = true,
        spellRank = null,
        spellcastingEntry = null,
    }: {
        readyToCast?: boolean;
        spellRank?: number | null;
        spellcastingEntry?: string | null;
    } = {},
) {
    // if the actor isn't a spellcaster, what are we even doing
    if (!actor?.isSpellcaster) return false;

    let spellName = "";
    let isFocusSpell = false;
    // if passed a Spell object, use its name and rank, check if focus spell or cantrip
    if (typeof spell === "string") {
        spellName = spell;
    } else if (["spell", "focus"].includes(spell?.category?.value)) {
        spellName = spell.name;
        spellRank ??= spell.rank;
        isFocusSpell = spell.isFocusSpell;
    } else {
        return ui.notifications.error("isSpellAvailable: spell must be a string or a non-ritual spell object.");
    }

    if (spellRank !== null && (spellRank < 1 || spellRank > 11)) {
        return ui.notifications.error(`isSpellAvailable: spellRank must be between 1 and 11, provided ${spellRank}`);
    }

    // limit to focus entries if passed focus spell, ignore ritual entries
    let entries = actor.spellcasting.contents.filter((e) => !e.isRitual && (!isFocusSpell || e.isFocusPool)) ?? [];
    // if provided an entry name, find just that one
    // console.warn(entries)
    let selectedEntry;
    if (spellcastingEntry) {
        selectedEntry = entries.find((e) => e.name === spellcastingEntry);
        if (!selectedEntry) {
            return ui.notifications.error(
                `isSpellAvailable: Spellcasting entry '${spellcastingEntry}' does not exist on actor ${actor?.name}`,
            );
        }
        entries = [selectedEntry];
    }
    let foundSpell;
    for (const entry of entries) {
        // we want a spell matching the name, and that matches one of
        // - is the rank specified
        // - is a cantrip
        // - is a signature spell
        // if there's more than one, take the one with the lowest rank
        const extantSpell = entry.spells?.contents
            .filter(
                (sp) =>
                    sp.name === spellName &&
                    (sp.isCantrip ||
                        (spellRank && sp.rank === spellRank) ||
                        sp.system?.location?.signature ||
                        !spellRank),
            )
            .reduce((prev: any, curr: any) => (prev?.rank < curr?.rank ? prev : curr), null);
        // if spell isn't found in this entry, it can't be available via it, try the next one
        // console.warn('extantSpell', extantSpell)
        if (!extantSpell) continue;

        // if we just want to check if the spell is prepared/known, we can call it here
        if (!readyToCast) return true;

        const spellID = extantSpell._id;
        const slots: any = entry?.system?.slots;
        const allSlots: any[] = Object.values(slots) ?? [];
        // cantrips can always be cast unless they're not prepared in a prepared entry
        if (extantSpell.isCantrip) {
            if (!entry.isPrepared || Object.values(allSlots[0].prepared).find((slot: any) => slot.id === spellID))
                return true;
            // spell is not prepared in this entry
            continue;
        }
        // remove cantrip slots from consideration from here on
        allSlots.shift();

        if (entry.isFocusPool) {
            // we know we have the spell, so just test if we have focus points
            return actor.system.resources.focus.value >= 1;
        }
        // Innate spells store their uses per spell, no slots
        if (entry.isInnate) {
            if (extantSpell.system.location.uses?.value ?? 0 > 0) return true;
        }

        // if spellRank set, limit to just slots of that rank, accounting for lack of cantrip slots with the -1
        // otherwise limit to ranks of the spell's or higher
        const relevantSlotRanks: any[] = spellRank
            ? [allSlots[spellRank - 1]]
            : allSlots.filter((sr: any) => sr.max > 0).slice(extantSpell.rank - 1);

        if (entry.isSpontaneous) {
            // we have already narrowed ranks down to ones that can cast the spell, do any of them have unused slots?
            for (const slotRank of relevantSlotRanks) {
                if (slotRank.value > 0) return true;
            }
        }

        if (entry.isPrepared) {
            for (const slotRank of relevantSlotRanks) {
                if (entry.isFlexible) {
                    // flexible entries aren't picky, any unused slot of sufficient rank will do
                    if (slotRank.value > 0) return true;
                }
                // is the spell prepared in an unexpended slot?
                foundSpell = Object.values(slotRank.prepared).find(
                    (slot: any) => slot.id === spellID && (!readyToCast || slot?.expended !== true),
                );
                if (foundSpell) return true;
            }
        }
    }
    // default:
    return false;
}
