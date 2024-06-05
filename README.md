# xdy-pf2e-workbench

![](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fpackage.json&label=version&query=$.version&colorB=blue)
![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![GitHub contributors](https://img.shields.io/github/contributors/xdy/xdy-pf2e-workbench)

![](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fstatic%2Fmodule.json)
![](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fsystem%3FnameType%3Dshort%26showVersion%3D1%26style%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fstatic%2Fmodule.json)

![GitHub all releases](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/total) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench)

Translations:
<a href="https://gitlocalize.com/repo/7104?utm_source=badge"> <img src="https://gitlocalize.com/repo/7104/whole_project/badge.svg" /> </a>

<a href="https://weblate.foundryvtt-hub.com/engage/xdy-pf2e-workbench/"><img src="https://weblate.foundryvtt-hub.com/widgets/xdy-pf2e-workbench/-/multi-auto.svg" alt="Translation status" /></a>

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features (order by setting section)

A demo video of most features: https://www.youtube.com/watch?v=WzDq2N1X07s

* Mystification section
    * Enable NPC Mystification. Sets the name of a token on the current scene based on it's traits.
        * Numerous subsettings, for instance: if mystified by dragging it from the sidebar while holding the configured
          modifier key, clicking the mystify button in the token hud or using the mystify keyboard shortcut (no default
          set). There are several options to filter out certain types of traits. A prefix or postfix can be added to the
          mystified name (either a user-provided word, or one rolled on a user-provided rollable table. A sample table
          named "Workbench Adjectives" is included with the module and need not be imported into the world, just
          enter "Workbench Adjectives" - without the quotes - in the appropriate textfield). A random number
          can also be added after the postfix, and optionally be kept when demystifying the creature. E.g. 'Skeletal
          Champion' could become 'Jack the Mindless Undead Skeleton 23'. Note that player owned tokens will not be
          mystified.
    * Option to use the mystified name in chat messages created from that npc (actions/spells). Relies on the original
      actor name being present in the text. Only works if the original npc name is actually used and correctly spelled
      in the message.

* Reminder section
    * Option to remind when attack is made by a token that probably can't attack (due to being unconscious / dead /
      defeated / has no hp / is restrained / etc), and option to cancel impossible attacks.
        * Suboption to allow Eidolons to attack even if they have 0 hp.
    * Option to remind when an attack is made without targeting, or just cancel untargeted attacks.
    * Option to show reminder each turn that the number of actions is other than three. Handles Quickened, Slowed and
      Stunned.
    * Option to automatically add a reminder effect when breath weapons are used (i.e. sent to chat.) Breath weapon
      description must match ```"1d(4|6) #(rounds|Rounds|recharge|Recharge)"``` for it to be
      recognized. (Optionally hiding the reminder for non-partymembers.)
    * Hero point handler. Gives option to (using Configure Controls) add a keybind to open a dialog that can reset or
      add hero points for all characters, add one hero point to a random (or selected) character (on new timers only)
      and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes. Timer now survives
      refreshes. Reopen the dialog to see how much time remains (press escape to leave without changes).
        * Set number of minutes till the next time the dialog is shown.
        * Post a notification when a Hero Point is handed out

