export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
    const templatePaths: string[] = [
        // Add paths to "modules/xdy-pf2e-workbench/templates"
    ];

    return loadTemplates(templatePaths);
}
