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
import { calcRemainingMinutes, startTimer } from "./feature/heroPointHandler";
import { shouldIHandleThis, shouldIHandleThisMessage } from "./utils";
import { autoRollDamage, persistentDamage, persistentHealing } from "./feature/damageHandler";
import { deprecatedMoveManually, moveOnDying, moveOnZeroHP } from "./feature/initiativeHandler";
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { TokenDocumentPF2e } from "@scene";
import { playAnimationAndSound } from "./feature/sfxHandler";

export const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async () => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerSettings();
    registerKeybindings();

    await preloadTemplates();
    await hooksForEveryone();
    await hooksForGMInit();
    if (game.settings.get(MODULENAME, "abpVariantAllowItemBonuses")) {
        // @ts-ignore
        game.pf2e.variantRules.AutomaticBonusProgression.suppressRuleElement = function suppressRuleElement(): boolean {
            return false;
        };
    }

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready
    hooksForGMSetup();
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});

async function hooksForEveryone() {
    //Hooks for everyone
    if (
        game.settings.get(MODULENAME, "autoRollDamageForStrike") &&
        (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
            game.settings.get(MODULENAME, "autoRollDamageForSpellAttack"))
    ) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            await autoRollDamage(message);
        });
    }

    if (game.settings.get(MODULENAME, "automatedAnimationOn")) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            if (game.user.isGM && game.settings.get(MODULENAME, "automatedAnimationOn")) {
                await playAnimationAndSound(message);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessagePF2e, html: JQuery) => {
            if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault") {
                html.find(".card-content").hide();
            }
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
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (
                game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn") &&
                combatant &&
                combatant.actor &&
                shouldIHandleThis(combatant.isOwner ? game.user?.id : null)
            ) {
                if (combatant.actor.hasCondition("frightened")) {
                    await combatant.actor.decreaseCondition("frightened");
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            await persistentDamage(message);
        });
    }

    if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
        Hooks.on("renderChatMessage", async (message: ChatMessagePF2e) => {
            await persistentHealing(message);
        });
    }

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        const settings: [string, any][] = Array.from(game.settings.settings.entries());
        settings.forEach((setting: [string, any]) => {
            const settingName = setting[0];
            //TODO Do this in a more elegant way
            //Disable all dependent persistentDamage settings
            if (
                settingName !== `${MODULENAME}.applyPersistentAllow` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistent`)
            ) {
                const applyToggle = !(
                    game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                        : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
                );
                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
            //Disable all dependent persistentHealing settings
            if (
                settingName !== `${MODULENAME}.applyPersistentAllow` &&
                setting[0].startsWith(`${MODULENAME}.applyPersistent`)
            ) {
                const applyToggle = !(
                    game.settings.get(MODULENAME, "applyPersistentAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "applyPersistentAllow") === "players"
                        : game.settings.get(MODULENAME, "applyPersistentAllow") === "gm")
                );
                // const valueFunction = game.settings.get(MODULENAME, "applyPersistentAllow") === "none";

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
            if (
                settingName !== `${MODULENAME}.autoRollDamageAllow` &&
                setting[0].startsWith(`${MODULENAME}.autoRollDamage`)
            ) {
                // const valueFunction = game.settings.get(MODULENAME, "autoRollDamage") === "none";
                const applyToggle = !(
                    game.settings.get(MODULENAME, "autoRollDamageAllow") === "none" ||
                    (game.user?.isGM
                        ? game.settings.get(MODULENAME, "autoRollDamageAllow") === "players"
                        : game.settings.get(MODULENAME, "autoRollDamageAllow") === "gm")
                );

                html.find(`input[name="${settingName}"]`).parent().parent().toggle(applyToggle);
                html.find(`select[name="${settingName}"]`).parent().parent().toggle(applyToggle);
            }
        });
    });
}

async function hooksForGMInit() {
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "deprecatedManually") {
        Hooks.on("getCombatTrackerEntryContext", (html: JQuery, entryOptions: any) => {
            deprecatedMoveManually(entryOptions);
        });
    }

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            await moveOnZeroHP(actor, update);
        });
    }

    if (game.settings.get(MODULENAME, "enableAutomaticMove") === "gettingStatusDying") {
        Hooks.on("preUpdateToken", async (tokenDoc: TokenDocumentPF2e, update) => {
            await moveOnDying(tokenDoc, update);
        });
    }
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("createToken", async (token: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                tokenCreateMystification(token);
            }
        });
    }

    if (game.settings.get(MODULENAME, "heroPointHandler")) {
        if (game.user?.isGM) {
            await startTimer(calcRemainingMinutes());
        }
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

    if (game.settings.get(MODULENAME, "reminderBreathWeapon")) {
        Hooks.on("createChatMessage", async (message: ChatMessagePF2e) => {
            if (
                game.settings.get(MODULENAME, "reminderBreathWeapon") &&
                message.data.content &&
                game.combats &&
                game.combats.active &&
                game.combats.active.combatant &&
                game.combats.active.combatant.token &&
                shouldIHandleThisMessage(message, true, true)
            ) {
                const token = game.combats.active.combatant.token;
                const prefix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.prefix`);
                const postfix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.postfix`);
                const matcher = `<p>.*${prefix}.*1d([46])${postfix}.*</p>`;
                const match = message.data.content.match(matcher);
                const matchString = match ? `1d${match[1]}` : "";

                if (matchString) {
                    const effect = {
                        type: "effect",
                        name: "Breath",
                        img: "systems/pf2e/icons/spells/dragon-breath.webp",
                        data: {
                            tokenIcon: {
                                show: true,
                            },
                            duration: {
                                value: 1,
                                unit: "rounds",
                                sustained: false,
                                expiry: "turn-start",
                            },
                        },
                    };

                    effect.data.duration.value = new Roll(matchString).roll({ async: false }).total + 1;
                    const title = message.data.content.match(/.*title="(.*?)" width.*/);
                    effect.name =
                        game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                        (title
                            ? title[1]
                            : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`));
                    await token.actor.createEmbeddedDocuments("Item", [effect]);
                }
            }
        });
    }
}

function hooksForGMSetup() {
    //GM-only hooks that must run at setup
    if (
        game.settings.get(MODULENAME, "npcMystifier") &&
        game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat")) {
        Hooks.on("updateWorldTime", async (_total, diff) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat") &&
                !game.combat?.active &&
                diff >= 1
            ) {
                game.pf2e.effectTracker.removeExpired();
            }
        });
    }

    if (game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn")) {
        Hooks.on("updateCombat", (combat: EncounterPF2e) => {
            if (
                game.user?.isGM &&
                game.settings.get(MODULENAME, "purgeExpiredEffectsEachTurn") &&
                combat.combatant &&
                combat.combatant.actor
            ) {
                game.pf2e.effectTracker.removeExpired(combat.combatant.actor);
            }
        });
    }
}
