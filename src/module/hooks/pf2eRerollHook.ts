import { CheckRoll, ResourceData } from "foundry-pf2e";
import { Rolled } from "foundry/client/dice/roll.mts";
import { MODULENAME } from "../xdy-pf2e-workbench.js";

/** Matches `pf2e.reroll` / `pf2e.preReroll` 4th argument on pf2e v14-dev (`Check.rerollFromMessage`). */
type Pf2eRerollHookOptions = { keep?: "new" | "higher" | "lower" };

/** Hero Point variant rules */
export function pf2eRerollHook(
    oldRoll: Rolled<CheckRoll>,
    newRoll: Rolled<CheckRoll>,
    resource: ResourceData | null,
    hookOptions: Pf2eRerollHookOptions,
): void {
    const keep = hookOptions.keep ?? "new";
    if (resource?.slug !== "hero-points" || keep !== "new") return;

    const die = newRoll.dice.find((d) => d instanceof foundry.dice.terms.Die && d.number === 1 && d.faces === 20);
    const result = die?.results.find((r) => r.active && r.result <= 10);

    // Handle Keeley's Hero Point Rule
    if (die && result && game.settings.get(MODULENAME, "heroPointRules") === "keeleysHeroPointRule") {
        newRoll.terms.push(
            foundry.dice.terms.OperatorTerm.fromData({ class: "OperatorTerm", operator: "+", evaluated: true }),
            foundry.dice.terms.NumericTerm.fromData({ class: "NumericTerm", number: 10, evaluated: true }),
        );
        // @ts-expect-error It's protected. Meh.
        newRoll._total += 10;
        newRoll.reroll();
        newRoll.options.keeleyAdd10 = true;
    } else if (die && result && game.settings.get(MODULENAME, "heroPointRules") === "heroicRerolls") {
        // Handle Heroic Rerolls: if d20 result < 10, set it to 10
        const oldResult = result.result;
        result.result = 10;
        // @ts-expect-error It's protected. Meh.
        newRoll._total = newRoll._total - oldResult + 10;
        newRoll.options.heroicReroll = true;
    } else if (game.settings.get(MODULENAME, "heroPointRules") === "useHighestHeroPointRoll") {
        // Handle useHighestHeroPointRoll setting
        hookOptions.keep = "higher";
    }
}
