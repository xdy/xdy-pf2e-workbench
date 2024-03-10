// Originally from ApoApostolov#4622, modified by me. Included with permission.
// noinspection CssUnresolvedCustomProperty,CssUnknownTarget

/* eslint-disable no-undef */

import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ActorPF2e } from "@actor";
import { Action } from "@actor/actions/types.js";
import { CharacterSkill } from "@actor/character/types.js";
import { ModifierPF2e } from "@actor/modifiers.js";
import { Statistic } from "@system/statistic/statistic.js";

declare global {
    interface Window {
        actionDialog: Dialog;
    }
}

export async function registerBasicActionMacrosHandlebarsTemplates() {
    await loadTemplates([
        `modules/${MODULENAME}/templates/macros/bam/index.hbs`,
        `modules/${MODULENAME}/templates/macros/bam/actionButton.hbs`,
    ]);

    Handlebars.registerPartial("actionButton", `{{> "modules/${MODULENAME}/templates/macros/bam/actionButton.hbs"}}`);
}

function getBestBonuses(
    actorSkills: Map<string, Partial<Record<string, Statistic>>>,
    party: string[],
    actionList: MacroAction[],
) {
    for (const actorId of party) {
        const skills = actorSkills.get(actorId);
        for (const action of actionList) {
            const skill = skills?.[action.skill?.toLowerCase()];
            if (!skill) continue;
            const bonus = skill.check?.mod ?? skill.mod;
            if (bonus > (action.best ?? -1)) {
                action.best = bonus;
                action.whoIsBest = actorId;
            }
        }
    }
}

function createMapOfSkillsPerActor(actors: ActorPF2e[]): Map<string, Partial<Record<string, Statistic>>> {
    const map = new Map<string, Partial<Record<string, Statistic>>>();
    for (const actor of actors) {
        const skills = fetchSkills(actor);
        if (skills) {
            map.set(actor.id, skills);
        }
    }
    return map;
}

function fetchSkills(actor: ActorPF2e): Partial<Record<string, Statistic>> {
    return { perception: actor.perception, ...actor.skills };
}

function createButtonData(
    action: MacroAction,
    idx: number,
    actor: ActorPF2e,
    party: string[],
    actorSkills: Partial<Record<string, Statistic>>,
): { bonus: number; skill: Statistic | null | undefined; action: MacroAction; best: boolean; idx: number } {
    const skillName = action.skill?.toLowerCase();
    const skill = skillName ? actorSkills[skillName] : null;
    const bonus = skill ? skill.check?.mod ?? skill.mod : -1;
    const best = game.settings.get(MODULENAME, "basicActionMacroShowBestBonus")
        ? party.length && party.includes(actor.id)
            ? bonus >= (action.best ?? 0)
            : false
        : false;
    return { best, idx, action, skill, bonus };
}

