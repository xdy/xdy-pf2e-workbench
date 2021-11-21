/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: xdy (Jonas Karlsson)
 * Content License: See LICENSE and README.md for license details
 * Software License: Apache 2.0
 */

// Import TypeScript modules
import { registerSettings } from "./settings";
import { preloadTemplates } from "./preloadTemplates";
import { PF2E_CREATURE_FAMILIES, PF2E_CREATURE_TYPES, PF2E_RARITIES } from "./xdy-pf2e-constants";

// Initialize module
Hooks.once("init", async () => {
    console.log("xdy-pf2e-workbench | Initializing xdy-pf2e-workbench");

    // Assign custom classes and constants here

    // Register custom module settings
    registerSettings();

    // Preload Handlebars templates
    await preloadTemplates();

    // Register custom sheets (if any)
});

// Setup module
Hooks.once("setup", async () => {
    // Do anything after initialization but before ready
});

// When ready
Hooks.once("ready", async () => {
    // Do anything once the module is ready
});

// Add any additional hooks if necessary
//TODO Move out to each separate app (once there are more than one...)
//TODO Start using the actual pf2e types
//TODO Make it so holding shift pops up a dialog where one can change the name
// if (true) { //game.settings.get('xdy-pf2e-workbench', 'NpcMystifierOn')) {
Hooks.on("preCreateToken", async (token: Token, data: any) => {
    console.log(token, token.data, data);

    const originalName = getProperty(token.data.flags, "xdy-pf2e-workbench.OriginalName") || token.actor?.name;
    console.log(originalName);
    let name;
    // @ts-ignore Nope, game.keyboard is never *actually* undefined. Shut up, TypeScript.
    if (game.keyboard.isDown("Alt") && !hasProperty(data.flags, "xdy-pf2e-workbench.OriginalName")) {
        //Option to filter out other traits?
        let traitsList = token?.actor?.data?.data["traits"]["traits"]?.value;
        // if (game.settings.get('xdy-pf2e-workbench', 'NpcMystifierFilterRarities')) {
        //     traitsList = traitsList.filter((trait: string) => !PF2E_RARITIES.includes(trait));
        // }

        const rarities = traitsList.filter((trait: string) => PF2E_RARITIES.includes(trait));
        const creatures = traitsList.filter((trait: string) => PF2E_CREATURE_TYPES.includes(trait));
        const families = traitsList.filter((trait: string) => PF2E_CREATURE_FAMILIES.includes(trait));
        const others = traitsList
            .filter((trait: string) => !rarities.includes(trait))
            .filter((trait: string) => !creatures.includes(trait))
            .filter((trait: string) => !families.includes(trait));
        traitsList = rarities.concat(creatures).concat(families).concat(others);
        name = traitsList
            .join(" ")
            .replace(/\b\w/g, (l: string) => game.i18n.localize("PF2E.TraitDescription." + l.toUpperCase()));

        // if (game.settings.get("xdy-pf2e-workbench", "NpcMystifierAddRandomNumber")) {
        name += ` ${Math.floor(Math.random() * 100)}`;
        // }
    } else {
        name = originalName;
    }
    data.name = name;
    setProperty(data.flags, "xdy-pf2e-workbench.OriginalName", originalName);
    // @ts-ignore
    token.data.update(data);
    console.log(originalName + " changed to " + name);
    console.log(token.data);
});
//}
