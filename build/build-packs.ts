// This script has been dreadfully hacked from the original at https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original, provided under the [ISC license](https://www.isc.org/licenses/)
// TODO Handle macros by creating jsons in this script, then calling fvtt pack on the jsons, then deleting the jsons

import fs from "fs-extra";
import path from "path";

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

fs.mkdirsSync(path.resolve(outDir, "packs/data"));

function copyFolder(source: string, target: string) {
    for (const file of fs.readdirSync(source).filter((file) => file.endsWith(".js"))) {
        const sourcePath = decodeURIComponent(path.join(source, file));
        const targetPath = decodeURIComponent(path.join(target, file));
        fs.copyFileSync(sourcePath, targetPath);
        console.debug(`Copied ${path.normalize(sourcePath)} to ${path.normalize(targetPath)}`);
        // eslint-disable-next-line
        fs.appendFileSync(
            targetPath,
            `\n/* # source "https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/${path.basename(
                path.dirname(sourcePath),
            )}/${file}" - Fetched on ${new Date().toISOString()} */
                `,
        );
    }
}

function getFolders(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + "/" + file).isDirectory();
    });
}

function buildAsymonousPack() {
    const asymonousSource = [
        "submodules/my-foundryvtt-macros/PF2e",
        "submodules/my-foundryvtt-macros/PF2e/Contributions by others",
    ];

    fs.ensureDirSync("../generated/asymonous-benefactor-macros");
    fs.ensureDirSync(path.resolve(outDir, "packs/generated/asymonous-benefactor-macros"));

    copyFolder(
        path.resolve(".", asymonousSource[0]),
        path.resolve(path.resolve(outDir, "packs/generated/asymonous-benefactor-macros")),
    );
    copyFolder(
        path.resolve(".", asymonousSource[1]),
        path.resolve(path.resolve(outDir, "packs/generated/asymonous-benefactor-macros")),
    );

    const folders = getFolders(path.resolve(outDir, "packs/generated"))
        .filter((folder) => folder.startsWith("asymonous-"))
        .map((folder) => {
            return path.resolve(outDir, "packs/generated", folder);
        });
    for (const folderPath of folders) {
        const lines: string[] = [];
        const linesInternal: string[] = [];

        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            if (!filePath.endsWith(".js")) {
                continue;
            }

            const contents = fs.readFileSync(filePath, { encoding: "utf8" });
            const documentation = contents.match(/\/\*[\s\S]*?\*\//);

            try {
                const macroName = path.parse(file).name;
                const importMacro = `/** This compendium link macro will always call the most recent version from the compendium included with this module meaning you do not need to reimport newer versions. The source of the macros that get called is https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e */
/* Start of documentation from the original macro: */
${documentation ? documentation[0] : "/* There is no documentation in the macro. */"}
/* End of original macro documentation. */

    async function _executeMacroByName(
        macroName,
        compendiumName = "xdy-pf2e-workbench.asymonous-benefactor-macros-internal"
    ) {
        const pack = game.packs.get(compendiumName);
        if (pack) {
            const macro_data = (await pack.getDocuments()).find((i) => i.name === macroName)?.toObject();
            if (macro_data) {
                const temp_macro = new Macro(macro_data);
                temp_macro.permission.default = CONST.DOCUMENT_PERMISSION_LEVELS.OWNER;
                temp_macro.execute();
            } else {
                ui.notifications.error("Macro " + macroName + " not found");
            }
        } else {
            ui.notifications.error("Compendium " + compendiumName + " not found");
        }
    }
    _executeMacroByName('XDY DO_NOT_IMPORT ${macroName}');

    /* This compendium link macro is based on one originally posted by DrentalBot: https://discord.com/channels/880968862240239708/880975811279204402/910490804554973274; and modified by Mark Pearce https://discord.com/channels/880968862240239708/880969174661353484/972962446098702376 */
    `;
                const map = new Map<string, string>();
                map.set("2-Action Harm", "systems/pf2e/icons/spells/harm.webp");
                map.set("2-Action Heal v2", "systems/pf2e/icons/spells/heal.webp");
                map.set("Actions with Potency", "icons/svg/dice-target.svg");
                map.set("Adjust Merchant Prices", "icons/commodities/currency/coins-assorted-mix-copper.webp");
                map.set("Advanced Countdown", "systems/pf2e/icons/spells/time-beacon.webp");
                map.set("Apply Conditions", "icons/svg/dice-target.svg");
                map.set("Assign Standby Spell", "systems/pf2e/icons/spells/abyssal-pact.webp");
                map.set("Bane", "systems/pf2e/icons/spells/bane.webp");
                map.set("BattleMedicineImmunity", "icons/svg/dice-target.svg");
                map.set("Bless", "systems/pf2e/icons/spells/bless.webp");
                map.set("Casters Spellbook", "systems/pf2e/icons/equipment/held-items/possibility-tome.webp");
                map.set("Conditions Manager", "systems/pf2e/icons/conditions/doomed.webp");
                map.set("Countdown-Cooldown", "icons/svg/dice-target.svg");
                map.set(
                    "Custom Saves and Skill Checks",
                    "systems/pf2e/icons/equipment/held-items/abadars-flawless-scale.webp",
                );
                map.set("Double Slice", "systems/pf2e/icons/spells/echoing-weapon.webp");
                map.set("Dual Class", "systems/pf2e/icons/spells/guidance.webp");
                map.set(
                    "Eldritch Shot",
                    "systems/pf2e/icons/equipment/consumables/ammunition/spellstrike-ammunition.webp",
                );
                map.set("Flurry of Blows", "systems/pf2e/icons/features/classes/flurry-of-blows.webp");
                map.set("Level Based DCs", "systems/pf2e/icons/equipment/held-items/radiant-spark.webp");
                map.set("Lingering Composition", "icons/svg/dice-target.svg");
                map.set("Lingering Heroics", "systems/pf2e/icons/spells/inspire-heroics.webp");
                map.set("Loot Generator", "systems/pf2e/icons/equipment/held-items/earthsight-box.webp");
                map.set("Magic Missile", "systems/pf2e/icons/spells/magic-missile.webp");
                map.set("Marshal Stances", "systems/pf2e/icons/features/feats/dread-marshal-stance.webp");
                map.set("Modded BM immunity tracker", "systems/pf2e/icons/features/feats/treat-wounds.webp");
                map.set("Modded Countdown Cooldown", "systems/pf2e/icons/spells/time-beacon.webp");
                map.set("One for All", "icons/svg/dice-target.svg");
                map.set("Overdrive", "icons/svg/dice-target.svg");
                map.set("Ration Consumer", "systems/pf2e/icons/equipment/adventuring-gear/rations.webp");
                map.set("Post Save buttons to chat", "icons/svg/dice-target.svg");
                map.set("QuickSkillActions", "icons/svg/dice-target.svg");
                map.set("Recall Knowledge", "icons/skills/trades/academics-book-study-runes.webp");
                map.set("Scorching Ray", "systems/pf2e/icons/spells/scorching-ray.webp");
                map.set("Simulate Falling", "systems/pf2e/icons/spells/seal-fate.webp");
                map.set("Spell DCs by Level", "systems/pf2e/icons/features/classes/conflux-spells.webp");
                map.set(
                    "Spellsling",
                    "systems/pf2e/icons/equipment/consumables/ammunition/energized-cartridge-electricity.webp",
                );
                map.set("Spellstrike", "systems/pf2e/icons/features/classes/spellstrike.webp");
                map.set("Treat Wounds and Battle Medicine", "systems/pf2e/icons/conditions/wounded.webp");
                map.set("Target tokens within a template", "icons/skills/targeting/crosshair-bars-yellow.webp");
                map.set("Update Aura Radius", "systems/pf2e/icons/spells/destructive-aura.webp");
                map.set("Use Scroll or Wand", "systems/pf2e/icons/equipment/wands/magic-wands/magic-wand.webp");
                map.set("Versatile Performance", "systems/pf2e/icons/spells/summon-instrument.webp");
                const img = map.get(macroName) || "icons/svg/dice-target.svg";

                // eslint-disable-next-line
                let jsonInternal = `{"_id": "${myRandomId()}", "actorIds": [], "author": "${myRandomId()}", "command": ${JSON.stringify(
                    contents,
                )},"flags": {},"img":"icons/svg/trap.svg","name": "XDY DO_NOT_IMPORT ${macroName}","permission": {"default": 1},"scope": "global","type": "script"}`;
                linesInternal.push(jsonInternal);
                // eslint-disable-next-line
                let json = `{"_id": "${myRandomId()}", "actorIds": [], "author": "${myRandomId()}", "command": ${JSON.stringify(
                    importMacro,
                )},"flags": {},"img":"${img}","name": "${macroName}","permission": {"default": 1},"scope": "global","type": "script"}`;
                lines.push(json);
            } catch (err) {
                console.error(`Failed to read JSON file ${filePath}`, err);
            }
        }
        const dir = path.resolve(outDir, "packs", "generated", path.basename(folderPath) + ".db");
        fs.writeFileSync(dir, lines.join("\n"), "utf8");
        const dir2 = path.resolve(outDir, "packs", "generated", path.basename(folderPath) + "-internal.db");
        fs.writeFileSync(dir2, linesInternal.join("\n"), "utf8");
    }
    fs.rmSync(path.resolve(outDir, "./packs/generated/asymonous-benefactor-macros/"), { recursive: true });
}

