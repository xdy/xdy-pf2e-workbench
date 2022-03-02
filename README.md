# xdy-pf2e-workbench

<img title="Minimum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Minimum%20Foundry%20version&query=minimumCoreVersion&style=flat-square&color=important" alt="Minimum foundry version"> <img  alt="Maximum foundry version" title="Maximum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Maximum%20Foundry%20version&query=compatibleCoreVersion&style=flat-square&color=important"> 
![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Total alerts](https://img.shields.io/lgtm/alerts/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/context:javascript)
<a href="https://gitlocalize.com/repo/7104/fr?utm_source=badge"> <img src="https://gitlocalize.com/repo/7104/fr/badge.svg" alt="French translation percentage"/> </a>
<a href="https://gitlocalize.com/repo/7104/sv?utm_source=badge"> <img src="https://gitlocalize.com/repo/7104/sv/badge.svg" alt="Swedish translation percentage"/> </a>

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features (in the order they were added)

* NPC Mystification. Sets the name of a token on the current scene based on it's traits if mystified by dragging it from the sidebar while holding the configured modifier key, clicking the mystify button in the token hud or using the mystify keyboard shortcut (no default set). There are several options to filter out certain types of traits. A prefix or postfix can be added to the mystified name (either a user-provided word, or one rolled on a user-provided rollable table). A random number can also be added after the postfix, and optionally be kept when demystifying the creature. E.g. 'Skeletal Champion' could become 'Jack the Mindless Undead Skeleton 23'. Note that player owned tokens are not mystified.
* Optional keybind and combat context menu to move the selected combatant to before the current combatant in the
  initiative order (normally used when the current combatant has just killed the selected combatant).
* Optional feature to automatically move combatant that goes to 0 hp to just before the current combatant. (See above.)
* Optional feature to automatically move combatant that gets the Dying condition to just before the current combatant. (See above.)
* (Still in the module, but a variant is in the system) Option to automatically purge all expired effects each turn.
* Optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is currently showing or not.
* Optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells, feats, items, etc, might hit others as well). Click on title to expand again.
* Optional setting to automatically roll damage for Strikes on a hit. On a critical success it rolls critical damage. Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the result in the chat. (E.g. for non-gm use either 'Owner' or 'All').
* Experimental hero point handler feature. Adds an optional keybind to open a dialog that can reset or add hero points for all characters, add one hero point to a random (or selected) character (on new timers only) and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes.  Timer now survives refreshes. Reopen the dialog to see how much time remains (press escape to leave without changes).
* (Still in the module, but a variant is in the system) Option to automatically purge all expired effects every time the game world clock increases out of combat.
* From now on each release of PF2e Workbench will include the latest versions of all V9-compatible macros from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e They can be found in the asymonous-benefactor-macros compendium, with the express permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous (and colorless) benefactor.
Attribution for the macros can normally be found inside each macro, and the source url for each macro is added at the end of each macro. Do not import the macros named like 'XDY DO_NOT_IMPORT', instead import the ones with proper names.
* Effects for the Lingering Heroics macro included with the above are now included in the asymonous-benefactor-effects compendium , import these to automatically get the proper duration effect sent to chat.
* Option to automatically reduce frighted condition at the end of each turn.
* Option to automatically apply persistent damage (from the awesome [Persistent Damage module](https://github.com/CarlosFdez/pf2e-persistent-damage)) as well as the PF2e system's fast healing and regeneration (with an optional extra debug chat message) inspired by @Jamz' code.
* Optional setting to automatically roll damage for spell attacks on a hit (including support for heightened spells.) Note that unlike strikes n a critical success still rolls normal damage. Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the result in the chat. (E.g. for non-gm use either 'Owner' or 'All'). Courtesy of @WesBelmont.


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

