/**
 * Entrypoint for xdy-pf2e-workbench.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

// TODO Make it so holding shift pops up a dialog where one can change the name of the mystified creature
// TODO Add an option to have the 'demystify' button post a message to chat/pop up a dialog with demystification details (e.g. pretty much the recall knowledge macro), with the chat button doing the actual demystification.
// TODO Make the button post a chat message with a properly set up RK roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify.
import { preloadTemplates } from "./preloadTemplates";
import { registerWorkbenchSettings } from "./settings";
import {
    doMystificationFromToken,
    mangleChatMessage,
    renderNameHud,
    tokenCreateMystification,
} from "./feature/tokenMystificationHandler";
import { registerWorkbenchKeybindings } from "./keybinds";
import { autoRollDamage, persistentDamage, persistentHealing } from "./feature/damageHandler";
import { moveOnZeroHP, moveSelectedAheadOfCurrent } from "./feature/initiativeHandler";
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { CombatantPF2e, EncounterPF2e } from "@module/encounter";
import { toggleMenuSettings, toggleSettings } from "./feature/settingsHandler";
import { chatCardDescriptionCollapse, damageCardExpand } from "./feature/qolHandler";
import {
    addHeroPoints,
    calcRemainingMinutes,
    createRemainingTimeMessage,
    maxHeroPoints,
    resetHeroPoints,
    startTimer,
} from "./feature/heroPointHandler";
import { isFirstGM, nth } from "./utils";
import { ItemPF2e, SpellPF2e } from "@item";
import { onQuantitiesHook } from "./feature/quickQuantities";
import {
    actionsReminder,
    autoReduceStunned,
    reminderBreathWeapon,
    reminderCannotAttack,
    reminderIWR,
    reminderTargeting,
} from "./feature/reminders";
import { setupNPCScaler } from "./feature/cr-scaler/NPCScalerSetup";
import { setupCreatureBuilder } from "./feature/creature-builder/CreatureBuilder";
import { setupNpcRoller } from "./feature/npc-roller/NpcRoller";
import { SettingsMenuPF2eWorkbench } from "./settings/menu";
import { ChatMessageDataPF2e } from "@module/chat-message/data";
import { UserPF2e } from "@module/user";
import { loadSkillActions, renderSheetSkillActions } from "./feature/skill-actions/sheet-skill-actions";
import { scaleNPCToLevelFromActor } from "./feature/cr-scaler/NPCScaler";
import { generateNameFromTraitsForToken } from "./feature/tokenMystificationHandler/traits-name-generator";
import {
    applyEncumbranceBasedOnBulk,
    autoRemoveUnconsciousAtGreaterThanZeroHP,
    giveUnconsciousIfDyingRemovedAt0HP,
    giveWoundedWhenDyingRemoved,
    increaseDyingOnZeroHP,
    reduceFrightened,
    removeDyingOnZeroHP,
} from "./feature/conditionHandler";

export const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async (_actor: ActorPF2e) => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    registerWorkbenchSettings();

    await preloadTemplates();

    // Handlebars helpers
    Handlebars.registerHelper("ifeq", function (v1, v2, options) {
        return v1 === v2 ? options.fn(this) : options.inverse(this);
    });

    // Hooks that always run
    Hooks.on("renderSettingsMenuPF2eWorkbench", (_app: any, html: JQuery, _settings: SettingsMenuPF2eWorkbench) => {
        toggleMenuSettings(html, _settings);
    });

    Hooks.on("renderSettingsConfig", (_app: any, html: JQuery) => {
        toggleSettings(html);
    });

    // Hooks that only run if a setting that needs it has been enabled

    if (game.settings.get(MODULENAME, "castPrivateSpell")) {
        Hooks.on(
            "preCreateChatMessage",
            async (message: ChatMessagePF2e, data: ChatMessageDataPF2e, _options, _user: UserPF2e) => {
                if (
                    game.settings.get(MODULENAME, "castPrivateSpell") &&
                    message.flags.pf2e?.casting?.id &&
                    (!message.data.whisper || message.data.whisper.length === 0) &&
                    game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL) // TODO Doesn't work on mac?
                ) {
                    data.type = CONST.CHAT_MESSAGE_TYPES.WHISPER;
                    data.whisper = ChatMessage.getWhisperRecipients("GM").map((u) => u.id);
                    if (!game.user.isGM) {
                        data.whisper.push(game.user.id);
                    }
                    message.data.update(data);

                    if (
                        game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessage") &&
                        !game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT) // TODO Doesn't work on mac?
                    ) {
                        const vsmf = <string>(
                            message.content
                                .match(
                                    game.i18n.localize(
                                        `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.components`
                                    ) + " ([FVSM]+)"
                                )?.[1]
                                ?.toUpperCase()
                        );
                        let tokenName: string;
                        const anonymous = game.i18n.localize(
                            `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.they`
                        );
                        if (<boolean>game.settings.get("pf2e", "metagame.tokenSetsNameVisibility")) {
                            tokenName = anonymous;
                        } else {
                            tokenName = message.token?.name ?? message.actor?.name ?? anonymous;
                        }
                        const type = message.flags?.pf2e.origin?.type ?? "spell";
                        const traditionString = message.flags.pf2e.casting.tradition;
                        const origin: SpellPF2e | null = await fromUuid(<string>message.flags?.pf2e.origin?.uuid);
                        let content = "";
                        if (origin) {
                            content = game.i18n.localize(
                                game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.firstPart`, {
                                    tokenName: tokenName,
                                    vsmf: vsmf ? vsmf : "",
                                    type: type,
                                    traditionString: traditionString,
                                })
                            );

                            if (game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowTraits")) {
                                content += game.i18n.localize(
                                    game.i18n.format(
                                        `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.traitPart`,
                                        {
                                            traits: Object.values(origin.system.traits.value)
                                                .map((trait) => trait.valueOf())
                                                .sort()
                                                .join(", "),
                                        }
                                    )
                                );
                            }

                            let dcRK = 0;
                            const level = origin.system.level.value;
                            if (level === 1) {
                                dcRK = 15;
                            } else if (level === 2) {
                                dcRK = 18;
                            } else if (level === 3) {
                                dcRK = 20;
                            } else if (level === 4) {
                                dcRK = 23;
                            } else if (level === 5) {
                                dcRK = 26;
                            } else if (level === 6) {
                                dcRK = 28;
                            } else if (level === 7) {
                                dcRK = 31;
                            } else if (level === 8) {
                                dcRK = 34;
                            } else if (level === 9) {
                                dcRK = 36;
                            } else if (level === 10) {
                                dcRK = 39;
                            }

                            switch (origin.system.traits?.rarity ?? "common") {
                                case "uncommon":
                                    dcRK += 2;
                                    break;
                                case "rare":
                                    dcRK += 5;
                                    break;
                                case "unique":
                                    dcRK += 10;
                                    break;
                                default:
                                    dcRK += 0;
                            }

                            const tradition = traditionString;
                            let skill = "";
                            if (tradition === "arcane") {
                                skill = "arcana";
                            } else if (tradition === "divine") {
                                skill = "religion";
                            } else if (tradition === "occult") {
                                skill = "occultism";
                            } else if (tradition === "primal") {
                                skill = "nature";
                            }
                            content += game.i18n.format(
                                `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartRK`,
                                {
                                    skill: skill,
                                    dcRK: dcRK,
                                    rk: "&#123;Recall Knowledge	&#125;", // Grr
                                }
                            );
                        } else {
                            content += game.i18n.localize(
                                `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartNoRK`
                            );
                        }

                        const buttons = $(data.content).find("button");
                        const saveButtons = buttons.filter((i) => buttons[i].getAttribute("data-action") === "save");
                        if (saveButtons.length === 1) {
                            const dataSave = saveButtons.attr("data-save") ?? "";
                            const dataDC = saveButtons.attr("data-dc") ?? "";
                            content += game.i18n.format(
                                `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.savePart`,
                                {
                                    dataSave: dataSave,
                                    dataDC: dataDC,
                                }
                            );
                        }

                        const token: any = message.token;
                        await ChatMessage.create({
                            content: content,
                            speaker: ChatMessage.getSpeaker({ token: token }),
                        });
                    }
                }
            }
        );
    }

    if (
        game.settings.get(MODULENAME, "autoRollDamageAllow") ||
        game.settings.get(MODULENAME, "autoRollDamageForStrike") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellAttack") ||
        game.settings.get(MODULENAME, "autoRollDamageForSpellNotAnAttack") ||
        game.settings.get(MODULENAME, "automatedAnimationOn") ||
        game.settings.get(MODULENAME, "reminderBreathWeapon") ||
        game.settings.get(MODULENAME, "reminderTargeting") ||
        game.settings.get(MODULENAME, "reminderIWR") ||
        game.settings.get(MODULENAME, "reminderCannotAttack")
    ) {
        Hooks.on("createChatMessage", (message: ChatMessagePF2e) => {
            if (game.settings.get(MODULENAME, "reminderCannotAttack")) {
                reminderCannotAttack(message);
            }

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
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
        game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNewest" ||
        game.settings.get(MODULENAME, "applyPersistentHealing") ||
        game.settings.get(MODULENAME, "applyPersistentDamage") ||
        (game.settings.get(MODULENAME, "npcMystifier") &&
            game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat"))
    ) {
        Hooks.on("renderChatMessage", (message: ChatMessage<Actor>, html: JQuery) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifierUseMystifiedNameInChat")) {
                mangleChatMessage(message, html);
            }

            if (game.settings.get(MODULENAME, "applyPersistentHealing")) {
                persistentHealing(message).then();
            }

            if (game.settings.get(MODULENAME, "applyPersistentDamage")) {
                persistentDamage(message).then();
            }

            if (
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault" ||
                game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "nonCollapsedDefault"
            ) {
                chatCardDescriptionCollapse(html);
            }

            if (
                message.flags.pf2e.damageRoll &&
                (game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll" ||
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew" ||
                    game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNewest")
            ) {
                damageCardExpand(html);
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        Hooks.on("createItem", async (item: any, _options: any, _id: any) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                await applyEncumbranceBasedOnBulk(item);
            }
        });
    }

    if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
        Hooks.on("updateItem", async (item: any, _options: any, _id: any) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                await applyEncumbranceBasedOnBulk(item);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk") ||
        game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
        game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
    ) {
        Hooks.on("deleteItem", async (item: ItemPF2e, _options: {}) => {
            if (game.settings.get(MODULENAME, "applyEncumbranceBasedOnBulk")) {
                await applyEncumbranceBasedOnBulk(item);
            }

            if (
                game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved") ||
                game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")
            ) {
                if (game.settings.get(MODULENAME, "giveWoundedWhenDyingRemoved")) {
                    giveWoundedWhenDyingRemoved(item).then(() => {
                        console.log("Workbench giveWoundedWhenDyingRemoved complete");
                        if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                            giveUnconsciousIfDyingRemovedAt0HP(item).then(() => {
                                console.log("Workbench giveUnconsciousIfDyingRemovedAt0HP complete");
                            });
                        }
                    });
                } else if (game.settings.get(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP")) {
                    await giveUnconsciousIfDyingRemovedAt0HP(item);
                }
            }
        });
    }

    if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
        Hooks.on("pf2e.endTurn", (combatant: CombatantPF2e, _combat: EncounterPF2e, userId: string) => {
            if (game.settings.get(MODULENAME, "decreaseFrightenedConditionEachTurn")) {
                reduceFrightened(combatant, userId).then(() => console.log("Workbench reduceFrightened complete"));
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "actionsReminderAllow") !== "none" ||
        game.settings.get(MODULENAME, "autoReduceStunned")
    ) {
        Hooks.on("pf2e.startTurn", async (combatant: CombatantPF2e, _combat: EncounterPF2e, _userId: string) => {
            const forWhom = game.settings.get(MODULENAME, "actionsReminderAllow");
            if (game.settings.get(MODULENAME, "autoReduceStunned")) {
                autoReduceStunned(combatant).then((reduction) => {
                    if (forWhom !== "none") {
                        actionsReminder(combatant, reduction).then(() =>
                            console.log("Workbench actionsReminderAllow complete")
                        );
                    }
                });
            } else if (forWhom !== "none") {
                actionsReminder(combatant, 0).then(() => console.log("Workbench actionsReminderAllow complete"));
            }
        });
    }

    if (game.settings.get(MODULENAME, "npcMystifier")) {
        Hooks.on("renderTokenHUD", (_app, html: JQuery, data: any) => {
            if (game.user?.isGM && game.settings.get(MODULENAME, "npcMystifier")) {
                renderNameHud(data, html);
            }
        });
    }
    if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
        Hooks.on("renderCharacterSheetPF2e", (app: TokenHUD, html: JQuery, data: any) => {
            if (game.settings.get(MODULENAME, "maxHeroPoints") !== 3) {
                maxHeroPoints(app, html, data);
            }
        });
    }

    if (
        game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP" ||
        game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none" ||
        game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")
    ) {
        Hooks.on("preUpdateActor", async (actor: ActorPF2e, update: Record<string, string>) => {
            const hp = actor.system.attributes.hp?.value || 0;
            if (game.combat && game.settings.get(MODULENAME, "enableAutomaticMove") === "reaching0HP") {
                moveOnZeroHP(actor, deepClone(update), hp).then(() => console.log("Workbench moveOnZeroHP complete"));
            }

            if (
                game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none" ||
                game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none"
            ) {
                if (game.settings.get(MODULENAME, "autoGainDyingAtZeroHP") !== "none") {
                    increaseDyingOnZeroHP(actor, deepClone(update), hp).then(() => {
                        console.log("Workbench increaseDyingOnZeroHP complete");
                        if (game.settings.get(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP") !== "none") {
                            // Ugh.
                            new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
                                removeDyingOnZeroHP(actor, deepClone(update), hp).then(() =>
                                    console.log("Workbench autoRemoveDyingAtGreaterThanZeroHP complete")
                                );
                            });
                        }
                    });
                } else {
                    removeDyingOnZeroHP(actor, deepClone(update), hp).then(() =>
                        console.log("Workbench autoRemoveDyingAtGreaterThanZeroHP complete")
                    );
                }
            }

            if (game.settings.get(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP")) {
                autoRemoveUnconsciousAtGreaterThanZeroHP(actor, deepClone(update), hp).then(() =>
                    console.log("Workbench autoRemoveUnconsciousAtGreaterThanZeroHP complete")
                );
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
        game.settings.get(MODULENAME, "castPrivateSpell") ||
        game.settings.get(MODULENAME, "addGmRKButtonToNpc") ||
        game.settings.get(MODULENAME, "quickQuantities") ||
        game.settings.get(MODULENAME, "skillActions") !== "disabled"
    ) {
        Hooks.on("renderActorSheet", (sheet: ActorSheet<Actor, Item>, $html: JQuery) => {
            if (game.settings.get(MODULENAME, "quickQuantities")) {
                onQuantitiesHook(sheet, $html);
            }

            if (game.settings.get(MODULENAME, "castPrivateSpell")) {
                $html.find(".cast-spell").each((_i, e) => {
                    const $e = $(e);
                    $e.addClass(`xdy-pf2e-workbench-secret-spell`);
                });
            }

            if (game.settings.get(MODULENAME, "playerItemsRarityColour")) {
                $html.find(".item").each((_i, e) => {
                    $(e).each((_i, e) => {
                        const rarity = $(e).attr("data-item-rarity");
                        const mystified = $(e).find("span").hasClass("gm-mystified-data");
                        if (rarity && !mystified) {
                            $(e).find("h4").addClass(`xdy-pf2e-workbench-rarity-${rarity}`);
                        }
                    });
                });
            }

            if (game.user?.isGM && game.settings.get(MODULENAME, "addGmRKButtonToNpc")) {
                $html.find(".recall-knowledge").each((_i, e) => {
                    const token = sheet.token;
                    $(e)
                        .find(".section-body")
                        .each((_i, e) => {
                            const $e = $(e);
                            if ($e.find(".identification-skills").length === 0) {
                                return;
                            }
                            for (const s of $e.find("ul").text().trim().split("\n")) {
                                const skill = s.toLowerCase().trim();
                                $e.append(
                                    `<button class="gm-recall-knowledge-${skill}" data-skill="${skill}" data-dcs="${<
                                        string
                                    >$e.find(".identification-skills")[0].title}" data-token="${
                                        token?.id
                                    }">Recall Knowledge: ${skill}</button>`
                                );
                                const b = `.gm-recall-knowledge-${skill}`;
                                $html.find(b).on("click", async (e) => {
                                    const attr = <string>$(e.currentTarget).attr("data-token");
                                    const token: any = game?.scenes?.active?.tokens?.get(attr);
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
                                        content: TextEditor.enrichHTML(content, { async: false }),
                                        speaker: ChatMessage.getSpeaker({ token: token }),
                                    });
                                });
                            }
                        });
                });
            }
            if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
                renderSheetSkillActions(sheet, $html);
            }
        });
    }

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(`${MODULENAME} | Setting up`);
    // Do anything after initialization but before ready

    registerWorkbenchKeybindings();

    // General module setup

    if (game.settings.get(MODULENAME, "abpVariantAllowItemBonuses")) {
        game.pf2e.variantRules.AutomaticBonusProgression.suppressRuleElement = function suppressRuleElement(): boolean {
            return false;
        };
    }

    if (game.settings.get(MODULENAME, "npcScaler")) {
        setupNPCScaler();
    }

    if (game.settings.get(MODULENAME, "creatureBuilder")) {
        setupCreatureBuilder();
    }

    if (game.settings.get(MODULENAME, "npcRoller")) {
        await setupNpcRoller();
    }
});

async function migrateFeatures() {
    // Currently only flat check notes
    // @ts-ignore - no type definition for this yet
    const moduleVersion = game.modules.get(MODULENAME)?.version;
    const worldVersion = game.settings.get(MODULENAME, "workbenchVersion");
    if (moduleVersion !== worldVersion) {
        const pack = game.packs.find((p) => p.collection === `${MODULENAME}.xdy-pf2e-workbench-items`);
        await pack?.getIndex();
        const entry = pack?.index.find((e) => e.name.startsWith("Workbench Flat Check Notes"));
        const flatcheckNotes: any = await pack?.getDocument(<string>entry?._id);
        if (flatcheckNotes) {
            for (const actor of game.actors) {
                const filter = actor.items.filter((item) => item.name.startsWith("Workbench Flat Check Notes"));
                for (const item of filter) {
                    await actor.deleteEmbeddedDocuments("Item", [item.id]);
                }
                if (filter?.length > 0) {
                    await actor.createEmbeddedDocuments("Item", [flatcheckNotes.system]);
                }
            }

            for (const s of game.scenes) {
                for (const t of s.tokens) {
                    const actor = t.actor;
                    if (!actor || t.isLinked) {
                        // Ignore tokens with no actor as well as linked tokens (they have been handled above).
                        continue;
                    }
                    const filter = actor.items.filter((item) => item.name.startsWith("Workbench Flat Check Notes"));
                    for (const item of filter) {
                        await actor.deleteEmbeddedDocuments("Item", [item.id]);
                    }
                    if (filter?.length > 0) {
                        await actor.createEmbeddedDocuments("Item", [flatcheckNotes.system]);
                    }
                }
            }
        }
        game.settings.set(MODULENAME, "workbenchVersion", moduleVersion);
    } else {
        return;
    }
}

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(`${MODULENAME} | Ready`);

    // Must be in ready

    if (isFirstGM()) {
        await migrateFeatures();
    }

    if (game.modules.get("pf2e-sheet-skill-actions")?.active) {
        ui.notifications.error(
            "The module pf2e-sheet-skill-actions is no longer maintained, all it's functions are part of the Workbench, please turn it off."
        );
    }

    // Make some functions available for macros
    game["PF2eWorkbench"] = {
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // await game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
    };

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

    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        loadSkillActions();
    }

    // if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
    //     Hooks.once("babele.ready", async () => {
    //         if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
    //             // Reload actions to have translated actions
    //             await ActionsIndex.instance.loadCompendium("pf2e.feats-srd");
    //             await ActionsIndex.instance.loadCompendium("pf2e.actionspf2e");
    //         }
    //     });
    // }
    //
    Hooks.callAll(`${MODULENAME}.moduleReady`);
});
