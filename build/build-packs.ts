// This script has been dreadfully hacked from the original at https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original, provided under the [ISC license](https://www.isc.org/licenses/)
// TODO Handle macros by creating jsons in this script, then calling fvtt pack on the jsons, then deleting the jsons

import fs from "fs-extra";
import path from "path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

// We can't import this from xdy-pf2e-workbench.ts because nodejs can't run that file
const MODULENAME = "xdy-pf2e-workbench";

function compendiumUuid(compendium: string, type: CompendiumDocumentType, id: string): CompendiumUUID {
    return `Compendium.${MODULENAME}.${compendium}.${type}.${id}`;
}

const macroIcons = new Map<string, string>([
    ["Adjust Merchant Prices", "icons/commodities/currency/coins-assorted-mix-copper.webp"],
    ["Advanced Countdown", "systems/pf2e/icons/spells/time-beacon.webp"],
    ["Assign Standby Spell", "systems/pf2e/icons/spells/abyssal-pact.webp"],
    ["Automatic Arcane Cascade", "systems/pf2e/icons/features/classes/arcane-cascade.webp"],
    ["Bless", "systems/pf2e/icons/spells/bless.webp"],
    ["Casters Spellbook", "systems/pf2e/icons/equipment/held-items/possibility-tome.webp"],
    ["Conditions Manager", "systems/pf2e/icons/conditions/doomed.webp"],
    ["Custom Mixed Heritage", "systems/pf2e/icons/spells/chromatic-image.webp"],
    ["Custom Saves and Skill Checks", "systems/pf2e/icons/equipment/held-items/abadars-flawless-scale.webp"],
    ["Dual Class", "systems/pf2e/icons/spells/guidance.webp"],
    ["Eldritch Shot", "systems/pf2e/icons/equipment/consumables/ammunition/spellstrike-ammunition.webp"],
    ["Flurry of Blows", "systems/pf2e/icons/features/classes/flurry-of-blows.webp"],
    ["Force Barrage", "systems/pf2e/icons/spells/magic-missile.webp"],
    ["Generate All Scrolls", "systems/pf2e/icons/equipment/consumables/other-consumables/spell-scroll.webp"],
    ["Group Perception Roller", "systems/pf2e/icons/spells/vision-of-weakness.webp"],
    ["Heroic Recovery", "systems/pf2e/icons/spells/wholeness-of-body.webp"],
    ["Hunt Double Shared Triple Prey", "icons/creatures/eyes/humanoid-single-red-brown.webp"],
    ["Level Based DCs", "systems/pf2e/icons/equipment/held-items/radiant-spark.webp"],
    ["Lingering Fortissimo", "systems/pf2e/icons/spells/inspire-heroics.webp"],
    ["Loot Generator", "systems/pf2e/icons/equipment/held-items/earthsight-box.webp"],
    ["Marshal Stances", "systems/pf2e/icons/features/feats/dread-marshal-stance.webp"],
    ["Mass Initiative Roller", "systems/pf2e/icons/equipment/held-items/games.webp"],
    ["Modded Countdown Cooldown", "systems/pf2e/icons/spells/time-beacon.webp"],
    ["Ooze Split", "systems/pf2e/icons/spells/blackfingers-blades.webp"],
    ["Let Fate Decide", "icons/magic/control/energy-stream-link-white.webp"],
    ["Random Encounter Builder", "systems/pf2e/icons/equipment/held-items/games.webp"],
    ["Ration Consumer", "systems/pf2e/icons/equipment/adventuring-gear/rations.webp"],
    ["Recall Knowledge", "icons/skills/trades/academics-book-study-runes.webp"],
    ["Simulate Falling", "systems/pf2e/icons/spells/seal-fate.webp"],
    ["Spell DCs by Rank", "systems/pf2e/icons/features/classes/conflux-spells.webp"],
    ["Spellsling", "systems/pf2e/icons/equipment/consumables/ammunition/energized-cartridge-electricity.webp"],
    ["Spellstrike", "systems/pf2e/icons/features/classes/spellstrike.webp"],
    ["Target tokens within a template", "icons/skills/targeting/crosshair-bars-yellow.webp"],
    ["Treat Wounds and Battle Medicine", "systems/pf2e/icons/conditions/wounded.webp"],
    ["Update Aura Radius", "systems/pf2e/icons/spells/destructive-aura.webp"],
    ["Use Scroll or Wand", "systems/pf2e/icons/equipment/wands/magic-wands/magic-wand.webp"],
    ["Versatile Performance", "systems/pf2e/icons/spells/summon-instrument.webp"],
    ["Wand and Scroll Generator", "systems/pf2e/icons/equipment/wands/specialty-wands/wand-of-continuation.webp"],

    // xdy-customizable-macros
    ["customizableBasicActionMacros", "modules/xdy-pf2e-workbench/assets/icons/cc0/bam.webp"],
    ["customizableProceduralChecks", "systems/pf2e/icons/default-icons/party.svg"],
    ["customizableRefocusPremaster", "icons/magic/perception/third-eye-blue-red.webp"],

    // xdy-internal-utility-macros
    ["Macro: Effect: Aid", "systems/pf2e/icons/spells/efficient-apport.webp"],
    ["Macro: Effect: Cover", "systems/pf2e/icons/conditions-2/status_acup.webp"],
    ["Macro: Effect: Follow The Expert", "systems/pf2e/icons/spells/favorable-review.webp"],
]);

function myRandomId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(16).keys())
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");
}

fs.rmSync("temporary", { recursive: true, force: true });
const outDir = <string>fs.mkdirSync(path.resolve(".", "temporary"), { recursive: true });
if (!outDir) {
    throw new Error("Could not create output directory");
}

