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
import { mystifyKey, registerSettings } from "./settings";
import { generateNameFromTraits } from "./traits-name-generator";

export const MODULENAME = "xdy-pf2e-workbench";

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

//TODO Move out to each separate app (once there are more than one...)
//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Fix localization
//TODO Can I use the pf2e localization strings?
//TODO Add a way to revert the name change from the sheet. (Hover over the name gives a context menu? Or inject a button on the sheet title bar? Maybe just a function that can be called from a macro?)
//TODO Add the option to randomize a name from a list of names (kinda like token mold)
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
            switch (game.settings.get(MODULENAME, "npcMystifierMethod")) {
                default:
                    name = generateNameFromTraits(token);
                    break;
            }
        } else {
            name = originalName;
        }
        data.name = name;
        setProperty(data.flags, MODULENAME + ".OriginalName", originalName);
        // @ts-ignore
        token.data.update(data);
        // console.log(originalName + " changed to " + name);
        // console.log(token.data);
    }
});
