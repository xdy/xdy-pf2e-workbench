// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";

export let mystifyModifierKey: string;

declare global {
    namespace ClientSettings {
        interface Values {
            "xdy-pf2e-workbench.enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP": boolean;
            "xdy-pf2e-workbench.enableAutomaticMoveBeforeCurrentCombatantOnStatusDying": boolean;
            "xdy-pf2e-workbench.enableMoveBeforeCurrentCombatant": boolean;
            "xdy-pf2e-workbench.npcMystifier": boolean;
            "xdy-pf2e-workbench.npcMystifierAddRandomNumber": boolean;
            "xdy-pf2e-workbench.npcMystifierDemystifyAllTokensBasedOnTheSameActor": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterAlignmentTraits": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterBlacklist": string;
            "xdy-pf2e-workbench.npcMystifierFilterCreatureFamilyTraits": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterCreatureTypesTraits": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterEliteWeak": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterOtherTraits": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterRarities": boolean;
            "xdy-pf2e-workbench.npcMystifierFilterRaritiesReplacement": string;
            "xdy-pf2e-workbench.npcMystifierKeepNumberAtEndOfName": boolean;
            "xdy-pf2e-workbench.npcMystifierMethod": string;
            "xdy-pf2e-workbench.npcMystifierModifierKey": string;
            "xdy-pf2e-workbench.npcMystifierPostfix": string;
            "xdy-pf2e-workbench.npcMystifierPrefix": string;
            "xdy-pf2e-workbench.npcMystifierSkipRandomNumberForUnique": boolean;
            "xdy-pf2e-workbench.npcMystifierUseMystifiedNameInChat": boolean;
            "xdy-pf2e-workbench.purgeExpiredEffectsEachTurn": boolean;
            "xdy-pf2e-workbench.purgeExpiredEffectsOnTimeIncreaseOutOfCombat": boolean;
            "xdy-pf2e-workbench.autoRollDamageForStrike": boolean;
            "xdy-pf2e-workbench.autoCollapseItemChatCardContent": boolean;
            "xdy-pf2e-workbench.heroPointHandler": boolean;
        }
    }
}

export function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    //TODO Make a settings menu with the following settings that is set to be restricted to GMs

    game.settings.register(MODULENAME, "heroPointHandler", {
        name: `${MODULENAME}.SETTINGS.heroPointHandler.name`,
        hint: `${MODULENAME}.SETTINGS.heroPointHandler.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "autoRollDamageForStrike", {
        name: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.name`,
        hint: `${MODULENAME}.SETTINGS.autoRollDamageForStrike.hint`,
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
        default: false,
        type: Boolean,
        onChange() {
            ui.chat.render();
        },
    });

    game.settings.register(MODULENAME, "purgeExpiredEffectsOnTimeIncreaseOutOfCombat", {
        name: `${MODULENAME}.SETTINGS.purgeExpiredEffectsOnTimeIncreaseOutOfCombat.name`,
        hint: `${MODULENAME}.SETTINGS.purgeExpiredEffectsOnTimeIncreaseOutOfCombat.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "purgeExpiredEffectsEachTurn", {
        name: `${MODULENAME}.SETTINGS.purgeExpiredEffectsEachTurn.name`,
        hint: `${MODULENAME}.SETTINGS.purgeExpiredEffectsEachTurn.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableMoveBeforeCurrentCombatant", {
        name: `${MODULENAME}.SETTINGS.enableMoveBeforeCurrentCombatant.name`,
        hint: `${MODULENAME}.SETTINGS.enableMoveBeforeCurrentCombatant.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP", {
        name: `${MODULENAME}.SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP.name`,
        hint: `${MODULENAME}.SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying", {
        name: `${MODULENAME}.SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnStatusDying.name`,
        hint: `${MODULENAME}.SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnStatusDying.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //Mystification below this
    game.settings.register(MODULENAME, "npcMystifier", {
        name: `${MODULENAME}.SETTINGS.npcMystifier.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifier.hint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
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
            return (mystifyModifierKey = <string>key);
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

    game.settings.register(MODULENAME, "npcMystifierUseMystifiedNameInChat", {
        name: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.name`,
        hint: `${MODULENAME}.SETTINGS.npcMystifierUseMystifiedNameInChat.hint`,
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //TODO These apply only to trait mystification and should be grouped together, maybe on a separate tab?
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

    mystifyModifierKey = <string>game.settings.get(MODULENAME, "npcMystifierModifierKey");
}
