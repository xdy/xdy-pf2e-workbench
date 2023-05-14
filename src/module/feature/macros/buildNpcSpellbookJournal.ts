// Originally from Avery (Velara) Avery#9136, modified by me. Included with permission.
import { MODULENAME } from "../../xdy-pf2e-workbench";

export async function buildNpcSpellbookJournal() {
    // @ts-ignore
    const activeWindow = ui.activeWindow;
    let actor;
    if (activeWindow?.constructor.name === "NPCSheetPF2e") {
        actor = activeWindow.token?.actor || activeWindow.actor;
    } else {
        const actors = canvas.tokens.controlled.map((a) => a.actor).filter((a) => a?.isOfType("npc"));
        if (actors?.length === 1) {
            actor = actors[0];
        }
    }

    const length = actor.spellcasting.contents.length;

    if (!actor || length === 0) {
        ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.buildNpcSpellbookJournal.noSpellcastingEntry`));
        return;
    }

    const spellList: any[] = [];
    for (let i = 0; i < length; i++) {
        spellList[i] = { entry: actor.spellcasting.contents[i].name, spells: [] };
        for (let ii = 0; ii < actor.spellcasting.contents[i].spells.contents.length; ii++) {
            spellList[i].spells.push("@UUID[" + actor.spellcasting.contents[i].spells.contents[ii].sourceId + "]");
        }
    }

    const updates = {
        name: game.i18n.format(`${MODULENAME}.macros.buildNpcSpellbookJournal.generatedSpellbookFor`, {
            name: actor.name,
        }),
        content: `<table class="pf2-table">
    <tr>
       <th>Entry</th>
       <th>Spells</th>
    </tr>`,
    };

    for (let ff = 0; ff < spellList.length; ff++) {
        updates.content += `
    <tr>
        <td>${spellList[ff].entry}</td>
        <td><div style="display: flex; gap:3px; flex-wrap: wrap; align-items: center;justify-content: center;">${spellList[ff].spells}</div></td>
</tr>
`;
    }
    updates.content += `</table>`;

    const journal = game.journal.getName(updates.name);
    if (journal) {
        await journal.delete();
    }
    await JournalEntry.create(updates);
}

// await buildSpellbookJournal();
