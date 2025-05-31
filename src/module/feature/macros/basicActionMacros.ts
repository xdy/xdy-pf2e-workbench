// Originally from ApoApostolov#4622, modified by me. Included with permission.
// noinspection CssUnresolvedCustomProperty,CssUnknownTarget

import * as R from "remeda";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import type { MacroPF2e, SkillSlug } from "foundry-pf2e";
import { AbilityTrait, Action, ActionUseOptions, ActionVariant, ActorPF2e, Statistic } from "foundry-pf2e";
import { followTheExpert } from "./follow-the-expert.ts";

declare global {
    interface Window {
        actionDialog: Dialog;
    }
}

// PF2e system uses this for statistic slugs but doesn't make it a type
type StatisticSlug = SkillSlug | "perception";

export async function registerBasicActionMacrosHandlebarsTemplates() {
    if (foundry.utils.isNewerVersion(game.version, 13)) {
        // @ts-expect-error
        await foundry.applications.handlebars.loadTemplates([
            `modules/${MODULENAME}/templates/macros/bam/index.hbs`,
            `modules/${MODULENAME}/templates/macros/bam/actionButton.hbs`,
        ]);
    } else {
        // v12 remove later
        await loadTemplates([
            `modules/${MODULENAME}/templates/macros/bam/index.hbs`,
            `modules/${MODULENAME}/templates/macros/bam/actionButton.hbs`,
        ]);
    }

    Handlebars.registerPartial("actionButton", `{{> "modules/${MODULENAME}/templates/macros/bam/actionButton.hbs"}}`);
}

function getBestBonuses(
    actorSkills: Map<string, Partial<Record<StatisticSlug, Statistic>>>,
    party: string[],
    actionList: MacroAction[],
) {
    for (const actorId of party) {
        const skills = actorSkills.get(actorId);
        for (const action of actionList) {
            const skill = skills?.[action.skill];
            if (!skill) continue;
            const bonus = skill.check?.mod ?? skill.mod;
            if (bonus > (action.best ?? -1)) {
                action.best = bonus;
                action.whoIsBest = actorId;
            }
        }
    }
}

function createMapOfSkillsPerActor(actors: ActorPF2e[]): Map<string, Partial<Record<StatisticSlug, Statistic>>> {
    const map = new Map<string, Partial<Record<StatisticSlug, Statistic>>>();
    for (const actor of actors) {
        const skills = fetchSkills(actor);
        if (skills) {
            map.set(actor.id, skills);
        }
    }
    return map;
}

function fetchSkills(actor: ActorPF2e): Partial<Record<StatisticSlug, Statistic>> {
    return { perception: actor.perception, ...actor.skills };
}

type ButtonData = {
    action: MacroAction;
    skill: Statistic | undefined;
    bonus: number;
    best: boolean;
    idx: number;
};

function createButtonData(
    action: MacroAction,
    idx: number,
    actor: ActorPF2e,
    party: string[],
    actorSkills: Partial<Record<StatisticSlug, Statistic>>,
): ButtonData {
    const skill: Statistic | undefined = actorSkills[action.skill];
    const bonus = skill?.mod ?? -1;
    const best =
        !!game.settings.get(MODULENAME, "basicActionMacroShowBestBonus") &&
        party.includes(actor.id) &&
        bonus >= (action.best ?? 0);
    return { best, idx, action, skill, bonus };
}

