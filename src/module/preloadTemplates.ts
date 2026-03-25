import { MODULENAME } from "./xdy-pf2e-workbench.js";

export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        `modules/${MODULENAME}/templates/feature/heropoint-handler/index.hbs`,
    ];

    await foundry.applications.handlebars.loadTemplates(templatePaths);
}
