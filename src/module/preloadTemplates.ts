import { setupSkillActions } from "./feature/skill-actions/sheet-skill-actions";
import { MODULENAME } from "./xdy-pf2e-workbench";

export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        // Add paths to "modules/xdy-pf2e-workbench/templates"
    ];

    await loadTemplates(templatePaths);

    // TODO Improve this
    if (game.settings.get(MODULENAME, "skillActions") !== "disabled") {
        await setupSkillActions();
    }
}