function buildCustomizableMacrosPack() {
    const folderPath = "./src/packs/data/xdy-customizable-macros";
    const lines: string[] = [];
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (!filePath.endsWith(".macro")) {
            continue;
        }

        try {
            const macroName = path.parse(file).name;
            const contents = fs.readFileSync(filePath, { encoding: "utf8" });
            const map = new Map<string, string>();
            map.set("customizableBasicActionMacros", "modules/xdy-pf2e-workbench/assets/icons/cc0/bam.webp");
            map.set("customizableProceduralChecks", "systems/pf2e/icons/default-icons/party.svg");
            map.set("customizableRefocusPremaster", "icons/magic/perception/third-eye-blue-red.webp");
            const img = map.get(macroName) || "icons/svg/dice-target.svg";

            // eslint-disable-next-line
            let json = `{"_id": "${myRandomId()}", "actorIds": [], "author": "${myRandomId()}", "command": ${JSON.stringify(
                contents,
            )},"flags": {},"img":"${img}","name": "${macroName}","permission": {"default": 1},"scope": "global","type": "script"}`;
            lines.push(json);
        } catch (err) {
            console.error(`Failed to read JSON file ${filePath}`, err);
        }
    }
    const file1 = path.resolve(outDir, "./packs/data/xdy-customizable-macros" + ".db");
    // console.log(file1);
    fs.writeFileSync(file1, lines.join("\n"), "utf8");
}

