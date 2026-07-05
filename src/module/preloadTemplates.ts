import { MODULENAME } from "./constants.ts";

export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [`modules/${MODULENAME}/templates/feature/heropoint-handler/index.hbs`];

    await foundry.applications.handlebars.loadTemplates(templatePaths);
}
