import { MODULENAME } from "./xdy-pf2e-workbench.js";
import { setupSkillActions } from "./feature/skill-actions/sheet-skill-actions.js";

export async function preloadTemplates(): Promise<void> {
    const templatePaths: string[] = [
        // Add paths to "modules/xdy-pf2e-workbench/templates"
    ];

    await loadTemplates(templatePaths);

    // TODO Improve this
    if (String(game.settings.get(MODULENAME, "skillActions")) !== "disabled") {
        await setupSkillActions();
    }
}
