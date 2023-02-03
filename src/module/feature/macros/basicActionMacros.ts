// Originally from ApoApostolov#4622, modified by me. Included with permission.
// noinspection CssUnresolvedCustomProperty,CssUnknownTarget

/* eslint-disable no-undef */
// TODO Fix the ts-ignore and any in this.

import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ActorPF2e } from "@actor";

let selectedActor;

function getActor() {
    return canvas?.tokens.controlled.length
        ? canvas?.tokens.controlled.map((token) => token.actor)[0]
        : game.user.character;
}

function getBestBonuses(actorSkills, party, actionList) {
    for (const actorId of party) {
        const skills = actorSkills.get(actorId);
        for (const action of actionList) {
            const skill = skills[action.skill?.toLowerCase()];
            if (!skill) continue;
            const bonus = skill.check?.mod ?? skill.totalModifier;
            if (bonus > (action.best ?? -1)) {
                action.best = bonus;
                action.whoIsBest = actorId;
            }
        }
    }
}

function createMapOfSkillsPerActor(actors) {
    const map = new Map();
    for (const actor of actors) {
        const skills = getSkills(actor);
        if (skills) {
            map.set(actor.id, skills);
        }
    }
    return map;
}

function getSkills(actor) {
    const a = { perception: actor.attributes.perception, ...actor.skills };
    Array.from(a).map((skill: any) => {
        a.check.mod = skill.check?.mod;
        a.totalModifier = skill.to;
    });
    return a;
}

function signedNumber(n) {
    return n < 0 ? "" + n : "+" + n;
}

