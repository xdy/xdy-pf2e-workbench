# xdy-pf2e-workbench

<img title="Minimum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Minimum%20Foundry%20version&query=compatibility.minimum&style=flat-square&color=important" alt="Minimum foundry version"> <img title="Verified foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Verified%20Foundry%20version&query=compatibility.verified&style=flat-square&color=important" alt="Verified foundry version"> <img alt="Maximum foundry version" title="Maximum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Maximum%20Foundry%20version&query=compatibility.maximum&style=flat-square&color=important"> ![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Total alerts](https://img.shields.io/lgtm/alerts/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/context:javascript)

<a href="https://weblate.foundryvtt-hub.com/engage/xdy-pf2e-workbench/"><img src="https://weblate.foundryvtt-hub.com/widgets/xdy-pf2e-workbench/-/multi-auto.svg" alt="Translation status" /></a>

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features (order by setting section)

A demo video of most features: https://www.youtube.com/watch?v=WzDq2N1X07s

* Mystification section
  * Enable NPC Mystification. Sets the name of a token on the current scene based on it's traits.
    * Numerous subsettings, for instance: if mystified by dragging it from the sidebar while holding the configured modifier key, clicking the mystify button in the token hud or using the mystify keyboard shortcut (no default set). There are several options to filter out certain types of traits. A prefix or postfix can be added to the mystified name (either a user-provided word, or one rolled on a user-provided rollable table). A random number can also be added after the postfix, and optionally be kept when demystifying the creature. E.g. 'Skeletal Champion' could become 'Jack the Mindless Undead Skeleton 23'. Note that player owned tokens are not mystified.
  * Option to use the mystified name in chat messages created from that npc (actions/spells). Relies on the original actor name being present in the text.

* Reminder section
  * Option to remind when attack is made by a token that probably can't attack (due to being unconscious/dead/defeated/has no hp/etc). 
    * Option to allow Eidolons to attack even if they have 0 hp.
  * Option to create an IWR (Immunity, Weakness, Resistance) reminder message after a damage roll against a target with an IWR that matches damage types of the attacking weapon or spell. NOTE: Currently only handles 'simple' IWR, it doesn't handle things like 'All', 'Physical', 'All (except force)', etc.
  * Option to remind when an attack is made without targeting.
  * Option to show reminder each turn that the number of actions is other than three. Handles Quickened, Slowed and Stunned.
  * Option to automatically add a reminder effect when breath weapons are used (i.e. sent to chat.) Breath weapon description must match
  ```"<p>.*can't use.*1d([46]) rounds.*</p>"``` or the localized equivalent for it to be recognized.
  * Hero point handler. Gives option to (using Configure Controls) add a keybind to open a dialog that can reset or add hero points for all characters, add one hero point to a random (or selected) character (on new timers only) and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes.  Timer now survives refreshes. Reopen the dialog to see how much time remains (press escape to leave without changes).
    * Set number of minutes till the next time the dialog is shown.

* Quality of Life section
  * Option to add a creature builder button to npc character sheets, enabling building from scratch using the suggested values from the GMG (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ!)
  * Option to add an npc scaler feature when right clicking on an npc (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ! At some point Avery will have the time to add it to the system, until then I'll maintain it.)
  * Option to add a quick roller button to the journal directory, enabling improvised npc rolls with no actual npc using the suggested values from the GMG (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ!)
  * Option to hold control or shift to quickly increase/decrease item quantities by 5 or 10 (from https://github.com/Djphoenix719/FVTT-PF2EToolbox)
  * Option to hold CTRL while casting a spell to cast it as a whispered chat message. Separate option to output a separate public chat message with a Recall Knowledge button to recognize it, an optional save button and an optional trait list, unless you hold CTRL+SHIFT to entirely skip this message.
  * Option to add a button to all npcs that sends the relevant Recall Knowledge checks to chat (for skills only, lores not handled yet).
    * Options to hide the npc token name and/or the skill name on the chat card.
    * Option to show spell traits in the chat card.

* World Automation section
  * Options to automatically move combatant that goes to 0 hp to just before the current combatant. (Normally due to the current combatant just having downed the target combatant.)
  * Enable/disable the option to autoroll damage on a hit.
  * Enable/disable the option to automatically apply persistent healing.
  * Option to apply Encumbered condition automatically based on current bulk when bulk changes. Note: Uses the system code which considers 5 bulk + 9 light to not exceed 5 bulk.
  * Option to automatically reduce Stunned condition at the start of the turn hidden behind option to show actions reminder each turn, which handles Quickened, Slowed and Stunned.
  * Option automatically give Unconscious if Dying is removed when at 0 hp.
  * Option to automatically increase Wounded when Dying is removed (handles the feats [Bounce Back](https://2e.aonprd.com/Feats.aspx?ID=1441) and [Numb to Death](https://2e.aonprd.com/Feats.aspx?ID=1182).  Only works for players if they themself apply the damage/healing.
  * Option to automatically increase Dying on reaching 0 hp (handles the feats [Orc Ferocity](https://2e.aonprd.com/Feats.aspx?ID=83), [Undying Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1291), [Incredible Ferocity](https://2e.aonprd.com/Feats.aspx?ID=90), [Rampaging Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1294) and partial handling of [Deliberate Death](https://2e.aonprd.com/Feats.aspx?ID=2355))
  * Option to automatically remove Dying when healed to above 0 hp. 

* Client Automation section 
  * Optional settings to (if the GM allows it) automatically roll damage on a hit for strikes and/or spell attacks. Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the result in the chat. (E.g. for non-gm use either 'Owner' or 'All'). It also rolls for damage if a miss is turned into a hit via a reroll on the chat card.
    * Strikes. On a critical success it rolls critical damage.
    * Spell attacks (incl support for heightened spells). On a critical success it rolls normal damage, use the 'double damage' button on the damage card.
    * Non-attack spells that deal damage (rolled when spell is cast, before saves, so targets need to manually apply the correct amount of damage based on save.) On a critical success it rolls normal damage, use the 'double damage' button on the damage card.
  * Optional settings to (if the GM allows it) automatically applying persistent damage (from the awesome [Persistent Damage module](https://github.com/CarlosFdez/pf2e-persistent-damage)) as well as the PF2e system's fast healing and regeneration (with an optional extra debug chat message) inspired by @Jamz' code.
  * Option to automatically reduce the Frightened condition at the end of each turn. See the included effect 'Effect: Dirge of Doom' for how to set a minimum frightened level that the module won't reduce below.

Variant Rules
* Option to change the max number of hero points a character can have. (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ!)
* Option to allow item bonuses when using [ABP](https://2e.aonprd.com/Rules.aspx?ID=1357).

No section
* Optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells, feats, items, actions, etc). Can be configured to default to collapsed or expanded.
* Option to either expand all damage cards, or only expand new cards. If the latter, on a refresh the last three messages are expanded if they are damage cards.
* Option to add all skill actions to the character Actions page. (This feature has been taken over from the discontinued https://github.com/jamespdaily/pf2e-sheet-skill-actions/ module. Thanks James!)
  * The module will hide any skill actions that you're currently not trained in.
  * Actions that require a feat (e.g. Bon Mot) will not show up unless you actually have the feat.
* A few potentially useful internal functions have been made available for macro use. Name and simple example of each below:
```
game.PF2eWorkbench.resetHeroPoints // game.PF2EWorkbench.resetHeroPoints(1)
game.PF2eWorkbench.addHeroPoints // game.PF2EWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
game.PF2eWorkbench.scaleNPCToLevelFromActor scaleNPCToLevelFromActor // await game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
game.PF2eWorkbench.moveSelectedAheadOfCurrent moveSelectedAheadOfCurrent // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
game.PF2eWorkbench.doMystificationFromToken // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
game.PF2eWorkbench.generateNameFromTraitsForToken // await game.PF2eWorkbench.generateNameFromTraitsForToken(_token.id)
```

New Keybinds in Configure Controls
* Optional keybind to mystify a creature.
* Optional keybind to open the Hero Point Handler.
* Optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is currently showing or not.
* Optional keybind called "Add user targets" that lets the GM add token targets to other users by selecting or hovering over those tokens, pressing the keybind and choosing which user should target those tokens. Enables GMs to help players having problems with targeting.

Assorted other features
* The latest versions of all V10-compatible macros from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e are included in each Workbench release. They can be found in the asymonous-benefactor-macros compendium, with the express permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous (and colorless) benefactor. Attribution for the macros can normally be found inside each macro, and the source url for each macro is added at the end of each macro. Do not import the macros named like 'XDY DO_NOT_IMPORT', instead import the ones with proper names. Effects for the Lingering Heroics macro included with the above are now included in the asymonous-benefactor-effects compendium, import these to automatically get the proper duration effect sent to chat. If you have issues with these macros, report them here: https://gitlab.com/symonsch/my-foundryvtt-macros/-/issues
* The xdy-pf2e-workbench-items compendium contains a few useful effects and items:
  * Aura effects for Bless, Inspire Courage, Inspire Defense, Protective Ward that automatically apply the effect to tokens within the aura. (Technically these should not be auras, but, close enough...)
  * Placeholder Aura effect for Bless. If/when the system supports auras that affect enemies this effect might automagically start automating.
  * Stance effects for Dread Marshal and Inpiring Marshal that applies the effect to tokens within the aura. (Will be removed when the Stances are implemented in the system.)
  * Effect for Dirge of Doom that you can give to targets to not let the automated frightened removal reduce frightened below 1.
  * Workbench ABP. My attempt at implementing the optional Automated Bonus Progression rules using Rule Elements hosted on a 'Bonus Feat'.
Not quite complete, but, useful enough. (My players decided against ABP so I won't use it in the near term, but figured it might be useful for someone else, so I'm putting it in the Workbench.)
To use it, *do not* turn on ABP in Foundry, instead put this 'feat' in the Campaign Feats section on all characters you want to use these rules.)
Only lightly tested, but you probably need to remove and readd this feat after you level up.
Adjust the economy as much as you feel is needed. You don't need to remove runes from weapons and armor if you don't want to, these REs are implemented as Item Bonuses, so whichever of the rune and the character has the highest bonus is applied, *except* for Devastating Attacks which *does* stack with Striking Runes.
  * (Deprecated, use the module https://foundryvtt.com/packages/pf2-flat-check instead) An 'Equipment' named "Workbench Flat Check Notes". This 'Equipment' holds several useful Note RE:s that when appropriate add notes about Flat Checks to rolls. It is far from complete, but it's a good start. To use it add it to your character. It currently handles: Target is undetected, hidden, invisible or concealed. Self is blinded or dazzled. Self has Blind-Fight.

Experimental features:
* None right now.

Deprecated features (will be removed eventually):
* Option to colorize the items per rarity on the player sheet like on the npc sheet. (In the pf2e system since https://github.com/foundryvtt/pf2e/pull/3856)
* See 'Assorted other features' above.

## Installation

Install by either searching for xdy-pf2e-workbench in [FoundryVTT's](https://foundryvtt.com/) Module tab and clicking
Install or by clicking the 'Install Module' button in that tab and entering the following as the Manifest
URL: https://github.com/xdy/xdy-pf2e-workbench/releases/latest/download/module.json

If you want to install this module for foundry 0.89 or lower use this (unsupported) module.json link: https://github.com/xdy/xdy-pf2e-workbench/releases/download/v1.7.1/module.json

If you want to install this module for foundry 9 use this (unsupported) module.json link: https://github.com/xdy/xdy-pf2e-workbench/releases/download/v3.44.3/module.json


### Patch Notes:

See [CHANGELOG.md](CHANGELOG.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTRIBUTORS.md](CONTRIBUTORS.md)

## The Programmer's Mantra

```
It is by caffeine alone I set my mind in motion
It is by the beans of Java that thoughts acquire speed
The hands acquire shakes
The shakes become a warning
It is by caffeine alone I set my mind in motion
```

* Help xdy stay awake long enough to add more
  bugs! [![Donate via Ko-Fi](https://img.shields.io/badge/support-ko--fi-ff4646?style=flat-square&logo=ko-fi)](https://ko-fi.com/xdy1337)

### Licenses

This module uses trademarks and/or copyrights owned by Paizo Inc., used
under [Paizo's Community Use Policy (paizo.com/communityuse)](paizo.com/communityuse). We are expressly prohibited from
charging you to use or access this content. This module is not published, endorsed, or specifically approved by Paizo.
For more information about Paizo Inc. and Paizo products, visit [paizo.com](paizo.com).

Open Game License:

* See [OpenGameLicense.md](OpenGameLicense.md)

Project Licensing:

* Everything in this project that is not covered by one of the following license exceptions is made available under the
  Apache License (see [LICENSE](LICENSE)).

Virtual Table Top Platform Licenses:

* Foundry VTT support is covered by the following
  license: [Limited License Agreement for module development](https://foundryvtt.com/article/license/).

Asset licenses:

* The cover image is modified by me
  from [Picture taken at a garage exhibit at LACMA.](https://unsplash.com/photos/1UimDTf69ho)
  by [Elmer Mercanas](https://unsplash.com/@elmercanasjr) under the [Unsplash License](https://unsplash.com/license)
* The icons in the assets folder as well as the original icons from [https://game-icons.net/](https://game-icons.net/)
  are provided under
  the [Creative Commons Attribution 3.0 Unported (CC BY 3.0) license](https://creativecommons.org/licenses/by/3.0/) and
  were made by numerous authors. The full list of those can be found at: https://game-icons.net/about.html#authors

build-packs license:

* The build-packs.ts script has been dreadfully hacked from https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original, provided under the [ISC license](https://www.isc.org/licenses/)

asymonous-benefactor-macros:

* The macros found in the asymonous-benefactor-macros pack are, with the express permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous benefactor, collected from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e at build time. Attribution for the macros can normally be found inside each macro, and the source url for each macro is added at the end of the file.
