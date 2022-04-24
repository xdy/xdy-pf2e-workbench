import { ActorPF2e } from "@actor";
import { ActorType } from "@actor/data";
/**
 * Collects every actor whose token is controlled on the canvas, and if none are, collects the current user's character, if it exists.
 *
 * @param types The actor types the function should take into consideration.
 * @param useOwnCharacter If true, the function will append the user's own character to the list of collected actors.
 * @returns An array of ActorPF2E elements according to the aforementioned filters.
 */
declare function getSelectedOrOwnActors(types?: ActorType[], useOwnCharacter?: boolean): ActorPF2e[];
export { getSelectedOrOwnActors };
