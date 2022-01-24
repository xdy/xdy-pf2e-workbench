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
        name: "SETTINGS.heroPointHandler.name",
        hint: "SETTINGS.heroPointHandler.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "autoRollDamageForStrike", {
        name: "SETTINGS.autoRollDamageForStrike.name",
        hint: "SETTINGS.autoRollDamageForStrike.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "autoCollapseItemChatCardContent", {
        name: "SETTINGS.autoCollapseItemChatCardContent.name",
        hint: "SETTINGS.autoCollapseItemChatCardContent.hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange() {
            ui.chat.render();
        },
    });

    game.settings.register(MODULENAME, "purgeExpiredEffectsEachTurn", {
        name: "SETTINGS.purgeExpiredEffectsEachTurn.name",
        hint: "SETTINGS.purgeExpiredEffectsEachTurn.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableMoveBeforeCurrentCombatant", {
        name: "SETTINGS.enableMoveBeforeCurrentCombatant.name",
        hint: "SETTINGS.enableMoveBeforeCurrentCombatant.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP", {
        name: "SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP.name",
        hint: "SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnReaching0HP.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "enableAutomaticMoveBeforeCurrentCombatantOnStatusDying", {
        name: "SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnStatusDying.name",
        hint: "SETTINGS.enableAutomaticMoveBeforeCurrentCombatantOnStatusDying.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //Mystification below this
    game.settings.register(MODULENAME, "npcMystifier", {
        name: "SETTINGS.npcMystifier.name",
        hint: "SETTINGS.npcMystifier.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierMethod", {
        name: "SETTINGS.npcMystifierMethod.name",
        hint: "SETTINGS.npcMystifierMethod.hint",
        scope: "world",
        config: true,
        default: "traits",
        type: String,
        choices: {
            traits: "SETTINGS.npcMystifierMethod.traits",
        },
    });

    //These apply to all mystification methods, I think
    game.settings.register(MODULENAME, "npcMystifierPrefix", {
        name: "SETTINGS.npcMystifierPrefix.name",
        hint: "SETTINGS.npcMystifierPrefix.hint",
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    game.settings.register(MODULENAME, "npcMystifierPostfix", {
        name: "SETTINGS.npcMystifierPostfix.name",
        hint: "SETTINGS.npcMystifierPostfix.hint",
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    game.settings.register(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor", {
        name: "SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.name",
        hint: "SETTINGS.npcMystifierDemystifyAllTokensBasedOnTheSameActor.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierModifierKey", {
        name: "SETTINGS.npcMystifierModifierKey.name",
        hint: "SETTINGS.npcMystifierModifierKey.hint",
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
        name: "SETTINGS.npcMystifierAddRandomNumber.name",
        hint: "SETTINGS.npcMystifierAddRandomNumber.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierSkipRandomNumberForUnique", {
        name: "SETTINGS.npcMystifierSkipRandomNumberForUnique.name",
        hint: "SETTINGS.npcMystifierSkipRandomNumberForUnique.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierKeepNumberAtEndOfName", {
        name: "SETTINGS.npcMystifierKeepNumberAtEndOfName.name",
        hint: "SETTINGS.npcMystifierKeepNumberAtEndOfName.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierUseMystifiedNameInChat", {
        name: "SETTINGS.npcMystifierUseMystifiedNameInChat.name",
        hint: "SETTINGS.npcMystifierUseMystifiedNameInChat.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //TODO These apply only to trait mystification and should be grouped together, maybe on a separate tab?
    game.settings.register(MODULENAME, "npcMystifierFilterRarities", {
        name: "SETTINGS.npcMystifierFilterRarities.name",
        hint: "SETTINGS.npcMystifierFilterRarities.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterRaritiesReplacement", {
        name: "SETTINGS.npcMystifierFilterRaritiesReplacement.name",
        hint: "SETTINGS.npcMystifierFilterRaritiesReplacement.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterEliteWeak", {
        name: "SETTINGS.npcMystifierFilterEliteWeak.name",
        hint: "SETTINGS.npcMystifierFilterEliteWeak.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureTypesTraits", {
        name: "SETTINGS.npcMystifierFilterCreatureTypesTraits.name",
        hint: "SETTINGS.npcMystifierFilterCreatureTypesTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureFamilyTraits", {
        name: "SETTINGS.npcMystifierFilterCreatureFamilyTraits.name",
        hint: "SETTINGS.npcMystifierFilterCreatureFamilyTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterAlignmentTraits", {
        name: "SETTINGS.npcMystifierFilterAlignmentTraits.name",
        hint: "SETTINGS.npcMystifierFilterAlignmentTraits.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterOtherTraits", {
        name: "SETTINGS.npcMystifierFilterOtherTraits.name",
        hint: "SETTINGS.npcMystifierFilterOtherTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterBlacklist", {
        name: "SETTINGS.npcMystifierFilterBlacklist.name",
        hint: "SETTINGS.npcMystifierFilterBlacklist.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    mystifyModifierKey = <string>game.settings.get(MODULENAME, "npcMystifierModifierKey");
}
