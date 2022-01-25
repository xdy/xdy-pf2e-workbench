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
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog that does that, with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify all mystified tokens with the same base actor on that scene. After all, if you've recognized one zombie shambler I figure you would recognize all zombie shamblers.
//TODO Make issues out of the harder of the above todos...

// Import TypeScript modules
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { mangleChatMessage, renderNameHud, tokenCreateMystification } from "./feature/mystify-token";
import { registerKeybindings } from "./keybinds";
import { getCombatantById, moveSelectedAheadOfCurrent } from "./feature/changeCombatantInitiative";

export const MODULENAME = "xdy-pf2e-workbench";

declare global {
    interface LenientGlobalVariableTypes {
        game: never;
        canvas: never;
        ui: never;
        i18n: never;
    }
}

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

Hooks.on("createToken", async (token: any) => {
    console.log(`${MODULENAME} | preCreateToken`);

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        tokenCreateMystification(token);
    }
});

Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
});

Hooks.on("createChatMessage", (message: ChatMessage) => {
    if (game.settings.get(MODULENAME, "autoRollDamageForStrike")) {
        if (message.data.type === 5) {
            const strikeName = message.data.flavor?.match(
                `(<strong>${game.i18n.localize("SETTINGS.autoRollDamageForStrike.strike")}): (.*?)<\\/strong>`
            );
            if (strikeName && strikeName[1] && strikeName[2]) {
                const degreeOfSuccess = message.data.flavor?.match(
                    `(<b>${game.i18n.localize("SETTINGS.autoRollDamageForStrike.result")}): <span class="(.*?)">`
                );
                if (degreeOfSuccess && degreeOfSuccess[1] && degreeOfSuccess[2]) {
                    // @ts-ignore
                    const relevantStrike = game.actors
                        // @ts-ignore
                        ?.get(message.data.speaker.actor)
                        // @ts-ignore
                        ?.data.data?.actions.filter((a: { type: string }) => a.type === "strike")
                        .find((action: { name: string }) => action.name === strikeName[2]);
                    const rollOptions = game.actors
                        // @ts-ignore
                        ?.get(message.data.speaker.actor)
                        // @ts-ignore
                        ?.getRollOptions(["all", "damage-roll"]);
                    if (degreeOfSuccess[2] === "success") {
                        relevantStrike?.damage({
                            options: rollOptions,
                        });
                    } else if (degreeOfSuccess[2] === "criticalSuccess") {
                        relevantStrike?.critical({
                            options: rollOptions,
                        });
                    }
                }
            }
        }
    }
});

Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
    if (game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
        mangleChatMessage(message, html);
    }
    if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent")) {
        html.find(".card-content").hide();
        html.on("click", "h3", (event: JQuery.ClickEvent) => {
            const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
            if (content && content.style) {
                event.preventDefault();
                content.style.display = content.style.display === "none" ? "block" : "none";
                if (content.style.display === "none") {
                    html.find(".card-content").hide();
                }
            }
        });
    }
});

Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: ContextMenuEntry[]) => {
    if (game.user?.isGM && game.settings.get(MODULENAME, "enableMoveBeforeCurrentCombatant")) {
        entryOptions.push({
            icon: '<i class="fas fa-skull"></i>',
            name: "SETTINGS.moveBeforeCurrentCombatantContextMenu.name",
            callback: async (li: any) => {
                if (game.user?.isGM) {
                    await moveSelectedAheadOfCurrent(getCombatantById(li.data("combatant-id")));
                }
            },
        });
    }
});

Hooks.on("updateWorldTime", async (_total, diff) => {
    if (
        game.user?.isGM &&
        // @ts-ignore
        !game.combat?.active &&
        diff >= 1 &&
        game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat")
    ) {
        // @ts-ignore
        game.pf2e.effectTracker.removeExpired();
    }
});

Hooks.on("updateCombat", (combat: Combat) => {
    if (game.user?.isGM && game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        if (combat.combatant?.actor) {
            // @ts-ignore
            game.pf2e.effectTracker.removeExpired(combat.combatant.actor);
        }
    }
});

Hooks.on("preUpdateActor", async (actor: Actor, update: Record<string, string>) => {
    if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP")) {
        const combatant = <Combatant>(
            game?.combat?.getCombatantByToken(
                actor.isToken
                    ? <string>actor.token?.id
                    : <string>canvas?.scene?.data.tokens.find((t) => t.actor?.id === actor.id)?.id
            )
        );
        if (
            combatant &&
            combatant !== game.combat?.combatant &&
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
    if (game.settings.get(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying")) {
        const shouldMove =
            //@ts-ignore Only pf2e actor has the hasCondition method and I haven't the type for that, so...
            !tokenDoc?.actor?.hasCondition("dying") &&
            update.actorData?.items &&
            update.actorData.items
                .filter((row: UpdateRow) => row.type === "condition")
                .filter((row: UpdateRow) => row.data?.active)
                .filter((row: UpdateRow) => row.data?.slug === "dying")
                .find((row: UpdateRow) => row.data?.value.value === 1);
        const combatant = <Combatant>game?.combat?.getCombatantByToken(<string>tokenDoc.id);
        if (combatant && combatant !== game.combat?.combatant && shouldMove) {
            await moveSelectedAheadOfCurrent(combatant);
        }
    }
});