function buildInternalUtilityMacrosPack() {
    const folderPath = "./src/packs/data/xdy-internal-utility-macros";
    const lines: string[] = [];
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (!filePath.endsWith(".macro")) {
            continue;
        }

        try {
            const macroName = path.parse(file).name;
            const contents = fs.readFileSync(filePath, { encoding: "utf8" });
            const map = new Map<string, string>();
            map.set("Macro: Effect: Aid", "systems/pf2e/icons/spells/efficient-apport.webp");
            map.set("Macro: Effect: Cover", "systems/pf2e/icons/conditions-2/status_acup.webp");
            map.set("Macro: Effect: Follow The Expert", "systems/pf2e/icons/spells/favorable-review.webp");
            const img = map.get(macroName) || "icons/svg/dice-target.svg";

            // eslint-disable-next-line
            let json = `{"_id": "${myRandomId()}", "actorIds": [], "author": "${myRandomId()}", "command": ${JSON.stringify(
                contents,
            )},"flags": {},"img":"${img}","name": "${macroName}","permission": {"default": 1},"scope": "global","type": "script"}`;
            lines.push(json);
        } catch (err) {
            console.error(`Failed to read JSON file ${filePath}`, err);
        }
    }
    const file1 = path.resolve(outDir, "./packs/data/xdy-internal-utility-macros" + ".db");
    fs.writeFileSync(file1, lines.join("\n"), "utf8");
}

buildCustomizableMacrosPack();
buildInternalUtilityMacrosPack();
buildAsymonousPack();
fs.rmSync("./dist", { recursive: true, force: true });
fs.mkdirsSync(path.resolve("dist/packs"));
fs.copySync(outDir, "./dist");
fs.rmSync(outDir, { recursive: true, force: true });
