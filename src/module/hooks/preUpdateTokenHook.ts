import { getModuleSetting } from "../utils.ts";

export function preUpdateTokenHook(
    _document: unknown,
    update: {
        x?: number | null;
        y?: number | null;
    },
    options: object,
    ..._args: unknown[]
): void {
    if (getModuleSetting("tokenAnimation") && (update.x !== null || update.y !== null)) {
        fu.setProperty(options, "animation", {
            movementSpeed: getModuleSetting("tokenAnimationSpeed"),
        });
    }
}
