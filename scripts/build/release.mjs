import fs from "fs-extra";
import { execSync } from "child_process";

const version = process.argv[2];
if (!version) {
    console.error("Usage: node ./scripts/build/release.mjs <version>");
    process.exit(1);
}

const moduleJsonPath = "static/module.json";
const moduleJson = JSON.parse(fs.readFileSync(moduleJsonPath, "utf8"));
const MODULE_ID = moduleJson.id;

moduleJson.version = version;
moduleJson.manifest = `https://github.com/xdy/${MODULE_ID}/releases/latest/download/module.json`;
moduleJson.download = `https://github.com/xdy/${MODULE_ID}/releases/download/v${version}/${MODULE_ID}.zip`;
fs.writeJsonSync(moduleJsonPath, moduleJson, { spaces: 4 });
console.log(`Updated ${moduleJsonPath}: version=${version}`);

fs.copyFileSync(moduleJsonPath, "dist/module.json");
console.log("Copied module.json to dist/");

const packageJsonPath = "package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
packageJson.version = version;
fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 4 });
console.log(`Updated ${packageJsonPath}: version=${version}`);

try {
    execSync(`zip -r ${MODULE_ID}.zip .`, { cwd: "dist", stdio: "inherit" });
} catch (err) {
    console.error("Failed to create zip file:", err.message);
    process.exit(1);
}
console.log(`Created dist/${MODULE_ID}.zip`);
