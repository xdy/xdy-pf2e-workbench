/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Can I use the pf2e localization strings?
//TODO Add the option to randomize a name from a list of names (kinda like token mold)
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog that does that, with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify all mystified tokens with the same base actor on that scene. After all, if you've recognized one zombie shambler I figure you would recognize all zombie shamblers.
//TODO Make issues out of the harder of the above todos...

// Import TypeScript modules
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { mangleChatMessage, preTokenCreateMystification, renderNameHud } from "./app/mystify-token";
import { registerKeybindings } from "./keybinds";
import { getCombatantById, moveSelectedAheadOfCurrent } from "./app/moveCombatant";

export const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async () => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerSettings();
    registerKeybindings();

    await preloadTemplates();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);
});

Hooks.on("preCreateToken", async (token: Token) => {
    console.log(`${MODULENAME} | preCreateToken`);

    if ((game as Game).settings.get(MODULENAME, "npcMystifier")) {
        preTokenCreateMystification(token);
    }
});

Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
    if ((game as Game).settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
});

Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
    if ((game as Game).settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        mangleChatMessage(message, html);
    }
});

Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: ContextMenuEntry[]) => {
    if ((game as Game).user?.isGM && (game as Game).settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
        entryOptions.push({
            icon: '<i class="fas fa-skull"></i>',
            name: "SETTINGS.moveBeforeCurrentCombatantContextMenu.name",
            callback: async (li: any) => {
                if ((game as Game).user?.isGM) {
                    await moveSelectedAheadOfCurrent(getCombatantById(li.data("combatant-id")));
                }
            },
        });
    }
});

Hooks.on("updateCombat", () => {
    if ((game as Game).settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        // @ts-ignore
        (game as Game).pf2e.effectTracker.removeExpired();
    }
});

Hooks.on("preUpdateActor", async (actor: Actor, update: Record<string, string>) => {
    if ((game as Game).settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP")) {
        const combatant = <Combatant>(
            (game as Game)?.combat?.getCombatantByToken(
                actor.isToken
                    ? <string>actor.token?.id
                    : <string>(canvas as Canvas)?.scene?.data.tokens.find((t) => t.actor?.id === actor.id)?.id
            )
        );
        if (
            combatant &&
            combatant !== (game as Game).combat?.combatant &&
            // @ts-ignore
            actor.data.data.attributes.hp.value > 0 &&
            getProperty(update, "data.attributes.hp.value") <= 0
        ) {
            await moveSelectedAheadOfCurrent(combatant);
        }
    }
});

// @ts-ignore Can't be bothered to type update
Hooks.on("preUpdateToken", async (tokenDoc: TokenDocument, update) => {
    type UpdateRow = { type: string; data: { active: any; slug: string; value: { value: number } } };
    if ((game as Game).settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying")) {
        const shouldMove =
            //@ts-ignore - This is a dirty hack to get around the fact that _actor is protected so I can check if already dying
            !tokenDoc?._actor?.hasCondition("dying") &&
            update.actorData?.items &&
            update.actorData.items
                .filter((row: UpdateRow) => row.type === "condition")
                .filter((row: UpdateRow) => row.data?.active)
                .filter((row: UpdateRow) => row.data?.slug === "dying")
                .find((row: UpdateRow) => row.data?.value.value === 1);
        const combatant = <Combatant>(game as Game)?.combat?.getCombatantByToken(<string>tokenDoc.id);
        const move = combatant && combatant !== (game as Game).combat?.combatant && shouldMove;
        if (move) {
            await moveSelectedAheadOfCurrent(combatant);
        }
    }
});
