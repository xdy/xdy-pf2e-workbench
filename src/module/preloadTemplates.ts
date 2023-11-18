export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        // Add paths to "modules/xdy-pf2e-workbench/templates"
    ];

    await loadTemplates(templatePaths);
}
