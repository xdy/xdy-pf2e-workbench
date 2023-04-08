import fs from "fs-extra";
import * as Vite from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// eslint-disable-next-line import/default
import checker from "vite-plugin-checker";
import path from "path";
import packageJSON from "./package.json";
import esbuild from "esbuild";

const config = Vite.defineConfig(({ mode }): Vite.UserConfig => {
    const buildMode = mode === "production" ? "production" : "development";
    const outDir = "dist";

    const plugins = [checker({ typescript: true }), tsconfigPaths()];
    // Handle minification after build to allow for tree-shaking and whitespace minification
    // "Note the build.minify option does not minify whitespaces when using the 'es' format in lib mode, as it removes
    // pure annotations and breaks tree-shaking."
    if (buildMode === "production") {
        plugins.push({
            name: "minify",
            renderChunk: {
                order: "post",
                async handler(code, chunk) {
                    return chunk.fileName.endsWith(".mjs")
                        ? esbuild.transform(code, { minify: true, keepNames: true })
                        : code;
                },
            },
        });
    } else {
        // Foundry expects all esm files listed in system.json to exist: create empty vendor module when in dev mode
        plugins.push({
            name: "touch-vendor-mjs",
            apply: "build",
            writeBundle: {
                async handler() {
                    if (buildMode === "development") {
                        fs.closeSync(fs.openSync(path.resolve(path.resolve(__dirname, outDir), "vendor.mjs"), "w"));
                    }
                },
            },
        });
    }

    return {
        base: "./",
        publicDir: "static",
        define: {
            BUILD_MODE: JSON.stringify(buildMode),
        },
        esbuild: { keepNames: true },
        build: {
            outDir,
            emptyOutDir: true,
            minify: buildMode !== "development",
            sourcemap: buildMode === "development" ? "inline" : false,
            lib: {
                name: "main",
                entry: "src/module/xdy-pf2e-workbench.ts",
                formats: ["es"],
                fileName: "xdy-pf2e-workbench",
            },
            rollupOptions: {
                external: ["@actor/modifiers"],
                output: {
                    assetFileNames: ({ name }): string => {
                        return /\.css$/.test(name ?? "") ? "styles/xdy-pf2e-workbench.css" : name ?? "what-is-this.txt";
                    },
                    chunkFileNames: "[name].mjs",
                    entryFileNames: "xdy-pf2e-workbench.mjs",
                    manualChunks: {
                        vendor: buildMode === "production" ? Object.keys(packageJSON.dependencies) : [],
                    },
                },
                watch: { buildDelay: 500 },
            },
        },
        plugins,
    };
});

// eslint-disable-next-line import/no-default-export
export default config;