function createButton(action, idx, actor, party, actorSkills) {
    /**
     * Color palette to use, representing the rank of skills
     */
    const colorPalette = ["#424242", "#171f67", "#3c005e", "#664400", "#5e0000"];
    /**
     * Default Icon to be given in case there is no icon parameter in an Action
     */
    const defaultIcon = "systems/pf2e/icons/actions/craft/unknown-item.webp";
    const skillName = action.skill?.toLowerCase();
    const skill = skillName ? actorSkills[skillName] : null;
    const rank = skill?.rank ?? 0;
    const bonus = skill ? skill.check?.mod ?? skill.totalModifier : -1;
    const best = game.settings.get(MODULENAME, "basicActionMacroShowBestBonus")
        ? party.length && party.includes(actor.id)
            ? bonus >= (action.best ?? 0)
            : false
        : false;
    const name = `${action.name} ${skill ? "(" + signedNumber(bonus) + ")" : ""}`;
    const tooltip =
        name +
        " " +
        (best ? game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.YouAreTheBestInYourParty`) : "");
    return `<button class="action-btn ${best ? "glow" : ""}" data-action="${idx}" style="background:${
        colorPalette[rank]
    }"
    ${`data-tooltip="${tooltip}"`}>
    <img src="${action.icon ?? defaultIcon}" height="24" alt="${name}"/>${name}</button>`;
}

export function basicActionMacros() {
    /**
     * This macro opens a dialog containing a list of actions to be used by the selected Actor
     * If no actor is selected, it selects the user's standard character.
     * If there is no user character, it shows up a warning notification.
     */

    const actionList = [
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AidToggle`),
            skill: "",
            action: "NXCHCuMqYkbRPnaN",
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.AvoidNotice`),
            skill: "Stealth",
            action: game.pf2e.actions.avoidNotice,
            icon: "systems/pf2e/icons/features/classes/surprice-attack.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Balance`),
            skill: "Acrobatics",
            action: game.pf2e.actions.balance,
            icon: "icons/skills/movement/feet-winged-boots-brown.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Climb`),
            skill: "Athletics",
            action: game.pf2e.actions.climb,
            icon: "icons/sundries/misc/ladder.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Coerce`),
            skill: "Intimidation",
            action: game.pf2e.actions.coerce,
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CommandAnAnimal`),
            skill: "Nature",
            action: game.pf2e.actions.commandAnAnimal,
            icon: "icons/environment/creatures/horse-white.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Craft`),
            skill: "Crafting",
            action: game.pf2e.actions.craft,
            icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionGesture`),
            skill: "Deception",
            action: "game.pf2e.actions.createADiversion({ event: event, variant: 'gesture' });",
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.CreateADiversionTrick`),
            skill: "Deception",
            action: "game.pf2e.actions.createADiversion({ event: event, variant: 'trick' });",
            icon: "systems/pf2e/icons/spells/charming-words.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingArcana`),
            skill: "Arcana",
            action: game.pf2e.actions.decipherWriting,
            icon: "icons/skills/trades/academics-book-study-runes.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingOccultism`),
            skill: "Occultism",
            action: game.pf2e.actions.decipherWriting,
            icon: "icons/skills/trades/academics-book-study-purple.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingReligion`),
            skill: "Religion",
            action: game.pf2e.actions.decipherWriting,
            icon: "systems/pf2e/icons/equipment/other/spellbooks/thresholds-of-truth.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DecipherWritingSociety`),
            skill: "Society",
            action: game.pf2e.actions.decipherWriting,
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Demoralize`),
            skill: "Intimidation",
            action: game.pf2e.actions.demoralize,
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Disarm`),
            skill: "Athletics",
            action: game.pf2e.actions.disarm,
            icon: "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.DisableDevice`),
            skill: "Thievery",
            action: game.pf2e.actions.disableDevice,
            icon: "systems/pf2e/icons/equipment/adventuring-gear/thieves-tools.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Feint`),
            skill: "Deception",
            action: game.pf2e.actions.feint,
            icon: "icons/skills/melee/maneuver-sword-katana-yellow.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.FollowTheExpertToggle`),
            skill: "",
            action: "P0hdu2AsXQUtQusb",
            icon: "systems/pf2e/icons/spells/favorable-review.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ForceOpen`),
            skill: "Athletics",
            action: game.pf2e.actions.forceOpen,
            icon: "icons/equipment/feet/boots-armored-steel.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.GatherInformation`),
            skill: "Diplomacy",
            action: game.pf2e.actions.gatherInformation,
            icon: "icons/skills/social/diplomacy-handshake.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Grapple`),
            skill: "Athletics",
            action: game.pf2e.actions.grapple,
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Hide`),
            skill: "Stealth",
            action: game.pf2e.actions.hide,
            icon: "icons/magic/nature/stealth-hide-eyes-green.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Impersonate`),
            skill: "Deception",
            action: game.pf2e.actions.impersonate,
            icon: "icons/equipment/head/mask-carved-scream-tan.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpHigh`),
            skill: "Athletics",
            action: game.pf2e.actions.highJump,
            icon: "icons/skills/movement/arrows-up-trio-red.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.JumpLong`),
            skill: "Athletics",
            action: game.pf2e.actions.longJump,
            icon: "icons/skills/movement/figure-running-gray.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Lie`),
            skill: "Deception",
            action: game.pf2e.actions.lie,
            icon: "icons/magic/control/mouth-smile-deception-purple.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.MakeAnImpression`),
            skill: "Diplomacy",
            action: game.pf2e.actions.makeAnImpression,
            icon: "icons/environment/people/commoner.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.ManeuverInFlight`),
            skill: "Acrobatics",
            action: game.pf2e.actions.maneuverInFlight,
            icon: "icons/commodities/biological/wing-bird-white.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Perform`),
            skill: "Performance",
            action: game.pf2e.actions.perform,
            icon: "icons/skills/trades/music-singing-voice-blue.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.PickALock`),
            skill: "Thievery",
            action: game.pf2e.actions.pickALock,
            icon: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.RaiseAShieldToggle`),
            skill: "",
            action: game.pf2e.actions.raiseAShield,
            icon: "systems/pf2e/icons/actions/raise-a-shield.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.RecallKnowledge`),
            skill: "",
            action: "dN89Pky7SfULbGcQ",
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Repair`),
            skill: "Crafting",
            action: game.pf2e.actions.repair,
            icon: "icons/tools/smithing/anvil.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Request`),
            skill: "Diplomacy",
            action: game.pf2e.actions.request,
            icon: "icons/skills/social/thumbsup-approval-like.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Seek`),
            skill: "Perception",
            action: game.pf2e.actions.seek,
            icon: "icons/tools/scribal/magnifying-glass.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseDirection`),
            skill: "Survival",
            action: game.pf2e.actions.senseDirection,
            icon: "icons/tools/navigation/compass-brass-blue-red.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SenseMotive`),
            skill: "Perception",
            action: game.pf2e.actions.senseMotive,
            icon: "icons/environment/people/commoner.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Shove`),
            skill: "Athletics",
            action: game.pf2e.actions.shove,
            icon: "systems/pf2e/icons/spells/hydraulic-push.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Sneak`),
            skill: "Stealth",
            action: game.pf2e.actions.sneak,
            icon: "systems/pf2e/icons/conditions/unnoticed.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Squeeze`),
            skill: "Acrobatics",
            action: game.pf2e.actions.squeeze,
            icon: "icons/commodities/tech/claw-mechanical.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSociety`),
            skill: "Society",
            action: game.pf2e.actions.subsist,
            icon: "icons/environment/settlement/building-rubble.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.SubsistSurvival`),
            skill: "Survival",
            action: game.pf2e.actions.subsist,
            icon: "icons/environment/wilderness/camp-improvised.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Swim`),
            skill: "Athletics",
            action: game.pf2e.actions.swim,
            icon: "icons/creatures/fish/fish-shark-swimming.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TakeCoverToggle`),
            skill: "",
            action: "1maZWoOsus4OrO8Q",
            icon: "systems/pf2e/icons/equipment/shields/tower-shield.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Track`),
            skill: "Survival",
            action: game.pf2e.actions.track,
            icon: "systems/pf2e/icons/conditions/observed.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatDisease`),
            skill: "Medicine",
            action: game.pf2e.actions.treatDisease,
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatPoison`),
            skill: "Medicine",
            action: game.pf2e.actions.treatPoison,
            icon: "systems/pf2e/icons/effects/treat-poison.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TreatWounds`),
            skill: "Medicine",
            action: "pfdZwXtrwLREGg6C",
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.Trip`),
            skill: "Athletics",
            action: game.pf2e.actions.trip,
            icon: "icons/skills/wounds/bone-broken-marrow-yellow.webp",
        },
        {
            name: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.actions.TumbleThrough`),
            skill: "Acrobatics",
            action: game.pf2e.actions.tumbleThrough,
            icon: "icons/skills/movement/feet-winged-sandals-tan.webp",
        },
    ];

    // Sort actionList
    actionList.sort((a, b) => a.name.localeCompare(b.name, game.i18n.lang));

    // @ts-ignore
    const actionDialog = window.actionDialog;
    if (actionDialog?.rendered) {
        return actionDialog.close();
    }

    selectedActor = getActor();

    if (!selectedActor) {
        return ui.notifications.warn(game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.noActorSelected`));
    }

    // @ts-ignore
    const actors: ActorPF2e[] = <ActorPF2e[]>game?.scenes?.current?.tokens
            .map((x) => x.actor)
            .filter((x) => x)
            .filter((x) => x?.isOfType("character") || x?.isOfType("familiar") || x?.isOfType("npc")) || [];

    const party = actors.filter((x) => x.hasPlayerOwner).filter((x) => x.alliance === "party");
    const partyIds = party.map((actor) => actor.id) || [];

    const actorSkills = createMapOfSkillsPerActor(actors);

    if (partyIds.includes(selectedActor.id)) {
        const partySkills = createMapOfSkillsPerActor(party);
        getBestBonuses(partySkills, partyIds, actionList);
    }

    const columns = 1 + ~~((actionList.length - 1) / 14);
    const width = 264 * columns;
    const height = 30 + ~~((32 * actionList.length + 1) / columns);
    const content = `
<style>
  .pf2e-bg .window-content {
    background: url('../systems/pf2e/assets/sheet/background.webp');
  }
  .action-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
    max-height: ${height}px;
  }
  .action-btn {
    margin: 1px auto;
    width: 250px;
    height: fit-content;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 50%);
    text-shadow: none;
    border: #000;
    color: #fff;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
  }
  .action-btn img {
    margin-right: 5px;
  }
  .action-btn:hover {
    text-shadow: 0 0 2px #fff;
  }
  .action-list button.glow {
    --color-glow1: 35;
    --color-glow2: 50;
    animation: glow2 alternate infinite 2s;
    z-index: 1;
}
@keyframes glow2 {
  0% {
      color: hsl(var(--color-glow2), 90%, 50%);
      box-shadow: 0 0 2px 2px hsl(var(--color-glow2), 100%, 50%);
  }
  100% {
      color: hsl(var(--color-glow2), 90%, 50%);
      box-shadow: 0 0 2px 2px hsl(var(--color-glow2), 100%, 50%);
  }
}
</style>
<div class="action-list">
${actionList
    .map((action, idx) => createButton(action, idx, selectedActor, partyIds, actorSkills.get(selectedActor.id)))
    .join("")}
