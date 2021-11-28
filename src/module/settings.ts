// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";

export let mystifyKey: string;

export function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    //TODO Make a settings menu with the following settings that is set to be restricted to GMs
    const settings = (game as Game).settings;
    settings.register(MODULENAME, "npcMystifier", {
        name: "Turn on npc mystifier.", // game.i18n.localize(`${MODULENAME}.settings.npcMystifierOn.Name`),
        hint: "Turn on npc mystifier, renaming tokens based on their traits if Ctrl (configurable) is clicked when adding to scene.", // game.i18n.format(`${MODULENAME}.settings.npcMystifierOn.Hint`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierMethod", {
        name: "How to generate mystified npc names.", // game.i18n.localize(`${MODULENAME}.settings.npcMystifierOn.Name`),
        hint: "Currently Mystifying by using the NPCs traits is the only supported option.", // game.i18n.format(`${MODULENAME}.settings.npcMystifierOn.Hint`),
        scope: "world",
        config: true,
        default: "traits",
        type: String,
        choices: {
            traits: "Mystify by NPC Traits",
        },
    });

    //These apply to all mystification methods, I think
    settings.register(MODULENAME, "npcMystifierPrefix", {
        name: "Word to prefix new name with", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierPrefix.Hint`),
        hint: "What to prefix new name with (default 'Unknown').", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierPrefix.Name`),
        scope: "world",
        config: true,
        type: String,
        default: "Unknown",
    });

    settings.register(MODULENAME, "npcMystifierPostfix", {
        name: "Word to postfix new name with", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierPostfix.Hint`),
        hint: "What to postfix new name with, defaults to '' (example: 'Creature').", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierPostfix.Name`),
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    settings.register(MODULENAME, "npcMystifierKey", {
        name: "Key to mystify", //game.i18n.localize(`${MODULENAME}.settings.npcMystifier.key.Hint`),
        hint: "Hold this to mystify npc as it's dragged out to the scene. Note that if you choose Alt (not the default) it also hides the npc.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifier.key.Name`),
        scope: "world",
        config: true,
        type: String,
        choices: {
            Alt: "Alt",
            Control: "Ctrl",
        },
        default: "Control",
        onChange: (key) => {
            return (mystifyKey = <string>key);
        },
    });

    settings.register(MODULENAME, "npcMystifierAddRandomNumber", {
        name: "Add random number to name.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.Name`),
        hint: "Turns on adding a random number when mystifying npcs.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierAddRandomNumber.Hint`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierKeepRandomNumberWhenDemystified", {
        name: "Keep random number when demystifying.", //(game as Game).i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierKeepRandomNumberWhenDemystified.Name`),
        hint: "Keep random number (if any) when demystifying npcs.", //(game as Game).i18n.localize(`${MODULENAME}.settings.npcMystifierKeepRandomNumberWhenDemystified.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //TODO These apply only to trait mystification and should be grouped together, maybe on a separate tab?
    settings.register(MODULENAME, "npcMystifierFilterRarities", {
        name: "No npc rarity in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Name`),
        hint: "Filter out rarities from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Hint`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterRaritiesReplacement", {
        name: "Word to replace rarities greater than Common with.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Name`),
        hint: "Set the word to replace rarities greater than Common with (e.g. 'Unusual'). If empty, do not change the displayed rarity.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Hint`),
        scope: "world",
        config: true,
        default: "Unusual",
        type: String,
    });

    settings.register(MODULENAME, "npcMystifierFilterEliteWeak", {
        name: "No npc elite/weak status in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterElitWeak.Name`),
        hint: "Filter out elite/weak from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterEliteWeak.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterCreatureTypesTraits", {
        name: "No npc creature type traits in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureTypesTraits.Name`),
        hint: "Filter out creature type traits (see https://2e.aonprd.com/Traits.aspx) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureTypesTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterCreatureFamilyTraits", {
        name: "No npc creature family traits in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureFamilyTraits.Name`),
        hint: "Filter out creature family traits (see https://2e.aonprd.com/MonsterFamilies.aspx?Type=M) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureFamilyTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterOtherTraits", {
        name: "No npc traits not in the above trait types.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifier.FilterOtherTraits.Name`),
        hint: "Filter out npc traits not in the above trait types (see the links in the above setting options) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterOtherTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterBlacklist", {
        name: "Blacklist traits to never add to name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterBlacklist.Name`),
        hint: "Filter out all words in this comma-separated blacklist from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterBlacklist.Hint`),
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    mystifyKey = <string>settings.get(MODULENAME, "npcMystifierKey");
}
