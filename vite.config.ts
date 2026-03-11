import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs-extra";
import checker from "vite-plugin-checker";

function readJson(path: string) {
    try {
        return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
    } catch (error) {
        throw new Error(`Failed to parse JSON file \`${path}\`: ${error instanceof Error ? error.message : String(error)}`);
    }
}

const EN_JSON = readJson("./static/lang/en.json");

const plugins = [
    checker({ typescript: true }),
    tsconfigPaths(),
    ...viteStaticCopy({
        targets: [
            { src: "CHANGELOG.md", dest: "." },
            { src: "README.md", dest: "." },
            { src: "CONTRIBUTING.md", dest: "." },
        ],
    }),
];

export default defineConfig({
    publicDir: "static",
    define: {
        EN_JSON: JSON.stringify(EN_JSON),
        fu: "foundry.utils",
    },
    esbuild: { keepNames: true },
    build: {
        emptyOutDir: false,
        outDir: "dist",
        minify: true,
        sourcemap: true,
        lib: {
            name: "xdy-pf2e-workbench",
            entry: "src/module/xdy-pf2e-workbench.ts",
            formats: ["es"],
            fileName: "xdy-pf2e-workbench",
        },
        rollupOptions: {
            watch: { buildDelay: 100 },
        },
        target: "ESNext",
    },
    server: {
        port: 30001,
        open: "/game",
        proxy: {
            "^(?!/modules/xdy-pf2e-workbench/)": "http://localhost:30000/",
            "/socket.io": {
                target: "ws://localhost:30000",
                ws: true,
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins,
});