</div>
`;
    // @ts-ignore
    window.actionDialog = new Dialog(
        {
            title: game.i18n.format(`${MODULENAME}.macros.basicActionMacros.title`, {
                name: selectedActor.name,
            }),
            content,
            buttons: {
                close: {
                    icon: `<i class="fas fa-times"></i>`,
                    label: game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.cancel`),
                },
            },
            default: "close",
            render: (html) => {
                const action = (button, event) => {
                    const action = actionList[button.dataset.action];
                    const current = action.action;
                    if (typeof current === "string") {
                        if (!current.includes("(")) {
                            const macro = game.macros.get(current);
                            if (!macro) {
                                ui.notifications.error(
                                    game.i18n.localize(`${MODULENAME}.macros.basicActionMacros.gmMustImport`)
                                );
                                return;
                            }
                            macro?.execute();
                        } else {
                            // Ugh
                            eval(current);
                        }
                    } else {
                        // @ts-ignore
                        action.action({
                            event: event,
                            actors: [selectedActor],
                            skill: action.skill.toLocaleLowerCase(),
                        });
                    }
                };
                if ("querySelectorAll" in html) {
                    html.querySelectorAll(".action-list button").forEach((button) =>
                        button.addEventListener("click", (event) => action(button, event))
                    );
                }
            },
        },
        // @ts-ignore
        { jQuery: false, width, classes: ["pf2e-bg"] }
    ).render(true);
}

// basicActionsMacros();
