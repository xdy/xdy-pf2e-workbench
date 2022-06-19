# xdy-pf2e-workbench

<img title="Minimum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Minimum%20Foundry%20version&query=minimumCoreVersion&style=flat-square&color=important" alt="Minimum foundry version"> <img  alt="Maximum foundry version" title="Maximum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Maximum%20Foundry%20version&query=compatibleCoreVersion&style=flat-square&color=important"> 
![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Total alerts](https://img.shields.io/lgtm/alerts/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/context:javascript)
<a href="https://gitlocalize.com/repo/7104/fr?utm_source=badge"> <img src="https://gitlocalize.com/repo/7104/fr/badge.svg" alt="French translation percentage"/> </a>
<a href="https://gitlocalize.com/repo/7104/sv?utm_source=badge"> <img src="https://gitlocalize.com/repo/7104/sv/badge.svg" alt="Swedish translation percentage"/> </a>

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features (in no particular order)

* NPC Mystification. Sets the name of a token on the current scene based on it's traits if mystified by dragging it from the sidebar while holding the configured modifier key, clicking the mystify button in the token hud or using the mystify keyboard shortcut (no default set). There are several options to filter out certain types of traits. A prefix or postfix can be added to the mystified name (either a user-provided word, or one rolled on a user-provided rollable table). A random number can also be added after the postfix, and optionally be kept when demystifying the creature. E.g. 'Skeletal Champion' could become 'Jack the Mindless Undead Skeleton 23'. Note that player owned tokens are not mystified.
* Hero point handler feature. Adds an optional keybind to open a dialog that can reset or add hero points for all characters, add one hero point to a random (or selected) character (on new timers only) and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes.  Timer now survives refreshes. Reopen the dialog to see how much time remains (press escape to leave without changes).
* Optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells, feats, items, actions, etc). Can be configured to default to collapsed or expanded.
* Optional settings to (if the GM allows it) automatically roll damage on a hit for strikes and/or spell attacks. Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the result in the chat. (E.g. for non-gm use either 'Owner' or 'All'). It also rolls for damage if a miss is turned into a hit via a reroll on the chat card.
  * Strikes. On a critical success it rolls critical damage.
  * Spell attacks (incl support for heightened spells). On a critical success it rolls normal damage, use the 'double damage' button on the damage card. Courtesy of @WesBelmont
* Optional setting to automatically roll damage on all *non-attack* spells that deal damage.
* Optional settings to (if the GM allows it) automatically apply persistent damage (from the awesome [Persistent Damage module](https://github.com/CarlosFdez/pf2e-persistent-damage)) as well as the PF2e system's fast healing and regeneration (with an optional extra debug chat message) inspired by @Jamz' code.
* Optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is currently showing or not.
* The latest versions of all V9-compatible macros from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e are included in each Workbench release. They can be found in the asymonous-benefactor-macros compendium, with the express permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous (and colorless) benefactor. Attribution for the macros can normally be found inside each macro, and the source url for each macro is added at the end of each macro. Do not import the macros named like 'XDY DO_NOT_IMPORT', instead import the ones with proper names. Effects for the Lingering Heroics macro included with the above are now included in the asymonous-benefactor-effects compendium, import these to automatically get the proper duration effect sent to chat.
* Option to automatically reduce the Frightened condition at the end of each turn. See the included effect 'Effect: Dirge of Doom' for how to set a minimum frightened level that the module won't reduce below.
* Options to automatically move combatant that goes to 0 hp to just before the current combatant. (Normally due to the current combatant just having downed the target combatant.)
* Option to do a custom animation and sound on a hit, miss, critical miss and/or critical success. Requires that the module https://foundryvtt.com/packages/autoanimations be installed (along with it's dependencies). For the default miss animation install the module https://foundryvtt.com/packages/JB2A_DnD5e. For the default miss sound install the module https://foundryvtt.com/packages/soundfxlibrary. Or replace with your own animation and/or sound. The name of the sound file can instead be the name of a table or a playlist to draw a random sound from (for a table, make a table with a text line for each sound that has the path to the sound, setting the table's dice formula to, say, 1d23 if the table has 23 entries.)
* Option to allow item bonuses when using [ABP](https://2e.aonprd.com/Rules.aspx?ID=1357).
* Option to automatically add a reminder effect when breath weapons are used (i.e. sent to chat.) Breath weapon description must match 
```"<p>.*can't use.*1d([46]) rounds.*</p>"``` or the localized equivalent for it to be recognized.
* Option to automatically reduce Stunned condition at the start of the turn hidden behind option to show actions reminder each turn, which handles Quickened, Slowed and Stunned.
* The xdy-pf2e-workbench-items pack now includes a 'Boon' named "Workbench Flat Check Notes". This 'Boon' holds several useful Note RE:s that when appropriate add notes about Flat Checks to rolls. It is far from complete, but it's a good start. To use it add it to your characters, it'll appear on the Deity Boons/Curses section of the Effects tab rather than on the feat list. It currently handles: Target is undetected, hidden, invisible or concealed. Self is blinded or dazzled. Self has Blind-Fight.
* Option to use the token hud visibility toggle to also toggle the Undetected condition
* Optional keybind called "Add user targets" that lets the GM add token targets to other users by selecting or hovering over those tokens, pressing the keybind and choosing which user should target those tokens. Enables GMs to help players having problems with targeting. Also useful in conjunction with "Workshop Flat Check Notes" to make a player target an Undetected token that they first need to roll a Flat Check to be able to hit.
* Option to automatically increase Dying on reaching zero hp (handles the feats [Orc Ferocity](https://2e.aonprd.com/Feats.aspx?ID=83), [Undying Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1291), [Incredible Ferocity](https://2e.aonprd.com/Feats.aspx?ID=90), [Rampaging Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1294) and partial handling of [Deliberate Death](https://2e.aonprd.com/Feats.aspx?ID=2355))
* Option to automatically increase Wounded when Dying is removed (handles the feats [Bounce Back](https://2e.aonprd.com/Feats.aspx?ID=1441) and [Numb to Death](https://2e.aonprd.com/Feats.aspx?ID=1182)
* Option to hold control or shift to quickly increase/decrease item quantities by 5 or 10 (from https://github.com/Djphoenix719/FVTT-PF2EToolbox)
* Option to colorize the items per rarity on the player sheet like on the npc sheet.
* Option to add a button to all npcs that sends the relevant Recall Knowledge checks to chat (for skills only, lores not handled yet). Has suboption to hide the npc token name on the chat card.
* Option to either expand all damage cards, or only expand new cards. If the latter, on a refresh the last three messages are expanded if they are damage cards.
* Option to create an IWR (Immunity, Weakness, Resistance) reminder message after a damage roll against a target with an IWR that matches damage types of the attacking weapon.

Experimental features:
None right now. (Though some feature settings are experimental.)

Deprecated features (will be removed eventually):
None right now.

## Installation

Install by either searching for xdy-pf2e-workbench in [FoundryVTT's](https://foundryvtt.com/) Module tab and clicking
Install or by clicking the 'Install Module' button in that tab and entering the following as the Manifest
URL: https://github.com/xdy/xdy-pf2e-workbench/releases/latest/download/module.json

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

* The build-packs.ts script  has been dreadfully hacked from https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original, provided under the [ISC license](https://www.isc.org/licenses/)

asymonous-benefactor-macros:

* The macros found in the asymonous-benefactor-macros pack are, with the express permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous benefactor, collected from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e at build time. Attribution for the macros can normally be found inside each macro, and the source url for each macro is added at the end of the file.
