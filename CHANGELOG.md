## [2.21.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.5...v2.21.6) (2022-01-29)


### Bug Fixes

* If you have somehow configured mystification to set "" (an empty string) as the mystified token name the mystified name will instead be set to "..." instead as it appears that setting the token name to "" can cause problems. ([6b65b5e](https://github.com/xdy/xdy-pf2e-workbench/commit/6b65b5e26a8776a9ce962059fcdda5462bf0976a))

## [2.21.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.4...v2.21.5) (2022-01-29)


### Bug Fixes

* GMs can now autoroll damage when attacking with playerowned characters again without double damage rolls occurring. ([5fe2e4b](https://github.com/xdy/xdy-pf2e-workbench/commit/5fe2e4b90c280046acfe20fd8590744e9592b51b))

## [2.21.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.3...v2.21.4) (2022-01-28)


### Bug Fixes

* Auto roll damage for strikes that hit no longer double dips on damage if both the GM and a player have it enabled. Nor does the damage autoroll if the GM rolls a player strike. (More of a side effect of the bug fix, but I like it.) ([4bd57eb](https://github.com/xdy/xdy-pf2e-workbench/commit/4bd57eb376505a98943db29958a3ec486d7d6cb6))

## [2.21.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.2...v2.21.3) (2022-01-28)


### Bug Fixes

* Updated French translation courtesy of [@rectulo](https://github.com/rectulo) ([9ebcca0](https://github.com/xdy/xdy-pf2e-workbench/commit/9ebcca000e4d8b3014ae18c7006109857afbdf02))

## [2.21.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.1...v2.21.2) (2022-01-28)


### Bug Fixes

* Adds the compendium asymonous-benefactor-effects with effects for use with the Lingering Performance macro, import these if you use that macro. ([2fa4431](https://github.com/xdy/xdy-pf2e-workbench/commit/2fa4431813ca894135d9cbca282cff607cc4dbb3))

## [2.21.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.0...v2.21.1) (2022-01-27)


### Bug Fixes

* No real change, testing release script changes. ([251b081](https://github.com/xdy/xdy-pf2e-workbench/commit/251b081cd96f1bd3392bf226688145c7f9df4ccd))
* No real change, testing release script. ([060de35](https://github.com/xdy/xdy-pf2e-workbench/commit/060de35272cfcfb3fdbe60428642861a13fbef92))
* No real change, testing release script. ([3fec191](https://github.com/xdy/xdy-pf2e-workbench/commit/3fec191c3bd0a27cd15b833cb82da058cab585fb))

# [2.21.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.20.0...v2.21.0) (2022-01-26)


### Features

* Now includes hotbar macros that call the 'real' macro from the compendium (based on one posted by DrentalBot), meaning that you do not need to re-import it after each Workbench update. Just make sure to not import the macros with names starting with 'XDY DO_NOT_IMPORT' (though, if you want to read the code for a macro/see who wrote it, that is where you should look.) ([43d2511](https://github.com/xdy/xdy-pf2e-workbench/commit/43d251194c1f692ad38691ff45337f19b8fa67ec))

# [2.20.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.19.2...v2.20.0) (2022-01-26)


### Features

* From now on each release of PF2e Workbench will include the latest versions of all V9-compatible macros from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e ([f90ccd4](https://github.com/xdy/xdy-pf2e-workbench/commit/f90ccd4d8a9a2aa884f77ea7d1249c878d5154f1))
* From now on each release of PF2e Workbench will include the latest versions of all V9-compatible macros from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e ([8c735fe](https://github.com/xdy/xdy-pf2e-workbench/commit/8c735fe74acf41954aedaabc6069fd88867abb17))

## [2.19.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.19.1...v2.19.2) (2022-01-25)


### Bug Fixes

* Make hero point handler more useful by: Not resetting to 1 hero point by default (set it to that when debugging, and forgot to change it back). Filtering out minions and eidolons when handing out hero points. ([21ad487](https://github.com/xdy/xdy-pf2e-workbench/commit/21ad4872b03e7053e6813ceb3f9a71ae1ee49651))

## [2.19.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.19.0...v2.19.1) (2022-01-25)


### Bug Fixes

* No longer mystify player-owned tokens. ([5b20d8b](https://github.com/xdy/xdy-pf2e-workbench/commit/5b20d8b83d2735b8aae142656e63d44d0d7cbc61)), closes [#89](https://github.com/xdy/xdy-pf2e-workbench/issues/89)

# [2.19.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.18.1...v2.19.0) (2022-01-25)


### Features

* Add optional setting to remove expired effects when the game world clock increases outside of combat. ([cc8625c](https://github.com/xdy/xdy-pf2e-workbench/commit/cc8625c8179cb4d7d62e3d80d3d1ba67cf947f9e))
* Add optional setting to remove expired effects when the game world clock increases outside of combat. ([6e550d5](https://github.com/xdy/xdy-pf2e-workbench/commit/6e550d5a1cf2800d71bb7372f46f56c6c3696716))

## [2.18.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.18.0...v2.18.1) (2022-01-24)


### Bug Fixes

* Make sure hero point handler dialog can't be opened twice, clean up code and localization ([40955a9](https://github.com/xdy/xdy-pf2e-workbench/commit/40955a96d0c393381030a38e7ea3f00b618d383f))
* Make sure hero point handler dialog can't be opened twice, clean up code and localization ([bdd23bf](https://github.com/xdy/xdy-pf2e-workbench/commit/bdd23bf701433ed26089a2b213ae6a224d637987))

# [2.18.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.17.0...v2.18.0) (2022-01-24)


### Features

* Experimental heropoint handler feature. Adds an optional keybind to open a dialog that can reset or add heropoints for all characters, add one heropoint to a random (or selected) character and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes. ([ae52b00](https://github.com/xdy/xdy-pf2e-workbench/commit/ae52b00b62cf3fb2834905575845556194619db3))
* Experimental heropoint handler feature. Adds an optional keybind to open a dialog that can reset or add heropoints for all characters, add one heropoint to a random (or selected) character and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes. ([8728029](https://github.com/xdy/xdy-pf2e-workbench/commit/872802904995e32bd113da784e12fc2b76c9a1b4))

# [2.17.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.16.3...v2.17.0) (2022-01-23)


### Features

* Includes French translation courtesy of [@rectulo](https://github.com/rectulo) ([1ceb0d8](https://github.com/xdy/xdy-pf2e-workbench/commit/1ceb0d8ed9d8f72259274c04b2903ee0d67af05a))

## [2.16.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.16.2...v2.16.3) (2022-01-23)


### Bug Fixes

* More en.json cleanup thanks to [@rectulo](https://github.com/rectulo) ([9b3c8c1](https://github.com/xdy/xdy-pf2e-workbench/commit/9b3c8c10b4df213abd1f02da7d00f1bfb269a21f))

## [2.16.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.16.1...v2.16.2) (2022-01-23)


### Bug Fixes

* Corrects copypaste error in en.json, found by [@rectulo](https://github.com/rectulo) ([c388dff](https://github.com/xdy/xdy-pf2e-workbench/commit/c388dff22a057a7b0c5e6510d14c672ab34f23e8))

## [2.16.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.16.0...v2.16.1) (2022-01-23)


### Bug Fixes

* Localize the way autoRollDamageForStrike looks for a strike. Adds SETTINGS.autoRollDamageForStrike.strike and SETTINGS.autoRollDamageForStrike.result to en.json and sv.json. If translated this must be the exact same word used for PF2E.StrikeLabel and PF2E.ResultLabel. ([0c6ee63](https://github.com/xdy/xdy-pf2e-workbench/commit/0c6ee63e212bec868080901b20cebe78183c7c77))

# [2.16.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.15.0...v2.16.0) (2022-01-23)


### Bug Fixes

* Do not set a default key for Mystify to increase compatibility with other modules. Localize the hints for keybinds (excepting callHotbarPage). ([91cf955](https://github.com/xdy/xdy-pf2e-workbench/commit/91cf955c46369c29e007e71504825b560cc4b88b))


### Features

* Adds option to autoroll damage on a hit. On a critical success it rolls critical damage. Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the result in the chat. (E.g. for non-gm use either 'Owner' or 'All') ([dd9b70b](https://github.com/xdy/xdy-pf2e-workbench/commit/dd9b70bc10f2a45a81f2873249c975a211213296))

# [2.15.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.8...v2.15.0) (2022-01-16)


### Features

* Re-added option to hold down a modifier key to mystify a creature when dragging from sidebar. ([a8e5afc](https://github.com/xdy/xdy-pf2e-workbench/commit/a8e5afc655d826211c024b981c7ec95b16cbecdd))

## [2.14.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.7...v2.14.8) (2022-01-14)


### Bug Fixes

* Actually autocollapse chat messages... ([97aa416](https://github.com/xdy/xdy-pf2e-workbench/commit/97aa41640d7444388c4af4eb32785253b1118acb)), closes [#72](https://github.com/xdy/xdy-pf2e-workbench/issues/72)

## [2.14.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.6...v2.14.7) (2022-01-09)


### Bug Fixes

* Typo in localization ([23e8a84](https://github.com/xdy/xdy-pf2e-workbench/commit/23e8a84f4144678a3573e024b5b5aad2a157ece6))

## [2.14.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.5...v2.14.6) (2022-01-09)


### Bug Fixes

* Handle if there is no content when clicking to uncollapse ([bdfff90](https://github.com/xdy/xdy-pf2e-workbench/commit/bdfff9010eff8e0c0f98d1fb1b0c878e50856161))
* Only purge expired on the current actor. ([3805afc](https://github.com/xdy/xdy-pf2e-workbench/commit/3805afc57cfed9cca390c4d25c81794a1387b998))

## [2.14.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.4...v2.14.5) (2022-01-05)


### Bug Fixes

* Typo in localization ([bb7b99e](https://github.com/xdy/xdy-pf2e-workbench/commit/bb7b99eccf9415b0d314c2c2dc414d61dfa734ed))

## [2.14.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.3...v2.14.4) (2022-01-05)


### Bug Fixes

* Only the gm should purge expired effects. ([26eef5d](https://github.com/xdy/xdy-pf2e-workbench/commit/26eef5da7f26795030232fbace4916f03261d101))

## [2.14.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.2...v2.14.3) (2022-01-04)


### Bug Fixes

* One more attempt at fixing problem with automatic foundry admin update on release ([f7e5cfc](https://github.com/xdy/xdy-pf2e-workbench/commit/f7e5cfc80ec52e54084cc5fbf90cfcdf64a9ecf4))

## [2.14.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.1...v2.14.2) (2022-01-04)


### Bug Fixes

* Another attempt at fixing problem with automatic foundry admin update on release ([b5acbd2](https://github.com/xdy/xdy-pf2e-workbench/commit/b5acbd2b8f8f13a8b2085b6a9d8f6b2190f24202))

## [2.14.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.14.0...v2.14.1) (2022-01-04)


### Bug Fixes

* Cut and paste error in release process. ([36e940b](https://github.com/xdy/xdy-pf2e-workbench/commit/36e940b470c3e682dadc3af1ff319acbfcf3a9d9))

# [2.14.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.13.0...v2.14.0) (2022-01-04)


### Features

* Add optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells, feats, items, etc, might hit others as well). Click on title to expand again. ([6e7266e](https://github.com/xdy/xdy-pf2e-workbench/commit/6e7266e5fa6cb9508f1c712035f6a2c5f07b5c23)), closes [#60](https://github.com/xdy/xdy-pf2e-workbench/issues/60)

# [2.13.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.12.1...v2.13.0) (2022-01-03)


### Features

* Add optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is currently showing or not. ([da18e2d](https://github.com/xdy/xdy-pf2e-workbench/commit/da18e2d4cc6377952cb492488953aa5b439397aa))

## [2.12.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.12.0...v2.12.1) (2021-12-31)


### Bug Fixes

* Enable mystifying even on non-active scenes. Unfortunately I broke dragging to mystify earlier, so I have turned it off for now. ([5830580](https://github.com/xdy/xdy-pf2e-workbench/commit/5830580a85359a568dd7331f675d3512d49e2ac4))

# [2.12.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.11.3...v2.12.0) (2021-12-29)


### Features

* Add option to automatically move combatant that gets the Dying status outside of it's turn to just before the current combatant's turn. ([3619506](https://github.com/xdy/xdy-pf2e-workbench/commit/3619506408c4efc48e98c720116144dc241dc58d)), closes [#50](https://github.com/xdy/xdy-pf2e-workbench/issues/50)

## [2.11.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.11.2...v2.11.3) (2021-12-29)


### Bug Fixes

* Disable mystification on non-active scenes. ([38195cf](https://github.com/xdy/xdy-pf2e-workbench/commit/38195cf3aada42352d1ad1e66e3b3630c50e6ffa))

## [2.11.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.11.1...v2.11.2) (2021-12-28)


### Bug Fixes

* Hopefully fix race condition. ([3ffaedb](https://github.com/xdy/xdy-pf2e-workbench/commit/3ffaedba3f90e1356cf5ad5a065236d5524a6f2e))

## [2.11.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.11.0...v2.11.1) (2021-12-27)


### Bug Fixes

* Make auto-move initiative work for players and linked actors too. ([9b39978](https://github.com/xdy/xdy-pf2e-workbench/commit/9b399789c297e1982a87803f57eb8232ae6a27de))

# [2.11.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.10.0...v2.11.0) (2021-12-27)


### Features

* Add option to automatically move combatant that hits 0 hp outside of it's turn to just before the current combatant's turn. ([50c73ce](https://github.com/xdy/xdy-pf2e-workbench/commit/50c73ce797d8ad42ef1e4faaa4f2d5f14c91ef6b))

# [2.10.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.9.0...v2.10.0) (2021-12-27)


### Features

* Add option to automatically purge all expired effects each turn. ([eb373b8](https://github.com/xdy/xdy-pf2e-workbench/commit/eb373b80df84e2bc7b936f184fafcc69d1af4698))

# [2.9.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.8.0...v2.9.0) (2021-12-27)


### Bug Fixes

* Try to get the forge to update. ([bb0b248](https://github.com/xdy/xdy-pf2e-workbench/commit/bb0b248fa9aadd4b32ee3ef599b6806513bfcc9c))


### Features

* Add optional combat context menu to enable moving selected combatant before the current combatant. ([63e14d2](https://github.com/xdy/xdy-pf2e-workbench/commit/63e14d210e44d26c17c6f7eddbc08b7e84959293))

# [2.8.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.7.0...v2.8.0) (2021-12-27)


### Features

* Add optional keybind to move the selected combatant to before the current combatant in the initiative order (normally used when the current combatant has just killed the selected combatant). ([d194811](https://github.com/xdy/xdy-pf2e-workbench/commit/d194811fc50a4a7cbb1f37610996d726b5ad5cc4))
* Add optional keybind to move the selected combatant to before the current combatant in the initiative order (normally used when the current combatant has just killed the selected combatant). ([02db82a](https://github.com/xdy/xdy-pf2e-workbench/commit/02db82a8b77dde22d00c53ed914a79bd4ef28b3b))

# [2.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.6.0...v2.7.0) (2021-12-26)


### Bug Fixes

* Set the proper minimum foundry version. ([3851457](https://github.com/xdy/xdy-pf2e-workbench/commit/3851457caeca9f3f759089f5248e55edab4b8ef4))


### Features

* Adds optional setting to demystify all mystified tokens with the same base actor when one is demystified. ([54ffebe](https://github.com/xdy/xdy-pf2e-workbench/commit/54ffebedc41118f35d5b88fc68263405971f9495)), closes [#36](https://github.com/xdy/xdy-pf2e-workbench/issues/36)

# [2.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.5.2...v2.6.0) (2021-12-26)


### Features

* Make prefix and postfix rollable from a table (enter table name as prefix of postfix to enable rolling a random value) ([84e60a3](https://github.com/xdy/xdy-pf2e-workbench/commit/84e60a3d8bcb7512fac3b672ee7583c80af7acc5)), closes [#44](https://github.com/xdy/xdy-pf2e-workbench/issues/44)

## [2.5.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.5.1...v2.5.2) (2021-12-18)


### Bug Fixes

* Deduplicate the trimmed list of traits before translating. Update a few dependencies. ([149d245](https://github.com/xdy/xdy-pf2e-workbench/commit/149d24560d6d2ea84fb3d442f15fd3712bfd8b7b))

## [2.5.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.5.0...v2.5.1) (2021-12-17)


### Bug Fixes

* My keybinding changes did work with Foundry V9t3, so setting minimum version to that and removing support for previous keybinding api. ([222487b](https://github.com/xdy/xdy-pf2e-workbench/commit/222487bc4674a90bc06075432f3b1fafbce29aad))

# [2.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.4.2...v2.5.0) (2021-12-17)


### Features

* Keybindings might work with Foundry V9t3, which isn't out yet (breaking change announced tonight, but it's not out yet so can't really test.) ([3ff0bd6](https://github.com/xdy/xdy-pf2e-workbench/commit/3ff0bd63946ba361751513962e0cf63578f4495b))

## [2.4.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.4.1...v2.4.2) (2021-12-17)


### Bug Fixes

* Be *really* defensive in mangleChatMessage. ([13fee6d](https://github.com/xdy/xdy-pf2e-workbench/commit/13fee6dac8acf18d10a3169fed19ea7b8fe36ca2))

## [2.4.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.4.0...v2.4.1) (2021-12-17)


### Bug Fixes

* Show hint for registered keybinding (unlocalized unfortunately, seems it doesn't work on hints for keybindings?) ([74c79d7](https://github.com/xdy/xdy-pf2e-workbench/commit/74c79d771c67658f5622ef7d779b78706b72006c))

# [2.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.3.2...v2.4.0) (2021-12-17)


### Features

* Added keybind to mystify all selected creatures (M by default, can be changed). Made it possible to always/never mystify when dragging from sidebar. ([4cb6a30](https://github.com/xdy/xdy-pf2e-workbench/commit/4cb6a309702d6010d35607a22aa069372c0c607f)), closes [#4](https://github.com/xdy/xdy-pf2e-workbench/issues/4)

## [2.3.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.3.1...v2.3.2) (2021-12-14)


### Bug Fixes

* Change title to PF2e Workbench ([d2bb997](https://github.com/xdy/xdy-pf2e-workbench/commit/d2bb997aadf42c6f87b1389f4f158fa8e8945818))

## [2.3.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.3.0...v2.3.1) (2021-12-12)


### Bug Fixes

* Only update chat message if needed when using the experimental feature to use the mystified name in chat ([624eaa5](https://github.com/xdy/xdy-pf2e-workbench/commit/624eaa571fd10f39fda02cfbaa0e233e2b2b934d))

# [2.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.2.0...v2.3.0) (2021-12-12)


### Features

* Adds support for filtering out alignment traits (defaults to true). Fixes bug with localizing prefix and postfix. Fixes bug with keeping random number when mystifying/demystifying. ([80264f9](https://github.com/xdy/xdy-pf2e-workbench/commit/80264f9989fc9ec5d4d9b6627bddf01aeb669cfe)), closes [#19](https://github.com/xdy/xdy-pf2e-workbench/issues/19)

# [2.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.1.1...v2.2.0) (2021-12-12)


### Features

* Skip addding random number for unique npcs ([cd7d9d5](https://github.com/xdy/xdy-pf2e-workbench/commit/cd7d9d512e456e144f402f133f36bdcb32184d1d)), closes [#25](https://github.com/xdy/xdy-pf2e-workbench/issues/25)

## [2.1.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.1.0...v2.1.1) (2021-12-12)


### Bug Fixes

* Npc mystifier prefix should not be localized ([a29302c](https://github.com/xdy/xdy-pf2e-workbench/commit/a29302c651f02e2004ea39c1c929c7bc90a0f989))

# [2.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.0.0...v2.1.0) (2021-12-09)


### Features

* Added basic localization of the traits used to mystify npc names. Added the traits I think might possibly be useful for creatures from PF2e. Translated a few traits to Swedish so as to be able to test localization (will most likely never translate the full trait list as I have no real use for it.) Added a copy of the Open Game License. ([1da0bf8](https://github.com/xdy/xdy-pf2e-workbench/commit/1da0bf8a6beda5e4e61908d3e3b1279199208f94))

# [2.0.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.7.0...v2.0.0) (2021-12-09)


### Features

* Switches to support only Foundry V9 in anticipation of PF2e also doing the same switch. Localization of settings now works. Added Swedish localization. Updated some dependencies. ([b3cdee4](https://github.com/xdy/xdy-pf2e-workbench/commit/b3cdee4fc378ba731b5c5a33554050283f6dc3ac))


### BREAKING CHANGES

* Supports only Foundry V9 in anticipation of PF2e also doing the same switch.

# [1.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.6.2...v1.7.0) (2021-12-04)


### Features

* Add experimental feature that mostly succeeds at keeping the mystified token name out of chat messages (it depends on the creature ability chat text consistently using the *full* name of the creature, which is not always the case.) ([a727d8a](https://github.com/xdy/xdy-pf2e-workbench/commit/a727d8a510ecc2ace879c022cc74593109e0f073))

## [1.6.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.6.1...v1.6.2) (2021-11-29)


### Bug Fixes

* Show a cover image on the Forge. ([0fc2bef](https://github.com/xdy/xdy-pf2e-workbench/commit/0fc2bef6f706cf3a3c3e555dcf498b5452f1e4bd))

## [1.6.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.6.0...v1.6.1) (2021-11-29)


### Bug Fixes

* Once a creature has gotten a number at the end of it's name (whether through this module or in some other way), it'll keep it through mystification and demystification if the setting "Keep token number when mystifying/demystifying." is true, which it defaults to. ([b2d1ca0](https://github.com/xdy/xdy-pf2e-workbench/commit/b2d1ca05d02161601b0b3feb7024528697922d81)), closes [#14](https://github.com/xdy/xdy-pf2e-workbench/issues/14)

# [1.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.5.2...v1.6.0) (2021-11-28)


### Features

* Added option to keep the random number (if it exists) when demystifying an npc. ([717196d](https://github.com/xdy/xdy-pf2e-workbench/commit/717196de8e1ed1fc0fc70fc13f06b1945f20a0fa)), closes [#3](https://github.com/xdy/xdy-pf2e-workbench/issues/3)

## [1.5.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.5.1...v1.5.2) (2021-11-28)


### Bug Fixes

* Move mystify hud button to the bottom left. Bottom right was too likely to interfere with adding to combat. ([4969994](https://github.com/xdy/xdy-pf2e-workbench/commit/496999475a8b81ace6e35bec37c6dfd59704ac42))

## [1.5.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.5.0...v1.5.1) (2021-11-28)


### Bug Fixes

* Only GMs should be able to mystify/unmystify. ([8cea6da](https://github.com/xdy/xdy-pf2e-workbench/commit/8cea6da2c513a4990f736102fde48f93deb6b32e))

# [1.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.4.1...v1.5.0) (2021-11-27)


### Features

* Added button on token hud to Mystify/Unmystify a token. ([20fb7c2](https://github.com/xdy/xdy-pf2e-workbench/commit/20fb7c201d7cba9504cd50ed1bf13489d9162725))

## [1.4.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.4.0...v1.4.1) (2021-11-22)


### Bug Fixes

* Deduplicate traits, somehow the iconics return duplicate traits. e.g. Amiri became 'Unknown Human Human Humanoid Humanoid', which was just too silly to leave in. :) ([3b87510](https://github.com/xdy/xdy-pf2e-workbench/commit/3b87510018a012daf7349ce02f2566398324522a))

# [1.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.3.0...v1.4.0) (2021-11-22)


### Features

* Setting to replace rarities greater than Common with a word of your choice (default 'Unusual'). Setting to set a postfix that will be added to the generated npc name (e.g. 'Creature'). Cleans up code in preparation for adding other methods of generating mystified npc names. ([d40c8b8](https://github.com/xdy/xdy-pf2e-workbench/commit/d40c8b8cb5ec66f81cdb5e107adeecdb5b575c1e))

# [1.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.2.0...v1.3.0) (2021-11-21)


### Features

Adds support for:
* Filtering out creature type traits
* Filtering out creature family traits
* Filtering out 'other' traits
([4b8b2cc](https://github.com/xdy/xdy-pf2e-workbench/commit/4b8b2ccd502c13c7c2d642c07ae452c1c8232f00))

# [1.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.1.1...v1.2.0) (2021-11-21)


### Features

Adds support for:
* Filtering out elite and weak.
* Filtering out traits that have been added to a blacklist.
* Adding a prefix (defaults to 'Unknown') to the mystified name.
([b7cf761](https://github.com/xdy/xdy-pf2e-workbench/commit/b7cf76143183dd3d7ea102e863f35c8da00a9af2))

## [1.1.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.1.0...v1.1.1) (2021-11-21)


### Bug Fixes

* Spix felling. :) ([733cc3d](https://github.com/xdy/xdy-pf2e-workbench/commit/733cc3d114bc02529b8921bc63ee3a2ef11caa62))

# [1.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.0.1...v1.1.0) (2021-11-21)


### Features

* Adds support for changing the key used to mystify (Alt is default, Ctrl can be selected) ([ed3ef66](https://github.com/xdy/xdy-pf2e-workbench/commit/ed3ef668180786c5f3e358a31a91bab5bed438d4))

## [1.0.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v1.0.0...v1.0.1) (2021-11-21)


### Bug Fixes

* Fix module name and description ([cd33bd1](https://github.com/xdy/xdy-pf2e-workbench/commit/cd33bd1fd799f6ccd243080a3c04dbd38bf5f0bd))

# 1.0.0 (2021-11-21)


### Features

* Seems to work. ([9e51f85](https://github.com/xdy/xdy-pf2e-workbench/commit/9e51f85dfb5e1544ebcff7b86b383ab149b9f46c))

# 1.0.0 (2021-08-09)


### Bug Fixes

* Fixed various problems with module.json and package.json ([c2738fc](https://github.com/xdy/xdy-pf2e-workbench/commit/c2738fc8b9c19ebaaf8adbdc0e1cb46e0484d8f3))
* More module.json and .release.sh fixes ([2447c0a](https://github.com/xdy/xdy-pf2e-workbench/commit/2447c0a6488efbdb664dce64a3ec9a338fc19e97))
* Release script should be executable... ([727623a](https://github.com/xdy/xdy-pf2e-workbench/commit/727623adcf5562c0829f1e044c5849425d85e118))
