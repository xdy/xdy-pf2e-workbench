import * as fs from "fs";
import path from "path";

console.log("Creating vendored symlinks for foundry and pf2e...");

function fatal(message, hint) {
    console.error(`Error: ${message}`);
    if (hint) console.log(hint);
    process.exit(1);
}

async function ensureDir(dir) {
    await fs.promises.mkdir(dir, { recursive: true });
}

async function createSymlink(sourcePath, targetPath, label) {
    try {
        if (fs.existsSync(targetPath)) {
            await fs.promises.unlink(targetPath);
        }
        await fs.promises.symlink(sourcePath, targetPath);
        console.log(`Symlinked: ${label}`);
    } catch (e) {
        console.error(`Failed to symlink ${label}: ${e.message}`);
        process.exit(1);
    }
}

async function cleanUpOldFoundryDir() {
    const oldDir = "foundry";
    if (!fs.existsSync(oldDir)) return;
    const entries = await fs.promises.readdir(oldDir);
    for (const entry of entries) {
        const entryPath = path.join(oldDir, entry);
        try {
            await fs.promises.rm(entryPath, { recursive: true, force: true });
            console.log(`  Removed old entry: foundry/${entry}`);
        } catch (e) {
            console.warn(`  Could not remove foundry/${entry}: ${e.message}`);
        }
    }
    try {
        await fs.promises.rmdir(oldDir);
        console.log("  Removed old foundry/ directory");
    } catch {
        // ignore if not empty or already removed
    }
}

if (fs.existsSync("foundryconfig.json")) {
    let foundryConfig;
    try {
        foundryConfig = JSON.parse(fs.readFileSync("foundryconfig.json", "utf8"));
    } catch (err) {
        fatal(`Could not read foundryconfig.json: ${err.message}`);
    }

    if (!foundryConfig.installPath) {
        fatal(
            "installPath not specified in foundryconfig.json",
            "Please copy foundryconfig.example.json to foundryconfig.json and set your Foundry installation path.",
        );
    }

    // The Node install is *not* nested but Electron installs *are*
    const nested = fs.existsSync(path.join(foundryConfig.installPath, "resources", "app"));
    const fileRoot = nested ? path.join(foundryConfig.installPath, "resources", "app") : foundryConfig.installPath;
    console.log(`Detected ${nested ? "Electron" : "Node.js"} install at: ${fileRoot}`);

    if (!fs.existsSync(fileRoot)) {
        fatal(
            `Foundry install path does not exist: ${fileRoot}`,
            "Please verify the installPath in foundryconfig.json is correct.",
        );
    }

    await cleanUpOldFoundryDir();
    await ensureDir("vendored/foundry");

    for (const p of ["client", "common", "tsconfig.json"]) {
        await createSymlink(path.join(fileRoot, p), path.join("vendored", "foundry", p), `vendored/foundry/${p}`);
    }

    await createSymlink(
        path.join(fileRoot, "public", "lang"),
        path.join("vendored", "foundry", "lang"),
        "vendored/foundry/lang",
    );

    if (foundryConfig.pf2eSourcePath) {
        if (!fs.existsSync(foundryConfig.pf2eSourcePath)) {
            console.warn(`pf2eSourcePath does not exist: ${foundryConfig.pf2eSourcePath} — skipping pf2e symlink.`);
        } else {
            await ensureDir("vendored/pf2e");
            await createSymlink(
                foundryConfig.pf2eSourcePath,
                path.join("vendored", "pf2e", "src"),
                "vendored/pf2e/src",
            );
        }
    } else {
        console.log("pf2eSourcePath not set in foundryconfig.json — skipping pf2e symlink.");
    }

    console.log("\nSymlinks created successfully!");
    console.log("You may need to restart your IDE (VS Code or IntelliJ IDEA) to see IntelliSense improvements.");
} else {
    console.log("foundryconfig.json not found.");
    console.log("Please copy foundryconfig.example.json to foundryconfig.json");
    console.log("and set your Foundry installation path.");
    console.log("Then run: pnpm run symlinks");
    console.log("\nSkipping symlink creation...");
}
