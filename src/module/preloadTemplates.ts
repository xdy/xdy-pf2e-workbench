export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        // Add paths to "modules/xdy-pf2e-workbench/templates"
    ];

    if (foundry.utils.isNewerVersion(game.version, 13)) {
        // @ts-expect-error
        await foundry.applications.handlebars.loadTemplates(templatePaths);
    } else {
        // v12 remove later
        await loadTemplates(templatePaths);
    }
}
