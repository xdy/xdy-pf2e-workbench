/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

//TODO Move out to each separate app (once there are more than one...)
//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
//TODO Fix localization
//TODO Can I use the pf2e localization strings?
//TODO Add the option to randomize a name from a list of names (kinda like token mold)
//TODO Add a way to disable the 'traits -> name' stuff but keep the rest. I.e. modularize the name generation.
//TODO Consider doing something to handle the actor name or the original token name being shown in abilities, etc.
//TODO Make the button post a chat message with a properly set up roll that players can click, as well as a gm-only button on the message that the gm can use to actually unmystify all mystified tokens with the same base actor on that scene. After all, if you've recognized one zombie shambler I figure you would recognize all zombie shamblers.
//TODO Make issues out of the harder of the above todos...

// Import TypeScript modules
import { preloadTemplates } from "./preloadTemplates";
import { registerSettings } from "./settings";
import { preTokenCreateMystification, renderNameHud } from "./mystify-token";

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

Hooks.on("preCreateToken", async (token: Token) => {
    console.log(`${MODULENAME} | preCreateToken`);

    if ((game as Game).settings.get(MODULENAME, "npcMystifier")) {
        preTokenCreateMystification(token);
    }
});

Hooks.on("renderTokenHUD", (_app: TokenHUD, html: JQuery, data: any) => {
    if ((game as Game).settings.get(MODULENAME, "npcMystifier")) {
        renderNameHud(data, html);
    }
});