async function buildAsymonousPack() {
    const submod = "submodules/my-foundryvtt-macros";
    const asymonousSource = ["PF2e", "PF2e/Contributions by others"];
    const packNameInternal = "asymonous-benefactor-macros-internal";
    const packNameImport = "asymonous-benefactor-macros";
    const baseMacro = {
        author: null,
        flags: {},
        permission: { default: 1 },
        scope: "global",
        type: "script",
    };
    const baseMacroStats = { systemId: "pf2e", createdTime: Date.now(), modifiedTime: Date.now() };

    fs.ensureDirSync(path.resolve(outDir, "packs/generated", packNameInternal));
    fs.ensureDirSync(path.resolve(outDir, "packs/generated", packNameImport));

    const macrosImport: object[] = [];
    const macrosInternal: object[] = [];
    for (const folderPath of asymonousSource) {
        const files = fs.readdirSync(path.join(submod, folderPath));
        for (const file of files) {
            if (!file.endsWith(".js")) {
                continue;
            }
            const filePath = path.join(submod, folderPath, file);
            let contents = fs.readFileSync(filePath, { encoding: "utf8" });
            const documentation = contents.match(/\/\*[\s\S]*?\*\//);

            contents += `\n/* # source "https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/${folderPath}/${file}" - Fetched on ${new Date().toISOString()} */`;

            const macroName = path.parse(file).name;
            const importMacro = `/** This compendium link macro will always call the most recent version from the compendium included with this module meaning you do not need to reimport newer versions. The source of the macros that get called is https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e */
/* Start of documentation from the original macro: */
${documentation ? documentation[0] : "/* There is no documentation in the macro. */"}
/* End of original macro documentation. */

    async function _executeMacroByName(
        macroName,
        compendiumName = "${MODULENAME}.${packNameInternal}"
    ) {
        const pack = game.packs.get(compendiumName);
        if (pack) {
            let macro = (await pack.getDocuments({name: macroName}))?.[0];
            if (macro) {
                if (!macro.canExecute)
                    macro = new macro.constructor(foundry.utils.mergeObject(macro.toObject(), {"-=_id": null, "ownership.default": CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}, {performDeletions: true, inplace: true}));
                macro.execute();
            } else {
                ui.notifications.error(\`Macro \${macroName} not found\`);
            }
        } else {
            ui.notifications.error(\`Compendium \${compendiumName} not found\`);
        }
    }
    _executeMacroByName('XDY DO_NOT_IMPORT ${macroName}');

    /* This compendium link macro is based on one originally posted by DrentalBot: https://discord.com/channels/880968862240239708/880975811279204402/910490804554973274; and modified by Mark Pearce https://discord.com/channels/880968862240239708/880969174661353484/972962446098702376 */
    `;

            const img = macroIcons.get(macroName) || "icons/svg/dice-target.svg";

            const idInternal = myRandomId();
            macrosInternal.push({
                _key: `!macros!${idInternal}`,
                _id: idInternal,
                _stats: { compendiumSource: compendiumUuid(packNameInternal, "Macro", idInternal), ...baseMacroStats },
                command: contents,
                img: "icons/svg/trap.svg",
                name: `XDY DO_NOT_IMPORT ${macroName}`,
                ...baseMacro,
            });
            const idImport = myRandomId();
            macrosImport.push({
                _key: `!macros!${idImport}`,
                _id: idImport,
                _stats: { compendiumSource: compendiumUuid(packNameImport, "Macro", idImport), ...baseMacroStats },
                command: importMacro,
                img: img,
                name: macroName,
                ...baseMacro,
            });
        }
    }
    const internalPack = path.resolve(outDir, "packs", "generated", packNameInternal);
    await compilePack(macrosInternal, internalPack, { log: true });
    const importPack = path.resolve(outDir, "packs", "generated", packNameImport);
    await compilePack(macrosImport, importPack, { log: true });
}

// Pack "*.macro" files into a compendium
// Argument is both the directory in src/packs/data with source as well the the compendium name in outDir/packs/generated
async function buildMacrosPack(packName: string) {
    const folderPath = path.resolve("src/packs/data", packName);
    const baseMacro = {
        author: null,
        flags: {},
        permission: { default: 1 },
        scope: "global",
        type: "script",
    };
    const baseMacroStats = { systemId: "pf2e", createdTime: Date.now(), modifiedTime: Date.now() };
    const macros: object[] = [];
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (!filePath.endsWith(".macro")) {
            continue;
        }
        const macroName = path.parse(file).name;
        const contents = fs.readFileSync(filePath, { encoding: "utf8" });
        const id = myRandomId();
        macros.push({
            _key: `!macros!${id}`,
            _id: id,
            _stats: { compendiumSource: compendiumUuid(packName, "Macro", id), ...baseMacroStats },
            command: contents,
            img: macroIcons.get(macroName) || "icons/svg/dice-target.svg",
            name: macroName,
            ...baseMacro,
        });
    }
    const pack = path.resolve(outDir, "packs", "generated", packName);
    await compilePack(macros, pack, { log: true });
}

async function buildCustomizableMacrosPack() {
    await buildMacrosPack("xdy-customizable-macros");
}

async function buildInternalUtilityMacrosPack() {
    await buildMacrosPack("xdy-internal-utility-macros");
}

await buildCustomizableMacrosPack();
await buildInternalUtilityMacrosPack();
await buildAsymonousPack();
fs.ensureDirSync("dist");
fs.rmSync("./dist/packs", { recursive: true, force: true });
fs.renameSync(path.resolve(outDir, "packs"), "dist/packs");
fs.rmSync(outDir, { recursive: true, force: true });