type MacroAction = {
    // These are supplied for each supported action
    actionType: "basic" | "skill_untrained" | "skill_trained" | "other";
    // Skill name or blank for non-skill actions
    skill: StatisticSlug | "";
    // The altSkillAndFeat stuff should really be more flexible. Maybe look at what SkillActions did for prereqs?
    altSkillAndFeat?: { skill: StatisticSlug; feat: string }[];
    // Localized name to appear in menu
    name: string;
    // Path to icon
    icon: string;
    // Object to use when action is selected
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    action: Function | Action | ActionVariant | undefined;
    // Optional parameters for an Action.use() call for Action or ActionVariant type actions
    options?: Partial<ActionUseOptions>;
    // Module needed for action to be present (external macros)
    module?: string;
    // Feat needed to for action to be present
    feat?: string;

    // These are all filled in based on the action and actor data
    best?: number;
    whoIsBest?: string;
    showMAP?: boolean;
    isEscape?: boolean;
    showExploration?: boolean;
    showDowntime?: boolean;
};

/**
 * Generates the filtered list of actions to use based on the given bamActions.
 *
 * @param {ActorPF2e} selectedActor The selected actor.
 * @param {MacroAction[]} bamActions - The list of MacroActions to filter.
 * @return {MacroAction[]} The filtered list of actions to use.
 */
