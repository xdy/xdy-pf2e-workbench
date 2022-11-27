// Originally from ApoApostolov#4622, modified by me. Included with permission.

// noinspection CssUnresolvedCustomProperty
/* eslint-disable no-undef */
// TODO Fix the ts-ignore and any in this.

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
            if (bonus > (action.best ?? -1)) action.best = bonus;
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
    const tooltip = "You are the best in your party";
    /**
     * Default Icon to be given in case there is no icon parameter in an Action
     */
    const defaultIcon = "systems/pf2e/icons/actions/craft/unknown-item.webp";
    const skillName = action.skill?.toLowerCase();
    const skill = skillName ? actorSkills[skillName] : null;
    const rank = skill?.rank ?? 0;
    const bonus = skill ? skill.check?.mod ?? skill.totalModifier : -1;
    const best = party.length && party.includes(actor.id) ? bonus >= (action.best ?? 0) : false;
    return `<button class="action-btn ${best ? "glow" : ""}" data-action="${idx}" style="background:${
        colorPalette[rank]
    }"
    ${best ? `data-tooltip="${tooltip}"` : ""}>
    <img src="${action.icon ?? defaultIcon}" height="24" alt="${action.name}"/>${action.name} ${
        skill ? "(" + signedNumber(bonus) + ")" : ""
    }</button>`;
}

