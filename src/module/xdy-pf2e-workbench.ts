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
import { PF2E_CREATURE_FAMILIES, PF2E_CREATURE_TYPES, PF2E_RARITIES } from "./xdy-pf2e-constants";

const MODULENAME = "xdy-pf2e-workbench";

// Initialize module
Hooks.once("init", async () => {
    console.log(MODULENAME + " | Initializing xdy-pf2e-workbench");

    // Assign custom classes and constants here

    // Register custom module settings
    registerSettings();

    // Preload Handlebars templates
    await preloadTemplates();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    console.log(MODULENAME + " | Setting up");
    // Do anything after initialization but before ready
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
    console.log(MODULENAME + " | Ready");
});

function registerSettings() {
    console.log(MODULENAME + " | registerSettings");

    game.settings.register(MODULENAME, "npcMystifier", {
        hint: "Turn on npc mystifier, renaming tokens based on their traits if Alt is clicked when adding to scene.", // game.i18n.format(`${MODULENAME}.SETTINGS.npcMystifier.Hint`),
        name: "Turn on npc mystifier.", // game.i18n.localize(`${MODULENAME}.npcMystifier.Name`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(MODULENAME, "npcMystifierAddRandomNumber", {
        hint: "Turns on adding a random number when mystifying npcs.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.Hint`),
        name: "Add random number to name.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierAddRandomNumber.Name`),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });
    game.settings.register(MODULENAME, "npcMystifierFilterRarities", {
        hint: "Filter out rarities from the mystified name.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierFilterRarities.Hint`),
        name: "No npc rarity in name.", //game.i18n.localize(`${MODULENAME}.SETTINGS.npcMystifierFilterRarities.Name`),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });
}

// Add any additional hooks if necessary
//TODO Move out to each separate app (once there are more than one...)
//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Fix localization
//TODO Can I use the pf2e localization strings?
Hooks.on("preCreateToken", async (token: Token, data: any) => {
    if (game.settings.get(MODULENAME, "npcMystifier")) {
        console.log(MODULENAME + " | preCreateToken");

        const originalName = getProperty(token.data.flags, MODULENAME + ".OriginalName") || token.actor?.name;
        console.log(originalName);
        let name: string;
        // @ts-ignore Nope, game.keyboard is never *actually* undefined. Shut up, TypeScript.
        if (game.keyboard.isDown("Alt") && !hasProperty(data.flags, MODULENAME + ".OriginalName")) {
            //Option to filter out other traits?
            let traitsList = token?.actor?.data?.data["traits"]["traits"]?.value;
            if (game.settings.get(MODULENAME, "npcMystifierFilterRarities")) {
                traitsList = traitsList.filter((trait: string) => !PF2E_RARITIES.includes(trait));
            }

            const rarities = traitsList.filter((trait: string) => PF2E_RARITIES.includes(trait));
            const creatures = traitsList.filter((trait: string) => PF2E_CREATURE_TYPES.includes(trait));
            const families = traitsList.filter((trait: string) => PF2E_CREATURE_FAMILIES.includes(trait));
            const others = traitsList
                .filter((trait: string) => !rarities.includes(trait))
                .filter((trait: string) => !creatures.includes(trait))
                .filter((trait: string) => !families.includes(trait));
            traitsList = rarities.concat(others).concat(creatures).concat(families);

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
