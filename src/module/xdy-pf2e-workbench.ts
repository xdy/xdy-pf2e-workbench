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
import { toggleSettings } from "./feature/settingsHandler";
import { increaseDyingOnZeroHP, reduceFrightened, removeDyingOnZeroHP } from "./feature/conditionHandler";
import { chatCardDescriptionCollapse, damageCardExpand } from "./feature/qolHandler";
import { calcRemainingMinutes, createRemainingTimeMessage, startTimer } from "./feature/heroPointHandler";
import { nth, shouldIHandleThis } from "./utils";
import { ItemPF2e } from "@item";
import { onQuantitiesHook } from "./feature/quickQuantities";
import { actionsReminder, reminderBreathWeapon, reminderIWR, reminderTargeting } from "./feature/reminders";
import { setupNPCScaler } from "./feature/cr-scaler/NPCScalerSetup";

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
    if (game.settings.get(MODULENAME, "quickQuantities")) {
        Hooks.on("renderActorSheet", (app: any, html: JQuery) => {
            if (game.settings.get(MODULENAME, "quickQuantities")) {
                onQuantitiesHook(app, html);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoRollDamageAllow") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack") ||
        game.settings.get(MODULENAME, "automatedAnimationOn") ||
        game.settings.get(MODULENAME, "reminderBreathWeapon") ||
        game.settings.get(MODULENAME, "reminderTargeting")
    ) {
        Hooks.on("createChatMessage", (message: ChatMessagePF2e) => {
            if (game.settings.get(MODULENAME, "reminderTargeting")) {
                reminderTargeting(message);
            }

            if (!message.isDamageRoll) {
                if (
                    game.settings.get(MODULENAME, "autoRollDamageAllow") &&
                    (game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
                        game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
                        game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack"))
                ) {
                    autoRollDamage(message).then(() => console.log("Workbench autoRollDamage complete"));
                }

                if (game.settings.get(MODULENAME, "reminderBreathWeapon")) {
                    reminderBreathWeapon(message).then(() => console.log("Workbench reminderBreathWeapon complete"));
                }

                if (game.user.isGM && game.settings.get(MODULENAME, "automatedAnimationOn")) {
                    playAnimationAndSound(message).then(() => console.log("Workbench playAnimationAndSound complete"));
                }
            } else {
                if (game.settings.get(MODULENAME, "reminderIWR")) {
                    reminderIWR(message).then(() => console.log("Workbench reminderIWR complete"));
                }
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
        game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "collapsedAll" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
        game.settings.get(MODULENAME, "applyPersistentHealing") ||
        game.settings.get(MODULENAME, "applyPersistentDamage") ||
        (game.settings.get(MODULENAME, "npcMystifier") &&
            game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat"))
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessagePF2e, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }

            if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
                persistentHealing(message).then(() => console.log("Workbench persistentHealing complete"));
            }

            if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
                persistentDamage(message).then(() => console.log("Workbench persistentDamage complete"));
            }

            if (
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
            ) {
                chatCardDescriptionCollapse(html);
            }

            if (
                !!message.data.flags.pf2e.damageRoll &&
                (game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew")
            ) {
                damageCardExpand(html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
        Hooks.on("deleteItem", async (item: ItemPF2e, options: {}) => {
            const actor = <ActorPF2e>item.parent;
            const bounceBack = actor.data.items.find((feat) => feat.slug === "bounce-back"); //TODO https://2e.aonprd.com/Feats.aspx?ID=1441
            const bounceBackUsed: any = actor.data.items.find((effect) => effect.slug === "bounce-back-used") ?? false;

            const numbToDeath = actor.data.items.find((feat) => feat.slug === "numb-to-death"); //TODO https://2e.aonprd.com/Feats.aspx?ID=1182
            const numbToDeathUsed: any =
                actor.data.items.find((effect) => effect.slug === "numb-to-death-used") ?? false;
            if (
                item.slug === "dying" &&
                (await game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) &&
                shouldIHandleThis(item.isOwner ? game.user?.id : null)
            ) {
                if (numbToDeath && (!numbToDeathUsed || bounceBackUsed.isExpired)) {
                    const effect: any = {
                        type: "effect",
                        name: game.i18n.localize(`${MODULENAME}.effects.numbToDeathUsed`),
                        img: "icons/magic/death/hand-dirt-undead-zombie.webp",
                        data: {
                            slug: "numb-to-death-used",
                            tokenIcon: {
                                show: false,
                            },
                            duration: {
                                value: 24,
                                unit: "hours",
                                sustained: false,
                                expiry: "turn-start",
                            },
                        },
                    };

                    await ChatMessage.create({
                        flavor: game.i18n.format(
                            `${
                                actor.token?.name ?? actor.name
                            } has just triggered Numb To Death and can now heal ${TextEditor.enrichHTML(
                                `[[/r ${actor.level}]] points of damage.`
                            )}.`
                        ),
                        speaker: ChatMessage.getSpeaker({ actor: actor }),
                        whisper:
                            game.settings.get("pf2e", "metagame.secretDamage") && !actor?.hasPlayerOwner
                                ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                                : [],
                    });

                    await actor.createEmbeddedDocuments("Item", [effect]);
                } else if (bounceBack && (!bounceBackUsed || bounceBackUsed.isExpired)) {
                    const effect: any = {
                        type: "effect",
                        name: game.i18n.localize(`${MODULENAME}.effects.bounceBackUsed`),
                        img: "icons/magic/life/ankh-gold-blue.webp",
                        data: {
                            slug: "bounce-back-used",
                            tokenIcon: {
                                show: false,
                            },
                            duration: {
                                value: 24,
                                unit: "hours",
                                sustained: false,
                                expiry: "turn-start",
                            },
                        },
                    };

                    await actor.createEmbeddedDocuments("Item", [effect]);
                } else {
                    await item.parent?.increaseCondition("wounded");
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
                reduceFrightened(combatant).then(() => console.log("Workbench reduceFrightened complete"));
            }
        });
    }

    if (game.settings.get(MODULENAME, "actionsReminderAllow")) {
        Hooks.on("pf2e.startTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            if (game.settings.get(MODULENAME, "actionsReminderAllow")) {
                actionsReminder(combatant).then(() => console.log("Workbench actionsReminderAllow complete"));
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
        game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none"
    ) {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            const hp = actor.data.data.attributes.hp?.value || 0;
            const updateClone = deepClone(update);
            if (game.combat && game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
                moveOnZeroHP(actor, updateClone, game.combat, hp).then(() =>
                    console.log("Workbench moveOnZeroHP complete")
                );
            }

            if (game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none") {
                increaseDyingOnZeroHP(actor, updateClone, hp).then(() =>
                    console.log("Workbench increaseDyingOnZeroHP complete")
                );
            }

            if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                removeDyingOnZeroHP(actor, updateClone, hp).then(() =>
                    console.log("Workbench autoRemoveDyingAtGreaterThanZeroHP complete")
                );
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
                tokenCreateMystification(token).then(() => console.log("Workbench tokenCreateMystification complete"));
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "playerItemsRarityColour") ||
        game.settings.get(MODULENAME, "addGmRKButtonToNpc")
    ) {
        Hooks.on("renderActorSheet", (sheet: ActorSheet<ActorPF2e, ItemPF2e>, $html: JQuery) => {
            if (game.settings.get(MODULENAME, "playerItemsRarityColour")) {
                $html.find(".item-list").each((i, e) => {
                    $(e)
                        .find(".list-row")
                        .each((i, e) => {
                            const $e = $(e);
                            const rarity = $e.attr("data-item-rarity");
                            if (rarity) {
                                $e.find("h4").addClass(`xdy-pf2e-workbench-rarity-${rarity}`);
                            }
                        });
                });
            }
            if (game.settings.get(MODULENAME, "addGmRKButtonToNpc")) {
                $html.find(".recall-knowledge").each((i, e) => {
                    const token = sheet.token;
                    const actor = token?.actor;
                    $(e)
                        .find(".section-body")
                        .each((i, e) => {
                            const $e = $(e);
                            if ($e.find(".identification-skills").length === 0) {
                                return;
                            }
                            const dcs = <string>$e.find(".identification-skills")[0].title;
                            const skills = $e.find("ul");
                            for (const s of skills.text().trim().split("\n")) {
                                const skill = s.toLowerCase().trim();
                                const a = `<button class="gm-recall-knowledge-${skill}" data-skill="${skill}" data-dcs="${dcs}" data-token="${token?.id}">Recall Knowledge: ${skill}</button>`;
                                $e.append(a);
                                const b = `.gm-recall-knowledge-${skill}`;
                                $html.find(b).on("click", async (e) => {
                                    const attr = <string>$(e.currentTarget).attr("data-token");
                                    const token = game?.scenes?.active?.tokens?.get(attr);
                                    const skill = $(e.currentTarget).attr("data-skill");
                                    const dcs = (<string>$(e.currentTarget).attr("data-dcs")).split("/") || [];

                                    const name = game.settings.get(MODULENAME, "addGmRKButtonToNpcHideNpcName")
                                        ? ""
                                        : ` about ${token?.name}`;
                                    let content = `To Recall Knowledge${name}, roll:`;

                                    for (let i = 0; i < dcs.length; i++) {
                                        content += `<br>${i + 1}${nth(i + 1)}: @Check[type:${skill}|dc:${
                                            dcs[i]
                                        }|traits:secret,action:recall-knowledge]`;
                                        content += game.settings.get(MODULENAME, "addGmRKButtonToNpcHideSkill")
                                            ? `{Recall Knowledge} `
                                            : " ";
                                    }
                                    await ChatMessage.create({
                                        content: TextEditor.enrichHTML(content),
                                        speaker: ChatMessage.getSpeaker({ token: token }),
                                    });
                                });
                            }
                        });
                });
            }
        });
    }

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
    if (game.settings.get(MODULENAME, "npcScaler")) {
        setupNPCScaler();
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
                startTimer(remainingMinutes).then(() => {
                    createRemainingTimeMessage(remainingMinutes);
                    console.log("Workbench tokenCreateMystification complete");
                });
            }
        }
    }

    Hooks.callAll(`${MODULENAME}.moduleReady`);
});
