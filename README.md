# xdy-pf2e-workbench

<img title="Minimum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Minimum%20Foundry%20version&query=minimumCoreVersion&style=flat-square&color=important" alt="Minimum foundry version"> <img  alt="Maximum foundry version" title="Maximum foundry version" src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/xdy/xdy-pf2e-workbench/main/module.json&label=Maximum%20Foundry%20version&query=compatibleCoreVersion&style=flat-square&color=important"> 
![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Total alerts](https://img.shields.io/lgtm/alerts/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/xdy/xdy-pf2e-workbench.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/xdy/xdy-pf2e-workbench/context:javascript)

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features

* NPC Mystification that sets the npc name to it's traits if Alt is held when the npc is dragged to the scene. (E.g. a '
  Skeletal Champion' would by default become 'Unknown Mindless Undead Skeleton' + random number. There are several
  settings to alter how npc names are mystified: for instance to add a number after the name (default), whether to use
  Alt (default) or Ctrl to mystify, whether to include rarity in name (default), etc.

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
*
* The icons in the assets folder as well as the original icons from [https://game-icons.net/](https://game-icons.net/)
  are provided under
  the [Creative Commons Attribution 3.0 Unported (CC BY 3.0) license](https://creativecommons.org/licenses/by/3.0/) and
  were made by numerous authors. The full list of those can be found at: https://game-icons.net/about.html#authors