function prepareActions(selectedActor: ActorPF2e, bamActions: MacroAction[]): MacroAction[] {
    const showUnusable = game.settings.get(MODULENAME, "bamShowUnusable");
    const hasFeat = (slug: string) => selectedActor.itemTypes.feat.some((feat) => feat.slug === slug);

    const actionsToUse = bamActions
        .filter((x) => {
            const hasSkill = selectedActor.skills?.[x.skill]?.rank ?? 0 > 0;
            const hasAltSkillAndFeat = x.altSkillAndFeat?.some(
                (y) => selectedActor.skills?.[y.skill].rank && hasFeat(y.feat),
            );
            if (x.module && !game.modules.get(x.module)?.active) return false;
            if (x.feat && !hasFeat(x.feat)) return false;

            return (
                showUnusable ||
                x.actionType !== "skill_trained" ||
                (x.actionType === "skill_trained" && ["npc", "familiar"].includes(selectedActor.type)) ||
                selectedActor.itemTypes.feat.some((feat) => feat.slug === "clever-improviser") ||
                hasSkill ||
                hasAltSkillAndFeat
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));

    actionsToUse.forEach((x) => {
        const traits = (x as any)?.action?.traits ?? [];
        x.showMAP = traits.includes("attack");
        x.showDowntime = traits.includes("downtime");
        x.showExploration = traits.includes("exploration");
        x.isEscape = x.name.includes("Escape");
    });

    return actionsToUse;
}

// Class to wrap a macro into an object that supports the ActionVariant
// interface, which is what most of the system actions use.
class MacroActionVariant implements ActionVariant {
    traits: AbilityTrait[] = [];
    #macro: string;
    #compendium: string;

    get slug() {
        return this.#macro.slugify();
    }

    constructor(macro: string, compendium: string) {
        this.#macro = macro;
        this.#compendium = compendium;
    }

    async use(options: ActionUseOptions): Promise<undefined> {
        const pack = game.packs.get(this.#compendium);
        if (pack) {
            const macros = (await pack.getDocuments({ name: this.#macro })) as MacroPF2e[];
            if (macros.length > 0) {
                await macros[0].execute(R.pick(options, ["event"]));
            } else {
                ui.notifications.error(
                    game.i18n.format(`${MODULENAME}.macros.basicActionMacros.macroNotFound`, {
                        macroName: this.#macro,
                    }),
                );
            }
        } else {
            ui.notifications.error(
                game.i18n.format(`${MODULENAME}.macros.basicActionMacros.compendiumNotFound`, {
                    compendiumName: this.#compendium,
                }),
            );
        }
    }

    async toMessage(): Promise<undefined> {
        // Required by interface, but not used by this module
    }
}

/**
 * This macro opens a dialog containing a list of actions to be used by the selected Actor
 * If no actor is selected, it selects the user's standard character.
 * If there is no user character, it shows up a warning notification.
 */
export async function basicActionMacros() {
    const bamActions: MacroAction[] = [
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AdministerFirstAidStabilize`),
            skill: "medicine",
            action: game.pf2e.actions.get("administer-first-aid")?.variants.get("stabilize"),
            icon: "systems/pf2e/icons/features/feats/treat-wounds.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AdministerFirstAidStopBleeding`),
            skill: "medicine",
            action: game.pf2e.actions.get("administer-first-aid")?.variants.get("stop-bleeding"),
            icon: "systems/pf2e/icons/conditions/persistent-damage.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidToggle`),
            skill: "",
            action: new MacroActionVariant("macroEffectAid", "xdy-pf2e-workbench.xdy-internal-utility-macros"),
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidASE`),
            skill: "",
            action: new MacroActionVariant("Aid", "pf2e-action-support-engine-macros.action-support-engine-macros"),
            module: "pf2e-action-support-engine",
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidPF2eMacros`),
            skill: "",
            action: (options) => game["activemacros"].aid(options.actors?.[0]),
            module: "pf2e-macros",
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AvoidNotice`),
            skill: "stealth",
            action: game.pf2e.actions.get("avoid-notice"),
            icon: "systems/pf2e/icons/features/classes/surprice-attack.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Balance`),
            skill: "acrobatics",
            action: game.pf2e.actions.get("balance"),
            icon: "icons/skills/movement/feet-winged-boots-brown.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Climb`),
            skill: "athletics",
            action: game.pf2e.actions.get("climb"),
            icon: "icons/sundries/misc/ladder.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Coerce`),
            skill: "intimidation",
            action: game.pf2e.actions.get("coerce"),
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CommandAnAnimal`),
            skill: "nature",
            action: game.pf2e.actions.get("command-an-animal"),
            icon: "icons/environment/creatures/horse-white.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ConcealAnObject`),
            skill: "stealth",
            action: game.pf2e.actions.get("conceal-an-object"),
            icon: "systems/pf2e/icons/equipment/adventuring-gear/wax-key-blank.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Craft`),
            skill: "crafting",
            action: game.pf2e.actions.craft,
            icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateForgery`),
            skill: "society",
            action: game.pf2e.actions.get("create-forgery"),
            icon: "systems/pf2e/icons/spells/transcribe-moment.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionDistractingWords`),
            skill: "deception",
            action: game.pf2e.actions.get("create-a-diversion")?.variants.get("distracting-words"),
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionGesture`),
            skill: "deception",
            action: game.pf2e.actions.get("create-a-diversion")?.variants.get("gesture"),
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionTrick`),
            skill: "deception",
            action: game.pf2e.actions.get("create-a-diversion")?.variants.get("trick"),
            icon: "systems/pf2e/icons/spells/charming-words.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingArcana`),
            skill: "arcana",
            action: game.pf2e.actions.get("decipher-writing"),
            options: { statistic: "arcana" },
            icon: "icons/skills/trades/academics-book-study-runes.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingOccultism`),
            skill: "occultism",
            action: game.pf2e.actions.get("decipher-writing"),
            options: { statistic: "occultism" },
            icon: "icons/skills/trades/academics-book-study-purple.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingReligion`),
            skill: "religion",
            action: game.pf2e.actions.get("decipher-writing"),
            options: { statistic: "religion" },
            icon: "systems/pf2e/icons/equipment/other/spellbooks/thresholds-of-truth.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingSociety`),
            skill: "society",
            action: game.pf2e.actions.get("decipher-writing"),
            options: { statistic: "society" },
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Demoralize`),
            skill: "intimidation",
            action: new MacroActionVariant(
                "XDY DO_NOT_IMPORT Demoralize",
                "xdy-pf2e-workbench.asymonous-benefactor-macros-internal",
            ),
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Disarm`),
            skill: "athletics",
            action: game.pf2e.actions.get("disarm"),
            icon: "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DisableDevice`),
            skill: "thievery",
            action: game.pf2e.actions.get("disable-device"),
            icon: "systems/pf2e/icons/equipment/adventuring-gear/thieves-tools.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Escape`),
            skill: "",
            action: game.pf2e.actions.get("escape"),
            icon: "icons/skills/movement/feet-winged-boots-glowing-yellow.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Feint`),
            skill: "deception",
            action: game.pf2e.actions.get("feint"),
            icon: "icons/skills/melee/maneuver-sword-katana-yellow.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.FollowTheExpertToggle`),
            skill: "",
            action: followTheExpert,
            icon: "systems/pf2e/icons/spells/favorable-review.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ForceOpen`),
            skill: "athletics",
            action: game.pf2e.actions.get("force-open"),
            icon: "icons/equipment/feet/boots-armored-steel.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.GatherInformation`),
            skill: "diplomacy",
            action: game.pf2e.actions.get("gather-information"),
            icon: "icons/skills/social/diplomacy-handshake.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Grapple`),
            skill: "athletics",
            action: game.pf2e.actions.get("grapple"),
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Hide`),
            skill: "stealth",
            action: game.pf2e.actions.get("hide"),
            icon: "systems/pf2e/icons/features/classes/wild.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Impersonate`),
            skill: "deception",
            action: game.pf2e.actions.get("impersonate"),
            icon: "icons/equipment/head/mask-carved-scream-tan.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpHigh`),
            skill: "athletics",
            action: game.pf2e.actions.get("high-jump"),
            icon: "icons/skills/movement/arrows-up-trio-red.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpLong`),
            skill: "athletics",
            action: game.pf2e.actions.get("long-jump"),
            icon: "icons/skills/movement/figure-running-gray.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Lie`),
            skill: "deception",
            action: game.pf2e.actions.get("lie"),
            icon: "icons/magic/control/mouth-smile-deception-purple.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.MakeAnImpression`),
            skill: "diplomacy",
            action: game.pf2e.actions.get("make-an-impression"),
            icon: "icons/environment/people/commoner.webp",
        },
        {
            actionType: "skill_trained",
            name:
                game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.MakeAnImpression`) +
                " - " +
                game.i18n.localize("PF2E.Skill.Performance"),
            skill: "performance",
            action: game.pf2e.actions.get("make-an-impression"),
            options: { statistic: "performance" },
            icon: "icons/environment/people/commoner.webp",
            feat: "impressive-performance",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ManeuverInFlight`),
            skill: "acrobatics",
            action: game.pf2e.actions.get("maneuver-in-flight"),
            icon: "icons/commodities/biological/wing-bird-white.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.PalmAnObject`),
            skill: "thievery",
            action: game.pf2e.actions.get("palm-an-object"),
            icon: "icons/sundries/gaming/playing-cards.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Perform`),
            skill: "performance",
            action: game.pf2e.actions.get("perform")?.variants.get("singing"),
            icon: "icons/skills/trades/music-singing-voice-blue.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.PickALock`),
            skill: "thievery",
            action: game.pf2e.actions.get("pick-a-lock"),
            icon: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize("PF2E.Actions.PointOut.Title"),
            skill: "",
            action: game.pf2e.actions.get("point-out"),
            icon: "systems/pf2e/icons/conditions/observed.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.RaiseAShieldToggle`),
            skill: "",
            action: game.pf2e.actions.raiseAShield,
            icon: "systems/pf2e/icons/actions/raise-a-shield.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.RecallKnowledge`),
            skill: "",
            action: new MacroActionVariant(
                "XDY DO_NOT_IMPORT Recall_Knowledge",
                "xdy-pf2e-workbench.asymonous-benefactor-macros-internal",
            ),
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Repair`),
            skill: "crafting",
            action: game.pf2e.actions.repair,
            icon: "icons/tools/smithing/anvil.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Reposition`),
            skill: "athletics",
            action: game.pf2e.actions.get("reposition"),
            icon: "icons/sundries/gaming/chess-pawn-white-pink.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Request`),
            skill: "diplomacy",
            action: game.pf2e.actions.get("request"),
            icon: "icons/skills/social/thumbsup-approval-like.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Seek`),
            skill: "perception",
            action: game.pf2e.actions.get("seek"),
            icon: "icons/tools/scribal/magnifying-glass.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseDirection`),
            skill: "survival",
            action: game.pf2e.actions.get("sense-direction"),
            icon: "icons/tools/navigation/compass-brass-blue-red.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseMotive`),
            skill: "perception",
            action: game.pf2e.actions.get("sense-motive"),
            icon: "icons/environment/people/commoner.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Shove`),
            skill: "athletics",
            action: game.pf2e.actions.get("shove"),
            icon: "systems/pf2e/icons/spells/hydraulic-push.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Sneak`),
            skill: "stealth",
            action: game.pf2e.actions.get("sneak"),
            icon: "systems/pf2e/icons/conditions/unnoticed.webp",
        },
        {
            actionType: "skill_trained", // Technically not, but... See https://discord.com/channels/613968515677814784/738122137943932958/1175650650575605870
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Squeeze`),
            skill: "acrobatics",
            action: game.pf2e.actions.get("squeeze"),
            icon: "icons/commodities/tech/claw-mechanical.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Steal`),
            skill: "thievery",
            action: game.pf2e.actions.get("steal"),
            icon: "icons/containers/bags/coinpouch-gold-red.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSociety`),
            skill: "society",
            action: game.pf2e.actions.get("subsist"),
            options: { statistic: "society" },
            icon: "icons/environment/settlement/building-rubble.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSurvival`),
            skill: "survival",
            action: game.pf2e.actions.get("subsist"),
            options: { statistic: "survival" },
            icon: "icons/environment/wilderness/camp-improvised.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Swim`),
            skill: "athletics",
            action: game.pf2e.actions.get("swim"),
            icon: "icons/creatures/fish/fish-shark-swimming.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TakeCoverToggle`),
            skill: "",
            action: game.pf2e.actions.get("take-cover"),
            icon: "systems/pf2e/icons/equipment/shields/tower-shield.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Track`),
            skill: "survival",
            action: game.pf2e.actions.get("track"),
            icon: "systems/pf2e/icons/conditions/observed.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatDisease`),
            skill: "medicine",
            action: game.pf2e.actions.get("treat-disease"),
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatPoison`),
            skill: "medicine",
            action: game.pf2e.actions.get("treat-poison"),
            icon: "systems/pf2e/icons/effects/treat-poison.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatWounds`),
            skill: "medicine",
            altSkillAndFeat: [
                { skill: "nature", feat: "natural-medicine" },
                { skill: "crafting", feat: "chirurgeon" },
            ],
            action: new MacroActionVariant(
                "XDY DO_NOT_IMPORT Treat Wounds and Battle Medicine",
                "xdy-pf2e-workbench.asymonous-benefactor-macros-internal",
            ),
            icon: "icons/skills/wounds/injury-stapled-flesh-tan.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Trip`),
            skill: "athletics",
            action: game.pf2e.actions.get("trip"),
            icon: "icons/skills/wounds/bone-broken-marrow-yellow.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TumbleThrough`),
            skill: "acrobatics",
            action: game.pf2e.actions.get("tumble-through"),
            icon: "icons/skills/movement/feet-winged-sandals-tan.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize("PF2E.Actions.DropProne.Title"),
            skill: "",
            action: game.pf2e.actions.get("drop-prone"),
            icon: "systems/pf2e/icons/conditions/prone.webp",
        },
    ];

    const actionDialog = window.actionDialog;
    if (actionDialog?.rendered) {
        return actionDialog.close();
    }

    const controlled = canvas.tokens.controlled.flatMap((token) => token.actor ?? []);
    if (controlled.length === 0 && game.user.character) controlled.push(game.user.character);
    const selectedActor = controlled[0];

    const supportedActorTypes = ["character", "npc", "familiar"];
    if (!selectedActor || !supportedActorTypes.includes(selectedActor.type)) {
        return ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.noActorSelected`));
    }

    const actionsToUse = prepareActions(selectedActor, bamActions);

    const actors: ActorPF2e[] = <ActorPF2e[]>game?.scenes?.current?.tokens
            .map((actor) => actor.actor)
            .filter((actor) => {
                return supportedActorTypes.includes(actor?.type ?? "unknown");
            }) || [];

    const party = game.actors?.party?.members || [];
    const partyIds = party.map((actor) => actor?.id) || [];

    const allActorsSkills = createMapOfSkillsPerActor(actors);

    if (partyIds.includes(selectedActor.id)) {
        const partySkills = createMapOfSkillsPerActor(party);
        getBestBonuses(partySkills, partyIds, actionsToUse);
    }

    const columns = 1 + ~~((actionsToUse.length - 1) / 14);
    const width = 26 + columns * 250;
    // const height =
    //     30 + ~~(((30 * actionsToUse.filter((x) => !x.showMAP).length + 1) +
    //             (64 * actionsToUse.filter((x) => x.showMAP).length + 1)) / columns
    //     );

    const tabView = game.settings.get(MODULENAME, "bamTabview");

    const selectedActorSkills = allActorsSkills.get(selectedActor.id) ?? {};
    const data = actionsToUse.map((action, idx) =>
        createButtonData(action, idx, selectedActor, partyIds, selectedActorSkills),
    );

    const filteredData = {
        encounter: data.filter((value) => !(value.action.showDowntime || value.action.showExploration)),
        downtime: data.filter((value) => value.action.showDowntime),
        exploration: data.filter((value) => value.action.showExploration),
        tabView,
    };
    const content = await renderTemplate("modules/xdy-pf2e-workbench/templates/macros/bam/index.hbs", filteredData);

    const { DialogV2 } = foundry.applications.api;
    window.actionDialog = await DialogV2.wait({
        position: {
            width,
        },
        window: {
            title: game.i18n.format(`${MODULENAME}.macros.basicActionMacros.title`, {
                name: selectedActor.name,
            }),
            contentClasses: ["pf2e-bg", "bam-dialog"],
            resizable: true,
        },
        content,
        buttons: [
            {
                action: "close",
                icon: "fa-solid fa-times",
                label: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.cancel`),
                default: true,
            },
        ],
        render: (_event, html) => {
            const action = (event: Event) => {
                // Prevent the dialog from closing
                event.preventDefault();
                event.stopPropagation();
                const button = event.currentTarget;
                if (!(button instanceof HTMLButtonElement) || typeof button.dataset.action !== "string") return;
                const action = actionsToUse[button.dataset.action];
                const current = action.action;
                if (typeof current === "object") {
                    // TODO Handle other variants than map
                    const mapValue = -(Number.parseInt(button.dataset.map ?? "0") / 5);
                    current.use({
                        event,
                        actors: [selectedActor],
                        multipleAttackPenalty: mapValue,
                        ...action.options,
                    });
                } else if (current) {
                    current({
                        event,
                        actors: [selectedActor],
                        skill: action.skill,
                    });
                }
            };
            html.querySelectorAll(".bam-action-list button").forEach((button) =>
                button.addEventListener("click", action),
            );
            if (tabView) {
                for (const tabButton of html.querySelectorAll("a.item") as NodeListOf<HTMLElement>) {
                    tabButton.addEventListener("click", () => {
                        for (const tab of html.querySelectorAll("div.tab") as NodeListOf<HTMLElement>) {
                            if (tab.dataset.tab === tabButton.dataset.tab) tab.classList.add("active");
                            else tab.classList.remove("active");
                        }
                    });
                }
            }
        },
    });
}

// basicActionsMacros();