* Quality of Life section
    * Option to add an npc scaler feature when right clicking on an npc (This feature has been taken over from the
      delisted [PF2e Toolbox](https://github.com/Djphoenix719/FVTT-PF2EToolbox#npc-scaler) module. Thanks DJ! At some
      point Avery will
      have the time to add it to the system, until then I'll maintain it.)
    * Option to add a quick roller button to the journal directory, enabling improvised npc rolls with no actual npc
      using the suggested values from the GMG (This feature has been taken over from the
      delisted [PF2e Toolbox](https://github.com/Djphoenix719/FVTT-PF2EToolbox#quick-roller) module. Thanks DJ!)
    * Option to hold CTRL while casting a spell to cast it as a whispered chat message. Separate option to output a
      separate public chat message with a Recall Knowledge button to recognize it, an optional save button and an
      optional trait list, unless you hold CTRL+SHIFT to entirely skip this message. Also has an option to cast the
      normal way if a party member knows the spell, and an option to always cast privately for
      non-allies/non-partymembers/NPCs.
    * Option to alter the token animation speed. (Not compatible with Multi Level Tokens teleport functionality.)
    * Option to add an asterisk to, in the feat browser, add an asterisk to the name of feats with prerequisites.
    * Option to show spell names in rarity colours on actor sheets.

* World Automation section
    * Option to automatically move combatant that goes to 0 hp to just before the current combatant. (Normally due to
      the current combatant just having downed the target combatant.) Option to limit to characters only.
    * Enable/disable the option to autoroll damage on a hit.
    * Enable/disable the option to automatically apply persistent healing.
    * Option to automatically reduce Stunned condition at the start of the turn hidden behind option to show actions
      reminder each turn, which handles Quickened, Slowed and Stunned.
    * Option automatically give Unconscious if Dying is removed when at 0 hp.
    * Option to automatically increase Wounded when Dying is removed (handles the
      feats [Bounce Back](https://2e.aonprd.com/Feats.aspx?ID=1441)
      and [Numb to Death](https://2e.aonprd.com/Feats.aspx?ID=1182). Only works for players if they themselves apply the
      damage/healing.
    * Option to automatically increase Dying on reaching 0 hp (handles the
      feats [Orc Ferocity](https://2e.aonprd.com/Feats.aspx?ID=83)
      , [Undying Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1291)
      , [Incredible Ferocity](https://2e.aonprd.com/Feats.aspx?ID=90)
      , [Rampaging Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1294) and partial handling
      of [Deliberate Death](https://2e.aonprd.com/Feats.aspx?ID=2355))
        * Suboption to increase dying by one more when damaged by an enemy's targeted critical attack.
        * Suboption to increase dying when taking damage while already dying (does not know about
          immunities/weaknesses/resistance, so taking 0 damage will trigger it).
        * Suboption for how to handle if the final damage was nonlethal.
    * Option to automatically remove Dying when healed to above 0 hp.
    * Option to drop all held items on becoming unconscious.

* Client Automation section
    * Optional settings to (if the GM allows it) automatically roll damage on a hit for strikes and/or spell attacks.
      Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the
      result in the chat. (E.g. for non-gm use either 'Owner' or 'All'). It also rolls for damage if a miss is turned
      into a hit via a reroll on the chat card.
        * Strikes. On a critical success it rolls critical damage.
        * Spell attacks (incl support for heightened spells). On a critical success it rolls normal damage, use the '
          double damage' button on the damage card.
        * Non-attack spells that deal damage (rolled when spell is cast, before saves, so targets need to manually apply
          the correct amount of damage based on save.) On a critical success it rolls normal damage, use the 'double
          damage' button on the damage card.
    * Optional settings to (if the GM allows it) automatically applying persistent damage, fast healing and
      regeneration (with an optional extra debug chat message), inspired by @Jamz' code.
    * Option to automate the results of the dying recovery roll button being clicked. (I.e. it does not automatically
      roll to try recover the dying character.)
    * Option to automatically reduce the Frightened condition at the end of each turn. See the included effect '
      Effect:
      Minimum Frightened' for how to set a minimum frightened level that the module won't reduce below.

* House Rules
    * Option to enable Keeley's Hero Point Rule (if reroll die is 10 or less, get a +10 bonus). Courtesy of stwlam
    * Option to add Ancestry Paragon feat slots as campaign feat slots (i.e. requires campaign feats to enabled.)
    * Option to add Dual Class feat slots as campaign feat slots (i.e. requires campaign feats to enabled.)
    * REALLY experimental option to use json to potentially brick your world. (Or,
      see [docs/housepatcher.md](docs/housepatcher.md) for more details.)

* No section
    * Optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells,
      feats, items, actions, etc). Can be configured to default to collapsed or expanded.
    * Option to either expand all damage cards/action cards/attach cards, or only expand new cards. If the latter, on a
      refresh the last three messages are expanded if they are damage cards.
    * Several options for the macro 'Basic Action Macros' (aka BAM)
        * Add a glow to the buttons where the actor is the best in the group.
        * Show actions that cannot be used.
        * Use a tabbed or list view of the buttons.
    * Option to set a custom pause text and image, as well as to move it's position to center of screen.

API:
A few potentially useful internal functions have been made available for macro use. Name and a simple example
of each can be found below:

```
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // await game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
        noOrSuccessfulFlatcheck: noOrSuccessfulFlatcheck, // await game.PF2eWorkbench.noOrSuccessfulFlatcheck(game.messages.get("messageId"))
        basicActionMacros: basicActionMacros, // await game.PF2eWorkbench.basicActionMacros()
        refocus: refocus, // await game.PF2eWorkbench.refocus()
        callHeroPointHandler: callHeroPointHandler, // await game.PF2eWorkbench.callHeroPointHandler()
        mystifyNpcItems: mystifyNpcItems, // await game.PF2eWorkbench.mystifyNpcItems() OR await game.PF2eWorkbench.mystifyNpcItems(items, minimumRarity, usingPartyLevel, minimumLevel, multiplier)
        getAllFromAllowedPacks: 
```

* New Keybinds in Configure Controls
    * Optional keybind to mystify a creature.
    * Optional keybind to open the Hero Point Handler.
    * Optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is
      currently showing or not.
    * Optional keybind called "Add user targets" that lets the GM add token targets to other users by selecting or
      hovering over those tokens, pressing the keybind and choosing which user should target those tokens. Enables GMs
      to help players having problems with targeting.

* Assorted other features
    * The latest versions of all V11-compatible macros
      from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e are included in each Workbench release.
      They can be found in the compendium "Symon-provided macros (asymonous-benefactor-macros)", with the express
      permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous (and colorless) benefactor. What documentation exists
      can be found towards the start of the macro. If you have issues with these macros, report them
      here: https://gitlab.com/symonsch/my-foundryvtt-macros/-/issues
    * The compendium "PF2e Workbench Items (xdy-pf2e-workbench-items)" contains a few useful effects and items:
        * Aura effects for Aura of Despair, Inspire Courage and Inspire Defense that automatically
          apply the effect to tokens within the aura. (Technically these not all these should be auras, but, close
          enough... Inspire Courage and Inspire Defense's effect can pass through walls that allow sound to pass)
        * Effect for Dirge of Doom that you can give to targets to give them frightened and not let the automated
          frightened removal reduce frightened below 1.
        * Effect: Minium Frightened that you can give to targets to not let the automated frightened removal reduce
          frightened below 1.
        * Effect that you can use to change Focus Point Maximum of a character.
        * Adjustments for making undead, courtesy of @ElvisLiving (everything but the zombie) and @Tikael (He/Him) (
          zombie).
    * The compendium "PF2e Workbench Macros (xdy-pf2e-workbench-macros)" contains a few macros you might find useful.
        * 'Basic Action Macros' (aka BAM) shows a dialog with a button for the most commonly used action, with bonus and
          whether you're the best in the party at that action (a setting to turn this off exists). It defaults to not
          show actions you cannot use due to trained requirement (with an option to always show). The button colors in
          the dialog show ranks, in order, grey=untrained, blue=trained, purple=expert, gold=master, red=legendary,
          with 'glow' meaning that you are the best in the party. (Thanks ApoAstolov).
        * 'Build Npc Spellbook Journal' that builds a journal with the contents of an npc's spell list. Courtesy of
          Avery (Velara).
        * Refocus. Adds 1 focus unless the actor has any of the (something)Focus feats, then it adds all focus. (Note
          that the macro does not handle Crimson Oath Devotion, Major Curse or Psychics.)
* The compendium "PF2e Workbench Customizable Macros (xdy-customizable-macros)" contains customizable macros
  provided by ApoApostolov and esheyw. They are *intended* to be customized by the user by changing the javascript
  code (such as by adding/removing actions, setting what actors are part of the party, etc.) They are not really
  supported by me, so, if your changes break them, you get to keep all the parts! :) (Or, ping the original author.)
    * Customizable Basic Action Macros. A variant of Basic Action Macros that you can customize for your own needs.
      Add/remove actions, change party members, go wild!
      See https://apoapostolov.notion.site/PF2-Basic-Actions-Macro-1255adc12ecf44e881e6cd87941f7858 for
      documentation.
    * Customizable Procedural Checks. A framework for running several macros at once, requires customization to be
      useful. (At a minimum, change the actor id:s, this gets you a macro that can be used in exploration mode to
      perform standard actions when the group is about to open a door.)
      See https://apoapostolov.notion.site/PF2-Procedural-Checks-Macro-996bd20ace45411eb4b1f566686ecdb1 for
      documentation.
    * Customizable Refocus. This macro works the way it did before the Pathfinder Remaster changes.
      Like the other macros in this compendium it will most likely never be updated. If it does get updated you will
      need to reimport it manually.
    * Customizable isSpellAvailable. This macro can be used to check if a spell is available for an actor.
      See https://discord.com/channels/880968862240239708/880969304365994034/1161188968424018020
* There are a few more compendiums included with this module with assorted internal utility macros and items that do not
  need to be imported, as indicated by their labels all ending with 'do not import'

* Experimental features:
    * If a feature name starts with mentioning that it's experimental, use with caution. It's probably barely tested and
      may wreck your chat or brick your world. (No warranty expressed or implied. No user serviceable parts inside. Void
      where prohibited. Ei saa peittää. Do not taunt happy fun ball: https://www.youtube.com/watch?v=GmqeZl8OI2M)

* Deprecated features (will be removed eventually):
    * None currently.

* Recently removed features:
    * None currently

## Installation

Install by either searching for xdy-pf2e-workbench in [FoundryVTT's](https://foundryvtt.com/) Module tab and clicking
Install or by clicking the 'Install Module' button in that tab and entering the following as the Manifest
URL: https://github.com/xdy/xdy-pf2e-workbench/releases/latest/download/module.json

If you want to install this module for older versions, download xdy-pf2e-workbench.zip from one of the following links
and unzip it into your modules/xdy-pf2e-workbench folder. Make sure to lock the module version, and remember that these
versions are not supported. (They probably work, but if they don't, you're on your own.)

* Use with Foundry 0.89 or older: https://github.com/xdy/xdy-pf2e-workbench/releases/v1.7.1
* Use with Foundry 9: https://github.com/xdy/xdy-pf2e-workbench/releases/v3.44.3
* Use with Foundry 10: https://github.com/xdy/xdy-pf2e-workbench/releases/v4.77.2
* Use with pf2e 5.2.3 (*no* remaster): https://github.com/xdy/xdy-pf2e-workbench/releases/v5.15.1
* Use with pf2e 5.8.3 (just before *only* remaster): https://github.com/xdy/xdy-pf2e-workbench/releases/v5.27.9
* Used with Foundry 11: https://github.com/xdy/xdy-pf2e-workbench/releases/v5.66.0

## Supported pf2e-specific QOL modules

As in, I try to keep the Workbench compatible with these pf2e qol modules (as I use them myself). In general, if the
module does
something that the Workbench also does, I suggest disabling the Workbench equivalent.

* [PF2e Dailies](https://github.com/reonZ/pf2e-dailies)
* [PF2e Dorako UI](https://github.com/Dorako/pf2e-dorako-ui)
* [PF2e Extempore Effects](https://github.com/shemetz/pf2e-extempore-effects)
* [PF2e Interactive Token Tooltip](https://github.com/reonZ/pf2e-token-hud)
* [PF2e Item Activations](https://github.com/ChasarooniZ/pf2e-item-activations)
* [PF2e Keybind Menagerie](https://github.com/Drental/foundryvtt-pf2e-f-is-for-flatfooted)
* [PF2e Modifiers Matter](https://github.com/shemetz/pf2e-modifiers-matter)
* [PF2e Perception]() (unreleased, made by Idle)
* [PF2e Toolbelt](https://github.com/reonZ/pf2e-toolbelt)
* [pf2e Utility Buttons](https://github.com/oWave/pf2e-flatcheck-helper)

I do use other modules, and will try to avoid breaking even those I don't use, but they have lower priority.
(My [current module list](docs/current_modules.txt))

## NOT supported modules

As in, these are broken/known to clash with the Workbench (not linking these): PF2e Sheet Skill Actions, PF2e Toolbox.

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
  Apache License (see [LICENSE.md](LICENSE.md)). (Including the types and utility classes generated or copied from the
  pf2e
  system at https://github.com/foundryvtt/pf2e, also under the Apache License.)

Virtual Table Top Platform Licenses:

* Foundry VTT support is covered by the following
  license: [Limited License Agreement for module development](https://foundryvtt.com/article/license/).

Asset licenses:

* The cover image is modified by me
  from [Picture taken at a garage exhibit at LACMA.](https://unsplash.com/photos/1UimDTf69ho)
  by [Elmer Mercanas](https://unsplash.com/@elmercanasjr) under the [Unsplash License](https://unsplash.com/license)
* The icon for Basic Action Macros was made by Oskar and popy and is available under
  the [CC0 license](https://creativecommons.org/share-your-work/public-domain/cc0/)
* The icon for Another Alternative Bonus Progression is made by @CrackJackFlood and are "made by me no license free for
  public use".

build-packs license:

* The build-packs.ts script has been dreadfully hacked
  from https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original,
  provided under the [ISC license](https://www.isc.org/licenses/)

asymonous-benefactor-macros:

* The macros found in the asymonous-benefactor-macros pack are, with the express permission of said
  asymonous^H^H^H^H^H^H^H^H^Hanonymous benefactor, collected
  from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e at build time. Attribution for the macros can
  normally be found inside each macro, and the source url for each macro is added at the end of the file.

"Workbench Adjectives" table is based on a list
in [Unique Names Generator](https://github.com/andreasonny83/unique-names-generator/blob/main/src/dictionaries/adjectives.ts)
and is provided under the [MIT license](https://github.com/andreasonny83/unique-names-generator/blob/main/LICENSE)
