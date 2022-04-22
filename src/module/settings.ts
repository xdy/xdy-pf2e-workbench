// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on

import { MODULENAME } from "./xdy-pf2e-workbench";

export let mystifyModifierKey: string;

function debouncedReload() {
    foundry.utils.debounce(() => {
        location.reload();
    }, 100);
}

export function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

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
            deprecatedGettingStatusDying: game.i18n.localize(
                `${MODULENAME}.SETTINGS.enableAutomaticMove.deprecatedGettingStatusDying`
            ),
            deprecatedManually: game.i18n.localize(`${MODULENAME}.SETTINGS.enableAutomaticMove.deprecatedManually`),
        },
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "npcMystifier", {
        name: `${MODULENAME}.SETTINGS.npcMystifier.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifier.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    game.settings.register(MODULENAME, "npcMystifierMethod", {
        name: `${MODULENAME}.SETTINGS.npcMystifierMethod.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierMethod.hint`,
        scope: "world",
        config: true,
        default: "traits",
        type: String,
        choices: {
            traits: `${MODULENAME}.SETTINGS.npcMystifierMethod.traits`,
        },
    });

    //These apply to all mystification methods, I think
    game.settings.register(MODULENAME, "npcMystifierPrefix", {
        name: `${MODULENAME}.SETTINGS.npcMystifierPrefix.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierPrefix.hint`,
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    game.settings.register(MODULENAME, "npcMystifierPostfix", {
        name: `${MODULENAME}.SETTINGS.npcMystifierPostfix.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierPostfix.hint`,
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    game.settings.register(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor", {
        name: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierModifierKey", {
        name: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierModifierKey.hint`,
        scope: "world",
        config: true,
        type: String,
        choices: {
            ALWAYS: "Always",
            DISABLED: "Disabled",
            ALT: "Alt",
            CONTROL: "Ctrl",
        },
        default: "CONTROL",
        onChange: (key) => {
            mystifyModifierKey = <string>key;
        },
    });

    game.settings.register(MODULENAME, "npcMystifierAddRandomNumber", {
        name: `${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierSkipRandomNumberForUnique", {
        name: `${MODULENAME}.SETTINGS.npcMystifierSkipRandomNumberForUnique.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierSkipRandomNumberForUnique.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierKeepNumberAtEndOfName", {
        name: `${MODULENAME}.SETTINGS.npcMystifierKeepNumberAtEndOfName.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierKeepNumberAtEndOfName.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterRarities", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterRarities.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterRarities.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterRaritiesReplacement", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterRaritiesReplacement.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterRaritiesReplacement.hint`,
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterEliteWeak", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterEliteWeak.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterEliteWeak.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureTypesTraits", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureTypesTraits.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureTypesTraits.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureFamilyTraits", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureFamilyTraits.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterCreatureFamilyTraits.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterAlignmentTraits", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterAlignmentTraits.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterAlignmentTraits.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterOtherTraits", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterOtherTraits.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterOtherTraits.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterBlacklist", {
        name: `${MODULENAME}.SETTINGS.npcMystifierFilterBlacklist.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierFilterBlacklist.hint`,
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    game.settings.register(MODULENAME, "npcMystifierUseMystifiedNameInChat", {
        name: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
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

    //DEPRECATED
    game.settings.register(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat", {
        name: `${MODULENAME}.SETTINGS.purgeExpiredEffectsOnTimeIncreaseOutOfCombat.name`,
        hint: `${MODULENAME}.SETTINGS.purgeExpiredEffectsOnTimeIncreaseOutOfCombat.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    //DEPRECATED
    game.settings.register(MODULENAME, "purgeExpiredEffectsEachTurn", {
        name: `${MODULENAME}.SETTINGS.purgeExpiredEffectsEachTurn.name`,
        hint: `${MODULENAME}.SETTINGS.purgeExpiredEffectsEachTurn.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => debouncedReload(),
    });

    mystifyModifierKey = <string>game.settings.get(MODULENAME, "npcMystifierModifierKey");
}
