import type { ActorPF2e, ActorType } from "@actor";
/**
 * Collects every actor whose token is controlled on the canvas.
 * @param [options] Filter and fallback options
 * @returns An array of ActorPF2E instances filtered by the requested types.
 */
declare function getSelectedActors(options?: GetSelectedActorsOptions): ActorPF2e[];
interface GetSelectedActorsOptions {
    /** Actor types that should be included (defaults to all) */
    include?: (ActorType | "creature")[];
    /** Actor types that should be excluded (defaults to none) */
    exclude?: (ActorType | "creature")[];
    /** Given no qualifying actor is selected, fall back to the user's assigned character if it also qualifies. */
    assignedFallback?: boolean;
}
export { getSelectedActors };