export function basicActionMacros() {
    /**
     * This macro opens a dialog containing a list of actions to be used by the selected Actor
     * If no actor is selected, it selects the user's standard character.
     * If there is no user character, it shows up a warning notification.
     */

    /**
     * This is the list of actions, wich can be edited
     *
     * Action Interface:
     * @param   {string}            name    Name shown as the button text;
     * @param   {string}            skill   Name of the skill, to get the bonus in parenthesis from;
     * @param   {function|string}   action  Function or Macro ID (in case of a string) to call;
     *                                      The call passes an {actors: [actor]} object as argument;
     * @param   {string|undefined}  icon    The icon to be shown in the button. If undefined, will
     *                                      return the defaultIcon;
     */
    const actionList = [
        {
            name: "Aid (toggle)",
            skill: "",
            action: "NXCHCuMqYkbRPnaN",
            icon: "systems/pf2e/icons/spells/efficient-apport.webp",
        },
        {
            name: "Avoid Notice",
            skill: "Stealth",
            action: game.pf2e.actions.avoidNotice,
            icon: "systems/pf2e/icons/features/classes/surprice-attack.webp",
        },
        {
            name: "Balance",
            skill: "Acrobatics",
            action: game.pf2e.actions.balance,
            icon: "icons/skills/movement/feet-winged-boots-brown.webp",
        },
        {
            name: "Climb",
            skill: "Athletics",
            action: game.pf2e.actions.climb,
            icon: "icons/sundries/misc/ladder.webp",
        },
        {
            name: "Coerce",
            skill: "Intimidation",
            action: game.pf2e.actions.coerce,
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            name: "Command an Animal",
            skill: "Nature",
            action: game.pf2e.actions.commandAnAnimal,
            icon: "icons/environment/creatures/horse-white.webp",
        },
        {
            name: "Craft",
            skill: "Crafting",
            action: game.pf2e.actions.craft,
            icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
        },
        {
            name: "Create a Diversion - Gesture",
            skill: "Deception",
            action: "game.pf2e.actions.createADiversion({ event: event, variant: 'gesture' });",
            icon: "icons/skills/social/wave-halt-stop.webp",
        },
        {
            name: "Create a Diversion - Trick",
            skill: "Deception",
            action: "game.pf2e.actions.createADiversion({ event: event, variant: 'trick' });",
            icon: "systems/pf2e/icons/spells/charming-words.webp",
        },
        {
            name: "Demoralize",
            skill: "Intimidation",
            action: game.pf2e.actions.demoralize,
            icon: "icons/skills/social/intimidation-impressing.webp",
        },
        {
            name: "Disarm",
            skill: "Athletics",
            action: game.pf2e.actions.disarm,
            icon: "icons/skills/melee/sword-damaged-broken-glow-red.webp",
        },
        {
            name: "Feint",
            skill: "Deception",
            action: game.pf2e.actions.feint,
            icon: "icons/skills/melee/maneuver-sword-katana-yellow.webp",
        },
        {
            name: "Follow the Expert (toggle)",
            skill: "",
            action: "P0hdu2AsXQUtQusb",
            icon: "systems/pf2e/icons/spells/favorable-review.webp",
        },
        {
            name: "Force Open",
            skill: "Athletics",
            action: game.pf2e.actions.forceOpen,
            icon: "icons/equipment/feet/boots-armored-steel.webp",
        },
        {
            name: "Gather Information",
            skill: "Diplomacy",
            action: game.pf2e.actions.gatherInformation,
            icon: "icons/skills/social/diplomacy-handshake.webp",
        },
        {
            name: "Grapple",
            skill: "Athletics",
            action: game.pf2e.actions.grapple,
            icon: "icons/skills/melee/unarmed-punch-fist.webp",
        },
        {
            name: "Hide",
            skill: "Stealth",
            action: game.pf2e.actions.hide,
            icon: "icons/magic/nature/stealth-hide-eyes-green.webp",
        },
        {
            name: "Impersonate",
            skill: "Deception",
            action: game.pf2e.actions.impersonate,
            icon: "icons/equipment/head/mask-carved-scream-tan.webp",
        },
        {
            name: "Jump - High",
            skill: "Athletics",
            action: game.pf2e.actions.highJump,
            icon: "icons/skills/movement/arrows-up-trio-red.webp",
        },
        {
            name: "Jump - Long",
            skill: "Athletics",
            action: game.pf2e.actions.longJump,
            icon: "icons/skills/movement/figure-running-gray.webp",
        },
        {
            name: "Lie",
            skill: "Deception",
            action: game.pf2e.actions.lie,
            icon: "icons/magic/control/mouth-smile-deception-purple.webp",
        },
        {
            name: "Make an Impression",
            skill: "Diplomacy",
            action: game.pf2e.actions.makeAnImpression,
            icon: "icons/environment/people/commoner.webp",
        },
        {
            name: "Maneuver in Flight",
            skill: "Acrobatics",
            action: game.pf2e.actions.maneuverInFlight,
            icon: "icons/commodities/biological/wing-bird-white.webp",
        },
        {
            name: "Pick a Lock",
            skill: "Thievery",
            action: game.pf2e.actions.pickALock,
            icon: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
        },
        {
            name: "Raise a Shield (toggle)",
            skill: "",
            action: game.pf2e.actions.raiseAShield,
            icon: "systems/pf2e/icons/actions/raise-a-shield.webp",
        },
        {
            name: "Recall Knowledge",
            skill: "",
            action: "dN89Pky7SfULbGcQ",
            icon: "icons/skills/trades/academics-study-reading-book.webp",
        },
        {
            name: "Repair",
            skill: "Crafting",
            action: game.pf2e.actions.repair,
            icon: "icons/tools/smithing/anvil.webp",
        },
        {
            name: "Request",
            skill: "Diplomacy",
            action: game.pf2e.actions.request,
            icon: "icons/skills/social/thumbsup-approval-like.webp",
        },
        {
            name: "Seek",
            skill: "Perception",
            action: game.pf2e.actions.seek,
            icon: "icons/tools/scribal/magnifying-glass.webp",
        },
        {
            name: "Sense Direction",
            skill: "Survival",
            action: game.pf2e.actions.senseDirection,
            icon: "icons/tools/navigation/compass-brass-blue-red.webp",
        },
        {
            name: "Sense Motive",
            skill: "Perception",
            action: game.pf2e.actions.senseMotive,
            icon: "icons/environment/people/commoner.webp",
        },
        {
            name: "Shove",
            skill: "Athletics",
            action: game.pf2e.actions.shove,
            icon: "systems/pf2e/icons/spells/hydraulic-push.webp",
        },
        {
            name: "Sneak",
            skill: "Stealth",
            action: game.pf2e.actions.sneak,
            icon: "systems/pf2e/icons/conditions/unnoticed.webp",
        },
        {
            name: "Squeeze",
            skill: "Acrobatics",
            action: game.pf2e.actions.squeeze,
            icon: "icons/commodities/tech/claw-mechanical.webp",
        },
        {
            name: "Swim",
            skill: "Athletics",
            action: game.pf2e.actions.swim,
            icon: "icons/creatures/fish/fish-shark-swimming.webp",
        },
        {
            name: "Take Cover (toggle)",
            skill: "",
            action: "1maZWoOsus4OrO8Q",
            icon: "systems/pf2e/icons/equipment/shields/tower-shield.webp",
        },
        {
            name: "Track",
            skill: "Survival",
            action: game.pf2e.actions.track,
            icon: "systems/pf2e/icons/conditions/observed.webp",
        },
        {
            name: "Treat Disease",
            skill: "Medicine",
            action: game.pf2e.actions.treatDisease,
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            name: "Treat Poison",
            skill: "Medicine",
            action: game.pf2e.actions.treatPoison,
            icon: "systems/pf2e/icons/effects/treat-poison.webp",
        },
        {
            name: "Treat Wounds",
            skill: "Medicine",
            action: "pfdZwXtrwLREGg6C",
            icon: "icons/magic/nature/root-vine-caduceus-healing.webp",
        },
        {
            name: "Trip",
            skill: "Athletics",
            action: game.pf2e.actions.trip,
            icon: "icons/skills/wounds/bone-broken-marrow-yellow.webp",
        },
        {
            name: "Tumble Through",
            skill: "Acrobatics",
            action: game.pf2e.actions.tumbleThrough,
            icon: "icons/skills/movement/feet-winged-sandals-tan.webp",
        },
    ];

    // @ts-ignore
    const actionDialog = window.actionDialog;
    if (actionDialog?.rendered) {
        return actionDialog.close();
    }

    selectedActor = getActor();

    if (!selectedActor) {
        return ui.notifications.warn("No character selected!");
    }

    const actors =
        game?.actors.filter((x) => x.isOfType("character") || x.isOfType("familiar") || x.isOfType("npc")) || [];

    const partyIds =
        actors
            .filter((x) => x.hasPlayerOwner)
            .filter((x) => x.alliance === "party")
            .map((actor) => actor.id) || [];

    const actorSkills = createMapOfSkillsPerActor(actors);

    if (partyIds.includes(selectedActor.id)) getBestBonuses(actorSkills, partyIds, actionList);

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
            title: `Actions (${selectedActor.name})`,
            content,
            buttons: {
                close: {
                    icon: `<i class="fas fa-times"></i>`,
                    label: "Cancel",
                },
            },
            default: "close",
            render: (html) => {
                const action = (button) => {
                    const action = actionList[button.dataset.action];
                    const current = action.action;
                    if (typeof current === "string") {
                        if (!current.includes("(")) {
                            const macro = game.macros.get(current);
                            if (!macro) {
                                ui.notifications.error(
                                    "The GM must right click on the compendium xdy-pf2e-workbench-macros and select 'Import All Content' and make sure to check 'Keep Document IDs' when importing."
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
                        action.action({ actors: [selectedActor] });
                    }
                };
                if ("querySelectorAll" in html) {
                    html.querySelectorAll(".action-list button").forEach((button) =>
                        button.addEventListener("click", () => action(button))
                    );
                }
            },
        },
        // @ts-ignore
        { jQuery: false, width, classes: ["pf2e-bg"] }
    ).render(true);
}

// basicActionsMacros();
