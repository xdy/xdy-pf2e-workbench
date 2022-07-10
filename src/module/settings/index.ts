// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on

import { MODULENAME } from "../xdy-pf2e-workbench";
import { MystificationSettings } from "./mystification";
export { mystifyModifierKey } from "./mystification";

function debouncedReload() {
    foundry.utils.debounce(() => {
        window.location.reload();
    }, 100);
}

export function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    MystificationSettings.registerSettingsAndCreateMenu();

    game.settings.register(MODULENAME, "maxHeroPoints", {
        name: `${MODULENAME}.SETTINGS.maxHeroPoints.name`,
        hint: `${MODULENAME}.SETTINGS.maxHeroPoints.hint`,
        scope: "world",
        config: true,
        default: 3,
        type: Number,
        // @ts-ignore Shut up typescript, it works.
        range: {
            min: 0,
            max: 10,
            step: 1,
        },
    });

    game.settings.register(MODULENAME, "applyEncumbranceBasedOnBulk", {
        name: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.name`,
        hint: `${MODULENAME}.SETTINGS.applyEncumbranceBasedOnBulk.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "reminderCannotAttack", {
        name: `${MODULENAME}.SETTINGS.reminderCannotAttack.name`,
        hint: `${MODULENAME}.SETTINGS.reminderCannotAttack.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "creatureBuilder", {
        name: `${MODULENAME}.SETTINGS.creatureBuilder.name`,
        hint: `${MODULENAME}.SETTINGS.creatureBuilder.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "npcScaler", {
        name: `${MODULENAME}.SETTINGS.npcScaler.name`,
        hint: `${MODULENAME}.SETTINGS.npcScaler.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "reminderIWR", {
        name: `${MODULENAME}.SETTINGS.reminderIWR.name`,
        hint: `${MODULENAME}.SETTINGS.reminderIWR.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "reminderTargeting", {
        name: `${MODULENAME}.SETTINGS.reminderTargeting.name`,
        hint: `${MODULENAME}.SETTINGS.reminderTargeting.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "addGmRKButtonToNpc", {
        name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.name`,
        hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "addGmRKButtonToNpcHideNpcName", {
        name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideNpcName`,
        hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideNpcName`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "addGmRKButtonToNpcHideSkill", {
        name: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideSkill`,
        hint: `${MODULENAME}.SETTINGS.addGmRKButtonToNpc.hideSkill`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "abpVariantAllowItemBonuses", {
        name: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.name`,
        hint: `${MODULENAME}.SETTINGS.abpVariantAllowItemBonuses.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "heroPointHandler", {
        name: `${MODULENAME}.SETTINGS.heroPointHandler.name`,
        hint: `${MODULENAME}.SETTINGS.heroPointHandler.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "heroPointHandlerStartTimerOnReady", {
        name: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.name`,
        hint: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "enableAutomaticMove", {
        name: `${MODULENAME}.SETTINGS.enableAutomaticMove.name`,
        hint: `${MODULENAME}.SETTINGS.enableAutomaticMove.hint`,
        scope: "world",
        config: true,
        default: "noAutomation",
        type: String,
        choices: {
            noAutomation: game.i18n.localize(`${MODULENAME}.SETTINGS.enableAutomaticMove.noAutomation`),
            reaching0HP: game.i18n.localize(`${MODULENAME}.SETTINGS.enableAutomaticMove.reaching0HP`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOn", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOn.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOn.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnFailAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Miss_02_White_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnFailSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnFailSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritFailAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Miss_02_White_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritFailSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritFailSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Miss/melee-miss-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritSuccessAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/UI/Critical_02_Red_200x200.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnCritSuccessSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnCritSuccessSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-13.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnSuccessAnimation", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessAnimation.hint`,
        scope: "world",
        config: true,
        default: "modules/JB2A_DnD5e/Library/Generic/Impact/Impact_01_Regular_Blue_400x400.webm",
        type: String,
        filePicker: "video",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationOnSuccessSound", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationOnSuccessSound.hint`,
        scope: "world",
        config: true,
        default: "modules/soundfxlibrary/Combat/Single/Melee%20Hit/melee-hit-1.mp3",
        type: String,
        filePicker: "audio",
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "automatedAnimationMissOffTarget", {
        name: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.name`,
        hint: `${MODULENAME}.SETTINGS.automatedAnimationMissOffTarget.hint`,
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "actionsReminderAllow", {
        name: `${MODULENAME}.SETTINGS.actionsReminderAllow.name`,
        hint: `${MODULENAME}.SETTINGS.actionsReminderAllow.hint`,
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            none: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.none`),
            all: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.all`),
            gm: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.gm`),
            players: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.players`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "actionsReminderAutoReduceStunned", {
        name: `${MODULENAME}.SETTINGS.actionsReminderAutoReduceStunned.name`,
        hint: `${MODULENAME}.SETTINGS.actionsReminderAutoReduceStunned.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRollDamageAllow", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageAllow.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageAllow.hint`,
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.none`),
            all: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.all`),
            gm: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.gm`),
            players: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRollDamageAllow.players`),
        },
        onChange: () => debouncedReload(),
    });

    //NOTE Do NOT rename this without talking to Symon S, his macros for Spellstrike and Eldritch shot parse for workbench and its settings to avoid double rolling damage.
    game.settings.register(MODULENAME, "autoRollDamageForStrike", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRollDamageForSpellAttack", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageForSpellAttack.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageForSpellAttack.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRollDamageForSpellNotAnAttack", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageForSpellNotAnAttack.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageForSpellNotAnAttack.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRollDamageNotifyOnSpellCardNotFound", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageNotifyOnSpellCardNotFound.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageNotifyOnSpellCardNotFound.hint`,
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "applyPersistentAllow", {
        name: `${MODULENAME}.SETTINGS.applyPersistentAllow.name`,
        hint: `${MODULENAME}.SETTINGS.applyPersistentAllow.hint`,
        scope: "world",
        config: true,
        default: "none",
        type: String,
        choices: {
            none: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.none`),
            all: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.all`),
            gm: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.gm`),
            players: game.i18n.localize(`${MODULENAME}.SETTINGS.applyPersistentAllow.players`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "applyPersistentDamage", {
        name: `${MODULENAME}.SETTINGS.applyPersistentDamage.name`,
        hint: `${MODULENAME}.SETTINGS.applyPersistentDamage.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "applyPersistentDamageSeparateMessage", {
        name: `${MODULENAME}.SETTINGS.applyPersistentDamageSeparateMessage.name`,
        hint: `${MODULENAME}.SETTINGS.applyPersistentDamageSeparateMessage.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "applyPersistentHealing", {
        name: `${MODULENAME}.SETTINGS.applyPersistentHealing.name`,
        hint: `${MODULENAME}.SETTINGS.applyPersistentHealing.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "applyPersistentHealingSeparateMessage", {
        name: `${MODULENAME}.SETTINGS.applyPersistentHealingSeparateMessage.name`,
        hint: `${MODULENAME}.SETTINGS.applyPersistentHealingSeparateMessage.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "autoCollapseItemChatCardContent", {
        name: `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.name`,
        hint: `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.hint`,
        scope: "client",
        config: true,
        default: "noCollapse",
        type: String,
        choices: {
            noCollapse: game.i18n.localize(`${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.noCollapse`),
            collapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.collapsedDefault`
            ),
            nonCollapsedDefault: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoCollapseItemChatCardContent.nonCollapsedDefault`
            ),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoExpandDamageRolls", {
        name: `${MODULENAME}.SETTINGS.autoExpandDamageRolls.name`,
        hint: `${MODULENAME}.SETTINGS.autoExpandDamageRolls.hint`,
        scope: "client",
        config: true,
        default: "collapsedDefault",
        type: String,
        choices: {
            collapsedAll: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.collapsedAll`),
            expandedAll: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedAll`),
            expandedNew: game.i18n.localize(`${MODULENAME}.SETTINGS.autoExpandDamageRolls.expandedNew`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "toggleUndetectedWithVisibilityState", {
        name: `${MODULENAME}.SETTINGS.toggleUndetectedWithVisibilityState.name`,
        hint: `${MODULENAME}.SETTINGS.toggleUndetectedWithVisibilityState.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "giveUnconsciousIfDyingRemovedAt0HP", {
        name: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.name`,
        hint: `${MODULENAME}.SETTINGS.giveUnconsciousIfDyingRemovedAt0HP.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRemoveUnconsciousAtGreaterThanZeroHP", {
        name: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.name`,
        hint: `${MODULENAME}.SETTINGS.autoRemoveUnconsciousAtGreaterThanZeroHP.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "giveWoundedWhenDyingRemoved", {
        name: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.name`,
        hint: `${MODULENAME}.SETTINGS.giveWoundedWhenDyingRemoved.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoGainDyingAtZeroHP", {
        name: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.name`,
        hint: `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.hint`,
        scope: "client",
        config: true,
        default: "none",
        type: String,
        choices: {
            none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.no`),
            addOne: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addOne`),
            addWoundedLevel: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addWoundedLevel`),
            addOneForCharacters: game.i18n.localize(`${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addOneForCharacters`),
            addWoundedLevelForCharacters: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoGainDyingAtZeroHP.addWoundedLevelForCharacters`
            ),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "autoRemoveDyingAtGreaterThanZeroHP", {
        name: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.name`,
        hint: `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.hint`,
        scope: "client",
        config: true,
        default: "none",
        type: String,
        choices: {
            none: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.no`),
            remove: game.i18n.localize(`${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDying`),
            removeForCharacters: game.i18n.localize(
                `${MODULENAME}.SETTINGS.autoRemoveDyingAtGreaterThanZeroHP.removeDyingForCharacters`
            ),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "decreaseFrightenedConditionEachTurn", {
        name: `${MODULENAME}.SETTINGS.decreaseFrightenedConditionEachTurn.name`,
        hint: `${MODULENAME}.SETTINGS.decreaseFrightenedConditionEachTurn.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "reminderBreathWeapon", {
        name: `${MODULENAME}.SETTINGS.reminderBreathWeapon.name`,
        hint: `${MODULENAME}.SETTINGS.reminderBreathWeapon.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "quickQuantities", {
        name: `${MODULENAME}.SETTINGS.quickQuantities.name`,
        hint: `${MODULENAME}.SETTINGS.quickQuantities.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "playerItemsRarityColour", {
        name: `${MODULENAME}.SETTINGS.playerItemsRarityColour.name`,
        hint: `${MODULENAME}.SETTINGS.playerItemsRarityColour.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });
}