type MacroAction = {
    skill: string;
    // The altSkillAndFeat stuff should really be more flexible. Maybe look at what SkillActions did for prereqs?
    altSkillAndFeat?: { skill: string; feat: string }[];
    name: string;
    icon: string;
    action: string | Function | string[] | Action | undefined;
    module?: string;
    best?: number;
    whoIsBest?: string;
    showMAP?: boolean;
    showExploration?: boolean;
    showDowntime?: boolean;
    extra?: string;
    actionType?: "basic" | "skill_untrained" | "skill_trained" | "other";
    actionTitle?: string;
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

    const actionsToUse = bamActions
        .filter((x) => {
            const hasSkill = selectedActor.skills?.[x.skill.toLocaleLowerCase()]?.rank ?? 0 > 0;
            const hasAltSkillAndFeat =
                x.altSkillAndFeat?.find((y) => selectedActor.skills?.[y.skill.toLocaleLowerCase()]?.rank) &&
                x.altSkillAndFeat?.find((y) => selectedActor.itemTypes.feat.find((feat) => feat.slug === y.feat));

            return (
                showUnusable ||
                x.actionType !== "skill_trained" ||
                (x.actionType === "skill_trained" && ["npc", "familiar"].includes(selectedActor.type)) ||
                selectedActor.itemTypes.feat.find((feat) => feat.slug === "clever-improviser") ||
                hasSkill ||
                hasAltSkillAndFeat
            );
        })
        .filter((m) => (m.module ? game.modules.get(m.module)?.active : true))
        .sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));

    actionsToUse.forEach((x) => {
        const action =
            typeof x.action === "string" && x.action.includes("use(") ? eval(x.action.split(".use")[0]) : x.action;

        const traits = action?.traits ?? [];
        x.showMAP = traits.includes("attack");
        x.showDowntime = traits.includes("downtime");
        x.showExploration = traits.includes("exploration");
    });

    return actionsToUse;
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
            skill: "Medicine",
            action: 'game.pf2e.actions.get("administer-first-aid").use({ event, variant: "stabilize"})',
            icon: "systems/pf2e/icons/features/feats/treat-wounds.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AdministerFirstAidStopBleeding`),
            skill: "Medicine",
            action: 'game.pf2e.actions.get("administer-first-aid").use({ event, variant: "stop-bleeding"})',
            icon: "systems/pf2e/icons/conditions/persistent-damage.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidToggle`),
            skill: "",
            action: ["macroEffectAid", "xdy-pf2e-workbench.xdy-internal-utility-macros"],
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidASE`),
            skill: "",
            action: ["Aid", "pf2e-action-support-engine-macros.action-support-engine-macros"],
            module: "pf2e-action-support-engine",
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AvoidNotice`),
            skill: "Stealth",
            action: game.pf2e.actions.get("avoid-notice"),
            icon: "systems/pf2e/icons/features/classes/surprice-attack.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Balance`),
            skill: "Acrobatics",
            action: game.pf2e.actions.get("balance"),
            icon: "icons/skills/movement/feet-winged-boots-brown.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Climb`),
            skill: "Athletics",
            action: game.pf2e.actions.get("climb"),
            icon: "icons/sundries/misc/ladder.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Coerce`),
            skill: "Intimidation",
            action: game.pf2e.actions.get("coerce"),
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CommandAnAnimal`),
            skill: "Nature",
            action: game.pf2e.actions.get("command-an-animal"),
            icon: "icons/environment/creatures/horse-white.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ConcealAnObject`),
            skill: "Stealth",
            action: game.pf2e.actions.get("conceal-an-object"),
            icon: "systems/pf2e/icons/equipment/adventuring-gear/wax-key-blank.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Craft`),
            skill: "Crafting",
            action: game.pf2e.actions.craft,
            icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateForgery`),
            skill: "Society",
            action: game.pf2e.actions.get("create-forgery"),
            icon: "systems/pf2e/icons/spells/transcribe-moment.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionDistractingWords`),
            skill: "Deception",
            action: 'game.pf2e.actions.get("create-a-diversion").use({ event, variant: "distracting-words" })',
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionGesture`),
            skill: "Deception",
            action: 'game.pf2e.actions.get("create-a-diversion").use({ event, variant: "gesture" })',
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionTrick`),
            skill: "Deception",
            action: 'game.pf2e.actions.get("create-a-diversion").use({ event, variant: "trick" })',
            icon: "systems/pf2e/icons/spells/charming-words.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingArcana`),
            skill: "Arcana",
            action: 'game.pf2e.actions.get("decipher-writing").use({ event, statistic: "arcana" })',
            icon: "icons/skills/trades/academics-book-study-runes.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingOccultism`),
            skill: "Occultism",
            action: 'game.pf2e.actions.get("decipher-writing").use({ event, statistic: "occultism" })',
            icon: "icons/skills/trades/academics-book-study-purple.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingReligion`),
            skill: "Religion",
            action: 'game.pf2e.actions.get("decipher-writing").use({ event, statistic: "religion" })',
            icon: "systems/pf2e/icons/equipment/other/spellbooks/thresholds-of-truth.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingSociety`),
            skill: "Society",
            action: 'game.pf2e.actions.get("decipher-writing").use({ event, statistic: "society" })',
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Demoralize`),
            skill: "Intimidation",
            action: ["XDY DO_NOT_IMPORT Demoralize", "xdy-pf2e-workbench.asymonous-benefactor-macros-internal"],
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Disarm`),
            skill: "Athletics",
            action: game.pf2e.actions.get("disarm"),
            icon: "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DisableDevice`),
            skill: "Thievery",
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
            skill: "Deception",
            action: game.pf2e.actions.get("feint"),
            icon: "icons/skills/melee/maneuver-sword-katana-yellow.webp",
        },
        {
            actionType: "other",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.FollowTheExpertToggle`),
            skill: "",
            action: ["macroEffectFollowTheExpert", "xdy-pf2e-workbench.xdy-internal-utility-macros"],
            icon: "systems/pf2e/icons/spells/favorable-review.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ForceOpen`),
            skill: "Athletics",
            action: game.pf2e.actions.get("force-open"),
            icon: "icons/equipment/feet/boots-armored-steel.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.GatherInformation`),
            skill: "Diplomacy",
            action: game.pf2e.actions.get("gather-information"),
            icon: "icons/skills/social/diplomacy-handshake.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Grapple`),
            skill: "Athletics",
            action: game.pf2e.actions.get("grapple"),
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Hide`),
            skill: "Stealth",
            action: game.pf2e.actions.get("hide"),
            icon: "systems/pf2e/icons/features/classes/wild.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Impersonate`),
            skill: "Deception",
            action: game.pf2e.actions.get("impersonate"),
            icon: "icons/equipment/head/mask-carved-scream-tan.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpHigh`),
            skill: "Athletics",
            action: game.pf2e.actions.get("high-jump"),
            icon: "icons/skills/movement/arrows-up-trio-red.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpLong`),
            skill: "Athletics",
            action: game.pf2e.actions.get("long-jump"),
            icon: "icons/skills/movement/figure-running-gray.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Lie`),
            skill: "Deception",
            action: game.pf2e.actions.get("lie"),
            icon: "icons/magic/control/mouth-smile-deception-purple.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.MakeAnImpression`),
            skill: "Diplomacy",
            action: game.pf2e.actions.get("make-an-impression"),
            icon: "icons/environment/people/commoner.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ManeuverInFlight`),
            skill: "Acrobatics",
            action: game.pf2e.actions.get("maneuver-in-flight"),
            icon: "icons/commodities/biological/wing-bird-white.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.PalmAnObject`),
            skill: "Thievery",
            action: game.pf2e.actions.get("palm-an-object"),
            icon: "icons/sundries/gaming/playing-cards.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Perform`),
            skill: "Performance",
            action: 'game.pf2e.actions.get("perform").use({ event, variant: "singing" })',
            icon: "icons/skills/trades/music-singing-voice-blue.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.PickALock`),
            skill: "Thievery",
            action: game.pf2e.actions.get("pick-a-lock"),
            icon: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
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
            action: ["XDY DO_NOT_IMPORT Recall_Knowledge", "xdy-pf2e-workbench.asymonous-benefactor-macros-internal"],
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Repair`),
            skill: "Crafting",
            action: game.pf2e.actions.repair,
            icon: "icons/tools/smithing/anvil.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Reposition`),
            skill: "Athletics",
            action: game.pf2e.actions.get("reposition"),
            icon: "icons/sundries/gaming/chess-pawn-white-pink.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Request`),
            skill: "Diplomacy",
            action: game.pf2e.actions.get("request"),
            icon: "icons/skills/social/thumbsup-approval-like.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Seek`),
            skill: "Perception",
            action: game.pf2e.actions.get("seek"),
            icon: "icons/tools/scribal/magnifying-glass.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseDirection`),
            skill: "Survival",
            action: game.pf2e.actions.get("sense-direction"),
            icon: "icons/tools/navigation/compass-brass-blue-red.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseMotive`),
            skill: "Perception",
            action: game.pf2e.actions.get("sense-motive"),
            icon: "icons/environment/people/commoner.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Shove`),
            skill: "Athletics",
            action: game.pf2e.actions.get("shove"),
            icon: "systems/pf2e/icons/spells/hydraulic-push.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Sneak`),
            skill: "Stealth",
            action: game.pf2e.actions.get("sneak"),
            icon: "systems/pf2e/icons/conditions/unnoticed.webp",
        },
        {
            actionType: "skill_trained", // Technically not, but... See https://discord.com/channels/613968515677814784/738122137943932958/1175650650575605870
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Squeeze`),
            skill: "Acrobatics",
            action: game.pf2e.actions.get("squeeze"),
            icon: "icons/commodities/tech/claw-mechanical.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Steal`),
            skill: "Thievery",
            action: game.pf2e.actions.get("steal"),
            icon: "icons/containers/bags/coinpouch-gold-red.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSociety`),
            skill: "Society",
            action: 'game.pf2e.actions.get("subsist").use({ event, statistic: "society" })',
            icon: "icons/environment/settlement/building-rubble.webp",
        },
        {
            actionType: "basic",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSurvival`),
            skill: "Survival",
            action: 'game.pf2e.actions.get("subsist").use({ event, statistic: "survival" })',
            icon: "icons/environment/wilderness/camp-improvised.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Swim`),
            skill: "Athletics",
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
            skill: "Survival",
            action: game.pf2e.actions.get("track"),
            icon: "systems/pf2e/icons/conditions/observed.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatDisease`),
            skill: "Medicine",
            action: game.pf2e.actions.get("treat-disease"),
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatPoison`),
            skill: "Medicine",
            action: game.pf2e.actions.get("treat-poison"),
            icon: "systems/pf2e/icons/effects/treat-poison.webp",
        },
        {
            actionType: "skill_trained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatWounds`),
            skill: "Medicine",
            altSkillAndFeat: [
                { skill: "Nature", feat: "natural-medicine" },
                { skill: "Crafting", feat: "chirurgeon" },
            ],
            action: [
                "XDY DO_NOT_IMPORT Treat Wounds and Battle Medicine",
                "xdy-pf2e-workbench.asymonous-benefactor-macros-internal",
            ],
            icon: "icons/skills/wounds/injury-stapled-flesh-tan.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Trip`),
            skill: "Athletics",
            action: game.pf2e.actions.get("trip"),
            icon: "icons/skills/wounds/bone-broken-marrow-yellow.webp",
        },
        {
            actionType: "skill_untrained",
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TumbleThrough`),
            skill: "Acrobatics",
            action: game.pf2e.actions.get("tumble-through"),
            icon: "icons/skills/movement/feet-winged-sandals-tan.webp",
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
    const partyIds = party.map((actor) => actor.id) || [];

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

    window.actionDialog = new Dialog(
        {
            title: game.i18n.format(`${MODULENAME}.macros.basicActionMacros.title`, {
                name: selectedActor.name,
            }),
            content: content,
            buttons: {
                close: {
                    icon: `<i class="fas fa-times"></i>`,
                    label: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.cancel`),
                },
            },
            default: "close",
            render: (html) => {
                const action = (button, event) => {
                    const action = actionsToUse[button.dataset.action];
                    const current = action.action;
                    if (typeof current === "string") {
                        if (!current.includes("(")) {
                            const macro = game.macros.get(current);
                            if (!macro) {
                                ui.notifications.error(
                                    game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.gmMustImport`),
                                );
                                return;
                            }
                            macro?.execute(event);
                        } else {
                            // Ugh
                            eval(current);
                        }
                    } else if (Array.isArray(current)) {
                        const macroName = current[0];
                        const compendiumName = current[1];
                        const pack = game.packs.get(compendiumName);
                        if (pack) {
                            pack.getDocuments().then((documents) => {
                                const macro_data = documents.find((i) => i._source.name === macroName)?.toObject();
                                if (macro_data) {
                                    const temp_macro = new Macro(macro_data);
                                    temp_macro.execute(event);
                                } else {
                                    ui.notifications.error(
                                        game.i18n.format(`${MODULENAME}.macros.basicActionMacros.macroNotFound`, {
                                            macroName,
                                        }),
                                    );
                                }
                            });
                        } else {
                            ui.notifications.error(
                                game.i18n.format(`${MODULENAME}.macros.basicActionMacros.compendiumNotFound`, {
                                    compendiumName,
                                }),
                            );
                        }
                    } else if (typeof current === "object") {
                        // TODO Handle other variants than map
                        const mapValue =
                            button.dataset.map && button.dataset.map !== "0"
                                ? -(Number.parseInt(button.dataset.map) / 5)
                                : 0;
                        current
                            .use({
                                event,
                                multipleAttackPenalty: mapValue,
                                skipDialog: event.skipDialog,
                            })
                            .then();
                    } else {
                        const skills = getSkills(selectedActor, action.skill);
                        const variant =
                            button.dataset.map && button.dataset.map !== "0"
                                ? getMapVariant(skills[0], {}, Number.parseInt(button.dataset.map))
                                : null;
                        if (variant) {
                            (<Function>action.action)({
                                event,
                                actors: [selectedActor],
                                modifiers: variant?.modifiers,
                                ...variant?.extra,
                            });
                        } else {
                            (<Function>action.action)({
                                event,
                                actors: [selectedActor],
                                skill: action.skill.toLocaleLowerCase(),
                                variant: action.extra,
                            });
                        }
                    }
                };
                if ("querySelectorAll" in html) {
                    for (const button of html.querySelectorAll(".action-list button")) {
                        button.addEventListener("click", (event) => action(button, event));
                    }
                    for (const tabButton of html.querySelectorAll("a.item")) {
                        tabButton.addEventListener("click", () => {
                            if (!tabView) {
                                for (const tab of html.querySelectorAll(".bam-body .tab")) {
                                    // @ts-expect-error
                                    if (tab.dataset.tab === tabButton.dataset.tab) tab.classList.toggle("active");
                                }
                            } else {
                                for (const active of html.querySelectorAll(".active")) {
                                    active.classList.remove("active");
                                }
                                // @ts-expect-error
                                for (const active of html.querySelectorAll(`[data-tab=${tabButton.dataset.tab}]`)) {
                                    active.classList.add("active");
                                }
                            }
                        });
                    }
                }
            },
        },
        { jQuery: false, classes: ["pf2e-bg", "bam-dialog"], width, popOut: true, resizable: true },
    ).render(true) as Dialog;
}

function getSkills(selectedActor: ActorPF2e, proficiencyKey: string): CharacterSkill<any>[] {
    const skills = selectedActor.skills;
    if (!skills) return [];
    if (proficiencyKey === "lore") {
        return Object.values(skills).filter((skill) => skill !== undefined && skill.lore) as CharacterSkill<any>[];
    } else {
        return [skills[proficiencyKey]].filter((s): s is CharacterSkill<any> => !!s);
    }
}

function getMapVariant(skill: CharacterSkill<any>, extra: Record<string, unknown> | undefined, map: number): Variant {
    const modifier = new game.pf2e.Modifier({
        label: game.i18n.localize("PF2E.MultipleAttackPenalty"),
        modifier: map,
        type: "untyped",
    });
    const label = game.i18n.format("PF2E.MAPAbbreviationLabel", { penalty: map });
    return new Variant(label, skill, extra, [modifier]);
}

export class Variant {
    label: string;
    skill: CharacterSkill<any>;
    extra?: Record<string, unknown>;
    modifiers: ModifierPF2e[];
    assuranceTotal: number;

    constructor(
        label: string,
        skill: CharacterSkill<any>,
        extra: Record<string, unknown> | undefined,
        modifiers: ModifierPF2e[] = [],
        assuranceTotal = 0,
    ) {
        this.label = label;
        this.skill = skill;
        this.extra = extra;
        this.modifiers = modifiers;
        this.assuranceTotal = assuranceTotal;
    }
}

// basicActionsMacros();
