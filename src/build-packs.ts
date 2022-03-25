//This script has been dreadfully hacked from the original at https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original, provided under the [ISC license](https://www.isc.org/licenses/)

import fs from "fs-extra";
import path from "path";

const asymonousSource = [
    "./submodules/my-foundryvtt-macros/PF2e",
    "./submodules/my-foundryvtt-macros/PF2e/Contributions by others",
];
const packsSource = "packs";

const pf2eSystemPath = (() => {
    const configPath = path.resolve(process.cwd(), "foundryconfig.json");
    const configData = fs.existsSync(configPath) ? fs.readJSONSync(configPath) : undefined;
    return configData !== undefined ? path.join(configData.dataPath, "Data", "modules", configData.moduleName) : null;
})();
const outDir = pf2eSystemPath ?? path.join(".");

fs.mkdirsSync(path.resolve(outDir, "packs"));

function randomID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(Array(16).keys())
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");
}

function copyFolder(source: string, target: string) {
    fs.readdirSync(source)
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
            const sourcePath = decodeURIComponent(path.join(source, file));
            const targetPath = decodeURIComponent(path.join(target, file));
            fs.copyFileSync(sourcePath, targetPath);
            //Log last part of path
            console.log(`Copied ${path.basename(targetPath)}`);
            // eslint-disable-next-line
            fs.appendFileSync(targetPath, `\n//# source "https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/${path.basename(path.dirname(sourcePath))}/${file}" - Fetched on ${new Date().toISOString()}`);
        });
}

fs.mkdirsSync(outDir + "/" + packsSource + "/" + "asymonous-benefactor-macros");
copyFolder(path.resolve(".", asymonousSource[0]), path.resolve(outDir, packsSource + "/asymonous-benefactor-macros"));
copyFolder(path.resolve(".", asymonousSource[1]), path.resolve(outDir, packsSource + "/asymonous-benefactor-macros"));

function getFolders(dir: string) {
    const results: string[] = [];
    const folders = fs.readdirSync(packsSource);
    for (const folder of folders) {
        if (fs.statSync(path.join(dir, folder)).isDirectory()) {
            results.push(folder);
        }
    }

    return results;
}

const folders = getFolders(packsSource);
const lines: string[] = [];
for (const folder of folders) {
    const folderPath = path.join(packsSource, folder);
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (!filePath.endsWith(".js")) {
            continue;
        }
        try {
            const macroName = path.parse(file).name;
            const importMacro = `/** This compendium link macro will always call the most recent version from the compendium included with this module meaning you do not need to reimport newer versions. The source of the macros that get called is https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e */
async function _executeMacroByName(name) {
    let pack = game.packs.get('xdy-pf2e-workbench.asymonous-benefactor-macros');
    pack.getIndex().then(index => {
        let id = index.find(e => e.name === name)?._id;
        if (id)
            pack.getDocument(id).then(e => e.execute()
    )});
}

_executeMacroByName('XDY DO_NOT_IMPORT ${macroName}');

//This compendium link macro is based on one originally posted by DrentalBot: https://discord.com/channels/880968862240239708/880975811279204402/910490804554973274;`;
            const contents = fs.readFileSync(filePath, { encoding: "utf8" });
            //TODO Instead of hardcoding icons, have a map of icons to use (yes, it'll get out of date eventually, but, eh, it's a start)
            // eslint-disable-next-line
            let json = `{"_id": "${randomID()}", "actorIds": [], "author": "${randomID()}", "command": ${JSON.stringify(contents)},"flags": {},"img":"icons/svg/trap.svg","name": "XDY DO_NOT_IMPORT ${macroName}","permission": {"default": 1},"scope": "global","type": "script"}\n`;
            // eslint-disable-next-line
            json += `{"_id": "${randomID()}", "actorIds": [], "author": "${randomID()}", "command": ${JSON.stringify(importMacro)},"flags": {},"img":"icons/svg/dice-target.svg","name": "${macroName}","permission": {"default": 1},"scope": "global","type": "script"}`;
            lines.push(json);
        } catch (err) {
            console.error(`Failed to read JSON file ${filePath}`, err);
        }
    }
    const result = lines.join("\n");
    const file1 = path.resolve(outDir, "packs", folder + ".db");
    fs.writeFileSync(file1, result, "utf8");
}
fs.rmdirSync(path.resolve(outDir, packsSource + "/asymonous-benefactor-macros"));
