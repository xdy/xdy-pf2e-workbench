import { MODULENAME } from "./constants.ts";

export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        `modules/${MODULENAME}/templates/dialogs/add-user-targets.hbs`,

        `modules/${MODULENAME}/templates/feature/heropoint-handler/index.hbs`,

        `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/table.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs`,

        `modules/${MODULENAME}/templates/macros/bam/index.hbs`,
        `modules/${MODULENAME}/templates/macros/bam/actionButton.hbs`,

        `modules/${MODULENAME}/templates/settings/field-select.hbs`,
        `modules/${MODULENAME}/templates/settings/field-checkbox.hbs`,
        `modules/${MODULENAME}/templates/settings/field-number.hbs`,
        `modules/${MODULENAME}/templates/settings/field-range.hbs`,
        `modules/${MODULENAME}/templates/settings/field-text.hbs`,
    ];

    await foundry.applications.handlebars.loadTemplates(templatePaths);
}
