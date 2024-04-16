import type { Action, ActionVariant, ActionUseOptions, ActionMessageOptions } from "@actor/actions/types.d.ts";
import type { ActorPF2e } from "@actor";
import type { ChatMessagePF2e } from "@module/chat-message/document.d.ts";
import type { ActionTrait } from "@item/ability/index.d.ts";
import type { EffectPF2e } from "@item";
import type { EffectSource } from "@item/effect/data.d.ts";
import type { RuleElementSource } from "@module/rules/rule-element/data.d.ts";
import type { ChoiceSetSource } from "@module/rules/rule-element/choice-set/data.d.ts";
import type { PickableThing } from "@module/apps/pick-a-thing-prompt.d.ts";
import type { RawPredicate } from "@system/predication.d.ts";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

// IDK why choices isn't in ChoiceSetSource
interface ChoiceSetSourceWithChoices extends ChoiceSetSource {
    // Maybe this should have been UninflatedChoiceSet as the type, but that has issues,
    // see below.
    choices: PickableThingSource[];
}

// UninflatedChoiceSet can be PickableThing[], but PickableThing contains a Predicate.
// We don't have a Predciate in the rule source, we have a RawPredicate.  There doesn't
// seem to be an existing type for the source of a choice.
type PickableThingSource = Omit<PickableThing, "predicate"> & { predicate?: RawPredicate; sort?: number };

interface FTEFlags {
    minimum?: number;
    bonus?: {
        untrained?: number;
        trained?: number;
        expert?: number;
        master?: number;
        legendary?: number;
    };
}

class FollowTheExpertAction implements Action {
    readonly img: string;
    readonly name: string;
    readonly slug: string;
    readonly traits: ActionTrait[];
    // variants is required for the interface, but this action has no variants.
    // Since nothing in this module uses them, an empty collection satifies the
    // requirements with the least code.
    readonly variants: Collection<ActionVariant>;

    readonly effect: ItemUUID;

    public constructor() {
        this.img = "systems/pf2e/icons/spells/favorable-review.webp";
        this.name = `${MODULENAME}.macros.basicActionMacros.actions.FollowTheExpertToggle`;
        this.slug = "follow-the-expert";
        this.traits = ["exploration"];
        this.variants = new Collection();
        this.effect = "Compendium.pf2e.other-effects.VCSpuc3Tf3XWMkd3" as ItemUUID; // Effect: Follow The Expert
    }

    private fixupRules(effect: EffectSource, expert: ActorPF2e) {
        const expertSkills = expert.skills;
        // Skilless expert? Don't follow them! Typescript complains.
        if (!expertSkills) return;

        const flags = expert.flags.pf2e?.followTheExpert as FTEFlags | undefined;
        // List of Lores that meet FTE minimum proficiency
        const minLevel = flags?.minimum ?? 2;
        const lores = Object.values(expertSkills)
            .filter((s) => s.lore && (s.rank ?? 0) >= minLevel)
            .map((s) => ({ label: s.label, value: s.slug }));

        const skillRule = effect.system.rules.find(
            (e: ChoiceSetSource) => e.key === "ChoiceSet" && e.flag === "followTheExpertSkill",
        ) as ChoiceSetSourceWithChoices | null;
        const profRule = effect.system.rules.find(
            (e: ChoiceSetSource) => e.key === "ChoiceSet" && e.flag === "followTheExpertProficiency",
        ) as ChoiceSetSourceWithChoices | null;
        if (!skillRule || !profRule) throw new Error("Effect: FTE did not have expected rules");

        // Add choice for trained if necessary
        if (minLevel <= 1) profRule.choices.push({ label: "PF2E.ProficiencyLevel1", sort: 0, value: 1 });

        // Filter skill choices that don't meet FTE minimum proficiency, default 2 (expert), and add lores
        skillRule.choices = skillRule.choices
            .filter((c) => (expertSkills[c.value as string]?.rank ?? 0) >= minLevel)
            .concat(lores);

        // Make proficiency choices predicate on having chosen a skill with that proficiency.
        // This should result in only one choice being allowed, thus skipping the dialog.
        const skills = skillRule.choices.map((c) => c.value) as string[];
        for (const choice of profRule.choices) {
            const skillsAtLevel = skills.filter((s) => expertSkills[s].rank === choice.value);
            if (skillsAtLevel.length > 0) {
                choice.predicate = [
                    {
                        or: skillsAtLevel.map((s) => ({
                            eq: ["{item|flags.pf2e.rulesSelections.followTheExpertSkill}", s],
                        })),
                    },
                ];
            } else {
                choice.predicate = ["disabled"];
            }
        }

        // Adjust the modifier if the target has something that changes it
        if (flags?.bonus) {
            const rankSlugs = Object.keys(CONFIG.PF2E.proficiencyRanks);
            effect.system.rules.push({
                key: "AdjustModifier",
                mode: "upgrade",
                slug: "follow-the-expert-circumstance",
                selector: "{item|flags.pf2e.rulesSelections.followTheExpertSkill}",
                value: {
                    brackets: rankSlugs
                        .map((r, i) => ({ start: i, end: i, value: flags.bonus?.[r] }))
                        .filter((b) => b.value !== undefined),
                    field: "item|flags.pf2e.rulesSelections.followTheExpertProficiency",
                },
            } as RuleElementSource);
        }
    }

    async use(_options?: Partial<ActionUseOptions>): Promise<unknown> {
        const source = (await fromUuid(this.effect)) as EffectPF2e | null;
        if (!source) throw new Error(`Effect ${this.effect} not found!`);
        const effect = source.toObject();
        (effect.flags.core ??= {}).sourceId = this.effect;

        const actors = canvas.tokens.controlled.flatMap((token) => token.actor ?? []);
        if (actors.length === 0 && game.user.character) actors.push(game.user.character);
        if (actors.length === 0) {
            return ui.notifications.error("PF2E.ErrorMessage.NoTokenSelected", { localize: true });
        }

        const target = game.user.targets.first();
        if (target?.actor) {
            this.fixupRules(effect, target.actor);
        }

        for (const actor of actors) {
            const existing = actor.itemTypes.effect.find((e) => e.flags.core?.sourceId === this.effect);
            if (existing) {
                await existing.delete();
            } else {
                await actor.createEmbeddedDocuments("Item", [effect]);
            }
        }

        // SimpleAction would return a list of [actor, effect, message] tuples,
        // but nothing will use it, so it's not done here.
        return true;
    }

    async toMessage(_options?: Partial<ActionMessageOptions>): Promise<ChatMessagePF2e | undefined> {
        // There isn't a message for toggling an effect.  Could be added.
        return undefined;
    }
}

let followTheExpert: FollowTheExpertAction;
// Break module initialization order issue w.r.t. MODULENAME from xdy-pf2e-workbench.js
Hooks.once("setup", () => {
    followTheExpert = new FollowTheExpertAction();
});

export { followTheExpert };
