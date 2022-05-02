/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
//TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
//TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { mangleChatMessage, renderNameHud, tokenCreateMystification } from "./feature/tokenMystificationHandler";
import { registerKeybindings } from "./keybinds";
import { autoRollDamage, persistentDamage, persistentHealing } from "./feature/damageHandler";
import { moveOnZeroHP } from "./feature/initiativeHandler";
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { TokenDocumentPF2e } from "@scene";
import { playAnimationAndSound } from "./feature/sfxHandler";
import { reminderBreathWeapon } from "./feature/reminderEffects";
import { toggleSettings } from "./feature/settingsHandler";
import { increaseDyingOnZeroHP, reduceFrightened } from "./feature/conditionHandler";
import { chatCardCollapse } from "./feature/qolHandler";
import { calcRemainingMinutes, createRemainingTimeMessage, startTimer } from "./feature/heroPointHandler";
import { shouldIHandleThis } from "./utils";
import { ItemPF2e } from "@item";

export const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async (actor: ActorPF2e) => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerSettings();

    await preloadTemplates();

    //Hooks that always run
    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        toggleSettings(html);
    });

    //Hooks that only run if a setting that needs it has been enabled
    if (
        (game.settings.get(MODULENAME, "autoRollDamageForStrike") &&
            (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
                game.settings.get(MODULENAME, "autoRollDamageForSpellAttack"))) ||
        game.settings.get(MODULENAME, "automatedAnimationOn") ||
        game.settings.get(MODULENAME, "applyPersistentDamage") ||
        game.settings.get(MODULENAME, "reminderBreathWeapon")
    ) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            if (game.user.isGM && game.settings.get(MODULENAME, "automatedAnimationOn")) {
                await playAnimationAndSound(message);
            }

            if (
                game.settings.get(MODULENAME, "autoRollDamageForStrike") &&
                (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
                    game.settings.get(MODULENAME, "autoRollDamageForSpellAttack"))
            ) {
                await autoRollDamage(message);
            }

            if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
                await persistentDamage(message);
            }

            if (game.settings.get(MODULENAME, "reminderBreathWeapon")) {
                await reminderBreathWeapon(message);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault" ||
        game.settings.get(MODULENAME, "applyPersistentHealing") ||
        (game.settings.get(MODULENAME, "npcMystifier") &&
            game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat"))
    ) {
        Hooks.on("renderChatMessage", async (message: ChatMessagePF2e, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }

            if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
                await persistentHealing(message);
            }

            if (
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
            ) {
                chatCardCollapse(html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
        Hooks.on("deleteItem", async (item: ItemPF2e, options: {}) => {
            if (
                item.slug === "dying" &&
                game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") &&
                shouldIHandleThis(item.isOwner ? game.user?.id : null)
            ) {
                await item.parent?.increaseCondition("wounded");
            }
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
                await reduceFrightened(combatant);
            }
        });
    }

    if (game.settings.get(MODULENAME, "actionsReminderAllow")) {
        Hooks.on("pf2e.startTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (game.settings.get(MODULENAME, "actionsReminderAllow")) {
                if (
                    combatant &&
                    combatant.actor &&
                    shouldIHandleThis(
                        combatant.isOwner ? game.user?.id : null,
                        ["all", "players"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow")),
                        ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow"))
                    )
                ) {
                    if (
                        combatant.actor.hasCondition("stunned") ||
                        combatant.actor.hasCondition("slowed") ||
                        combatant.actor.hasCondition("quickened")
                    ) {
                        const stunned = combatant.actor.getCondition("stunned")?.value ?? 0;
                        const slowed = combatant.actor.getCondition("slowed")?.value ?? 0;
                        const quickened = combatant.actor.hasCondition("quickened") ? 1 : 0;
                        const maxActions = 3 + quickened;
                        let autoReduceStunnedMessage = "";
                        if (stunned && game.settings.get(MODULENAME, "actionsReminderAutoReduceStunned")) {
                            const stunReduction = Math.min(stunned, maxActions);
                            for (let i = 0; i < stunReduction; i++) {
                                await combatant.actor?.decreaseCondition("stunned");
                            }
                            autoReduceStunnedMessage = `Stunned reduced by ${stunReduction}.<br>`;
                        }
                        const actionsMessage = `${autoReduceStunnedMessage}${combatant.token?.name} has ${Math.max(
                            maxActions - Math.max(stunned, slowed),
                            0
                        )} actions remaining.`;
                        // ui.notifications.info(actionsMessage);
                        await ChatMessage.create(
                            {
                                flavor: actionsMessage,
                                whisper: !combatant.actor?.hasPlayerOwner
                                    ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                                    : [],
                            },
                            {}
                        );
                    }
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" ||
        game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none"
    ) {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            const hp = actor.data.data.attributes.hp?.value || 0;
            const updateClone = deepClone(update);
            if (game.combat && game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
                await moveOnZeroHP(actor, updateClone, game.combat, hp);
            }

            if (game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none") {
                await increaseDyingOnZeroHP(actor, updateClone, hp);
            }
        });
    }

    if (game.settings.get(MODULENAME, "toggleUndetectedWithVisibilityState")) {
        Hooks.on("preUpdateToken", async (tokenDoc: TokenDocumentPF2e, update, options, userId) => {
            if (
                tokenDoc.actor?.type !== "loot" &&
                game.settings.get(MODULENAME, "toggleUndetectedWithVisibilityState") &&
                (update.hidden === true || update.hidden === false)
            ) {
                tokenDoc.actor?.toggleCondition("undetected");
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("createToken", async (token: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token);
            }
        });
    }

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        const settings: [string, any][] = Array.from(game.settings.settings.entries());
        settings.forEach((setting: [string, any]) => {
            const name = setting[0];
            //TODO Do this in a more elegant way
            //Disable all dependent npcMystifier settings
            if (name !== `${MODULENAME}.npcMystifier` && setting[0].startsWith(`${MODULENAME}.npcMystifier`)) {
                const valueFunction = !game.settings.get(MODULENAME, "npcMystifier");

                html.find(`input[name="${name}"]`).parent().parent().toggle(!valueFunction);
                html.find(`select[name="${name}"]`).parent().parent().toggle(!valueFunction);
            }
            if (
                name !== `${MODULENAME}.automatedAnimationOn` &&
                setting[0].startsWith(`${MODULENAME}.automatedAnimationOn`)
            ) {
                const valueFunction = !game.settings.get(MODULENAME, "automatedAnimationOn");

                html.find(`input[name="${name}"]`).parent().parent().toggle(!valueFunction);
                html.find(`select[name="${name}"]`).parent().parent().toggle(!valueFunction);
            }
        });
    });

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready

    registerKeybindings();

    //General module setup
    if (game.settings.get(MODULENAME, "abpVariantAllowItemBonuses")) {
        // @ts-ignore
        game.pf2e.variantRules.AutomaticBonusProgression.suppressRuleElement = function suppressRuleElement(): boolean {
            return false;
        };
    }
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);

    // Must be in ready
    if (game.settings.get(MODULENAME, "heroPointHandler")) {
        if (game.user?.isGM) {
            let remainingMinutes = calcRemainingMinutes(false);
            if (remainingMinutes > 0 || game.settings.get(MODULENAME, "heroPointHandlerStartTimerOnReady")) {
                remainingMinutes = calcRemainingMinutes(true);
                await startTimer(remainingMinutes);
                await createRemainingTimeMessage(remainingMinutes);
            }
        }
    }

    Hooks.callAll(`${MODULENAME}.moduleReady`);
});
