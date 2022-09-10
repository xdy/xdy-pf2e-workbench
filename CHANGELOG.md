## [4.1.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.1...v4.1.2) (2022-09-10)


### Bug Fixes

* Fix heropointhandler not appearing. Better fix for npc name mystification. Hide subsettings for hero point handler if not enabled. ([4779eca](https://github.com/xdy/xdy-pf2e-workbench/commit/4779eca9f219d0dd9bfcb2c5fe18e32df0a41ae0))

## [4.1.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.0...v4.1.1) (2022-09-10)


### Bug Fixes

* Make trait-based npc mystification a bit more robust. ([f59a341](https://github.com/xdy/xdy-pf2e-workbench/commit/f59a3418fa989c658ecebd9cb2098bdf29033424)), closes [#416](https://github.com/xdy/xdy-pf2e-workbench/issues/416)

# [4.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.0.4...v4.1.0) (2022-09-09)


### Features

* Adds Portuguese (Brazil) translation, courtesy of @Clemente ([3fd9eb6](https://github.com/xdy/xdy-pf2e-workbench/commit/3fd9eb65336cf5e51d563d884bdbc433688003e4)), closes [#408](https://github.com/xdy/xdy-pf2e-workbench/issues/408)

## [4.0.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.0.3...v4.0.4) (2022-09-06)


### Bug Fixes

* Double skill rolls removed. ([21f4e4d](https://github.com/xdy/xdy-pf2e-workbench/commit/21f4e4d8b8ba838e5943fc258fffaf6d477b475d))

## [4.0.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.0.2...v4.0.3) (2022-09-06)


### Bug Fixes

* add classes to fix skill action styling ([6a0fd6f](https://github.com/xdy/xdy-pf2e-workbench/commit/6a0fd6f6b2e8bd7eb50836cb8fcb346a140ee049))

## [4.0.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.0.1...v4.0.2) (2022-09-06)


### Bug Fixes

* Try ghost's publish again ([e668456](https://github.com/xdy/xdy-pf2e-workbench/commit/e668456eab6f88378f6c00193021772dfda057f6))

## [4.0.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.0.0...v4.0.1) (2022-09-06)


### Bug Fixes

* Updates translation of French (thanks Rectulo and Bolt!). Fixes a few warnings. ([09ff410](https://github.com/xdy/xdy-pf2e-workbench/commit/09ff4103e957a5e55b05599cfa9b1823efc7f585))

# [4.0.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.44.3...v4.0.0) (2022-09-06)


### Features

* The PF2e Workbench now requires PF2e version 4.0.0 or later, and Foundry v10 or later. ([530c08d](https://github.com/xdy/xdy-pf2e-workbench/commit/530c08d3d70dfa3ed5b21b2866d9f97dee7dd09b))


### BREAKING CHANGES

* The PF2e Workbench now requires PF2e version 4.0.0 or later, and Foundry v10 or later.

Additionally, these changes have been made:

* The deprecated World Special Effects settings and features have been removed, instead use the equivalent functionality in  https://foundryvtt.com/packages/pf2e-jb2a-macros
* Added all functionality from PF2e Skill Sheet Actions (https://github.com/jamespdaily/pf2e-sheet-skill-actions) with permission of the original author. See https://discord.com/channels/880968862240239708/880969174661353484/1013074604727730307 ("Flash Granola: @xdy it would be an honor, honestly I learned a lot about module coding from you and your GitHub. I'll allow it to be relicensed and lovingly devoured by workbench")
Also fixed a couple of bugs/added features, see https://github.com/jamespdaily/pf2e-sheet-skill-actions/issues/61, https://github.com/jamespdaily/pf2e-sheet-skill-actions/issues/59. https://github.com/jamespdaily/pf2e-sheet-skill-actions/issues/55 Also added a bunch of skill actions (mostly feat-based). (These are still shown in the regular Actions section.) Add new setting to select icon type, courtesy of @thomascookandroid
* Added https://fontawesome.com/icons/eye-slash?s=solid to collapsed chat messages
* Always show mystified items on characters as default color
* Npcscaler shouldn't scale physical items or flat checks.
* Added a bunch of potentially useful macro functions (basically, made internal functions available pretty much as-is.)
```
game.PF2eWorkbench.resetHeroPoints // game.PF2EWorkbench.resetHeroPoints(1)
game.PF2eWorkbench.addHeroPoints // game.PF2EWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
game.PF2eWorkbench.scaleNPCToLevelFromActorId scaleNPCToLevelFromActorId // await game.PF2eWorkbench.scaleNPCToLevelFromActorId(_token.actor.id, 24);
game.PF2eWorkbench.moveSelectedAheadOfCurrent moveSelectedAheadOfCurrent // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
game.PF2eWorkbench.doMystificationFromTokenId // await game.PF2eWorkbench.doMystificationFromTokenId(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromTokenId(_token.id, false)
game.PF2eWorkbench.generateNameFromTraitsForToken // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
```
* Make breath weapon reminder work for more creatures with recharging abilities (e.g. Scalathrax).

## [3.44.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.44.2...v3.44.3) (2022-08-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d0ea916](https://github.com/xdy/xdy-pf2e-workbench/commit/d0ea9161745975abe400a45e6ee5105c7808e859))

## [3.44.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.44.1...v3.44.2) (2022-08-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a6fd8bd](https://github.com/xdy/xdy-pf2e-workbench/commit/a6fd8bd99ffdfe8fa229390998771de7f4ed3f90))

## [3.44.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.44.0...v3.44.1) (2022-08-03)


### Bug Fixes

* Mark the Special Effects/Automated Animation functionality as deprecated. It's now part of the module```[pf2e-jb2a-macros](https://github.com/MrVauxs/pf2e-jb2a-macros)``` ([85f6a9d](https://github.com/xdy/xdy-pf2e-workbench/commit/85f6a9de1067de85963b58452d04bada429b9d5d))

# [3.44.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.6...v3.44.0) (2022-08-03)


### Features

* Added the option to show the cast spell's traits in the public message when casting spells privately. ([61d446f](https://github.com/xdy/xdy-pf2e-workbench/commit/61d446f89df341dfd8d858320cd1644941f9fb73))

## [3.43.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.5...v3.43.6) (2022-08-03)


### Bug Fixes

* Improves integration with the PF2 Flat Check module. ([8b56868](https://github.com/xdy/xdy-pf2e-workbench/commit/8b5686857fca27100b74e1d1c4b3eefaf498eaaa))

## [3.43.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.4...v3.43.5) (2022-08-03)


### Bug Fixes

* Fixed problems with integration with the pf2-flat-check module. ([d169d44](https://github.com/xdy/xdy-pf2e-workbench/commit/d169d44df7917767d8c24ea8f55a7fa23abc70c8)), closes [#358](https://github.com/xdy/xdy-pf2e-workbench/issues/358)

## [3.43.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.3...v3.43.4) (2022-08-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d23c112](https://github.com/xdy/xdy-pf2e-workbench/commit/d23c112ea5b72d7326831d51cddd700ba4dce01f))

## [3.43.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.2...v3.43.3) (2022-08-02)


### Bug Fixes

* If pf2-flat-check is installed and auto roll damage is enabled, wait a bit longer for flat check message result. ([5968a8e](https://github.com/xdy/xdy-pf2e-workbench/commit/5968a8e098dff0772b46b446fcae106174db7d0a))

## [3.43.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.1...v3.43.2) (2022-08-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([c89e066](https://github.com/xdy/xdy-pf2e-workbench/commit/c89e06644b5848378ffd4ae29f89ae90f08c6c89))

## [3.43.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.43.0...v3.43.1) (2022-08-01)


### Bug Fixes

* Keeping up with the Macro Faeries. ([68877b9](https://github.com/xdy/xdy-pf2e-workbench/commit/68877b98cc76d38ff416ee5072ddefa35c66d1fc))

# [3.43.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.42.2...v3.43.0) (2022-08-01)


### Features

* If the option to autoroll damage on a hit is enabled, the module [PF2e Flat Check](https://foundryvtt.com/packages/pf2-flat-check) is active, and a flat check fails, the Workbench does not autoroll damage. ([66866af](https://github.com/xdy/xdy-pf2e-workbench/commit/66866afbc2f9e83ea5a581378f3ca3b8bb3c17c7))

## [3.42.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.42.1...v3.42.2) (2022-08-01)


### Bug Fixes

* Keeping up with the Macro Faeries. ([fd4b3d0](https://github.com/xdy/xdy-pf2e-workbench/commit/fd4b3d0e5f0159a3645d5ffc3b660013a50b0752))

## [3.42.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.42.0...v3.42.1) (2022-08-01)


### Bug Fixes

* Remove the module-specific "Spell Effect: Protective Ward" as it's not needed with the latest version of the pf2e system. ([bccf0d3](https://github.com/xdy/xdy-pf2e-workbench/commit/bccf0d3ef0ecb397cb0102de1cb453fd37fa94d3))

# [3.42.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.41.4...v3.42.0) (2022-08-01)


### Features

* Added effects for Dread Marshal Stance and Inspiring Marshal Stance to the xdy-pf2e-workbench-items compendium, courtesy of [@stwlam](https://github.com/stwlam) ([6913876](https://github.com/xdy/xdy-pf2e-workbench/commit/691387654b9498adfe9bf9c234effebe1b1d366b))

## [3.41.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.41.3...v3.41.4) (2022-08-01)


### Bug Fixes

* Autorolling damage for spells now supports heightened spells again. ([ba8f25e](https://github.com/xdy/xdy-pf2e-workbench/commit/ba8f25eea31dec57ecb1947b21a9c6941620468e))
* Autorolling damage for spells now supports heightened spells again. ([05e29b6](https://github.com/xdy/xdy-pf2e-workbench/commit/05e29b6e0457d88596b16b33e4bbe36998fcf2f1))

## [3.41.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.41.2...v3.41.3) (2022-08-01)


### Bug Fixes

* Autorolling damage for spells now supports heightened spells again. ([b2cebaf](https://github.com/xdy/xdy-pf2e-workbench/commit/b2cebafe49716f1d7329d5059803aaf0789ba4b8))

## [3.41.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.41.1...v3.41.2) (2022-08-01)


### Bug Fixes

* Keeping up with the Macro Faeries. ([08d911c](https://github.com/xdy/xdy-pf2e-workbench/commit/08d911c0f25475b635981ad3c313cc578b7cfdd2))

## [3.41.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.41.0...v3.41.1) (2022-07-31)


### Bug Fixes

* Make altered max heropoints visible to players. ([a5f13a8](https://github.com/xdy/xdy-pf2e-workbench/commit/a5f13a81085cc54bdb10e443c0440bc70cf3596d)), closes [#354](https://github.com/xdy/xdy-pf2e-workbench/issues/354)

# [3.41.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.40.3...v3.41.0) (2022-07-31)


### Features

* Moved several client automation settings (giveUnconsciousIfDyingRemovedAt0HP, autoRemoveUnconsciousAtGreaterThanZeroHP, giveWoundedWhenDyingRemoved, autoGainDyingAtZeroHP,autoRemoveDyingAtGreaterThanZeroHP) to world settings instead as part of hopefully fixing the various condition automation bugs. ([bc28dca](https://github.com/xdy/xdy-pf2e-workbench/commit/bc28dcad8b60199651712e51c6d9ad05e0c9d88a))

## [3.40.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.40.2...v3.40.3) (2022-07-29)


### Bug Fixes

* 'Fix' broken css by deleting lines until it stops being broken. Best way to fix css. :) ([0f827c7](https://github.com/xdy/xdy-pf2e-workbench/commit/0f827c7ed92f837da819a62cbddbb143b39c5309))
* Set Bane to affect enemies (support for enemies is not yet part of foundry pf2e system, but it's coming) ([c3b54f8](https://github.com/xdy/xdy-pf2e-workbench/commit/c3b54f8cdd4fde61eca8b06d40f9780ac417a8eb))

## [3.40.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.40.1...v3.40.2) (2022-07-28)


### Bug Fixes

* Had the wrong effect for Aura: Bless. ([8f33d58](https://github.com/xdy/xdy-pf2e-workbench/commit/8f33d58682f6ff7f62cb7043f8b7238e8e491c37))

## [3.40.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.40.0...v3.40.1) (2022-07-28)


### Bug Fixes

* Had the wrong radius for Bless and Bane. ([e3c76c0](https://github.com/xdy/xdy-pf2e-workbench/commit/e3c76c0374a8bcb1df2fd014da8aeb11f30ae2f9))

# [3.40.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.39.0...v3.40.0) (2022-07-28)


### Features

* Added 'aura effects' for Bane, Bless, Inspire Courage, Inspire Defense. ([b7d95b1](https://github.com/xdy/xdy-pf2e-workbench/commit/b7d95b167bac09b04cd51e809e1535a0bc391158))

# [3.39.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.38.2...v3.39.0) (2022-07-28)


### Features

* When using the npc-roller, holding control when clicking any of the buttons now results in a private roll. ([d5bab32](https://github.com/xdy/xdy-pf2e-workbench/commit/d5bab32d55aa7e4f61623fb41690c9f1f0d7b22a))

## [3.38.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.38.1...v3.38.2) (2022-07-28)


### Bug Fixes

* Make showing item rarity color on player character sheets work again. ([5a2ea55](https://github.com/xdy/xdy-pf2e-workbench/commit/5a2ea553fa22e4924d216c36b4923c0d5655d7cd))

## [3.38.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.38.0...v3.38.1) (2022-07-28)


### Bug Fixes

* Keeping up with the Macro Faeries. ([40d2ab9](https://github.com/xdy/xdy-pf2e-workbench/commit/40d2ab9722e1432ae9afde1fff3709aebb01391d))

# [3.38.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.37.1...v3.38.0) (2022-07-27)


### Features

* Add option to the setting 'automatically expand damage' to only expand the very latest damage message. ([df1c1c8](https://github.com/xdy/xdy-pf2e-workbench/commit/df1c1c8276c9e13d348512eeee051a8239d677f0))

## [3.37.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.37.0...v3.37.1) (2022-07-27)


### Bug Fixes

* Fixes for null whisper recipient and wrong speaker for the public message when casting spells privately. ([6a24735](https://github.com/xdy/xdy-pf2e-workbench/commit/6a24735675455d53b1ecd57396b5ecf196724cdc))

# [3.37.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.36.0...v3.37.0) (2022-07-25)


### Features

* If the pf2e system's metagame setting 'Tokens determine NPC name visibility' is set, casting a private spell *always* hides the caster name. ([0db8f78](https://github.com/xdy/xdy-pf2e-workbench/commit/0db8f7831ceb873c714a985eceef11f4f1a2fedb))
* If the pf2e system's metagame setting 'Tokens determine NPC name visibility' is set, casting a private spell *always* hides the caster name. ([3fc2b63](https://github.com/xdy/xdy-pf2e-workbench/commit/3fc2b63c036564bfe67cb32c2f4f35a22d728581))

# [3.36.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.35.1...v3.36.0) (2022-07-25)


### Bug Fixes

* Changed Workbench Flat Check Notes to a passive action (makes it show up in the Free Action section at the very end of the Actions tab.) ([2a5f3e8](https://github.com/xdy/xdy-pf2e-workbench/commit/2a5f3e84001c7d03b8540d8288677edfd0fc812a))


### Features

* Optional subsetting to 'Reminder if attack with token that cannot attack' that makes it give no warning for an attacking Eidolon that is dead/has no hp. (Eidolons normally have no hit points.) ([315cfee](https://github.com/xdy/xdy-pf2e-workbench/commit/315cfee26df791d4cf5f9aec1c72a897dcc18a48))

## [3.35.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.35.0...v3.35.1) (2022-07-25)


### Bug Fixes

* Wrong version for 'previous migration'. If you installed 3.35.0 pcs and npcs with 'Workbench Flat Check Notes' may have lost them and you will have to re-add them manually. Sorry! ([0cffa4d](https://github.com/xdy/xdy-pf2e-workbench/commit/0cffa4d4cb2e32085cc9522ab39cc2fa273fd349))

# [3.35.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.34.0...v3.35.0) (2022-07-25)


### Features

* Changes the Workbench Flat Check Notes to an Action rather than Equipment. Automatically migrates to the newest version of Workbench Flat Check Notes for all pcs and npcs that have older versions. ([2fc7c84](https://github.com/xdy/xdy-pf2e-workbench/commit/2fc7c84bf1c24f92c09de2ce6d2668ffbe125a9b))

# [3.34.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.33.0...v3.34.0) (2022-07-23)


### Features

* Experimental setting for GMs that *always* set the damage for their players, adds a setting so that automating of  wounded/dying/unconscious works for the **GM** only (rather than the default which is for the **player** only.) ([939bc05](https://github.com/xdy/xdy-pf2e-workbench/commit/939bc05ff5ff4f8a372e074fff48c8d0cc5b03fe))

# [3.33.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.32.0...v3.33.0) (2022-07-23)


### Features

* Improved automation reliability. At a cost. Specifically: ([2c889a5](https://github.com/xdy/xdy-pf2e-workbench/commit/2c889a5ccb75e6b0e77b80498d68efc00bc047ec))

# [3.32.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.31.2...v3.32.0) (2022-07-22)


### Features

* Replaced the 'Workbench Flat Check Notes' "boon" with the 'Workbench Flat Check Notes' "Equipment" which also works for npcs. To use this, manually remove the old boon where it is used, add this equipment instead. ([0568a51](https://github.com/xdy/xdy-pf2e-workbench/commit/0568a51f1417f3d6660bf383bd130c983da96283))
* Replaced the 'Workbench Flat Check Notes' "boon" with the 'Workbench Flat Check Notes' "Equipment" which also works for npcs. To use this, manually remove the old boon where it is used, add this equipment instead. ([a9ed955](https://github.com/xdy/xdy-pf2e-workbench/commit/a9ed9559dfc8dcb7d17a6aa876c2e54893e5512f))

## [3.31.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.31.1...v3.31.2) (2022-07-22)


### Bug Fixes

* Fixed option to have combatant reaching zero hp move to just ahead of the current combatant in the initiative list. ([e6cfe0b](https://github.com/xdy/xdy-pf2e-workbench/commit/e6cfe0baf8218e3efbd5d68d5db2c79d08dc9147))

## [3.31.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.31.0...v3.31.1) (2022-07-21)


### Bug Fixes

* When casting a private spell with a public message, consider rarity for Recall Knowledge DC, and show the tradition of the spell that is cast. ([8e1fed6](https://github.com/xdy/xdy-pf2e-workbench/commit/8e1fed6f7a33c8d83dfdc5f1aab107a8faeeda97))

# [3.31.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.30.2...v3.31.0) (2022-07-20)


### Features

* Expand the feature that allows casting spells privately so that it outputs the save (if any) of the private spell on the optional public message. And, if auto-rolling damage for a non-attack spell, roll the damage privately if the spell was cast privately as the damage message includes the spell's name. ([0f830bb](https://github.com/xdy/xdy-pf2e-workbench/commit/0f830bb1b2f1c29fede54a2f4398f99f84651028))

## [3.30.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.30.1...v3.30.2) (2022-07-20)


### Bug Fixes

* Typo in skill for occult tradition when showing RK for private spell casting. ([b891ff1](https://github.com/xdy/xdy-pf2e-workbench/commit/b891ff1f393856156e797c9cd6b99cdf64a00684))

## [3.30.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.30.0...v3.30.1) (2022-07-19)


### Bug Fixes

* Elite/Weak mystification setting was reversed. ([3bbc128](https://github.com/xdy/xdy-pf2e-workbench/commit/3bbc1287c941bc46a1ce3d69f04cfb8a59c11ce1))

# [3.30.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.29.1...v3.30.0) (2022-07-19)


### Features

* Adds option to hold CTRL while casting a spell to cast it as a whispered chat message. Separate option to output a separate public chat message with a Recall Knowledge button to recognize it (if this is enabled you can hold CTRL+SHIFT to skip this message). ([d03cacd](https://github.com/xdy/xdy-pf2e-workbench/commit/d03cacd6959f3acf89e5e4bea37aefecf12fdc2b)), closes [#342](https://github.com/xdy/xdy-pf2e-workbench/issues/342)
* Adds option to hold CTRL while casting a spell to cast it as a whispered chat message. Separate option to output a separate public chat message with a Recall Knowledge button to recognize it (if this is enabled you can hold CTRL+SHIFT to skip this message). ([fd9e86f](https://github.com/xdy/xdy-pf2e-workbench/commit/fd9e86f4d54c43b71670fe29ea0d561f5955eea7)), closes [#342](https://github.com/xdy/xdy-pf2e-workbench/issues/342)

## [3.29.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.29.0...v3.29.1) (2022-07-18)


### Bug Fixes

* Fix some combinations of settings not working. Moved sfx above automation settings. ([4013b82](https://github.com/xdy/xdy-pf2e-workbench/commit/4013b82638c10cd6169b02354870aa5e562ff5bc))
* Fix some combinations of settings not working. Moved sfx above automation settings. ([03f299a](https://github.com/xdy/xdy-pf2e-workbench/commit/03f299add76e092a0b3041eacce0f5b19bfe0936))

# [3.29.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.28.0...v3.29.0) (2022-07-18)


### Features

* Move automated animation settings to a submenu called World Special Effect Settings. For new worlds, sets default path to the jb2a animations based on whether the free jb2a module or the patreon one is installed. Fixes to hiding/showing subsettings. ([3b368b2](https://github.com/xdy/xdy-pf2e-workbench/commit/3b368b2ef5b90be1174a1a6a03595f44478e1362))
* Move automated animation settings to a submenu called World Special Effect Settings. For new worlds, sets default path to the jb2a animations based on whether the free jb2a module or the patreon one is installed. Fixes to hiding/showing subsettings. ([8658dc8](https://github.com/xdy/xdy-pf2e-workbench/commit/8658dc81c8c28989ee6fb14048e042fda90c3748))

# [3.28.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.27.2...v3.28.0) (2022-07-16)


### Features

* Make hero point handler timeout configurable (defaults to 60). ([dcf9f18](https://github.com/xdy/xdy-pf2e-workbench/commit/dcf9f18c6daedd638c8bb6e6e154316939a5d8ff)), closes [#340](https://github.com/xdy/xdy-pf2e-workbench/issues/340)

## [3.27.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.27.1...v3.27.2) (2022-07-16)


### Bug Fixes

* Respect setting for whether action reminder message should be sent after stunned has been reduced. ([4c171dd](https://github.com/xdy/xdy-pf2e-workbench/commit/4c171ddebca4699b4c9f9f3ff4eb9266d1c22b42))

## [3.27.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.27.0...v3.27.1) (2022-07-16)


### Bug Fixes

* Clean up default value for the mystification setting to 'replace rarities greater than common with' ([685b29d](https://github.com/xdy/xdy-pf2e-workbench/commit/685b29d474eada7239f8aabb71853f2764f869ea))

# [3.27.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.26.0...v3.27.0) (2022-07-16)


### Features

* Assorted mystification changes ([94d7a4b](https://github.com/xdy/xdy-pf2e-workbench/commit/94d7a4bfbbcefcc938e8f75bf1accdd403fcb4ef))

# [3.26.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.25.1...v3.26.0) (2022-07-15)


### Features

* Animal companions and eidolons (using the PF2e Companion Compendium module) owned by a logged-in player are now handled by the options to automatically reduce frightened, cannot attack reminders notifications and breath weapon reminder effects. Also added a brief note to the IWR reminder that the more complex IWR types such as All, Mental, Physical, etc, are not yet handled. ([caf7e1c](https://github.com/xdy/xdy-pf2e-workbench/commit/caf7e1c6bcbaaef7af47637db18ccd300ac7435b))

## [3.25.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.25.0...v3.25.1) (2022-07-13)


### Bug Fixes

* Size is now only used for mystification name if that option is explicitly chosen. (I.e. it is not considered an 'other trait') ([1b6a4f8](https://github.com/xdy/xdy-pf2e-workbench/commit/1b6a4f88bf78710cdcfb3fff428199efa7328952))

# [3.25.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.24.3...v3.25.0) (2022-07-13)


### Features

* Add npc quick roller ([121180e](https://github.com/xdy/xdy-pf2e-workbench/commit/121180efb6b8f7043e0b9927b10bf8ffa93e8ce6))

## [3.24.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.24.2...v3.24.3) (2022-07-12)


### Bug Fixes

* "Null" should no longer appear in mystified names. As a consequence, sorry, you can no longer use the string null as a prefix or postfix. :) ([96ac06e](https://github.com/xdy/xdy-pf2e-workbench/commit/96ac06e1e99ed7b7f6b2823c0f2f67dc4d143bd0))

## [3.24.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.24.1...v3.24.2) (2022-07-12)


### Bug Fixes

* Should now be possible to set Mystification prefix and postfix again. ([b58b0f4](https://github.com/xdy/xdy-pf2e-workbench/commit/b58b0f4b690fd74a68bac47d5d26e3891dea85e9))

## [3.24.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.24.0...v3.24.1) (2022-07-12)


### Bug Fixes

* Limited NPC Recall Knowledge Button, NPC Scaler and Creature Builder to GMs only. ([614882e](https://github.com/xdy/xdy-pf2e-workbench/commit/614882e6df56c1a724bcf9a7117dd37036b2dd7c)), closes [#329](https://github.com/xdy/xdy-pf2e-workbench/issues/329)

# [3.24.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.23.0...v3.24.0) (2022-07-11)


### Features

* Move Quality of Life, Reminder and Automation settings to separate submenus. (Automation is split in two parts, World Automation Settings and Client Automation Settings). ([2dafef5](https://github.com/xdy/xdy-pf2e-workbench/commit/2dafef5276a159b85f324b3faf35d1008b22fccc))

# [3.23.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.22.1...v3.23.0) (2022-07-10)


### Features

* **settings:** hide npc mystification settings into a button ([d06380e](https://github.com/xdy/xdy-pf2e-workbench/commit/d06380ecf18dd52c7a641daa7b17b19a6c4f3b19))
* **settings:** hide npc mystification settings into a button ([f5bdaf7](https://github.com/xdy/xdy-pf2e-workbench/commit/f5bdaf741fcce2ad7714b8bbba4b0738f07eed54))

## [3.22.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.22.0...v3.22.1) (2022-07-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f5c9a27](https://github.com/xdy/xdy-pf2e-workbench/commit/f5c9a27ca0059253fdb4410eb5a3d71c3debb58a))

# [3.22.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.21.1...v3.22.0) (2022-07-09)


### Features

* Adds two options for automating the unconscious condition. One to remove Unconscious if healed to above 0 hp. One to add Unconscious if Dying is removed when at 0 hp. ([8dbaf77](https://github.com/xdy/xdy-pf2e-workbench/commit/8dbaf77ca0bc4642f014481289e0380c8b8a51c9))
* Adds two options for automating the unconscious condition. One to remove Unconscious if healed to above 0 hp. One to add Unconscious if Dying is removed when at 0 hp. ([887f0e4](https://github.com/xdy/xdy-pf2e-workbench/commit/887f0e4e1b7d280cf4953d86ad2bf542eea38e48))

## [3.21.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.21.0...v3.21.1) (2022-07-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([347736d](https://github.com/xdy/xdy-pf2e-workbench/commit/347736dfe1b897843c268116e322177c0cba70a7))

# [3.21.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.20.0...v3.21.0) (2022-07-08)


### Features

* Option to enable a Creature Builder button on npc sheets allowing the gm to create creatures from scratch, using the recommended values from the Game Mastery Guide. (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ!) ([816af73](https://github.com/xdy/xdy-pf2e-workbench/commit/816af731d92c828b364abf8b7fab1df3c84bcbcc))

# [3.20.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.19.0...v3.20.0) (2022-07-07)


### Bug Fixes

* Make AC, perception and saves scale if using the npc scaler feature. ([343ad83](https://github.com/xdy/xdy-pf2e-workbench/commit/343ad831afef350a1f385568a3876d9b2659985f))


### Features

* Support @Check in the NPC Scaler feature. ([a38ab82](https://github.com/xdy/xdy-pf2e-workbench/commit/a38ab82ef96c7774667adde35e500bd8f5345fb9))

# [3.19.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.18.0...v3.19.0) (2022-07-06)


### Features

* Option to change the max number of heropoints a character can have (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ!) ([af71dff](https://github.com/xdy/xdy-pf2e-workbench/commit/af71dff5313f34eb632642312385d1165a95dbba)), closes [#318](https://github.com/xdy/xdy-pf2e-workbench/issues/318)

# [3.18.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.17.0...v3.18.0) (2022-07-06)


### Features

* Fix (ok, stupid fix) for race condition when adding encumbrance due to bulk. ([2a7750a](https://github.com/xdy/xdy-pf2e-workbench/commit/2a7750ae976101b266cab4ee652f308b58ec7900))

# [3.17.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.16.0...v3.17.0) (2022-07-05)


### Features

* Option to apply Encumbered status automatically based on current bulk when bulk changes. (Note: Uses the system code which considers 5 bulk + 9 light to not exceed 5 bulk.) ([f960f5b](https://github.com/xdy/xdy-pf2e-workbench/commit/f960f5bb62a73f8a1777f24035dab19d66642cff)), closes [#305](https://github.com/xdy/xdy-pf2e-workbench/issues/305)

# [3.16.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.15.0...v3.16.0) (2022-07-01)


### Features

* Familiars count as characters for dying+wounded+frightened increase/decrease automation. ([db7108b](https://github.com/xdy/xdy-pf2e-workbench/commit/db7108b1880a8bf40c7d7e1662c2f43497570223))

# [3.15.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.14.0...v3.15.0) (2022-06-30)


### Features

* Option to output a reminder when a token that should not be able to attack due to being dead/defeated/having 0 hp/being unconscious but still attacks. ([f14a4d2](https://github.com/xdy/xdy-pf2e-workbench/commit/f14a4d2e2288648f192e36a7568fb786a832ba8d))

# [3.14.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.13.0...v3.14.0) (2022-06-30)


### Features

* Option to use the actor size for mystified names. ([8049ec8](https://github.com/xdy/xdy-pf2e-workbench/commit/8049ec8b399988debf124ccc370769ad3479f637))

# [3.13.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.12.0...v3.13.0) (2022-06-30)


### Features

* Add option to automatically remove Dying on going above zero hp, for all, or only for characters. ([9bf3550](https://github.com/xdy/xdy-pf2e-workbench/commit/9bf3550f0db128d8439f01148a706ef8f4b56a62))

# [3.12.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.11.3...v3.12.0) (2022-06-30)


### Features

* Option to add an npc scaler feature when right clicking on an npc (This feature has been taken over from the delisted https://github.com/Djphoenix719/FVTT-PF2EToolbox module. Thanks DJ! At some point Avery will have the time to add it to the system, until then I'll maintain it.) ([db6a5ca](https://github.com/xdy/xdy-pf2e-workbench/commit/db6a5ca3d0dd67bf5f771ae8c4c2c1da88be84f1))

## [3.11.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.11.2...v3.11.3) (2022-06-22)


### Bug Fixes

* Auto applying persistent damage from the pf2e Persistent Damage module works again. ([09dc064](https://github.com/xdy/xdy-pf2e-workbench/commit/09dc0647e6ab9ce3ac86cca05306d560c4362325))
* Auto applying persistent damage from the pf2e Persistent Damage module works again. ([5698342](https://github.com/xdy/xdy-pf2e-workbench/commit/569834275ae42237a2405e4ac3795e46a6f90803))

## [3.11.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.11.1...v3.11.2) (2022-06-22)


### Bug Fixes

* Autorolling damage now works for Unarmed Attack. Also, option to add Recall Knowledge button to npcs no longer prints an error in the console when no skill matches (e.g. for newly created npcs.) ([487eb6f](https://github.com/xdy/xdy-pf2e-workbench/commit/487eb6f0e59b6cf4d482093aacf98a777f5aa59a))

## [3.11.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.11.0...v3.11.1) (2022-06-21)


### Bug Fixes

* Autoroll damage now works for companions and eidolons. ([aae99c9](https://github.com/xdy/xdy-pf2e-workbench/commit/aae99c9718055f61867e6ad415debb1809bdaafd))

# [3.11.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.10.3...v3.11.0) (2022-06-21)


### Features

* IWR reminder message now works for spell damage rolls. ([7921bc8](https://github.com/xdy/xdy-pf2e-workbench/commit/7921bc84a0d0c43310304bc3593aef0bc1270670))

## [3.10.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.10.2...v3.10.3) (2022-06-20)


### Bug Fixes

* The autorolldamage option no longer tries (and fails) to autoroll damage for actions... ([1749ca6](https://github.com/xdy/xdy-pf2e-workbench/commit/1749ca6b137d4ea77310499db68aaeb143cc3478))

## [3.10.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.10.1...v3.10.2) (2022-06-19)


### Bug Fixes

* Limit IWR to GM. For reals this time. ([d179f37](https://github.com/xdy/xdy-pf2e-workbench/commit/d179f37c23a84fb1eebae40bb488065e1b3ab7a1))

## [3.10.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.10.0...v3.10.1) (2022-06-19)


### Bug Fixes

* Limit IWR to GM for now. ([bc97cf9](https://github.com/xdy/xdy-pf2e-workbench/commit/bc97cf9e0d0cd11235e44ed414e9bf5e8e6113be))

# [3.10.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.5...v3.10.0) (2022-06-19)


### Features

* Adds option to create an IWR (Immunity, Weakness, Resistance) reminder message after a damage roll against a target with an IWR that matches damage types of the attacking weapon. ([610b3b4](https://github.com/xdy/xdy-pf2e-workbench/commit/610b3b4aaf2a50ec7d5a37253a5026f185f1ee85))
* Adds option to create an IWR (Immunity, Weakness, Resistance) reminder message after a damage roll against a target with an IWR that matches damage types of the attacking weapon. ([5521c2d](https://github.com/xdy/xdy-pf2e-workbench/commit/5521c2dff79e9dc573bd9b169cac6ed892865f7b)), closes [#274](https://github.com/xdy/xdy-pf2e-workbench/issues/274)

## [3.9.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.4...v3.9.5) (2022-06-18)


### Bug Fixes

* Keeping up with the Macro Faeries. ([6a440c6](https://github.com/xdy/xdy-pf2e-workbench/commit/6a440c6bf0a382feb18a47cf74873560060dc5bf))

## [3.9.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.3...v3.9.4) (2022-06-16)


### Bug Fixes

* Keeping up with the Macro Faeries. ([5c9e0c1](https://github.com/xdy/xdy-pf2e-workbench/commit/5c9e0c15614dec93c0bb9b435c5041c921b4c17e))

## [3.9.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.2...v3.9.3) (2022-06-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([7d92830](https://github.com/xdy/xdy-pf2e-workbench/commit/7d92830de8f519e4d5c96001a6b2a235572052de))

## [3.9.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.1...v3.9.2) (2022-06-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([6a26b4c](https://github.com/xdy/xdy-pf2e-workbench/commit/6a26b4c1c3a563d30c2d5d54f59f3f6ef631441d))

## [3.9.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.9.0...v3.9.1) (2022-06-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a193a38](https://github.com/xdy/xdy-pf2e-workbench/commit/a193a38b5193c34ac6ac9998b0cca2dc0b92ef9c))

# [3.9.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.8.0...v3.9.0) (2022-06-10)


### Features

* Adds option for a reminder notification on attack strikes and spells without a target. ([c4e422a](https://github.com/xdy/xdy-pf2e-workbench/commit/c4e422a67d6c241581e8476a2319db29bb600ca2)), closes [#281](https://github.com/xdy/xdy-pf2e-workbench/issues/281)

# [3.8.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.7.1...v3.8.0) (2022-06-10)


### Features

* If the play sounds on strikes feature is on, it now uses the reroll degree of success sound rather than the initial one on a reroll. ([a525199](https://github.com/xdy/xdy-pf2e-workbench/commit/a525199a0416eac6bcd22d36418eb6b637190239)), closes [#284](https://github.com/xdy/xdy-pf2e-workbench/issues/284)

## [3.7.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.7.0...v3.7.1) (2022-06-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ed99c82](https://github.com/xdy/xdy-pf2e-workbench/commit/ed99c82b35ce768e1901a3fe39bceab9017c947b))

# [3.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.6.0...v3.7.0) (2022-06-05)


### Features

* Adds option to npc Recall Knowledge button to hide skill used on chat message. Also, removed debug printout. ([265cbfa](https://github.com/xdy/xdy-pf2e-workbench/commit/265cbfa0a52b796bdd34e38a7d4efe2c82c6659f)), closes [#272](https://github.com/xdy/xdy-pf2e-workbench/issues/272)

# [3.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.5.0...v3.6.0) (2022-06-05)


### Features

* Make it possible to hide the npc token name on npc recall knowledge buttons. ([9399b57](https://github.com/xdy/xdy-pf2e-workbench/commit/9399b57a551315d2fe92c21beffc50cced235ef1))

# [3.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.5...v3.5.0) (2022-06-05)


### Features

* Adds option to either expand all damage cards, or only expand new cards (if the latter, on a refresh the last three messages are expanded if they are damage cards). ([b43019d](https://github.com/xdy/xdy-pf2e-workbench/commit/b43019d9ecf9b61cb6eb08df7c4fbbb76ee3507f)), closes [#273](https://github.com/xdy/xdy-pf2e-workbench/issues/273)

## [3.4.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.4...v3.4.5) (2022-06-05)


### Bug Fixes

* Reduced need for reloads after changing settings, thanks @Dorako! ([d15d0ba](https://github.com/xdy/xdy-pf2e-workbench/commit/d15d0ba239ff2312d1e8f0fa70a7cca47b32e491))

## [3.4.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.3...v3.4.4) (2022-06-05)


### Bug Fixes

* Fixed several bugs with autorolling damage. Fixes bug with recall knowledge button on npcs not always working. ([6d137f6](https://github.com/xdy/xdy-pf2e-workbench/commit/6d137f634be686c83b0b6e53cf3e5f0dde0ad74a))

## [3.4.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.2...v3.4.3) (2022-06-05)


### Bug Fixes

* Better wording in the dropdown for the option to automatically increase dying at zero hp. ([81c23cf](https://github.com/xdy/xdy-pf2e-workbench/commit/81c23cfdb49183e97a0fc9cb6c7556ea08767874))

## [3.4.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.1...v3.4.2) (2022-06-03)


### Bug Fixes

* Fixes bug in autorolling damage feature. ([1cba563](https://github.com/xdy/xdy-pf2e-workbench/commit/1cba563ef86cf72f28e4c8f421eb6c9d545de67b))

## [3.4.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.4.0...v3.4.1) (2022-06-03)


### Bug Fixes

* Recall Knowledge chat message should always be public. ([1588175](https://github.com/xdy/xdy-pf2e-workbench/commit/1588175b4681ae4480e795067385dabd9bc5d6cd))

# [3.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.3.2...v3.4.0) (2022-06-03)


### Features

* Option to add Recall Knowledge button to an npc:s Recall Knowledge section. This button sends skill checks for first, second, third and fourth attempt at using the Recall Knowledge skill(s) for the npc to the chat. Note that lores will need to be handled manually. Also note that the Recall Knowledge chat messages show the *token* name to the players, so if you consider that a secret, do not use this feature. (I.e. this feature is intended for use with npc mystification.) ([53e12a6](https://github.com/xdy/xdy-pf2e-workbench/commit/53e12a643772647ec5cc8e750899d6209ad251a6))

## [3.3.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.3.1...v3.3.2) (2022-06-03)


### Bug Fixes

* Re-adds option to always autoroll damage on *non-attack* spells. Now with fewer showstopper bugs... ([1a145f1](https://github.com/xdy/xdy-pf2e-workbench/commit/1a145f12f33b82c3ff99827e6d76e16cb80d42bc))

## [3.3.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.3.0...v3.3.1) (2022-06-03)


### Bug Fixes

* Temporarily removes the option to autoroll damage on non-attack spells. I messed up the release. ([db877df](https://github.com/xdy/xdy-pf2e-workbench/commit/db877df4232ea3124df28eacf598a7c6708eb77c))

# [3.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.7...v3.3.0) (2022-06-03)


### Features

* Adds option to always autoroll damage on *non-attack* spells. Also, if the autoroll damage for attacks feature is switched on, also roll damage if an attack is rerolled into a success or critical success. ([7a51088](https://github.com/xdy/xdy-pf2e-workbench/commit/7a510882dd92e6b71a628ec79e3d010e837ede8b))
* Adds option to always autoroll damage on *non-attack* spells. Especially handy for basic saves as many targets will need to interact with the damage message regardless of save results. ([b6442d5](https://github.com/xdy/xdy-pf2e-workbench/commit/b6442d5e8689cc01408a5d0b61bdb5d173a08ef8)), closes [#254](https://github.com/xdy/xdy-pf2e-workbench/issues/254)
* If the autoroll damage for attacks feature is switched on, also roll damage if an attack is rerolled into a success or critical succes. ([33a1768](https://github.com/xdy/xdy-pf2e-workbench/commit/33a1768a2654e063484e7e80420c129967107052)), closes [#253](https://github.com/xdy/xdy-pf2e-workbench/issues/253)

## [3.2.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.6...v3.2.7) (2022-05-31)


### Bug Fixes

* Keeping up with the Macro Faeries. ([93d4fe3](https://github.com/xdy/xdy-pf2e-workbench/commit/93d4fe3601607b9869f445c53951d25ac10dfe42))

## [3.2.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.5...v3.2.6) (2022-05-28)


### Bug Fixes

* Keeping up with the Macro Faeries. ([eaf3381](https://github.com/xdy/xdy-pf2e-workbench/commit/eaf3381faa86cc0f753297a44ee9e8adb0bbda34))

## [3.2.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.4...v3.2.5) (2022-05-26)


### Bug Fixes

* Keeping up with the Macro Faeries. Assign icon to "Assign Standby Spell" macro. ([61da953](https://github.com/xdy/xdy-pf2e-workbench/commit/61da953964861e1bf2ff68fc8ef3e90a276bca5f))

## [3.2.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.3...v3.2.4) (2022-05-25)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a4e0a6d](https://github.com/xdy/xdy-pf2e-workbench/commit/a4e0a6d555a1b6dbc6d5ace8781dcff4fe4042ba))

## [3.2.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.2...v3.2.3) (2022-05-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([936ae9b](https://github.com/xdy/xdy-pf2e-workbench/commit/936ae9b881d1070f9955a90fe8ad41e171a0a115))

## [3.2.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.1...v3.2.2) (2022-05-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([88413af](https://github.com/xdy/xdy-pf2e-workbench/commit/88413af6e8509e123884a9e5bdd4c779271c5697))
* Keeping up with the Macro Faeries. ([47622f8](https://github.com/xdy/xdy-pf2e-workbench/commit/47622f8c8687dcd702aca7936c66493b97fe62e5))
* Keeping up with the Macro Faeries. ([26d534f](https://github.com/xdy/xdy-pf2e-workbench/commit/26d534f4ee6e8cffb087729aca4d14afb55582c6))

## [3.2.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.2.0...v3.2.1) (2022-05-17)


### Bug Fixes

* Keeping up with the Macro Faeries. Setting icons on 'Level Based DCs' and 'Marshal Stances' macros. Excluding 'Adjust Merchant Prices' until it has been fixed (it can break actors now.) ([d49b4c6](https://github.com/xdy/xdy-pf2e-workbench/commit/d49b4c6ed67ff631aa02011e5b60e0cb7dbb4142))

# [3.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.1.1...v3.2.0) (2022-05-15)


### Features

* Adds optional feature to colorize items on player character sheets by rarity (the same colors used on the npc sheet), thanks to @TomChristoffer for the original code and idea. ([bf0f65b](https://github.com/xdy/xdy-pf2e-workbench/commit/bf0f65bd22f5b8c6560aa8ce647f60387de79be5)), closes [#259](https://github.com/xdy/xdy-pf2e-workbench/issues/259)

## [3.1.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.1.0...v3.1.1) (2022-05-15)


### Bug Fixes

* Item price is handled differently from pf2e 3.10.0, getting in line with that. ([e307719](https://github.com/xdy/xdy-pf2e-workbench/commit/e307719596a8188ae0cee5acf5ce06cef668fb54))

# [3.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.0.1...v3.1.0) (2022-05-12)


### Features

* Yoinked most of the Quick Quantities feature from the PF2e Toolbox. The difference is that the amount changed on a shift click is hardcoded to 5, and a control click to 10. ([f7124cf](https://github.com/xdy/xdy-pf2e-workbench/commit/f7124cfe7ed8783c42ae693e9ae4fee9e4a51282))

## [3.0.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v3.0.0...v3.0.1) (2022-05-12)


### Bug Fixes

* Keeping up with the macro faeries. ([a4b02c3](https://github.com/xdy/xdy-pf2e-workbench/commit/a4b02c3709aacf0535b67a6abe13f93a23298971))

# [3.0.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.53.0...v3.0.0) (2022-05-09)


### Features

* Split macro compendiums into one named "Symon-provided macros (asymonous-benefactor-macros)" that should be imported, and one named "XDY Internal Utility Macros" that should not. ([814be83](https://github.com/xdy/xdy-pf2e-workbench/commit/814be8332120f1d79fdfacb6108be2786436dfd0))


### BREAKING CHANGES

* This means that all macros that were previously imported from the above compendium have broken and will need to be reimported.

# [2.53.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.52.1...v2.53.0) (2022-05-08)


### Features

* The keybind that allows the gm to add targets for a user now also lets the gm clear the targets for that user. ([9a2ef51](https://github.com/xdy/xdy-pf2e-workbench/commit/9a2ef51c2367537ffe57ba0cf8ff648432e80978)), closes [#246](https://github.com/xdy/xdy-pf2e-workbench/issues/246)

## [2.52.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.52.0...v2.52.1) (2022-05-07)


### Bug Fixes

* Keeping up with the macro faeries... ([e2ddf9f](https://github.com/xdy/xdy-pf2e-workbench/commit/e2ddf9f9d3f81c55fc65f50e81d56aea171de320))

# [2.52.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.51.0...v2.52.0) (2022-05-06)


### Features

* The optional features for adding Wounded when removing Dying and adding Dying on reaching zero hit points now also automatically handles the feats "Numb to Death", "Bounce Back", "Deliberate Death" (reminder note about free attack possibility). All three have immunity effects to make sure they don't trigger too often. (Deliberate Death automatically adds the immunity effect even if the attacker is not in melee range, remove it manually if it shouldn't be added.) ([a5e9e66](https://github.com/xdy/xdy-pf2e-workbench/commit/a5e9e66bfa59a6cebe39a1f86f7ed06f48496217))

# [2.51.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.5...v2.51.0) (2022-05-05)


### Features

* Automated Orc Ferocity, Undying Ferocity, Incredible Ferocity and Rampaging Ferocity (including immunity effect with the proper duration.) ([9fd1439](https://github.com/xdy/xdy-pf2e-workbench/commit/9fd1439dd21169ec6b485256befd902d91ae82bf)), closes [#221](https://github.com/xdy/xdy-pf2e-workbench/issues/221)

## [2.50.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.4...v2.50.5) (2022-05-02)


### Bug Fixes

* Enable a sub-setting for animations on misses to not make the appear off-target. ([c0cc807](https://github.com/xdy/xdy-pf2e-workbench/commit/c0cc807f189cba5aa06271d84fa92e2f8971e1e1)), closes [#236](https://github.com/xdy/xdy-pf2e-workbench/issues/236)
* Make "Effect: Dirge of Doom" give Frightened 1 as well as make sure Frightened doesn't get automatically reduced below 1. ([89c5e82](https://github.com/xdy/xdy-pf2e-workbench/commit/89c5e82b30dfd140047cf15078e9bbedff8a079b)), closes [#220](https://github.com/xdy/xdy-pf2e-workbench/issues/220)
* Using token visilibity for toggling Undetected condition shouldn't affect Loot actors. ([0c1ed17](https://github.com/xdy/xdy-pf2e-workbench/commit/0c1ed17c5a83576af8431baeb0ddb63a5161dd52)), closes [#237](https://github.com/xdy/xdy-pf2e-workbench/issues/237)

## [2.50.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.3...v2.50.4) (2022-05-01)


### Bug Fixes

* Keeping up with the macro faeries is *really* hard work. :) ([14cef41](https://github.com/xdy/xdy-pf2e-workbench/commit/14cef41ef3ebee5a87b061e925d07bf2c803bbd4))

## [2.50.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.2...v2.50.3) (2022-05-01)


### Bug Fixes

* Keeping up with the macro faeries is hard work. :) ([325f0d2](https://github.com/xdy/xdy-pf2e-workbench/commit/325f0d278ea02c26112cbf46055e5b4b32cc8e1e))

## [2.50.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.1...v2.50.2) (2022-04-30)


### Bug Fixes

* Include latest Asymonous Benefactor macros. ([451a62a](https://github.com/xdy/xdy-pf2e-workbench/commit/451a62a3261d7d7ab64522ddcd4f79c15998d16c))

## [2.50.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.50.0...v2.50.1) (2022-04-26)


### Bug Fixes

* Hooked into preUpdateActor too often. ([1ac799e](https://github.com/xdy/xdy-pf2e-workbench/commit/1ac799e64f8d24cd56d9cc212f7dc6835744d63a))

# [2.50.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.49.1...v2.50.0) (2022-04-24)


### Bug Fixes

* Clamp hero point handler minutes to between 0 and 60 minutes. ([a4a4ded](https://github.com/xdy/xdy-pf2e-workbench/commit/a4a4dedac81543873e57f2e38f477adb41b8599c))


### Features

* Removing all deprecated features ("moving initative on dying", "moving initiative manually", "purging effects each turn", "purging effects on time increase"). ([3446150](https://github.com/xdy/xdy-pf2e-workbench/commit/3446150aff7b215e4c4e2d8d32475a33f105d8d6))

## [2.49.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.49.0...v2.49.1) (2022-04-24)


### Bug Fixes

* Includes the latest Asymonous Benefactor macro, 'Dual Class'. ([64daf5d](https://github.com/xdy/xdy-pf2e-workbench/commit/64daf5d4e54393a6bbc2856faf97f61bb1282b15))

# [2.49.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.48.0...v2.49.0) (2022-04-23)


### Bug Fixes

* Set proper icons for the Asymonous Benefactor macros. ([5912d7d](https://github.com/xdy/xdy-pf2e-workbench/commit/5912d7d4282284616d77f06ccdfa2721179b41c2))


### Features

* Adds optional keybind called "Add user targets" that lets the GM add token targets to other users by selecting or hovering over those tokens, pressing the keybind and choosing which user should target those tokens. Enables GMs to help players having problems with targeting. Also useful in conjunction with "Workshop Flat Check Notes" to let a player target an Undetected token that they first need to roll a Flat Check to be able to hit. ([91a41fe](https://github.com/xdy/xdy-pf2e-workbench/commit/91a41fe87054ba8ddd77ca32df3e2ef5ff1b34de))

# [2.48.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.47.0...v2.48.0) (2022-04-23)


### Features

* 'Workbench Flat Check Notes' now has support for the Blind-Fight feat, courtesy of Jamz ([81cce4e](https://github.com/xdy/xdy-pf2e-workbench/commit/81cce4eddbce7ef53575962f78bd92f5e23db60b))

# [2.47.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.46.4...v2.47.0) (2022-04-23)


### Bug Fixes

* Error when check if zero hp if not in encounter. ([733b7e4](https://github.com/xdy/xdy-pf2e-workbench/commit/733b7e4c9f7d4e6a118cb7331fb6e0eca4093376))


### Features

* Adds option to use the token hud visibility toggle to also toggle the Undetected condition. ([202c4d9](https://github.com/xdy/xdy-pf2e-workbench/commit/202c4d9a17688f51786f01479d37553540a4e8ce))

## [2.46.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.46.3...v2.46.4) (2022-04-23)


### Bug Fixes

* The 'Workbench Flat Check Notes' item in the compendium xdy-pf2e-workbench-items is now a 'Boon', meaning it'll appear on the Deity Boons/Curses section of the Effects tab rather than on the feat list. This change was done to put it in a more out of the way place. I also gave it a new icon. ([bfcbf96](https://github.com/xdy/xdy-pf2e-workbench/commit/bfcbf9601659d916acd01332c4e7add628bd804d))

## [2.46.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.46.2...v2.46.3) (2022-04-22)


### Bug Fixes

* Adds options for only adding Dying on reaching 0 HP to Characters (i.e. no npcs, vehicles, etc). ([802989a](https://github.com/xdy/xdy-pf2e-workbench/commit/802989ad8444c4b751d00faa74845c477f8f1117)), closes [#222](https://github.com/xdy/xdy-pf2e-workbench/issues/222)
* Now adds 1 + Wounded if Add Wounded Level is chosen. ([5ca2784](https://github.com/xdy/xdy-pf2e-workbench/commit/5ca27843b6eae1c7a5256497ee59e190d8b24f43)), closes [#223](https://github.com/xdy/xdy-pf2e-workbench/issues/223)
* See below. ([0070044](https://github.com/xdy/xdy-pf2e-workbench/commit/007004453ad015e631f58525cecc1b34f474365a))

## [2.46.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.46.1...v2.46.2) (2022-04-22)


### Bug Fixes

* Tautological fix ([34eb4ed](https://github.com/xdy/xdy-pf2e-workbench/commit/34eb4ed5125ca85fed0e43cd7a831c6efe045e77))

## [2.46.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.46.0...v2.46.1) (2022-04-22)


### Bug Fixes

* Assorted edge cases around conditions ([aea25c9](https://github.com/xdy/xdy-pf2e-workbench/commit/aea25c9cd5ae8b4ce98af14e6b94207bc5ebb71c))

# [2.46.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.45.1...v2.46.0) (2022-04-22)


### Features

* The xdy-pf2e-workbench-items pack now includes a 'Feat' named "Workbench Flat Check Notes". This 'Feat' holds several useful Note RE:s that when appropriate add notes about Flat Checks to rolls. It is far from complete, but it's a good start. To use it add it to your characters as a Bonus or Campaign Specific feat. It currently handles: Target is undetected, hidden, invisible or concealed. Self is blinded or dazzled. ([26a5b5f](https://github.com/xdy/xdy-pf2e-workbench/commit/26a5b5f26cfbc8bfc118fe1ee0cd9be67816d801))

## [2.45.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.45.0...v2.45.1) (2022-04-22)


### Bug Fixes

* Fix 'moving initiative' breakage. ([b99431e](https://github.com/xdy/xdy-pf2e-workbench/commit/b99431e909cf6a69fd95123b7c1eeebba5429fcf)), closes [#219](https://github.com/xdy/xdy-pf2e-workbench/issues/219)

# [2.45.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.44.0...v2.45.0) (2022-04-21)


### Features

* Option to automatically increase Dying by either 1 or the dying character's Wounded level when it reaches 0 HP. ([0eabede](https://github.com/xdy/xdy-pf2e-workbench/commit/0eabede63fc3836fb4b4afd3108b412166160904))

# [2.44.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.43.0...v2.44.0) (2022-04-21)


### Features

* Adds option automatically give the Wounded condition any time the Dying condition is removed. ([403b872](https://github.com/xdy/xdy-pf2e-workbench/commit/403b87279d4c4b1aacff05de46a0221c7c5a3ce7))

# [2.43.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.42.1...v2.43.0) (2022-04-17)


### Bug Fixes

* Typo ([bddb325](https://github.com/xdy/xdy-pf2e-workbench/commit/bddb325e89af5dd415129a7bd6ab5b14665a53fc))


### Features

* Adds option to automatically reduce Stunned condition at the start of the turn hidden behind option to show actions reminder each turn, which handles Quickened, Slowed and Stunned. ([9ce337a](https://github.com/xdy/xdy-pf2e-workbench/commit/9ce337af5068bd9275cf668f0c0b9f0a9afbf5fe))

## [2.42.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.42.0...v2.42.1) (2022-04-14)


### Bug Fixes

* Typo and cut and paste fixes ([c27810f](https://github.com/xdy/xdy-pf2e-workbench/commit/c27810f0eb6a99098d3b4526f08cd28360db6722))

# [2.42.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.41.3...v2.42.0) (2022-04-14)


### Bug Fixes

* Mention playlists as well as tables in the sound hints. ([ae9a8a5](https://github.com/xdy/xdy-pf2e-workbench/commit/ae9a8a5c0b9979e8e588e888296a03694729d49a))


### Features

* Add toggle for whether the Hero Point Handler timer should start automatically on world load. Started cleaning up setting text. ([ee17a0b](https://github.com/xdy/xdy-pf2e-workbench/commit/ee17a0b042fb0421c076abb5f9c1bc5c237d0a98))
* Add toggle for whether the Hero Point Handler timer should start automatically on world load. Started cleaning up setting text. ([9d40fa9](https://github.com/xdy/xdy-pf2e-workbench/commit/9d40fa9c1bd55269b33020c7455a04d499f99527))

## [2.41.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.41.2...v2.41.3) (2022-04-10)


### Bug Fixes

* If the option to play sounds and animation on strikes is enabled the name of the sound file can instead be either the name of a table or a playlist to pick a random sound file name from. ([a938323](https://github.com/xdy/xdy-pf2e-workbench/commit/a938323fbdecbea2b999d2fbeba82456c881e861))
* If the option to play sounds and animation on strikes is enabled the name of the sound file can instead be either the name of a table or a playlist to pick a random sound file name from. ([5f351b8](https://github.com/xdy/xdy-pf2e-workbench/commit/5f351b8779f03a8fa3cfe26d5006e36789ed8327))

## [2.41.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.41.1...v2.41.2) (2022-04-10)


### Bug Fixes

* If the option to play sounds and animation on strikes is enabled the name of the sound file can instead be the name of a table to draw a random sound from. ([4bfc9f7](https://github.com/xdy/xdy-pf2e-workbench/commit/4bfc9f732ce6d2ca39468c020451b5ee9019e25f)), closes [#190](https://github.com/xdy/xdy-pf2e-workbench/issues/190)

## [2.41.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.41.0...v2.41.1) (2022-04-09)


### Bug Fixes

* Localize hotbar macro keybinds. ([96ac051](https://github.com/xdy/xdy-pf2e-workbench/commit/96ac051c7bd45ec1037f7e3141dbdf29d4cde3a5))

# [2.41.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.6...v2.41.0) (2022-04-08)


### Features

* If the setting to automatically reduce Frightened condition at the end of turn is enabled the value of Frightened won't be reduced below the value in the flag "xdy-pf2e-workbench.condition.frightened.min". A sample Effect with a Rules Element that does this has been included in the compendium "xdy-pf2e-workbench-items", it's titled "Effect: Dirge of Doom". ([cbc56a4](https://github.com/xdy/xdy-pf2e-workbench/commit/cbc56a4ef4827cdbf51421392f369b296b874726)), closes [#203](https://github.com/xdy/xdy-pf2e-workbench/issues/203)

## [2.40.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.5...v2.40.6) (2022-04-08)


### Bug Fixes

* Hero Point Handler should now remember how much time has passed if is is opened while timer is in progress, and continue at that point. Changed to only show minutes in chat so as not to imply high precision. ([58eb6ef](https://github.com/xdy/xdy-pf2e-workbench/commit/58eb6ef874126f585a57f1e3736e901ca385380f)), closes [#205](https://github.com/xdy/xdy-pf2e-workbench/issues/205)

## [2.40.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.4...v2.40.5) (2022-04-06)


### Bug Fixes

* Some clarifications for Hero Point Handler. ([4fda025](https://github.com/xdy/xdy-pf2e-workbench/commit/4fda0256b32497bec7160b21af17ad470613e602))

## [2.40.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.3...v2.40.4) (2022-04-06)


### Bug Fixes

* Revised ui for the hero point handler courtesy of [@websterguy](https://github.com/websterguy). Code cleanup. Latest dependencies included. ([129eaf1](https://github.com/xdy/xdy-pf2e-workbench/commit/129eaf17a19948b52bc02e65fef8c55ab479d3ef))

## [2.40.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.2...v2.40.3) (2022-04-05)


### Bug Fixes

* Deprecates moving initiative on getting status dying as it doesn't work properly for linked tokens. (Will be removed eventually.) Relabels asymonous-benefactor macros and effects to make their origin a little bit clearer. Fix warning in build-packs. Updates dependencies. ([b340db4](https://github.com/xdy/xdy-pf2e-workbench/commit/b340db40d03da4f55dd90a0b6cc2efe3846a89f1))
* Deprecates moving initiative on getting status dying as it doesn't work properly for linked tokens. (Will be removed eventually.) Relabels asymonous-benefactor macros and effects to make their origin a little bit clearer. Fix warning in build-packs. Updates dependencies. And this time, linted the code before committing... ([5240240](https://github.com/xdy/xdy-pf2e-workbench/commit/5240240ae7a009713e8a465a1ad60e74443ac098))

## [2.40.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.1...v2.40.2) (2022-03-31)


### Bug Fixes

* Better handling of breath weapon reminder if used outside the selected creature's turn. More code cleanup. ([a59deea](https://github.com/xdy/xdy-pf2e-workbench/commit/a59deea45a208fae296e7e5b8c4be0620e38f0e6))

## [2.40.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.40.0...v2.40.1) (2022-03-31)


### Bug Fixes

* Only check for dragon breath use if that option is turned on. Code cleanup. ([6568f6d](https://github.com/xdy/xdy-pf2e-workbench/commit/6568f6d566447fa3fe098ebcd64693462b2aa324))

# [2.40.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.39.2...v2.40.0) (2022-03-31)


### Features

* Option to automatically add a reminder effect when breath weapons are used. (Breath weapon description must match "<p>.*can't use.*1d([46]) rounds.*</p>" or the localized equivalent for it to be recognized.) ([6f77190](https://github.com/xdy/xdy-pf2e-workbench/commit/6f771904e716614282c89029849accf62bd1da92))

## [2.39.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.39.1...v2.39.2) (2022-03-28)


### Bug Fixes

* Fixes problem with option to play sounds on strike. ([b1cb44d](https://github.com/xdy/xdy-pf2e-workbench/commit/b1cb44dcc251fad47beb4e49af380a49ca19f07f)), closes [#189](https://github.com/xdy/xdy-pf2e-workbench/issues/189)

## [2.39.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.39.0...v2.39.1) (2022-03-27)


### Bug Fixes

* Fixes the ABP 'allow item bonuses' option. ([eaf53d9](https://github.com/xdy/xdy-pf2e-workbench/commit/eaf53d97c7161315baa0da603af5fbda0d9ff16d))

# [2.39.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.38.0...v2.39.0) (2022-03-26)


### Features

* Adds option to play animation and/or sound on strike hit. Fixes bug that made it impossible to play just a sound or just an animation. Plays success and criticalSuccess animation on the token instead of next to it. ([fcca54d](https://github.com/xdy/xdy-pf2e-workbench/commit/fcca54d4adb7ea7bc2b9429787af2aa07f0e53d9)), closes [#185](https://github.com/xdy/xdy-pf2e-workbench/issues/185) [#184](https://github.com/xdy/xdy-pf2e-workbench/issues/184)

# [2.38.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.37.0...v2.38.0) (2022-03-25)


### Features

* Add option to not disable item bonuses when using ABP. ([1e9044c](https://github.com/xdy/xdy-pf2e-workbench/commit/1e9044c7eeda8440702b84b0e44835879ddca261))
* Add option to not disable item bonuses when using ABP. ([406ade7](https://github.com/xdy/xdy-pf2e-workbench/commit/406ade7b22121d796a2c5da8538a3c5549564506))

# [2.37.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.36.0...v2.37.0) (2022-03-25)


### Bug Fixes

* Fix another problem in build-packs.ts ([8e582ea](https://github.com/xdy/xdy-pf2e-workbench/commit/8e582ea59898f4caaa18f1bc760a8da2d2a4bb59))
* Fix build-packs.ts ([12be99d](https://github.com/xdy/xdy-pf2e-workbench/commit/12be99df75998abaf1e8dbe3eca8cb31576b0ca9))
* Fix yet another problem in build-packs.ts ([eb5c9ca](https://github.com/xdy/xdy-pf2e-workbench/commit/eb5c9caa9517dc4e8e272454b345d86969b78910))


### Features

* Add a few more creature families. ([f0a777b](https://github.com/xdy/xdy-pf2e-workbench/commit/f0a777bf1d3f2ddd6ebc7ceda014f686429cc902))

# [2.36.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.35.0...v2.36.0) (2022-03-23)


### Features

* Add support for separate sound and animation for strike critical successes. ([c216cf0](https://github.com/xdy/xdy-pf2e-workbench/commit/c216cf0d8487f33d73fa2063eae0250407db9eee)), closes [#179](https://github.com/xdy/xdy-pf2e-workbench/issues/179)
* Add support for separate sound and animation for strike critical successes. ([8104e5c](https://github.com/xdy/xdy-pf2e-workbench/commit/8104e5c468adb20937a582e56f2fe3cc551cc8f1))
* Add support for separate sound and animation for strike critical successes. ([bb86116](https://github.com/xdy/xdy-pf2e-workbench/commit/bb8611653c7623d1a60349dc1e96b43bbbeae431)), closes [#179](https://github.com/xdy/xdy-pf2e-workbench/issues/179)
* Add support for separate sound and animation for strike critical successes. ([6409530](https://github.com/xdy/xdy-pf2e-workbench/commit/6409530f99fa4a844d996934a91a324ba2bdcaca)), closes [#179](https://github.com/xdy/xdy-pf2e-workbench/issues/179)
* Add support for separate sound and animation for strike critical successes. ([aef4ff1](https://github.com/xdy/xdy-pf2e-workbench/commit/aef4ff13db65ffa5bebb3a5c836b9e596b5ed442)), closes [#179](https://github.com/xdy/xdy-pf2e-workbench/issues/179)

# [2.35.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.34.2...v2.35.0) (2022-03-22)


### Features

* Add support for separate sound and animation for strike critical failures. ([de05261](https://github.com/xdy/xdy-pf2e-workbench/commit/de0526199313084b24200418e367e2c3d225ccc1))

## [2.34.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.34.1...v2.34.2) (2022-03-21)


### Bug Fixes

* Reorder settings. ([9ab8eae](https://github.com/xdy/xdy-pf2e-workbench/commit/9ab8eae79cba6a6b938b8ea941a681e4dc6b081a))

## [2.34.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.34.0...v2.34.1) (2022-03-20)


### Bug Fixes

* Shouldn't reload on changing animation/sound files. ([d9b7261](https://github.com/xdy/xdy-pf2e-workbench/commit/d9b7261fc0ffba6e2e39f34072be42475009cd1c))

# [2.34.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.9...v2.34.0) (2022-03-20)


### Features

* Adds option to do a custom animation and sound on a miss. Requires that the module https://foundryvtt.com/packages/autoanimations be installed (along with it's dependencies). For the default miss animation install the module https://foundryvtt.com/packages/JB2A_DnD5e. For the default miss sound install the module https://foundryvtt.com/packages/soundfxlibrary. ([63d7cd2](https://github.com/xdy/xdy-pf2e-workbench/commit/63d7cd2a04c18bcae210d0001f308174784585ec))

## [2.33.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.8...v2.33.9) (2022-03-17)


### Bug Fixes

* Fixed the warnings that show up for players when auto-reducing the frightened condition. ([3232f79](https://github.com/xdy/xdy-pf2e-workbench/commit/3232f799d73e89eda6c8dd30b435f13c6c20af90))

## [2.33.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.7...v2.33.8) (2022-03-15)


### Bug Fixes

* Includes the latest asymonous benefactor macros. ([65252b4](https://github.com/xdy/xdy-pf2e-workbench/commit/65252b408c29f0a7e5022277b1a14acd25f5d569))

## [2.33.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.6...v2.33.7) (2022-03-13)


### Bug Fixes

* Includes the latest asymonous benefactor macros. ([ec5512e](https://github.com/xdy/xdy-pf2e-workbench/commit/ec5512e2d9bdb621c651991973b359d7fb1e7943))

## [2.33.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.5...v2.33.6) (2022-03-11)


### Bug Fixes

* Should fix the hero point handler timers. Includes the latest asymonous benefactor macros. ([e32bf2b](https://github.com/xdy/xdy-pf2e-workbench/commit/e32bf2b0ca70fdfc876e3a53dce12441310bb881))

## [2.33.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.4...v2.33.5) (2022-03-06)


### Bug Fixes

* Fix automatic damage roll for animal form, animal companions and others with RE-based strikes. ([3d4cb0d](https://github.com/xdy/xdy-pf2e-workbench/commit/3d4cb0d0ff4d54da483b7ab41ba0f45d7edd7d77))

## [2.33.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.3...v2.33.4) (2022-03-06)


### Bug Fixes

* Minor settings description update. ([6ba3231](https://github.com/xdy/xdy-pf2e-workbench/commit/6ba32319943ba814b66b593f7a0391495710180d))

## [2.33.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.2...v2.33.3) (2022-03-05)


### Bug Fixes

* Includes the latest asymonous benefactor macrors. ([ac7e42b](https://github.com/xdy/xdy-pf2e-workbench/commit/ac7e42b306065b0e8850d16dc310622d3ebb5c68))

## [2.33.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.1...v2.33.2) (2022-03-04)


### Bug Fixes

* More settings typos. ([781470e](https://github.com/xdy/xdy-pf2e-workbench/commit/781470ee766b18903ce55799d7be85f748f4ab54))

## [2.33.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.33.0...v2.33.1) (2022-03-04)


### Bug Fixes

* Typo in handling persistent damage/healing settings. ([589c6df](https://github.com/xdy/xdy-pf2e-workbench/commit/589c6df8563bc1fcd0e30783f184a072fcfa165e))

# [2.33.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.32.0...v2.33.0) (2022-03-04)


### Bug Fixes

* The setting to auto collapse item chat cards should be a client setting. Updated README to be a bit more informative. ([cdbdd75](https://github.com/xdy/xdy-pf2e-workbench/commit/cdbdd751b9ab5fe83a7e3aaa22382b3de2eb40f5))


### Features

* The optional features to "Autoroll damage for strike", "Autoroll damage for spell attack", "Apply persistent damage" and "Apply persistent healing" can now each separately be allowed for one of: "None", "All", "GM", "Players". Options that are not allowed are hidden until they are allowed. ([598b8ff](https://github.com/xdy/xdy-pf2e-workbench/commit/598b8ffea70d5da1a22c0c2915f03a52eeb6f1db)), closes [#125](https://github.com/xdy/xdy-pf2e-workbench/issues/125)

# [2.32.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.31.0...v2.32.0) (2022-03-04)


### Features

* The auto-collapsing item chat cards optional feature now has a dropdown with the options "Never collapse" (which is default), "Collapsed by default, click title to expand." and "Expanded by default, click title to collapse." For the latter two clicking the chat card title toggles the state. ([94cf1c8](https://github.com/xdy/xdy-pf2e-workbench/commit/94cf1c8f4cb5a579d645b227e4d044136e85044d)), closes [#152](https://github.com/xdy/xdy-pf2e-workbench/issues/152)

# [2.31.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.30.1...v2.31.0) (2022-03-02)


### Features

* The option to auto roll strike damage now also auto rolls spell damage and checks heightening courtesy of @WesBelmont. Also includes latest asymonous benefactor macros. ([c1265e5](https://github.com/xdy/xdy-pf2e-workbench/commit/c1265e5bcbda44e3dce700f4baff31cedb062415))

## [2.30.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.30.0...v2.30.1) (2022-03-01)


### Bug Fixes

* Cleaning up a bit. Added latest asymonous benefactor macros. ([a0ea64b](https://github.com/xdy/xdy-pf2e-workbench/commit/a0ea64b9f466e7bdd9b5243509ca880f32b437d4))

# [2.30.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.29.0...v2.30.0) (2022-02-27)


### Features

* Change options to move combatant before the current combatant on reaching 0 hp/getting status dying/manually to a single dropdown choice setting. ([ed872f6](https://github.com/xdy/xdy-pf2e-workbench/commit/ed872f634839e6cf2db24f914adb5d000ba9f7c9))

# [2.29.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.28.0...v2.29.0) (2022-02-27)


### Features

* Begins work of cleaning up module settings. Promotes the Hero Point Handler to a non-experimental feature. Hides dependent settings (such as all npc mystifier subsettings if that is not disabled and the extra chat message subfeatures of applying persistent damage and healing). Deprecates the settings to purge expired effects as an equivalent feature is in the system. Deprecates setting to manually move a combatant before the current combatant as combatants can be dragged to change the order. Deprecated settings will be removed at a later time. Reorders settings (first world settings, then client settings, then deprecated settings of both types. Experimental subsettings appear last among their peers.) ([b1293eb](https://github.com/xdy/xdy-pf2e-workbench/commit/b1293eba95c039b9bbc32e3716637cb23f2d76c8))

# [2.28.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.27.0...v2.28.0) (2022-02-27)


### Bug Fixes

* Fixes a typo. ([1f48f16](https://github.com/xdy/xdy-pf2e-workbench/commit/1f48f1686ebdbcf367179609551510ba58f1f91e))


### Features

* Support auto rolling damage in pf2e 3.5.0 (hopefully still works in older versions, but you really should upgrade. Support for older versions will be removed eventually.) ([c4b3116](https://github.com/xdy/xdy-pf2e-workbench/commit/c4b3116bcb6017af85507b27850c5179627bf39d))

# [2.27.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.26.4...v2.27.0) (2022-02-22)


### Features

* Hero Point Handler now only selects a random character to get a hero point if no timer is running (i.e. when starting the game, and when a timer has just run out which popped up the dialog.) ([166f9d6](https://github.com/xdy/xdy-pf2e-workbench/commit/166f9d6dd72a082bcd320137f62ad7aac2fc90de))

## [2.26.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.26.3...v2.26.4) (2022-02-20)


### Bug Fixes

* Get the latest asymonous macros ([f217c2f](https://github.com/xdy/xdy-pf2e-workbench/commit/f217c2f2845289d332f1b5b677dba6095ba6f5b2))

## [2.26.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.26.2...v2.26.3) (2022-02-20)


### Bug Fixes

* Fixed several bugs, hopefully everything works again. ([1b19633](https://github.com/xdy/xdy-pf2e-workbench/commit/1b19633d595c53d2e3b361f5c66f5ad0ed8d580f))

## [2.26.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.26.1...v2.26.2) (2022-02-20)


### Bug Fixes

* Restore using token hud to mystify and drag from sidebar while holding modifier key to mystify. ([f43def8](https://github.com/xdy/xdy-pf2e-workbench/commit/f43def84b64e8c1cc5cedd7862bd8db567823d20))

## [2.26.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.26.0...v2.26.1) (2022-02-20)


### Bug Fixes

* Make it clearer which settings are client settings (and thus need to be set by each user on each browser) and which are world settings (and thus set for all users). ([415546b](https://github.com/xdy/xdy-pf2e-workbench/commit/415546b763917f332aab6cbc9d3ea3f6dd1e5c10))

# [2.26.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.25.0...v2.26.0) (2022-02-19)


### Features

* Add option to automatically heal persistent damage, fast healing and regeneration inspired by @Jamz (with the option to show a separate message for these in addition to the regular damage taken/healed messages). ([c4dc700](https://github.com/xdy/xdy-pf2e-workbench/commit/c4dc700d270f06d8049d282e3ef977db49da5003)), closes [#137](https://github.com/xdy/xdy-pf2e-workbench/issues/137)
* Adds option to automatically heal persistent damage, fast healing and regeneration inspired by @Jamz (with the option to show a separate message for these in addition to the regular damage taken/healed messages). Actually restricts the gm-only keybinds to the gm. Fixes collapsing old chat cards (fixes [#137](https://github.com/xdy/xdy-pf2e-workbench/issues/137)) Updates the asymonous macros to the latest version. ([c0e2bf3](https://github.com/xdy/xdy-pf2e-workbench/commit/c0e2bf3732afca06a1ac654e0698e4c107bbed33))

# [2.25.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.24.3...v2.25.0) (2022-02-15)


### Bug Fixes

* Get the latest asymonous macros ([6dcb8b5](https://github.com/xdy/xdy-pf2e-workbench/commit/6dcb8b51aaccf7d7f34d0a2370e1df26fc78f934))


### Features

* Add option to decrease frightened condition automatically at the end of each turn. ([ec2485a](https://github.com/xdy/xdy-pf2e-workbench/commit/ec2485a3e3accfbf4ffde577daba6f2812fb7d05))

## [2.24.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.24.2...v2.24.3) (2022-02-14)


### Bug Fixes

* Get the latest asymonous macros ([f0de592](https://github.com/xdy/xdy-pf2e-workbench/commit/f0de592ccd5f7e537f9fa483369f0049d57d2830))

## [2.24.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.24.1...v2.24.2) (2022-02-14)


### Bug Fixes

* No real changes, testing build script ([c7559e4](https://github.com/xdy/xdy-pf2e-workbench/commit/c7559e44018fa172f21f2f564f844e4d2bd3c035))

## [2.24.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.24.0...v2.24.1) (2022-02-14)


### Bug Fixes

* Even more latest asymonous macros ([935eada](https://github.com/xdy/xdy-pf2e-workbench/commit/935eadaeb1faab88bc8e18d49daf6eb8d21e2caf))
* Include the latest asymonous macros ([e289d62](https://github.com/xdy/xdy-pf2e-workbench/commit/e289d62c59a4836cabc5cd274064fc5759b6cfdf))

# [2.24.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.8...v2.24.0) (2022-02-13)


### Features

* Hero Point Handler now resets properly. Hero Point Handler now displays a chat message when it gives out hero points. Made the Workbench less eager to hook into everything whether needed or not (which means that after changing a module setting a refresh is most likely needed before it works.) ([ac84c65](https://github.com/xdy/xdy-pf2e-workbench/commit/ac84c65df9bb78e7da56f1207a70ca7deaaa6ed1)), closes [#97](https://github.com/xdy/xdy-pf2e-workbench/issues/97) [#90](https://github.com/xdy/xdy-pf2e-workbench/issues/90)

## [2.23.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.7...v2.23.8) (2022-02-12)


### Bug Fixes

* It doesn't happen for me, but this *might* kill the "Null Elf" problem. ([9f23c85](https://github.com/xdy/xdy-pf2e-workbench/commit/9f23c852036adb95b3ae4ba8317e95dd0140b0aa))

## [2.23.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.6...v2.23.7) (2022-02-12)


### Bug Fixes

* Minor cleanup. ([3e70b5e](https://github.com/xdy/xdy-pf2e-workbench/commit/3e70b5e0af0aea617029897aa658daaab739473a))

## [2.23.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.5...v2.23.6) (2022-02-06)


### Bug Fixes

* Try to make module keybinds avoid executing browser hotkeys. ([f90a32a](https://github.com/xdy/xdy-pf2e-workbench/commit/f90a32ab208a91cd3fc56b001a64e195c27bc026))

## [2.23.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.4...v2.23.5) (2022-02-06)


### Bug Fixes

* The setting 'No random number for unique npcs' should now work again. Also noted that elite/weak didn't work well for other languages than english so fixed that too. ([9345cef](https://github.com/xdy/xdy-pf2e-workbench/commit/9345cefcbeba1ada66aa152ca6e7701a2ba98fa7))

## [2.23.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.3...v2.23.4) (2022-02-06)


### Bug Fixes

* Localization of traits actually works now (using the PF2E system translations directly). Localization in general is handled better. ([54aee8b](https://github.com/xdy/xdy-pf2e-workbench/commit/54aee8b64b38668c4cd2a8343a86be804b817360)), closes [#109](https://github.com/xdy/xdy-pf2e-workbench/issues/109)

## [2.23.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.2...v2.23.3) (2022-02-05)


### Bug Fixes

* Better way to detect if the hero point handler is already open. ([052190b](https://github.com/xdy/xdy-pf2e-workbench/commit/052190b112eca45bc4681118d6e71856a998fe0e)), closes [#96](https://github.com/xdy/xdy-pf2e-workbench/issues/96)

## [2.23.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.1...v2.23.2) (2022-02-04)


### Bug Fixes

* Hero Point Handler is now less hacky, more worky. I.e. it's *almost* not experimental. ([92b739a](https://github.com/xdy/xdy-pf2e-workbench/commit/92b739a6522825612e8b8e5fcf56023c76e5b825))

## [2.23.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.23.0...v2.23.1) (2022-01-30)


### Bug Fixes

* Cleaning up the module.json a bit more. ([2f18bda](https://github.com/xdy/xdy-pf2e-workbench/commit/2f18bda3972550cc64c002579d88bdfefd0d2dc0))

# [2.23.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.22.2...v2.23.0) (2022-01-30)


### Features

* Autorolling damage from a mystified token now uses the mystified name when rolling damage. ([0575040](https://github.com/xdy/xdy-pf2e-workbench/commit/0575040885671e29e8f393d804e4c6f6958672c7))

## [2.22.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.22.1...v2.22.2) (2022-01-30)


### Bug Fixes

* Another try at fixing all autoroll damage usecases. ([9f9b588](https://github.com/xdy/xdy-pf2e-workbench/commit/9f9b58887eccab92028f17fcac36d4f4c488dfa8))

## [2.22.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.22.0...v2.22.1) (2022-01-30)


### Bug Fixes

* Corrected urls for readme, changelog and license ([c093694](https://github.com/xdy/xdy-pf2e-workbench/commit/c0936941042db76195dc73f8dd1775b240daea05))

# [2.22.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.8...v2.22.0) (2022-01-30)


### Features

* Enables integration with the [Bug Reporter](https://github.com/League-of-Foundry-Developers/bug-reporter) module. Change the license file's name so it can be found by module-credits. ([56bbf30](https://github.com/xdy/xdy-pf2e-workbench/commit/56bbf309648995de8fc882ba9b311ac60124e6e7))

## [2.21.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.7...v2.21.8) (2022-01-29)


### Bug Fixes

* Made autorolling damage a bit more robust. ([a07041e](https://github.com/xdy/xdy-pf2e-workbench/commit/a07041e3d89f90ee6e4fdff9a7bca43f3719becc))

## [2.21.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v2.21.6...v2.21.7) (2022-01-29)


### Bug Fixes

* The autorolling damage setting is now compatible with PF2e Tweaks "Compact chat cards" tweak. ([3ffdcd4](https://github.com/xdy/xdy-pf2e-workbench/commit/3ffdcd4105aa04ed28fe630a6fce59855834d6bc))

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
