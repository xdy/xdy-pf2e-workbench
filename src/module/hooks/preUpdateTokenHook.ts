import { MODULENAME } from "../xdy-pf2e-workbench.js";

export function preUpdateTokenHook(
    _document: unknown,
    update: {
        x?: number | null;
        y?: number | null;
    },
    options: object,
    ..._args: unknown[]
): void {
    if (game.settings.get(MODULENAME, "tokenAnimation") && (update.x !== null || update.y !== null)) {
        fu.setProperty(options, "animation", {
            movementSpeed: game.settings.get(MODULENAME, "tokenAnimationSpeed"),
        });
    }
}
