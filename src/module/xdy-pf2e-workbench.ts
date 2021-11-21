/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

// Import TypeScript modules
import { preloadTemplates } from "./preloadTemplates";
import { TRAITS } from "./xdy-pf2e-constants";

const MODULENAME = "xdy-pf2e-workbench";

// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
let mystifyKey: string;

// Initialize module
Hooks.once("init", async () => {
    console.log(`${MODULENAME} | Initializing xdy-pf2e-workbench`);

    // Assign custom classes and constants here

    // Register custom module settings
    registerSettings();

    // Preload Handlebars templates
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

function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    game.settings.register(MODULENAME, "npcMystifier", {
        name: "Turn on npc mystifier.", // game.i18n.localize(`${MODULENAME}.settings.npcMystifierOn.Name`),
        hint: "Turn on npc mystifier, renaming tokens based on their traits if Alt (configurable) is clicked when adding to scene.", // game.i18n.format(`${MODULENAME}.settings.npcMystifierOn.Hint`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierAddRandomNumber", {
        name: "Add random number to name.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.Name`),
        hint: "Turns on adding a random number when mystifying npcs.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierAddRandomNumber.Hint`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterRarities", {
        name: "No npc rarity in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Name`),
        hint: "Filter out rarities from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterRarities.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterEliteWeak", {
        name: "No npc elite/weak status in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterElitWeak.Name`),
        hint: "Filter out elite/weak from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterEliteWeak.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureTypesTraits", {
        name: "No npc creature type traits in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureTypesTraits.Name`),
        hint: "Filter out creature type traits (see https://2e.aonprd.com/Traits.aspx) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureTypesTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterCreatureFamilyTraits", {
        name: "No npc creature family traits in name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureFamilyTraits.Name`),
        hint: "Filter out creature family traits (see https://2e.aonprd.com/MonsterFamilies.aspx?Type=M) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterCreatureFamilyTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterOtherTraits", {
        name: "No npc traits not in the above trait types.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifier.FilterOtherTraits.Name`),
        hint: "Filter out npc traits not in the above trait types (see the links in the above setting options) from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterOtherTraits.Hint`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierFilterBlacklist", {
        name: "Blacklist traits to never add to name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterBlacklist.Name`),
        hint: "Filter out all words in this comma-separated blacklist from the mystified name.", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierFilterBlacklist.Hint`),
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    game.settings.register(MODULENAME, "npcMystifierPrefix", {
        name: "Word to prefix new name with", //game.i18n.localize(`${MODULENAME}.settings.npcMystifierPrefix.Hint`),
        hint: "What to prefix new name with (default 'Unknown').", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierPrefix.Name`),
        scope: "world",
        config: true,
        type: String,
        default: "Unknown",
    });

    game.settings.register(MODULENAME, "npcMystifierKey", {
        name: "Key to mystify", //game.i18n.localize(`${MODULENAME}.settings.npcMystifier.key.Hint`),
        hint: "Hold this to mystify npc as it's dragged out to the scene. Note that if you choose Alt (the default) it also hides the npc.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifier.key.Name`),
        scope: "world",
        config: true,
        type: String,
        choices: {
            Alt: "Alt",
            Control: "Ctrl",
        },
        default: "Alt",
        onChange: (key) => {
            return (mystifyKey = <string>key);
        },
    });
    mystifyKey = <string>game.settings.get(MODULENAME, "npcMystifierKey");
}

// Add any additional hooks if necessary
//TODO Move out to each separate app (once there are more than one...)
//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Fix localization
//TODO Can I use the pf2e localization strings?
//TODO Add a way to revert the name change from the sheet. (Hover over the name gives a context menu? Or inject a button on the sheet title bar? Maybe just a function that can be called from a macro?)
//TODO Add the option to randomize a name from a list of names (kinda like token mold)
//TODO Add the option to replace rarities greater than common with a word (default to 'Unusual')
//TODO Add a way to disable the 'traits -> name' stuff but keep the rest. I.e. modularize the name generation.
//TODO Consider doing something to handle the actor name or the original token name being shown in abilities, etc.
//TODO Make issues out of the harder of the above todos...
Hooks.on("preCreateToken", async (token: Token, data: any) => {
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        console.log(`${MODULENAME} | preCreateToken`);

        const originalName = getProperty(token.data.flags, MODULENAME + ".OriginalName") || token.actor?.name;
        console.log(originalName);
        let name: string;
        // @ts-ignore Nope, game.keyboard is never *actually* undefined. Shut up, TypeScript.
        if (game.keyboard.isDown(mystifyKey) && !hasProperty(data.flags, MODULENAME + ".OriginalName")) {
            //Option to filter out other traits?
            let traitsList = token?.actor?.data?.data["traits"]["traits"]?.value;

            //TODO Clean up this mess
            if (game.settings.get(MODULENAME, "npcMystifierFilterBlacklist")) {
                const blacklist =
                    (<string>game.settings.get(MODULENAME, "npcMystifierFilterBlacklist")).split(",") || null;
                if (blacklist) {
                    traitsList = traitsList.filter((trait: string) => {
                        return !blacklist.map((trait: string) => trait.trim()).includes(trait);
                    });
                }
            }
            let eliteWeak: string[] = [];
            if (!game.settings.get(MODULENAME, "npcMystifierFilterEliteWeak")) {
                eliteWeak = traitsList.filter((trait: string) => TRAITS.ELITE_WEAK.includes(trait));
            }
            let rarities: string[] = [];
            if (!game.settings.get(MODULENAME, "npcMystifierFilterRarities")) {
                rarities = traitsList.filter((trait: string) => TRAITS.RARITIES.includes(trait));
            }
            let creatures: string[] = [];
            if (!game.settings.get(MODULENAME, "npcMystifierFilterCreatureTypesTraits")) {
                creatures = traitsList.filter((trait: string) => TRAITS.CREATURE_TYPES.includes(trait));
            }
            let families: string[] = [];
            if (!game.settings.get(MODULENAME, "npcMystifierFilterCreatureFamilyTraits")) {
                families = traitsList.filter((trait: string) => TRAITS.CREATURE_FAMILIES.includes(trait));
            }
            let others: string[] = [];
            if (!game.settings.get(MODULENAME, "npcMystifierFilterOtherTraits")) {
                others = traitsList
                    .filter((trait: string) => !eliteWeak.includes(trait))
                    .filter((trait: string) => !rarities.includes(trait))
                    .filter((trait: string) => !creatures.includes(trait))
                    .filter((trait: string) => !families.includes(trait));
            }

            traitsList = [<string>game.settings.get(MODULENAME, "npcMystifierPrefix")]
                .concat(eliteWeak)
                .concat(rarities)
                .concat(others)
                .concat(creatures)
                .concat(families);

            name = traitsList
                .map((trait: string) => {
                    return trait.charAt(0).toUpperCase() + trait.slice(1);
                })
                // .map((trait: string) => {
                //     return game.i18n.localize(`PF2E.TraitDescription.${trait}`);
                // })
                .join(" ");

            if (game.settings.get(MODULENAME, "npcMystifierAddRandomNumber")) {
                name += ` ${Math.floor(Math.random() * 100)}`;
                //TODO Check if token exists with this name, if so, reroll.
            }
        } else {
            name = originalName;
        }
        data.name = name;
        setProperty(data.flags, MODULENAME + ".OriginalName", originalName);
        // @ts-ignore
        token.data.update(data);
        console.log(originalName + " changed to " + name);
        console.log(token.data);
    }
});
