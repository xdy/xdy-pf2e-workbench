## [6.27.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.5...v6.27.6) (2025-08-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0a0da02](https://github.com/xdy/xdy-pf2e-workbench/commit/0a0da02b3b0fa1b1caa821ff32eb3408a23c6707))

## [6.27.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.4...v6.27.5) (2025-08-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([467d7d0](https://github.com/xdy/xdy-pf2e-workbench/commit/467d7d089c9789e82795dcf2f19fb8fddf0ec846))

## [6.27.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.3...v6.27.4) (2025-08-04)


### Bug Fixes

* Fix Basic Action Macros for gms (who don't have a set character). ([c1c4357](https://github.com/xdy/xdy-pf2e-workbench/commit/c1c4357813b773e29d2d109c88c6971753da5e38))

## [6.27.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.2...v6.27.3) (2025-08-04)


### Bug Fixes

* Keeping up with the Macro Faeries. ([35e8601](https://github.com/xdy/xdy-pf2e-workbench/commit/35e8601a64df7357f37b513fbf34ad526774653d))

## [6.27.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.1...v6.27.2) (2025-08-03)


### Bug Fixes

* Ran lint ([94e8930](https://github.com/xdy/xdy-pf2e-workbench/commit/94e89302da51eba36bdbf522b45db865b4059c32))

## [6.27.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.27.0...v6.27.1) (2025-08-03)


### Bug Fixes

* 'Fix' build by adding a ts-ignore ([28efc7c](https://github.com/xdy/xdy-pf2e-workbench/commit/28efc7c220d9180e0f544a22c967e8e2b2f28ccf))
* Reverts build change (bringing back compendiums removed in previous version) and enforces that node must be less than 22 when building (node 22 gets this error: "ModuleError: Iterator is not open: cannot call all() after close()") ([508a0d3](https://github.com/xdy/xdy-pf2e-workbench/commit/508a0d3fad58bf1135b2ddf0a1d71c7282ce0f4c))


### Reverts

* Revert "feat: Customizable macros and the internal utility macros have been removed from the module for now. (They can still be found here if needed: https://github.com/xdy/xdy-pf2e-workbench/tree/main/src/packs/data/xdy-customizable-macros and https://github.com/xdy/xdy-pf2e-workbench/tree/main/src/packs/data/xdy-internal-utility-macros)." ([a84b2ba](https://github.com/xdy/xdy-pf2e-workbench/commit/a84b2baf7b79e747fe5481e0bfa74c308f1050e9))

# [6.27.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.26.4...v6.27.0) (2025-07-29)


### Features

* Customizable macros and the internal utility macros have been removed from the module for now. (They can still be found here if needed: https://github.com/xdy/xdy-pf2e-workbench/tree/main/src/packs/data/xdy-customizable-macros and https://github.com/xdy/xdy-pf2e-workbench/tree/main/src/packs/data/xdy-internal-utility-macros). ([8aa51ca](https://github.com/xdy/xdy-pf2e-workbench/commit/8aa51cac6daa61350da564b7191bd94ed0bf56be))

## [6.26.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.26.3...v6.26.4) (2025-07-03)


### Bug Fixes

* 'Fix' macro keybind setting descriptions by removing localization. I.e. it's english only, but at least the column and page is visible now. ([ee9b238](https://github.com/xdy/xdy-pf2e-workbench/commit/ee9b2381cd001cc2e5c397eaf25c4623dac52643))
* Mystify should work from hud again. ([ff74b32](https://github.com/xdy/xdy-pf2e-workbench/commit/ff74b32045ef34de27791f4d9926de47c9001333))

## [6.26.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.26.2...v6.26.3) (2025-06-23)


### Bug Fixes

* Removing the setting to center pause image (already default in v13) and move text above the image (not possible in v13 it seems.) ([00bc5fd](https://github.com/xdy/xdy-pf2e-workbench/commit/00bc5fd51e41270f49cbd6f93fa8828761a28562))
* Stop breaking the npc mystification button on the token hud... ([14666d9](https://github.com/xdy/xdy-pf2e-workbench/commit/14666d934422078893dbc92cd0fe2e4d2b03d8c0))

## [6.26.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.26.1...v6.26.2) (2025-06-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([6775870](https://github.com/xdy/xdy-pf2e-workbench/commit/6775870644a9acba011d7bae5c58756f1f8fddd3))

## [6.26.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.26.0...v6.26.1) (2025-06-07)


### Bug Fixes

* Remove setting for autorolling damage for 'All spells' as it doesn't work. If you had that selected, select another option in the dropdown. ([aacf58c](https://github.com/xdy/xdy-pf2e-workbench/commit/aacf58c0dc973d5bf884d8edcebd7d49b8e3d868))

# [6.26.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.8...v6.26.0) (2025-06-05)


### Features

* Update verified versions to foundry 13.344 and pf2e 7.1.1. ([e64b12e](https://github.com/xdy/xdy-pf2e-workbench/commit/e64b12ee5fd089a96dceef10dec043ce542dfc01))

## [6.25.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.7...v6.25.8) (2025-06-05)


### Bug Fixes

* BAM: Show current tab, adjust spacing ([fc12b8e](https://github.com/xdy/xdy-pf2e-workbench/commit/fc12b8e606de3f065f11ec49cd8094e3250b751e))
* Update eslint config so it works with current version ([9eb0c43](https://github.com/xdy/xdy-pf2e-workbench/commit/9eb0c436230eb09c7afb6136d5e137b9153a2e65))

## [6.25.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.6...v6.25.7) (2025-06-02)


### Bug Fixes

* Make BAM work for v13 again. ([fea69ad](https://github.com/xdy/xdy-pf2e-workbench/commit/fea69ad1324f4904e6501c24a7155d371e3ea986))

## [6.25.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.5...v6.25.6) (2025-05-31)


### Bug Fixes

* Fix damage from agile actions, improve formatting ([a0fc51c](https://github.com/xdy/xdy-pf2e-workbench/commit/a0fc51c12dd7a627bbd71a341a2ce97d4d2075a1))
* Fix style of tab headers in BAM ([6355846](https://github.com/xdy/xdy-pf2e-workbench/commit/6355846ca2031b9774cf760b8f2d4cc43c19d1e1))
* Make BAM work on v12/13 and fix non-tabview section headers ([ad8263c](https://github.com/xdy/xdy-pf2e-workbench/commit/ad8263c5e9de3ef9f06512842a57241d3c44d5be))


### Reverts

* Revert "fix: Make BAM work on v12 again." ([caddac1](https://github.com/xdy/xdy-pf2e-workbench/commit/caddac19e05ec40f3728ac84db6737911b9a5c3a))

## [6.25.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.4...v6.25.5) (2025-05-30)


### Bug Fixes

* Make BAM work on v12 again. ([527830e](https://github.com/xdy/xdy-pf2e-workbench/commit/527830e13df23ae1ebb2244c861c9b7579228e7f))

## [6.25.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.3...v6.25.4) (2025-05-29)


### Bug Fixes

* Make basic action macros use dialogv2. ([fb2a576](https://github.com/xdy/xdy-pf2e-workbench/commit/fb2a5769bb3c7f36f8455e9ca2d336ca13b0ef5a))

## [6.25.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.2...v6.25.3) (2025-05-26)


### Bug Fixes

* Exit early in a few more places. Cache chat messages in a few places. ([025fd93](https://github.com/xdy/xdy-pf2e-workbench/commit/025fd933ca0a5c056952f648d9525225df8f0485))
* Keeping up with the Macro Faeries. ([4f98540](https://github.com/xdy/xdy-pf2e-workbench/commit/4f985400e58f507c5aecfefdfebc424accc73d7d))
* Reduce jquery use. ([9f4d18c](https://github.com/xdy/xdy-pf2e-workbench/commit/9f4d18c92a75d241aed4a0d62c662a223b587c4d))

## [6.25.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.1...v6.25.2) (2025-05-17)


### Bug Fixes

* Update hook handling. ([f27ae52](https://github.com/xdy/xdy-pf2e-workbench/commit/f27ae522fb282ad25114fcb0fe9a67d02a3a2174))

## [6.25.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.25.0...v6.25.1) (2025-05-05)


### Bug Fixes

* Update verified version ([6a8af0e](https://github.com/xdy/xdy-pf2e-workbench/commit/6a8af0e340f61138835db9787ffbff0002000fa7))

# [6.25.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.24.0...v6.25.0) (2025-05-05)


### Bug Fixes

* Better css for pause image courtesy of monax3 ([32a3d14](https://github.com/xdy/xdy-pf2e-workbench/commit/32a3d147b8c37f58c12a39d49d3469441d0ae43c)), closes [#1602](https://github.com/xdy/xdy-pf2e-workbench/issues/1602)


### Features

* Add basic support for pf2e 7 alpha/foundry v13 ([9c4913a](https://github.com/xdy/xdy-pf2e-workbench/commit/9c4913a6d7a96204fd2bb672243f277a96fecee3))

# [6.24.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.5...v6.24.0) (2025-04-30)


### Features

* Add support for changing the npc mystification icon. Change to fa 6 classes everywhere while I was at it. ([afab78d](https://github.com/xdy/xdy-pf2e-workbench/commit/afab78d926402723656e00171a14456a4171b8a4))

## [6.23.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.4...v6.23.5) (2025-04-30)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4f7ee35](https://github.com/xdy/xdy-pf2e-workbench/commit/4f7ee35c132e718673a4237e99531a3dddd9594f))

## [6.23.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.3...v6.23.4) (2025-04-25)


### Bug Fixes

* Keeping up with the Macro Faeries. ([9e75129](https://github.com/xdy/xdy-pf2e-workbench/commit/9e75129e627b6a420017ac3a3bc068df290b2ea3))

## [6.23.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.2...v6.23.3) (2025-04-16)


### Bug Fixes

* Keeping up with the Macro Faeries. ([825de62](https://github.com/xdy/xdy-pf2e-workbench/commit/825de62dfd28192ba4ce518f3ea1929ea99db11d))

## [6.23.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.1...v6.23.2) (2025-04-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([2d9cd97](https://github.com/xdy/xdy-pf2e-workbench/commit/2d9cd97c545611877e982d1cea0fee63b69d7397))

## [6.23.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.23.0...v6.23.1) (2025-04-12)


### Bug Fixes

* BAM Athletics Actions (Other than Escape) now have an Agile button in addition to normal button ([ad5c9b6](https://github.com/xdy/xdy-pf2e-workbench/commit/ad5c9b622fcf05e29be64e12b715c1b29912ccb1))

# [6.23.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.22.1...v6.23.0) (2025-03-31)


### Features

* For autorolling spell damage, add the setting "For all spells" ([dfec985](https://github.com/xdy/xdy-pf2e-workbench/commit/dfec985d1e6ff4de0a3cd325e93c253dd35b0daa))

## [6.22.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.22.0...v6.22.1) (2025-03-31)


### Bug Fixes

* If autorolling damage is enabled, don't autoroll if a spell is both a save spell and an attack spell (e.g. Disintegrate). Clarify setting hint. ([0decc9e](https://github.com/xdy/xdy-pf2e-workbench/commit/0decc9ef9b2603d12d4be463d1e6be28b3371372))

# [6.22.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.21.3...v6.22.0) (2025-03-28)


### Features

* Add setting to stop pause image from spinning. ([64a74af](https://github.com/xdy/xdy-pf2e-workbench/commit/64a74afe64bceb408e0d60392d54daa98ef35c20))

## [6.21.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.21.2...v6.21.3) (2025-03-25)


### Bug Fixes

* Allow hazards with 0 hit points to attack. Handle token without actor when checking attack validity. ([ad3ada2](https://github.com/xdy/xdy-pf2e-workbench/commit/ad3ada293a0e7a1f989f990bbd45c1e0f4d93f9a))
* Keeping up with the Macro Faeries. ([fa81946](https://github.com/xdy/xdy-pf2e-workbench/commit/fa819464c7a019b3a429f31255ca5cecdbb50924))

## [6.21.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.21.1...v6.21.2) (2025-03-22)


### Bug Fixes

* Removed stray tag. ([6ecd562](https://github.com/xdy/xdy-pf2e-workbench/commit/6ecd562ec0b01062f38e0fc303b4f24cc28126ff))

## [6.21.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.21.0...v6.21.1) (2025-03-22)


### Bug Fixes

* Improved Hypercognition macro. (Shows target, shows summary in a gm text block.) ([72d41e7](https://github.com/xdy/xdy-pf2e-workbench/commit/72d41e7078f782e4952bc1f5a6da4789a9552273))

# [6.21.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.20.0...v6.21.0) (2025-03-15)


### Features

* Adds the hypercognition macro which has basic support for Hypercognition, True Hypercognition and Incredible Recollection using the Symon-provided Recall_Knowledge macro. ([e248e50](https://github.com/xdy/xdy-pf2e-workbench/commit/e248e50de9e0ccdcd58987d31f4e7d9de8d1202b))

# [6.20.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.19.0...v6.20.0) (2025-03-15)


### Features

* Add option to auto-sheathe held items at end of encounter if they are of the configured item types (normally 'weapon'). ([ed025dc](https://github.com/xdy/xdy-pf2e-workbench/commit/ed025dc58c3238196ded8d2a21f3f8f8edd21706)), closes [#639](https://github.com/xdy/xdy-pf2e-workbench/issues/639)

# [6.19.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.18.0...v6.19.0) (2025-03-15)


### Features

* Add option to, when autorevealing a privately cast spell, always override the roll mode for that message to public. ([0e22f6c](https://github.com/xdy/xdy-pf2e-workbench/commit/0e22f6c76cdadaeb3063b8f041454e9433f3b348))

# [6.18.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.17.0...v6.18.0) (2025-03-15)


### Bug Fixes

* Remove unused minimumUserRole macro flag along with .xdy-pf2e-workbench-hide css class. Small cleanup of hook handling. ([3877274](https://github.com/xdy/xdy-pf2e-workbench/commit/38772748ae81ceb3a9b22c80b57c7f68a560ead2)), closes [#782](https://github.com/xdy/xdy-pf2e-workbench/issues/782)


### Features

* Option to hide or reveal traits from Spell Mystification public message. ([5f81011](https://github.com/xdy/xdy-pf2e-workbench/commit/5f81011fb74de570200abcaab371d73f15307230)), closes [#1387](https://github.com/xdy/xdy-pf2e-workbench/issues/1387)

# [6.17.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.8...v6.17.0) (2025-03-14)


### Features

* Adds hero point house rule option "Keep the best roll". If you had Keeley's selected previously you will need to reselect it in the dropdown. ([14e2f4c](https://github.com/xdy/xdy-pf2e-workbench/commit/14e2f4c070b4cec457339a04e3da76b8500643c5)), closes [#1595](https://github.com/xdy/xdy-pf2e-workbench/issues/1595)
* Adds the option when mystifing tokens to exclude actor types by adding to a comma-separated list. The possible values are army,character,familiar,hazard,loot,npc,party,vehicle. (Party members are always excluded from being possible to mystify.) ([b74aba2](https://github.com/xdy/xdy-pf2e-workbench/commit/b74aba2c07f02a59a53c3d574e44d824ceff5d60)), closes [#1562](https://github.com/xdy/xdy-pf2e-workbench/issues/1562)
* Adds the option when mystifing tokens to remember the original token name rather than the actor name and restore that when demystifiying. (The old behaviour to instead remember the prototype token's name is the default.) ([150bdc0](https://github.com/xdy/xdy-pf2e-workbench/commit/150bdc0ef32f4a1f2774c69ca25a29b305d5fb4b)), closes [#1590](https://github.com/xdy/xdy-pf2e-workbench/issues/1590)
* Make it clearer that token mystification always excludes party members from being mystified, regardless of actor type. ([a36b05e](https://github.com/xdy/xdy-pf2e-workbench/commit/a36b05e07373c6573f910a60c97f9f21d8cecced)), closes [#1537](https://github.com/xdy/xdy-pf2e-workbench/issues/1537)

## [6.16.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.7...v6.16.8) (2025-03-09)


### Bug Fixes

* Add originMessageUuid to privateSpell flag. ([e40a828](https://github.com/xdy/xdy-pf2e-workbench/commit/e40a8288549ec311cfe44f8f2bd3d8d51a26bbf8))

## [6.16.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.6...v6.16.7) (2025-03-02)


### Bug Fixes

* buildNpcSpellbookJournal works again, courtesy of @Freeze ([abe141d](https://github.com/xdy/xdy-pf2e-workbench/commit/abe141d589d71191d5258dfc76f53b4c1dd3ab57))

## [6.16.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.5...v6.16.6) (2025-02-21)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e261b62](https://github.com/xdy/xdy-pf2e-workbench/commit/e261b62e128cebc1a606eb99eb4118fa44a623ec))

## [6.16.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.4...v6.16.5) (2025-02-06)


### Bug Fixes

* Keeping up with the Macro Faeries. ([9e07b9e](https://github.com/xdy/xdy-pf2e-workbench/commit/9e07b9e8efc798d8f706c981cc38eb816c338029))

## [6.16.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.3...v6.16.4) (2025-02-02)


### Bug Fixes

* Avoids sending the same item to chat multiple times (listener was added once per time the sheet was opened...) ([ff1d9e2](https://github.com/xdy/xdy-pf2e-workbench/commit/ff1d9e254cab84881ffc3391f3ce5c011b19d637))

## [6.16.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.2...v6.16.3) (2025-01-31)


### Bug Fixes

* Reverts the previous "fix: Reducing frightened value should now reduce all non-locked frightened conditions on a character above the minimum frightened value by the appropriate amount." ([f417e29](https://github.com/xdy/xdy-pf2e-workbench/commit/f417e29a110ee6092c9a53cd72f3407de8f22842))

## [6.16.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.1...v6.16.2) (2025-01-28)


### Bug Fixes

* Only *one* person should handle icon click ([9990d27](https://github.com/xdy/xdy-pf2e-workbench/commit/9990d271afd6f4512824b400937b0beadbf88ee9))

## [6.16.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.16.0...v6.16.1) (2025-01-27)


### Bug Fixes

* Reducing frightened value should now reduce all non-locked frightened conditions on a character above the minimum frightened value by the appropriate amount. ([dfc96f2](https://github.com/xdy/xdy-pf2e-workbench/commit/dfc96f2b046026c5e8cc199306d074b70f08fd1a))

# [6.16.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.15.4...v6.16.0) (2025-01-26)


### Features

* Add qol option to change the send to chat of spells to send a link to the spell item rather than the whole spell. ([31697b4](https://github.com/xdy/xdy-pf2e-workbench/commit/31697b42cc29655a04b9142b2c8662fb216c9521))

## [6.15.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.15.3...v6.15.4) (2025-01-19)


### Bug Fixes

* For targeting reminder, ignore messages without context type. ([020b734](https://github.com/xdy/xdy-pf2e-workbench/commit/020b7348cc95931c37672d748d31d3bb2f22e0b6))

## [6.15.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.15.2...v6.15.3) (2025-01-19)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e3c738c](https://github.com/xdy/xdy-pf2e-workbench/commit/e3c738c3b328c0f3fff8eb90f8766db518eab912))

## [6.15.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.15.1...v6.15.2) (2025-01-15)


### Bug Fixes

* Improved randomPartymemberThatHasNotReceivedAHeropoint method. ([b7f502c](https://github.com/xdy/xdy-pf2e-workbench/commit/b7f502ca96a02ca3db9d802be9b33f4e8f78282f))

## [6.15.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.15.0...v6.15.1) (2025-01-07)


### Bug Fixes

* Re-adds "Aura: Aura of Despair" to Workbench items compendium. ([d0d289a](https://github.com/xdy/xdy-pf2e-workbench/commit/d0d289ad846f50221263ca72a7a4c2be43871801))

# [6.15.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.6...v6.15.0) (2025-01-07)


### Features

* Add hero point handler randomization settings: no selection, random party member, or party member who hasn't received a point. Defaults to random (i.e. the way it used to work). ([0c7a612](https://github.com/xdy/xdy-pf2e-workbench/commit/0c7a612bc1091618f6e9d0105bd21fbb0da7d9ae))

## [6.14.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.5...v6.14.6) (2025-01-04)


### Bug Fixes

* Keeping up with the Macro Faeries. ([9329199](https://github.com/xdy/xdy-pf2e-workbench/commit/9329199d20e8ecf714a9840bd3bd8319b9d33f0e))

## [6.14.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.4...v6.14.5) (2025-01-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8aba1f2](https://github.com/xdy/xdy-pf2e-workbench/commit/8aba1f2d5e3ff28ca73499936d2ee22308f72f7a))
* Keeping up with the Macro Faeries. ([8dbd596](https://github.com/xdy/xdy-pf2e-workbench/commit/8dbd596dbd1c3df1c06ea77d6552b87d87abe439))

## [6.14.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.3...v6.14.4) (2025-01-03)


### Bug Fixes

* Improve persistent damage handling safety checks ([35654c9](https://github.com/xdy/xdy-pf2e-workbench/commit/35654c9fc1e88cf052205b8bce8110174d95450b))

## [6.14.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.2...v6.14.3) (2025-01-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a1b5f7d](https://github.com/xdy/xdy-pf2e-workbench/commit/a1b5f7dc4820f8b401a039d21394fd799e185a94))

## [6.14.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.1...v6.14.2) (2025-01-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([9c8a96c](https://github.com/xdy/xdy-pf2e-workbench/commit/9c8a96c263b29fe3fcdfdaf64eca9c02b461245a))

## [6.14.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.14.0...v6.14.1) (2024-12-29)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ae30ae2](https://github.com/xdy/xdy-pf2e-workbench/commit/ae30ae28f0c384cad1ccf91e5717f4b97f8e54f9))

# [6.14.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.13.0...v6.14.0) (2024-12-20)


### Bug Fixes

* Add typescript types for the macro source ([e4de2eb](https://github.com/xdy/xdy-pf2e-workbench/commit/e4de2eb3bca011efba13554010ff754284e9c478))
* No need to install fvtt or build modules in workflow ([0bcb0fc](https://github.com/xdy/xdy-pf2e-workbench/commit/0bcb0fc285eff4c17e9cee019b279a86aa7bdc1e))


### Features

* Build compendium pack for macros as leveldb ([7d8ffb3](https://github.com/xdy/xdy-pf2e-workbench/commit/7d8ffb3d0f1160139b2104ad3cfd47e25c672ea3))
* Build leveldb files for xdy-customizable-macros and xdy-internal-utility-macros ([c1ee923](https://github.com/xdy/xdy-pf2e-workbench/commit/c1ee923fe9ebdf6dfd3bafef373e12cc81a65287))
* Get foundryvtt-cli from fork on github ([d62b796](https://github.com/xdy/xdy-pf2e-workbench/commit/d62b79694eacfc4829a76906491efcca2bd2975d))

# [6.13.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.10...v6.13.0) (2024-12-20)


### Features

* Set minimum and verified pf2e version to 6.8.0. Update types. ([0cb2722](https://github.com/xdy/xdy-pf2e-workbench/commit/0cb2722199c39f4bdca90ff8cfbce6f6411231f8))

## [6.12.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.9...v6.12.10) (2024-12-19)


### Bug Fixes

* Keeping up with the Macro Faeries. ([43686b8](https://github.com/xdy/xdy-pf2e-workbench/commit/43686b8056a2c812a156504e01881dfb7e0356c5))

## [6.12.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.8...v6.12.9) (2024-12-19)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4f755f3](https://github.com/xdy/xdy-pf2e-workbench/commit/4f755f328ebfbb8ad6c1ed6d3c173baaf9703829))

## [6.12.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.7...v6.12.8) (2024-12-18)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f36ed33](https://github.com/xdy/xdy-pf2e-workbench/commit/f36ed336e143100994564dec65e29595daf681b4))

## [6.12.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.6...v6.12.7) (2024-12-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([488f42b](https://github.com/xdy/xdy-pf2e-workbench/commit/488f42bbcbd19a1052393da0e1315aa89ac1733a))

## [6.12.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.5...v6.12.6) (2024-12-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d7b146a](https://github.com/xdy/xdy-pf2e-workbench/commit/d7b146a6ed1bcb4adc8c25b9801edd5b8aa50449))

## [6.12.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.4...v6.12.5) (2024-12-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4e89108](https://github.com/xdy/xdy-pf2e-workbench/commit/4e89108ccd305a494276d9317a21e45f9c15fb1c))

## [6.12.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.3...v6.12.4) (2024-11-15)


### Bug Fixes

* Dirge of Doom effect didn't apply Frightened ([aed76b7](https://github.com/xdy/xdy-pf2e-workbench/commit/aed76b76c261173b203cdbb38f876cd8754cb5f0))

## [6.12.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.2...v6.12.3) (2024-11-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([aab0a91](https://github.com/xdy/xdy-pf2e-workbench/commit/aab0a9159c9f0d99a5a2191bef2fcdb759abb1ca))

## [6.12.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.1...v6.12.2) (2024-11-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8d71965](https://github.com/xdy/xdy-pf2e-workbench/commit/8d71965b63a7dc4ff6dcb27abdc16706d8e6d1de))

## [6.12.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.12.0...v6.12.1) (2024-11-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4a1f4a9](https://github.com/xdy/xdy-pf2e-workbench/commit/4a1f4a943743fc27a3f30367aa7be4e37cfd1205))

# [6.12.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.11.1...v6.12.0) (2024-10-31)


### Features

* Add Make an Impression with Performance to BAM ([9e69692](https://github.com/xdy/xdy-pf2e-workbench/commit/9e69692561a7dc50c3b9fa51994e7279b2105bf2))

## [6.11.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.11.0...v6.11.1) (2024-10-31)


### Bug Fixes

* Don't autoroll damage due to a damage-taken message... ([2b9c3cb](https://github.com/xdy/xdy-pf2e-workbench/commit/2b9c3cb29103f1b3de8ca7ac0a8893865a713e0f))

# [6.11.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.10.0...v6.11.0) (2024-10-26)


### Features

* Set foundry verified version to 12.331 and maximum to 13, minimum and verified pf2e version to 6.5.0. Update types. ([2133b84](https://github.com/xdy/xdy-pf2e-workbench/commit/2133b8477edbe4d144475c6874882fae306f3332))

# [6.10.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.9.2...v6.10.0) (2024-10-26)


### Bug Fixes

* Keeping up with the Macro Faeries. ([01b159b](https://github.com/xdy/xdy-pf2e-workbench/commit/01b159bda5ba4d2e44a183e2cf85a71c19a9475c))


### Features

* Add Drop Prone to BAM ([350a620](https://github.com/xdy/xdy-pf2e-workbench/commit/350a620785d540fc33ec0b2aeb3a4685c9fea4f1))

## [6.9.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.9.1...v6.9.2) (2024-10-20)


### Bug Fixes

* Don't hide crafting item information ([b015494](https://github.com/xdy/xdy-pf2e-workbench/commit/b01549471e0b6e4121f27551341bfb65c73b9f6b))
* Fix logic for alt skills with feat in BAM ([698988b](https://github.com/xdy/xdy-pf2e-workbench/commit/698988bdf34aa59e6daa07b08ff090ede2d98666))

## [6.9.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.9.0...v6.9.1) (2024-10-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8d33a63](https://github.com/xdy/xdy-pf2e-workbench/commit/8d33a638166ec34f8a7692e306b47a6105f3f991))

# [6.9.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.10...v6.9.0) (2024-10-13)


### Bug Fixes

* Get rid of deprecation warning on settings submenus ([4e91e36](https://github.com/xdy/xdy-pf2e-workbench/commit/4e91e36f15f376aeeae4e0a6009e05fb29c914a9))


### Features

* Add option for Recall Knowledge breakdown style ([5ff4468](https://github.com/xdy/xdy-pf2e-workbench/commit/5ff4468d097cecf0498492f8c97d00282ef02354))

## [6.8.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.9...v6.8.10) (2024-10-07)


### Bug Fixes

* Remove the feature that tried to mystify speaker and use of name in chat messages, it caused too many problems. ([ed03da9](https://github.com/xdy/xdy-pf2e-workbench/commit/ed03da9a06c7f1a8a628ca9196125fd07d13550e))

## [6.8.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.8...v6.8.9) (2024-10-06)


### Bug Fixes

* Keeping up with the Macro Faeries. ([90d143b](https://github.com/xdy/xdy-pf2e-workbench/commit/90d143b1d75c01726fd3c6cb4ab7d603daf9e023))

## [6.8.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.7...v6.8.8) (2024-10-04)


### Bug Fixes

* Keeping up with the Macro Faeries. ([10b9178](https://github.com/xdy/xdy-pf2e-workbench/commit/10b9178e1f80cf2191dac5050449605257ef1752))

## [6.8.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.6...v6.8.7) (2024-10-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e5017bb](https://github.com/xdy/xdy-pf2e-workbench/commit/e5017bb6ccbe8ee546079ff063e02a86396449a8))

## [6.8.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.5...v6.8.6) (2024-09-28)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ec8a9b7](https://github.com/xdy/xdy-pf2e-workbench/commit/ec8a9b7f6390357ff98fb447d2ab646915cb398a))

## [6.8.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.4...v6.8.5) (2024-09-23)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0a9b930](https://github.com/xdy/xdy-pf2e-workbench/commit/0a9b930ae01480c0cd80786a97cdb1b54718e811))

## [6.8.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.3...v6.8.4) (2024-09-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([cc2434d](https://github.com/xdy/xdy-pf2e-workbench/commit/cc2434d32a31bcfb6f80e822b9f7851616b2b859))

## [6.8.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.2...v6.8.3) (2024-09-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([45bd860](https://github.com/xdy/xdy-pf2e-workbench/commit/45bd86044b611aaea8ca1b677fd8db6505d0c72d))

## [6.8.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.1...v6.8.2) (2024-09-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([db6cc0f](https://github.com/xdy/xdy-pf2e-workbench/commit/db6cc0f121d1fde95050559d498068d45b9b313f))
* Trim the mystification rolltable setting to avoid errors when loading table. ([fc4f6ee](https://github.com/xdy/xdy-pf2e-workbench/commit/fc4f6ee24c883e69a233d1afd347a008ea3ee833))

## [6.8.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.8.0...v6.8.1) (2024-08-31)


### Bug Fixes

* Private Spellcasting now checks all prepared slots, courtesy of 7H3LaughingMan. ([6886c64](https://github.com/xdy/xdy-pf2e-workbench/commit/6886c6453acd9c15f6015a1c2fe8d81718c68490))

# [6.8.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.21...v6.8.0) (2024-08-23)


### Features

* Adds hook to npc mystification courtesy of 7H3LaughingMan ([1e02176](https://github.com/xdy/xdy-pf2e-workbench/commit/1e021764649990a0310d38d6ce0e42aac5c92254)), closes [#1438](https://github.com/xdy/xdy-pf2e-workbench/issues/1438)

## [6.7.21](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.20...v6.7.21) (2024-08-23)


### Bug Fixes

* NPC Scaler now scales skills. ([b5c24ee](https://github.com/xdy/xdy-pf2e-workbench/commit/b5c24eea2435b5bc7932b9d89dbd77678d11e06a))

## [6.7.20](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.19...v6.7.20) (2024-08-19)


### Bug Fixes

* Be a bit more defensive about reaching into party. I somehow got a null party member in a game this weekend. A couple more places. ([84e7cde](https://github.com/xdy/xdy-pf2e-workbench/commit/84e7cdec24debb0be9cb3da0e56247e0e6aa1f94))

## [6.7.19](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.18...v6.7.19) (2024-08-19)


### Bug Fixes

* Be a bit more defensive about reaching into party. I somehow got a null party member in a game this weekend. ([a7e3f0f](https://github.com/xdy/xdy-pf2e-workbench/commit/a7e3f0fa6df0d54d3be7fe07cb8654ef4fa3f76a))

## [6.7.18](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.17...v6.7.18) (2024-08-12)


### Bug Fixes

* Improve label handling for npc scaler. ([76304fe](https://github.com/xdy/xdy-pf2e-workbench/commit/76304fe35af8e8785b6b43d262e96233db3ba5f8))

## [6.7.17](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.16...v6.7.17) (2024-08-12)


### Bug Fixes

* Npc scaler should now handle resistance and weakness values correctly. Update types and set minimum pf2e system version to 6.2.1 ([f3bf422](https://github.com/xdy/xdy-pf2e-workbench/commit/f3bf422cc745379519c9a2f6cfe51f0398940590))

## [6.7.16](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.15...v6.7.16) (2024-08-09)


### Bug Fixes

* Remove settings for client control of auto apply persistent ([d758aaf](https://github.com/xdy/xdy-pf2e-workbench/commit/d758aaf3c1cfd969aec869c895132528e62ebc2b))

## [6.7.15](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.14...v6.7.15) (2024-08-03)


### Bug Fixes

* Stop double-encoding pause image path, courtesy of oWave ([ab68bb4](https://github.com/xdy/xdy-pf2e-workbench/commit/ab68bb458d5a968091108cc185739cd9c418967a))

## [6.7.14](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.13...v6.7.14) (2024-08-02)


### Bug Fixes

* Better pause image fix ([140e1d6](https://github.com/xdy/xdy-pf2e-workbench/commit/140e1d6c807cee7834ae02aa6feff9acb3e35301))

## [6.7.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.12...v6.7.13) (2024-08-02)


### Bug Fixes

* Make BAM work with Dorako UI ([41c1588](https://github.com/xdy/xdy-pf2e-workbench/commit/41c15889e40cc375e01265d7ead95d778074d01d))

## [6.7.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.11...v6.7.12) (2024-08-01)


### Bug Fixes

* Require pf2e 6.2.0, updated types. ([5262e87](https://github.com/xdy/xdy-pf2e-workbench/commit/5262e8796c82d8e8ea52d16bb058afd7cedecec9))

## [6.7.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.10...v6.7.11) (2024-08-01)


### Bug Fixes

* Make pause image url handling more robust. ([7078d86](https://github.com/xdy/xdy-pf2e-workbench/commit/7078d86b1084d7081642d1c0b145799d4da73e6a))

## [6.7.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.9...v6.7.10) (2024-07-31)


### Bug Fixes

* Another try at making pause text work. ([1f55cca](https://github.com/xdy/xdy-pf2e-workbench/commit/1f55cca5e697573c253f4d3362d9fb5a37977296))

## [6.7.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.8...v6.7.9) (2024-07-31)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f2c0c62](https://github.com/xdy/xdy-pf2e-workbench/commit/f2c0c62b6ccae5e257eb9505508789ea2bb29bff))

## [6.7.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.7...v6.7.8) (2024-07-29)


### Bug Fixes

* Keeping up with the Macro Faeries. ([6ff1f5a](https://github.com/xdy/xdy-pf2e-workbench/commit/6ff1f5a49e073cb613623268890b8f694d15425e))

## [6.7.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.6...v6.7.7) (2024-07-28)


### Bug Fixes

* Token animation speed now works when dragging to 0,0 ([c499d18](https://github.com/xdy/xdy-pf2e-workbench/commit/c499d1867ba83430f3a222c9f2571214f9dc33b7))

## [6.7.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.5...v6.7.6) (2024-07-28)


### Bug Fixes

* Actually turn off changing the paused text in v12. (Not sure it'll return.) ([87783ba](https://github.com/xdy/xdy-pf2e-workbench/commit/87783bab675164d8a143efa4d5992e2b5ffe7da1))

## [6.7.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.4...v6.7.5) (2024-07-25)


### Bug Fixes

* require pf2e 6.1.2 and foundry 12.330, update types ([b5449f0](https://github.com/xdy/xdy-pf2e-workbench/commit/b5449f0db045b34ba604b654f2f0ec7efbab7915))

## [6.7.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.3...v6.7.4) (2024-07-24)


### Bug Fixes

* Use the traits listed for creature identification skills for mystification. ([cfb25bc](https://github.com/xdy/xdy-pf2e-workbench/commit/cfb25bcca69c2ea80263b08317edc0047070ef8e))

## [6.7.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.2...v6.7.3) (2024-07-24)


### Bug Fixes

* Re-add spirit to creature traits. ([195156c](https://github.com/xdy/xdy-pf2e-workbench/commit/195156c38c8a747b966f545aba949db0142d5a67))

## [6.7.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.1...v6.7.2) (2024-07-24)


### Bug Fixes

* De-OGL:ing the Workbench part 1 of n ([a36a549](https://github.com/xdy/xdy-pf2e-workbench/commit/a36a5494513b34446f707f03a70183c2570be64d))

## [6.7.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.7.0...v6.7.1) (2024-07-22)


### Bug Fixes

* Unify apply persistent damage/healing, add roll options ([bbcfbc8](https://github.com/xdy/xdy-pf2e-workbench/commit/bbcfbc897eeaf4b83222833d9212293402d547d4))

# [6.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.15...v6.7.0) (2024-07-20)


### Features

* Support pf2e 6.1.0 ([78f05f7](https://github.com/xdy/xdy-pf2e-workbench/commit/78f05f7fbb7f815fbbf426e913e2ac4f1f6e1f87))

## [6.6.15](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.14...v6.6.15) (2024-07-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([c488928](https://github.com/xdy/xdy-pf2e-workbench/commit/c4889281a103ab733b9fa9d7441b74e0a9c58a64))

## [6.6.14](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.13...v6.6.14) (2024-07-19)


### Bug Fixes

* Set required foundry version to 12.329, update and rebuild all compendiums. ([58dbc2c](https://github.com/xdy/xdy-pf2e-workbench/commit/58dbc2c8d13b755fbce31cfac3d075ff46b6d405))

## [6.6.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.12...v6.6.13) (2024-07-15)


### Bug Fixes

* Update of auto apply persistent damage and recovery roll ([47e1cdb](https://github.com/xdy/xdy-pf2e-workbench/commit/47e1cdbd5ec389556237bd18703123c315def32d))
* Update of auto apply persistent healing similar to how auto apply persistent damage is done. ([59070ba](https://github.com/xdy/xdy-pf2e-workbench/commit/59070ba9d42676c70a7c19b1f95bc34647c30961))

## [6.6.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.11...v6.6.12) (2024-07-15)


### Bug Fixes

* Scale To Level now handles weakness right, courtesy of FelixSteffen. ([260b049](https://github.com/xdy/xdy-pf2e-workbench/commit/260b0498940acc5f46ee3e077b18dce0b8cc769f))

## [6.6.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.10...v6.6.11) (2024-07-12)


### Bug Fixes

* When casting spells privately should now show properly whether a save is basic or not. ([f78b8ca](https://github.com/xdy/xdy-pf2e-workbench/commit/f78b8ca17e3e5f4cd10afc735ac5ff975440d229))

## [6.6.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.9...v6.6.10) (2024-07-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([df6bcf6](https://github.com/xdy/xdy-pf2e-workbench/commit/df6bcf656d006e8628b1aa5271d8b1d3c76ab600))

## [6.6.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.8...v6.6.9) (2024-07-09)


### Bug Fixes

* Revert "fix: Use system code to see who should handle a hooked event." ([6f57369](https://github.com/xdy/xdy-pf2e-workbench/commit/6f5736905f9784f2bb1a21cf1a6a421c2bb96012))

## [6.6.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.7...v6.6.8) (2024-07-06)


### Bug Fixes

* Use system code to see who should handle a hooked event. ([1a31207](https://github.com/xdy/xdy-pf2e-workbench/commit/1a31207b74243091786eb3ebeecfd171f0ee7d3c))

## [6.6.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.6...v6.6.7) (2024-07-05)


### Bug Fixes

* Deep and arcane css black magic. (I.e. search and replace a couple of names so as to hopefully not conflict with Nikolaj's new module.) ([4f29015](https://github.com/xdy/xdy-pf2e-workbench/commit/4f29015a63055e43fe8b26f5c8de88d944dc7111))

## [6.6.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.5...v6.6.6) (2024-07-04)


### Bug Fixes

* Applying Persistent Damage and/or Persistent Healing works again. ([137500e](https://github.com/xdy/xdy-pf2e-workbench/commit/137500e6c8886a599763cb3f883ce0637ca804ed))

## [6.6.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.4...v6.6.5) (2024-07-01)


### Bug Fixes

* Made Breath Weapon reminder a bit more robust. ([7552f37](https://github.com/xdy/xdy-pf2e-workbench/commit/7552f376d3d2b4e51e8c2f5f22a44d98fb03aca5)), closes [#1381](https://github.com/xdy/xdy-pf2e-workbench/issues/1381)

## [6.6.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.3...v6.6.4) (2024-06-30)


### Bug Fixes

* Avoid triggering Breath Weapon reminder on Dragon Form (and other polymorph abilities that include action descriptions). ([a203f4c](https://github.com/xdy/xdy-pf2e-workbench/commit/a203f4cdd7b00e4068a731f034b0c0443c07290c))

## [6.6.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.2...v6.6.3) (2024-06-30)


### Bug Fixes

* Breath Weapon reminder works again. ([67799b1](https://github.com/xdy/xdy-pf2e-workbench/commit/67799b1aa7ffd9cc04421966fb506c30e0fb200d)), closes [#1347](https://github.com/xdy/xdy-pf2e-workbench/issues/1347)

## [6.6.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.1...v6.6.2) (2024-06-29)


### Bug Fixes

* Don't show modifier (-1) for BAM actions with no skill ([142ef7e](https://github.com/xdy/xdy-pf2e-workbench/commit/142ef7e48afd1a2a7ff3d0e5db029bd46c6ad6b5))

## [6.6.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.6.0...v6.6.1) (2024-06-28)


### Bug Fixes

* BAM: Use lowercase skill names ([930cd20](https://github.com/xdy/xdy-pf2e-workbench/commit/930cd20c63cc81741eb9d1dcf01f115a6b5a1a51))

# [6.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.5.0...v6.6.0) (2024-06-23)


### Features

* Add Point-Out to BAM ([d3059e0](https://github.com/xdy/xdy-pf2e-workbench/commit/d3059e04f8c90323eaadf1c3a0929dcadfe0910c))

# [6.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.4.0...v6.5.0) (2024-06-21)


### Features

* Instead of hiding autorolled damage rolls of privately cast spells (or, optionally, obfuscating the name of the spell) always show the damage roll with an obfuscated spell name. ([51511df](https://github.com/xdy/xdy-pf2e-workbench/commit/51511df49c0ae66031452ef63d4e78a95881f2ef))

# [6.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.3.1...v6.4.0) (2024-06-18)


### Features

* Add image to Automatic Arcance Cascade macro ([735bbf2](https://github.com/xdy/xdy-pf2e-workbench/commit/735bbf2bb9ed21c6d86f68866d8e4db92e7f081f))
* BAM: Wrap macros in a class ([56675bb](https://github.com/xdy/xdy-pf2e-workbench/commit/56675bbf223b8847d0934465dc0c2baff3a80fda)), closes [#878](https://github.com/xdy/xdy-pf2e-workbench/issues/878)

## [6.3.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.3.0...v6.3.1) (2024-06-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([3c43644](https://github.com/xdy/xdy-pf2e-workbench/commit/3c436440d7599d3252e59b24a72cf8f8ffec1a47))
* Re-fix icons path. ([3ac6525](https://github.com/xdy/xdy-pf2e-workbench/commit/3ac65258aa3cc58c1cbc6e5bd32185019c7fbcda))

# [6.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.2.2...v6.3.0) (2024-06-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d66d23e](https://github.com/xdy/xdy-pf2e-workbench/commit/d66d23edbfd3e8f3ab988a1e6f30c8cd948444e7))


### Features

* Added flag to actor after stun has been reduced in combat, for use by other modules. ([cb306d1](https://github.com/xdy/xdy-pf2e-workbench/commit/cb306d1b3f8088082551280647ee601cf081c870))

## [6.2.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.2.1...v6.2.2) (2024-06-12)


### Bug Fixes

* Changing pause image and text should now work again courtesy of 7H3LaughingMan. ([933e840](https://github.com/xdy/xdy-pf2e-workbench/commit/933e8403c4009eb4aa9d33f5124e2dd865339495))

## [6.2.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.2.0...v6.2.1) (2024-06-11)


### Bug Fixes

* Keeping up with the Macro Faeries. ([59433ed](https://github.com/xdy/xdy-pf2e-workbench/commit/59433edd722e2f9dd83be3c409f6bfc0ff493802))

# [6.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.1.0...v6.2.0) (2024-06-10)


### Features

* Messed up previous fix. Thankfully, Trent had just submitted a better fix. So, update and reimport. ([b876039](https://github.com/xdy/xdy-pf2e-workbench/commit/b87603966e6b0978b7ab5e11695b9c3523a3ba86))

# [6.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.0.1...v6.1.0) (2024-06-10)


### Features

* Fixes calling Symon's macros (individual macros may still be broken in v12). NOTE! As this is a change in the calling macro, you need to reimport all previously imported macros. (Or, edit them yourself to replace the string DOCUMENT_PERMISSION_LEVELS with DOCUMENT_OWNERSHIP_LEVELS in all the imported macros.) ([6d2f593](https://github.com/xdy/xdy-pf2e-workbench/commit/6d2f5937a0e43a59a2ea8829ec737b73a8269f20))

## [6.0.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v6.0.0...v6.0.1) (2024-06-10)


### Bug Fixes

* Keeping up with the Macro Faeries. (And require pf2e 6.0.1 and foundry 12.327) ([5b20001](https://github.com/xdy/xdy-pf2e-workbench/commit/5b200017249580322391135b605f5b462029cab3))

# [6.0.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.66.0...v6.0.0) (2024-06-05)


### Features

* PF2e Workbench now requires PF2e version 6.0.0-beta3 or later, and Foundry v12.325 or later. ([2a3f115](https://github.com/xdy/xdy-pf2e-workbench/commit/2a3f115f2732b71db93ed08d1630f1dbf101b73f)), closes [#1338](https://github.com/xdy/xdy-pf2e-workbench/issues/1338)


### BREAKING CHANGES

* PF2e Workbench now requires PF2e version 6.0.0-beta3 or later, and Foundry v12.325 or later.

Changing paused text is disabled for now as it is broken, will try to fix later.
Same goes for Breath Weapon Reminders.

This release has barely been tested, so there is probably more breakage. Please make github issues when you find something that doesn't work, if there isn't already an issue. PR:s with fixes are even more welcome. :)

# [5.66.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.11...v5.66.0) (2024-06-05)


### Features

* BAM: Get rid eval() for action variants ([557827c](https://github.com/xdy/xdy-pf2e-workbench/commit/557827c2d80d18d95e1b4234bff30cdbde36f33a))
* BAM: Get rid of eval for Actions with a statistic ([9e8b92f](https://github.com/xdy/xdy-pf2e-workbench/commit/9e8b92f8f66a303e6f53898c7346c5fccdbde580))
* BAM: Remove last eval'ed string ([2eee213](https://github.com/xdy/xdy-pf2e-workbench/commit/2eee213180c34aa96455d5ab55d2fa019ce270e0))

## [5.65.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.10...v5.65.11) (2024-06-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0fec1f6](https://github.com/xdy/xdy-pf2e-workbench/commit/0fec1f6c50694732a7ee07a668ae2bdeaa7a9e7a))

## [5.65.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.9...v5.65.10) (2024-06-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([1c6fece](https://github.com/xdy/xdy-pf2e-workbench/commit/1c6fecebd91252d129e457110a7bf15abc0cffba))

## [5.65.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.8...v5.65.9) (2024-06-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([82329fa](https://github.com/xdy/xdy-pf2e-workbench/commit/82329fa3398006fb545e514bdcc5801a598c5813))

## [5.65.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.7...v5.65.8) (2024-05-22)


### Bug Fixes

* Keeping up with the Macro Faeries. ([28bf96a](https://github.com/xdy/xdy-pf2e-workbench/commit/28bf96a35905d2e18c25bcf47404cc445666438e))

## [5.65.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.6...v5.65.7) (2024-05-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e670ded](https://github.com/xdy/xdy-pf2e-workbench/commit/e670ded8b97db197b655b757bc5470ece6fe1bbb))

## [5.65.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.5...v5.65.6) (2024-05-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([dfa6d37](https://github.com/xdy/xdy-pf2e-workbench/commit/dfa6d3776ad65d2e19c233b261a2b01c35a0318b))

## [5.65.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.4...v5.65.5) (2024-05-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([46f9091](https://github.com/xdy/xdy-pf2e-workbench/commit/46f90914f50eeeff70fb8db3027341b4040e0601))

## [5.65.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.3...v5.65.4) (2024-05-04)


### Bug Fixes

* Keeping up with the Macro Faeries. ([aa7f93e](https://github.com/xdy/xdy-pf2e-workbench/commit/aa7f93eabdeb7d5afa07746aee5bdb2d134916ec))

## [5.65.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.2...v5.65.3) (2024-05-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([839c479](https://github.com/xdy/xdy-pf2e-workbench/commit/839c479c620fbb2401b8b93edcd29a644fc21884))

## [5.65.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.1...v5.65.2) (2024-04-30)


### Bug Fixes

* Keeping up with the Macro Faeries. ([34cdcab](https://github.com/xdy/xdy-pf2e-workbench/commit/34cdcabff32bd56e6c50c2ff5449fd51b22d6853))

## [5.65.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.65.0...v5.65.1) (2024-04-26)


### Bug Fixes

* Another go at fixing custom pause text. ([bd6164b](https://github.com/xdy/xdy-pf2e-workbench/commit/bd6164b13ec39a6d4dadafde99bae234d2c3e5ef))

# [5.65.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.64.2...v5.65.0) (2024-04-22)


### Features

* New and improved Follow the Expert macro, courtesy of @Trent ([d124cd5](https://github.com/xdy/xdy-pf2e-workbench/commit/d124cd50e79775f9cc33c8ff413f659398b0f378))

## [5.64.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.64.1...v5.64.2) (2024-04-22)


### Bug Fixes

* Autorolling damage for players should work again. Hopefully without breaking something else. ([a793bfd](https://github.com/xdy/xdy-pf2e-workbench/commit/a793bfdc34fc815d24b98c7b1fcc5b96f96c7db2))
* Changing pause text should work again. ([2b22585](https://github.com/xdy/xdy-pf2e-workbench/commit/2b22585447bfb5360b832ed24d818304a5bd3f6c))

## [5.64.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.64.0...v5.64.1) (2024-04-19)


### Bug Fixes

* Add originCastRank: message.flags.pf2e.origin.castRank instead  ([a7c8ace](https://github.com/xdy/xdy-pf2e-workbench/commit/a7c8acee853cfd39b88850bc1a92ab15af72adb8))

# [5.64.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.63.1...v5.64.0) (2024-04-19)


### Features

* Add flag xdy-pf2e-workbench.privateSpell.originMessageId to the private spellcasting public message. ([dd477b9](https://github.com/xdy/xdy-pf2e-workbench/commit/dd477b94dd9b0adb4a38ef276b827ca4b2024517))

## [5.63.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.63.0...v5.63.1) (2024-04-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([db13e89](https://github.com/xdy/xdy-pf2e-workbench/commit/db13e89b350b1fd8823bd5564942d445a83744e3))

# [5.63.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.62.2...v5.63.0) (2024-04-13)


### Features

* BAM: Add support for the Aid macro from Reyzor's PF2e Macros. ([75cf659](https://github.com/xdy/xdy-pf2e-workbench/commit/75cf6596f192ac56cd10a4e25023353de311aaac))

## [5.62.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.62.1...v5.62.2) (2024-04-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([cff521e](https://github.com/xdy/xdy-pf2e-workbench/commit/cff521ef5b143b2f2542d2470801edfeb5a6b8a9))

## [5.62.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.62.0...v5.62.1) (2024-04-07)


### Bug Fixes

* Keeping up with the Macro Faeries. ([69465f7](https://github.com/xdy/xdy-pf2e-workbench/commit/69465f7aba8978c00679ccf4f98cdd15489f3cb4))

# [5.62.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.61.1...v5.62.0) (2024-04-07)


### Features

* Readds remastered Refocus. (Handles the various *Focus feats, but not Psychics, Crimson Oath Devotion, and Oracle curses.) ([5699846](https://github.com/xdy/xdy-pf2e-workbench/commit/56998469565c4a65cdf74e64cbdf0e776aed8362))

## [5.61.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.61.0...v5.61.1) (2024-04-07)


### Bug Fixes

* Autorolling damage should work again. ([350c165](https://github.com/xdy/xdy-pf2e-workbench/commit/350c1656a6dc89b65afd4fd3bc7e04fb5879bf65))

# [5.61.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.60.0...v5.61.0) (2024-04-05)


### Features

* Step out of the way if pf2e-target-helper is configured to autoroll damage for save spells. ([15fea28](https://github.com/xdy/xdy-pf2e-workbench/commit/15fea2812df3ec9c28a7c48cbb840ed014f1f334))

# [5.60.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.59.4...v5.60.0) (2024-04-05)


### Features

* Hide the public message save button (but keep text that shows whether it's a basic save) if PF2e Target Helper is active as that adds it's own save buttons. ([c77eb56](https://github.com/xdy/xdy-pf2e-workbench/commit/c77eb569bd96fbef869bc9e388a1b218b12f5670))

## [5.59.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.59.3...v5.59.4) (2024-03-31)


### Bug Fixes

* When casting spells privately with a public message, show whether a spell save is basic or not. ([3fc2f4b](https://github.com/xdy/xdy-pf2e-workbench/commit/3fc2f4b9d73002cfefcb281f41d6344e4d9c95d9))

## [5.59.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.59.2...v5.59.3) (2024-03-31)


### Bug Fixes

* Keeping up with the Macro Faeries. ([345e424](https://github.com/xdy/xdy-pf2e-workbench/commit/345e4247ecd86ee393b046d8a5fd9ded91cf8c34))

## [5.59.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.59.1...v5.59.2) (2024-03-31)


### Bug Fixes

* Add correct traits to Dirge of Doom Aura RE, courtesy of DocSchlock, icon for Generate All Spells macro courtesy of Symon S. ([eb56c45](https://github.com/xdy/xdy-pf2e-workbench/commit/eb56c45c6a8efcdab3dfe06d91b410abe626fbfd))

## [5.59.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.59.0...v5.59.1) (2024-03-27)


### Bug Fixes

* Drental pointed out that there were still imgur links in the customizable macros, these have been replaced with the same icons that are in the non customizable macros. ([d0af852](https://github.com/xdy/xdy-pf2e-workbench/commit/d0af8528d3cc24bd4c30e40b65d910276730fbc8))

# [5.59.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.9...v5.59.0) (2024-03-26)


### Features

* Add conditional visibility of settings on menu forms, courtesy of @Clemente ([fbb8bc0](https://github.com/xdy/xdy-pf2e-workbench/commit/fbb8bc0209c9c0007194cdf4a995736625c99ddb))

## [5.58.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.8...v5.58.9) (2024-03-23)


### Bug Fixes

* Avoid undefined is not iterable error ([1abb7a0](https://github.com/xdy/xdy-pf2e-workbench/commit/1abb7a05a26bbacda9e3fccfe235aaaded856ae8))

## [5.58.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.7...v5.58.8) (2024-03-17)


### Bug Fixes

* When checking if a privately cast spell is known by a party member, verify that prepared spells are actually prepared and not just on the spell preparation shortlist. ([0eceedc](https://github.com/xdy/xdy-pf2e-workbench/commit/0eceedc0eb8b91f3c028df4942da6b269ba09ae7)), closes [#1265](https://github.com/xdy/xdy-pf2e-workbench/issues/1265)

## [5.58.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.6...v5.58.7) (2024-03-15)


### Bug Fixes

* Update release process ([e659202](https://github.com/xdy/xdy-pf2e-workbench/commit/e659202f720a319ac76885eb80e72158d8204842))

## [5.58.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.5...v5.58.6) (2024-03-15)


### Bug Fixes

* Testing release process ([7654147](https://github.com/xdy/xdy-pf2e-workbench/commit/76541474f78fc365ce256a9a066f25d03707fa50))

## [5.58.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.4...v5.58.5) (2024-03-15)


### Bug Fixes

* Testing release process ([d15eeeb](https://github.com/xdy/xdy-pf2e-workbench/commit/d15eeebf550744b61d08bd55a1c57aefe05f1598))

## [5.58.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.3...v5.58.4) (2024-03-15)


### Bug Fixes

* Test release process ([26808e1](https://github.com/xdy/xdy-pf2e-workbench/commit/26808e1898327bae4e57b35fdf578f4e18e235f6))

## [5.58.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.2...v5.58.3) (2024-03-15)


### Bug Fixes

* Test release process ([c4f3312](https://github.com/xdy/xdy-pf2e-workbench/commit/c4f331205eec69b9d977312edade2d4c030e126b))

## [5.58.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.1...v5.58.2) (2024-03-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([65a0bd1](https://github.com/xdy/xdy-pf2e-workbench/commit/65a0bd1353930c73c493668638faafa4c01ac9fb))

## [5.58.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.58.0...v5.58.1) (2024-03-10)


### Bug Fixes

* *Actually* set minimun and verified foundry version to 11.315 and minimum and verified pf2e version to 5.14.1 ([c4c956d](https://github.com/xdy/xdy-pf2e-workbench/commit/c4c956db28643b28715cf337c97804cc19c6d95c))

# [5.58.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.57.2...v5.58.0) (2024-03-10)


### Features

* Add option to, when collapsing item chat cards by default, move any effect links to outside the collapsed area so they are always visible. ([dada351](https://github.com/xdy/xdy-pf2e-workbench/commit/dada35185d4ea6d2e4474f18cc38ddb5ff5b6eed))
* Set verified foundry version to 11.315 and minimum and verified version to 5.14.1, updated pf2e types. ([26986dc](https://github.com/xdy/xdy-pf2e-workbench/commit/26986dcd890c1e26dfe8bb052545d4cfe24d0563))

## [5.57.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.57.1...v5.57.2) (2024-03-10)


### Bug Fixes

* Keeping up with the Macro Faeries. ([5a7fa38](https://github.com/xdy/xdy-pf2e-workbench/commit/5a7fa38b98e7713b8ac3d9974349cbc295fc9db1))

## [5.57.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.57.0...v5.57.1) (2024-03-06)


### Bug Fixes

* Keeping up with the Macro Faeries. ([22661f2](https://github.com/xdy/xdy-pf2e-workbench/commit/22661f2c70448b7a6c872616cd0edf67834f79dd))

# [5.57.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.9...v5.57.0) (2024-02-29)


### Features

* Add option to show rarity color on the crafting tab. Some cleanup of the colorization code. ([97a0da4](https://github.com/xdy/xdy-pf2e-workbench/commit/97a0da4e824d43b2f14e47f39cf0d4fa0de72d35))

## [5.56.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.8...v5.56.9) (2024-02-29)


### Bug Fixes

* Colorization of spell and feat rarity options now work again, as well as indication of feat prerequisites. ([d3dd6aa](https://github.com/xdy/xdy-pf2e-workbench/commit/d3dd6aa26090fc5b2c3793baa55a04bbc9802d22))

## [5.56.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.7...v5.56.8) (2024-02-27)


### Bug Fixes

* More robust handling of persistent damage if that option is enabled. ([90bb41a](https://github.com/xdy/xdy-pf2e-workbench/commit/90bb41afc0db42459fc3adf082c1bc684d310222))

## [5.56.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.6...v5.56.7) (2024-02-25)


### Bug Fixes

* Show the correct save when casting spells privately (fixes the issues with double-dipping on adjustments by sending the message from the GM rather than the caster.) ([59dfe79](https://github.com/xdy/xdy-pf2e-workbench/commit/59dfe79af838ee01d2271f9066462aa5163e01b5))

## [5.56.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.5...v5.56.6) (2024-02-24)


### Bug Fixes

* Use of Keeley's hero point rule should be visible in chat again. ([9e460d0](https://github.com/xdy/xdy-pf2e-workbench/commit/9e460d0039bbee2ba4018d423e3932aba7f6fd67))

## [5.56.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.4...v5.56.5) (2024-02-24)


### Bug Fixes

* When npcs cast spells privately, don't doubledip on elite/weak adjustments. ([d5935d1](https://github.com/xdy/xdy-pf2e-workbench/commit/d5935d1333b69dff2bc7f23db2fa6402217e64ad))

## [5.56.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.3...v5.56.4) (2024-02-24)


### Bug Fixes

* Not all actors have items. ([fa00db9](https://github.com/xdy/xdy-pf2e-workbench/commit/fa00db99eecf5e1899c09805dd5db5c2ce07d168))

## [5.56.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.2...v5.56.3) (2024-02-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8501c23](https://github.com/xdy/xdy-pf2e-workbench/commit/8501c23642fe88695dccfb000c0f1cd530d8efa9))
* When collapsing attack chat cards, make the eye that indicates 'click here to expand' visible again, and make it possible to click anywhere on the title row to expand/collapse. ([9565627](https://github.com/xdy/xdy-pf2e-workbench/commit/9565627f41792e5c52d8b7e75e09699f27245a1e))

## [5.56.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.1...v5.56.2) (2024-02-17)


### Bug Fixes

* Remove empty match in breath weapon reminder. ([8353177](https://github.com/xdy/xdy-pf2e-workbench/commit/8353177fc36106b5f07327ecacda5d44f5d7ee00))

## [5.56.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.56.0...v5.56.1) (2024-02-17)


### Bug Fixes

* For the Breath Weapon Reminder, support the format of some 3pp products and use the ability title in the icon again. ([1507d6a](https://github.com/xdy/xdy-pf2e-workbench/commit/1507d6a9268c414147d145d342057ec207220379))

# [5.56.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.55.0...v5.56.0) (2024-02-17)


### Features

* If the option to automatically reduce stun is enabled it is now handled for minions as long as the owning player is online (the same as for automatically reducing frightened.) ([bb4f086](https://github.com/xdy/xdy-pf2e-workbench/commit/bb4f086b84807a78c2fdaa664a0f97f781e240a7))

# [5.55.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.54.4...v5.55.0) (2024-02-15)


### Features

* Add an option to show the public message to the gm also when casting a spell privately. ([2d57c62](https://github.com/xdy/xdy-pf2e-workbench/commit/2d57c624a2eecbb8bd27a517815be660ebfa0d9b)), closes [#1232](https://github.com/xdy/xdy-pf2e-workbench/issues/1232)

## [5.54.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.54.3...v5.54.4) (2024-02-11)


### Bug Fixes

* Improve description of autorevealing privately cast spells. Fix handling of damagerolls with no context options. ([a75c0dc](https://github.com/xdy/xdy-pf2e-workbench/commit/a75c0dc6d16ee830b3177122ffb346ba70b35eaf))

## [5.54.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.54.2...v5.54.3) (2024-02-11)


### Bug Fixes

* Autorolling damage for save spells now rolls damage on a successful save if it's a basic save. Cleaned up the autorolling damage code. ([db10f26](https://github.com/xdy/xdy-pf2e-workbench/commit/db10f26dd231d22a4fe524b640093585296b17b8))

## [5.54.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.54.1...v5.54.2) (2024-02-10)


### Bug Fixes

* Keeping up with the Macro Faeries. ([64b8dc2](https://github.com/xdy/xdy-pf2e-workbench/commit/64b8dc288f5581900f464cf16fa75abd00a10513))

## [5.54.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.54.0...v5.54.1) (2024-02-10)


### Bug Fixes

* buildNpcSpellbookJournal now only tries to handle spellcastingentries that contain the spells property (i.e. it avoids item spellcasting entries). ([a08f2fe](https://github.com/xdy/xdy-pf2e-workbench/commit/a08f2fed1138930120e594ff73a8d67ef2610da8))

# [5.54.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.53.0...v5.54.0) (2024-02-09)


### Features

* Adds option for private casting that if a party member knowing a spell causes it to be cast openly, list those party members in the chat card. ([8113639](https://github.com/xdy/xdy-pf2e-workbench/commit/8113639d49d89147a305a159dd8a3f5744e9056c)), closes [#1231](https://github.com/xdy/xdy-pf2e-workbench/issues/1231)

# [5.53.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.5...v5.53.0) (2024-02-09)


### Features

* When casting a spell privately with the option to hide the spell name in the damage roll, show the true spell name to the GM. Cleaned up private spell casting. ([b483762](https://github.com/xdy/xdy-pf2e-workbench/commit/b483762618af6045ff58610f07e460fe59f35745))

## [5.52.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.4...v5.52.5) (2024-02-09)


### Bug Fixes

* Breath weapon reminder should work again. ([a3ac5dd](https://github.com/xdy/xdy-pf2e-workbench/commit/a3ac5dd8df1ddc4e4cd3d52345001af5c33fbfa2)), closes [#1238](https://github.com/xdy/xdy-pf2e-workbench/issues/1238)

## [5.52.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.3...v5.52.4) (2024-02-05)


### Bug Fixes

* Debounce dropped item handling to avoid an abundantly redundant excess of tautologically repetitive messages in triplicate echoing in the chat. ([2fa8644](https://github.com/xdy/xdy-pf2e-workbench/commit/2fa864452a39cbd77c4a7558ff7aa172273d6a53))

## [5.52.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.2...v5.52.3) (2024-02-05)


### Bug Fixes

* The option to make characters drop their held items when becoming unconscious should now work again. ([6580a89](https://github.com/xdy/xdy-pf2e-workbench/commit/6580a89694a08e0c2f976eca466678a2f7d51915))

## [5.52.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.1...v5.52.2) (2024-02-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([de75ee4](https://github.com/xdy/xdy-pf2e-workbench/commit/de75ee4f579736f7c55123b81ec21ab8d98c3808))

## [5.52.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.52.0...v5.52.1) (2024-02-02)


### Bug Fixes

* BAM: Add back glow and colors to the buttons, fix the background image. Courtesy of [@omegarogue9344](https://github.com/omegarogue9344) and [@xyzzy42](https://github.com/xyzzy42) ([556b9d2](https://github.com/xdy/xdy-pf2e-workbench/commit/556b9d291822c6a502e8b8f5165a28237dc40729))

# [5.52.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.51.0...v5.52.0) (2024-02-01)


### Features

* Awesome rework of Basic Action Macros, courtesy of [@omegarogue9344](https://github.com/omegarogue9344) ([98e5c80](https://github.com/xdy/xdy-pf2e-workbench/commit/98e5c80ed895c18b781153fa65017531a05d06de))

# [5.51.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.50.1...v5.51.0) (2024-01-31)


### Features

* Set minimum pf2e version to 5.13.0, updated types. ([077da26](https://github.com/xdy/xdy-pf2e-workbench/commit/077da26d13e707002ddb862d7e10d2fd051e797f))

## [5.50.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.50.0...v5.50.1) (2024-01-30)


### Bug Fixes

* Revert "feat: BAM: Add support for Versatile Performance." ([4453ba5](https://github.com/xdy/xdy-pf2e-workbench/commit/4453ba58e9d0dd12686903589cd8c48fa2f9d036))

# [5.50.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.49.3...v5.50.0) (2024-01-30)


### Features

* BAM: Add support for Versatile Performance. ([b7f1a18](https://github.com/xdy/xdy-pf2e-workbench/commit/b7f1a181254befea4a6e114e719174db20fe48be))

## [5.49.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.49.2...v5.49.3) (2024-01-29)


### Bug Fixes

* Keeping up with the Macro Faeries. ([fcac54b](https://github.com/xdy/xdy-pf2e-workbench/commit/fcac54bbc6f9ea0e3452c5bcaff8b260dd28c4ec))

## [5.49.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.49.1...v5.49.2) (2024-01-27)


### Bug Fixes

* NPC Scaling should scale perception correctly again. ([9f52757](https://github.com/xdy/xdy-pf2e-workbench/commit/9f527573d6b46029d5fe8dccc1795ce0f3af8688)), closes [#1198](https://github.com/xdy/xdy-pf2e-workbench/issues/1198)

## [5.49.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.49.0...v5.49.1) (2024-01-27)


### Bug Fixes

* Revert to old release workflow ([27d1ef3](https://github.com/xdy/xdy-pf2e-workbench/commit/27d1ef3d931a129f658cbb6a1d095b6ca9b786c4))

# [5.49.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.48.0...v5.49.0) (2024-01-27)


### Bug Fixes

* Fix release process ([82448cd](https://github.com/xdy/xdy-pf2e-workbench/commit/82448cda625b2efe5a2596792c74805e58fdf8ca))


### Features

* Add option to allow casting privately even if party member knows the spell. ([b0fadb8](https://github.com/xdy/xdy-pf2e-workbench/commit/b0fadb8f7c2cd3d8bf6e833a7bf74887464742ec)), closes [#1208](https://github.com/xdy/xdy-pf2e-workbench/issues/1208)

# [5.48.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.47.1...v5.48.0) (2024-01-21)


### Features

* Add setting to show hero point handler messages in chat (default) or as info notifications. ([5667899](https://github.com/xdy/xdy-pf2e-workbench/commit/56678997af8fe75aab873633efd283140d64d024)), closes [#1202](https://github.com/xdy/xdy-pf2e-workbench/issues/1202)

## [5.47.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.47.0...v5.47.1) (2024-01-21)


### Bug Fixes

* Rebuild release ([9426049](https://github.com/xdy/xdy-pf2e-workbench/commit/942604981b51433972ce2bb39484fc416192e76f))

# [5.47.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.13...v5.47.0) (2024-01-21)


### Features

* If private spellcasting with public message is enabled the public message is whispered to all players, but not the GM. (Unless the gm is alone in the world, in which case the GM does get that message.) ([9b8febe](https://github.com/xdy/xdy-pf2e-workbench/commit/9b8febee0b1bba73c7b583c2d3969ff4a06208f8)), closes [#1199](https://github.com/xdy/xdy-pf2e-workbench/issues/1199)

## [5.46.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.12...v5.46.13) (2024-01-21)


### Bug Fixes

* Fixes more Autorolling damage bugs. Should now work for regular strikes and elemental blasts. ([6bfb565](https://github.com/xdy/xdy-pf2e-workbench/commit/6bfb5652774e7e6dd70ed253e997963988262f9a))

## [5.46.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.11...v5.46.12) (2024-01-21)


### Bug Fixes

* Several Autorolling damage bugs fixed, should work for save spells as well as attack spells. ([292ea26](https://github.com/xdy/xdy-pf2e-workbench/commit/292ea2692397f97978707b5908e9db35a357e8a2)), closes [#1201](https://github.com/xdy/xdy-pf2e-workbench/issues/1201)

## [5.46.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.10...v5.46.11) (2024-01-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([72fc3af](https://github.com/xdy/xdy-pf2e-workbench/commit/72fc3af458853bf609478aa0d02412b192978d9a))

## [5.46.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.9...v5.46.10) (2024-01-17)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e845897](https://github.com/xdy/xdy-pf2e-workbench/commit/e845897e6064deabc8762920323e8ef2760e53be))

## [5.46.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.8...v5.46.9) (2024-01-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([5aa7591](https://github.com/xdy/xdy-pf2e-workbench/commit/5aa75910f7a2f068be9f415383da1ee60097da69))

## [5.46.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.7...v5.46.8) (2024-01-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([281e3e3](https://github.com/xdy/xdy-pf2e-workbench/commit/281e3e35a3c8059cea70f09f341beb1429dabe96))

## [5.46.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.6...v5.46.7) (2024-01-11)


### Bug Fixes

* Remove sustained from workbench auras. ([b5f1554](https://github.com/xdy/xdy-pf2e-workbench/commit/b5f155407adee5994e226312e3024c0c251e9875)), closes [#1197](https://github.com/xdy/xdy-pf2e-workbench/issues/1197)

## [5.46.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.5...v5.46.6) (2024-01-08)


### Bug Fixes

* Another go at fixing dying automation. ([0bfc1ed](https://github.com/xdy/xdy-pf2e-workbench/commit/0bfc1ed320f287ff577709949300660488a90a86))

## [5.46.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.4...v5.46.5) (2024-01-08)


### Bug Fixes

* BAM: Support sending shift to action macros again. ([951f554](https://github.com/xdy/xdy-pf2e-workbench/commit/951f554cbb8dd2c565e2e401f5714e22f28d52cc))

## [5.46.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.3...v5.46.4) (2024-01-08)


### Bug Fixes

* Made housepatcher ignore items previously patched by it or CCC (i.e. it won't patch anything with the traits "(HOUSEPATCHED)" or "(CCC PATCHED)" ). ([155ef62](https://github.com/xdy/xdy-pf2e-workbench/commit/155ef626b0f25aca7c35eea623fef808841c54fa))

## [5.46.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.2...v5.46.3) (2024-01-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e6c4c9e](https://github.com/xdy/xdy-pf2e-workbench/commit/e6c4c9eda95e86e6d83d3e37e2195ab877a9253e))

## [5.46.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.1...v5.46.2) (2024-01-07)


### Bug Fixes

* BAM: Improved handling of attack, downtime and exploration traits. ([e891354](https://github.com/xdy/xdy-pf2e-workbench/commit/e89135478cf14f86364930a88510e9be2d3c6541)), closes [#1112](https://github.com/xdy/xdy-pf2e-workbench/issues/1112)

## [5.46.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.46.0...v5.46.1) (2024-01-07)


### Bug Fixes

* BAM: Added "Create a Diversion - Distracting Words". Changed Administer First Aid, Create A Diversion, Decipher Writing, Performance, Subsist to use new style actions. Added i18n for Reposition. Cleaned up the code. ([2a2ab48](https://github.com/xdy/xdy-pf2e-workbench/commit/2a2ab487563942de41ee95abbd3bf7acc31278ec)), closes [#1195](https://github.com/xdy/xdy-pf2e-workbench/issues/1195)

# [5.46.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.14...v5.46.0) (2024-01-07)


### Bug Fixes

* BAM: Use new-style actions for Disarm, Feint, Gather Information, Grapple, Impersonate, Jump (High), Make an Impression and Shove. ([cc7a526](https://github.com/xdy/xdy-pf2e-workbench/commit/cc7a526db41c0efe35c356ff6326ae656c2b9559))
* When handling nonlethal damage, check rollOption instead of item trait. ([dfd9597](https://github.com/xdy/xdy-pf2e-workbench/commit/dfd95977cc134e35cd4e9a50dacb1da1d726ed6c))


### Features

* Update types, remove use of deprecated methods. Set minimum and verified pf2e to 5.12.0 ([bfe644c](https://github.com/xdy/xdy-pf2e-workbench/commit/bfe644cad0fdc87cec838ebaf1192dec20ef8105)), closes [#1194](https://github.com/xdy/xdy-pf2e-workbench/issues/1194)

## [5.45.14](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.13...v5.45.14) (2024-01-06)


### Bug Fixes

* Stupid typos are stupid... ([cfbd20e](https://github.com/xdy/xdy-pf2e-workbench/commit/cfbd20e92af0a31c00c0146cfb147d75a141be4c))

## [5.45.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.12...v5.45.13) (2024-01-06)


### Bug Fixes

* Twice more unto the breach... ([15d5343](https://github.com/xdy/xdy-pf2e-workbench/commit/15d5343af970dd3514689fa4bbe8abd65053d800))

## [5.45.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.11...v5.45.12) (2024-01-06)


### Bug Fixes

* Once more unto the breach... ([f85c013](https://github.com/xdy/xdy-pf2e-workbench/commit/f85c013dcb7d8872396f855b1f55e746898f67bc))

## [5.45.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.10...v5.45.11) (2024-01-06)


### Bug Fixes

* Overcomplicating things... ([1f44986](https://github.com/xdy/xdy-pf2e-workbench/commit/1f4498617edafc846546089237c738112d6a3878))

## [5.45.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.9...v5.45.10) (2024-01-06)


### Bug Fixes

* Deploy problems part infinity ([8114d54](https://github.com/xdy/xdy-pf2e-workbench/commit/8114d543e2ea660812165eaa970bdb6f41cc8bbd))

## [5.45.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.8...v5.45.9) (2024-01-06)


### Bug Fixes

* I don't like yaml formatting. :( ([acd9522](https://github.com/xdy/xdy-pf2e-workbench/commit/acd95225e596293aae41bd90dd2c505a41f1e4fe))

## [5.45.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.7...v5.45.8) (2024-01-06)


### Bug Fixes

* Like this then? ([8b5cc04](https://github.com/xdy/xdy-pf2e-workbench/commit/8b5cc044bbf89623dd355d1f7af1577cf06b4bb2))
* Or, like this? ([9592ec2](https://github.com/xdy/xdy-pf2e-workbench/commit/9592ec23c59f05b9ee6ac10a0ca6a5b7c13d4859))
* Script the version? ([607c5d9](https://github.com/xdy/xdy-pf2e-workbench/commit/607c5d9244ce391d36811c2c15fc1abf99eee55c))
* Use the github variable ([0f2cbee](https://github.com/xdy/xdy-pf2e-workbench/commit/0f2cbee81f2d74428debba2b8c2ce0ae2c4beae1))

## [5.45.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.6...v5.45.7) (2024-01-06)


### Bug Fixes

* Define ref-name ([064b87e](https://github.com/xdy/xdy-pf2e-workbench/commit/064b87e982302806abb60fec6ed76259370c5ddc))
* Format yaml ([d48f98b](https://github.com/xdy/xdy-pf2e-workbench/commit/d48f98bafc7a6ef5b86a4715395b093603ce8a17))

## [5.45.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.5...v5.45.6) (2024-01-06)


### Bug Fixes

* Typo ([c93b43f](https://github.com/xdy/xdy-pf2e-workbench/commit/c93b43f1538836be234022998576d2bebec08e34))

## [5.45.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.4...v5.45.5) (2024-01-06)


### Bug Fixes

* Try curl ([3da835a](https://github.com/xdy/xdy-pf2e-workbench/commit/3da835a52bc6b40faa9f6be08609bf799f48ad64))

## [5.45.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.3...v5.45.4) (2024-01-06)


### Bug Fixes

* Yet another try ([3399962](https://github.com/xdy/xdy-pf2e-workbench/commit/3399962d0ba49e706a80113aa0a397c0ed10b929))

## [5.45.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.2...v5.45.3) (2024-01-06)


### Bug Fixes

* Another try ([61e6be3](https://github.com/xdy/xdy-pf2e-workbench/commit/61e6be3cb627e4735d319fe9844895f1008ca824))

## [5.45.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.1...v5.45.2) (2024-01-06)


### Bug Fixes

* Another try at using ghost's foundry-publish ([939238d](https://github.com/xdy/xdy-pf2e-workbench/commit/939238de889eef36f72aed8d62bf8eabca5e0ebb))

## [5.45.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.45.0...v5.45.1) (2024-01-03)


### Bug Fixes

* Changed the option "Characters automatically drop held items on becoming unconscious." so that items with the trait "free-hand" (e.g. gauntlets) are treated like strapped shields, e.g. they go from held to worn instead of being dropped. ([54777d5](https://github.com/xdy/xdy-pf2e-workbench/commit/54777d57d2232d3cd2cb1f11b56709695c724997)), closes [#1189](https://github.com/xdy/xdy-pf2e-workbench/issues/1189)

# [5.45.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.44.0...v5.45.0) (2024-01-02)


### Features

* Support autorolling damage for Kineticist Elemental Blasts. ([71a1f90](https://github.com/xdy/xdy-pf2e-workbench/commit/71a1f90278a418f13feba665fcb146884c9893b3))

# [5.44.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.43.1...v5.44.0) (2024-01-02)


### Bug Fixes

* Autorolled damage now includes more (possibly all?) of the flags and roll options it should have. ([7d9030c](https://github.com/xdy/xdy-pf2e-workbench/commit/7d9030c84f6b80cc8666e01ca8ac3891ba529928))


### Features

* BAM: For Treat Wounds, when not showing untrained actions, handle the ability of Chirurgeons to use Crafting instead. ([691271c](https://github.com/xdy/xdy-pf2e-workbench/commit/691271c0cea8713454b3683e37b3d7e5df2b8e30))

## [5.43.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.43.0...v5.43.1) (2023-12-27)


### Bug Fixes

* As per PC1 page 214 shields are normally strapped, so, change the dropping held items on becoming unconscious feature so that shields and the items attached to them are not dropped, instead they're just set to not be held in any hands (i.e. worn.) ([44fe01d](https://github.com/xdy/xdy-pf2e-workbench/commit/44fe01d08bb8850e3b4acab2ab24162dfa6ce600)), closes [#1079](https://github.com/xdy/xdy-pf2e-workbench/issues/1079)

# [5.43.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.42.0...v5.43.0) (2023-12-27)


### Features

* Change private spell casting to have a dropdown with none, nonAllies, nonPartymembers and npcs as options for who should always cast privately. (Partymembers effectively can't cast privately as the spell is revealed if any partymember knows it.) ([fc0e5d5](https://github.com/xdy/xdy-pf2e-workbench/commit/fc0e5d502f15c245f64065d434e0440e767d4c65)), closes [#1068](https://github.com/xdy/xdy-pf2e-workbench/issues/1068)

# [5.42.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.41.2...v5.42.0) (2023-12-27)


### Features

* BAM: Changed Climb, Force Open, Jump (Long), Lie, Request and Swim to use new style actions. Changed minimum and verified pf2e version to 5.11.5 ([a88d15f](https://github.com/xdy/xdy-pf2e-workbench/commit/a88d15fc83c2f9350ccfd32b98ace5b7c4319060))

## [5.41.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.41.1...v5.41.2) (2023-12-27)


### Bug Fixes

* Canceling attacks if targeting reminder option is set to do that should work again. ([6e2660a](https://github.com/xdy/xdy-pf2e-workbench/commit/6e2660ad9d4698702109648eda10e49c6c5fe5ea)), closes [#1175](https://github.com/xdy/xdy-pf2e-workbench/issues/1175)

## [5.41.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.41.0...v5.41.1) (2023-12-27)


### Bug Fixes

* Better handling when dying is removed manually. ([c65f0cf](https://github.com/xdy/xdy-pf2e-workbench/commit/c65f0cfcff67be83296961496b0c006737307884)), closes [#1172](https://github.com/xdy/xdy-pf2e-workbench/issues/1172)
* Keeping up with the Macro Faeries. ([a142b95](https://github.com/xdy/xdy-pf2e-workbench/commit/a142b958af8ed7cd264a05aab26f6038361d4645))

# [5.41.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.6...v5.41.0) (2023-12-23)


### Features

* Change the 'Cast spell privately' feature so it doesn't cast privately if a party member knows that spell. ([15bc940](https://github.com/xdy/xdy-pf2e-workbench/commit/15bc940d779d6c633d0ea8ef51c9bd7044a7ac5f)), closes [#1174](https://github.com/xdy/xdy-pf2e-workbench/issues/1174)

## [5.40.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.5...v5.40.6) (2023-12-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a463dec](https://github.com/xdy/xdy-pf2e-workbench/commit/a463dec0c9308170b47d0978c0cdb7ba72e99917))

## [5.40.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.4...v5.40.5) (2023-12-19)


### Bug Fixes

* Keeping up with the Macro Faeries. ([3e3d03f](https://github.com/xdy/xdy-pf2e-workbench/commit/3e3d03fa5277dab0c2c099e6d170396f10de9fed))

## [5.40.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.3...v5.40.4) (2023-12-18)


### Bug Fixes

* Try to include the latest changelog, not the previous one. ([b8e5aa9](https://github.com/xdy/xdy-pf2e-workbench/commit/b8e5aa91dbf75b507d53d066114112b36e208fa5))

## [5.40.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.2...v5.40.3) (2023-12-18)


### Bug Fixes

* Keeping up with the Macro Faeries. ([263078b](https://github.com/xdy/xdy-pf2e-workbench/commit/263078b15ce370e0bae3e341561c1024bfadc135))
* Yet another try at making the wounded/dying handling less wonky. Now with extra logging. (Search for dyingLastApplied in the log if you're trying to figure out what goes wrong.) ([16784fb](https://github.com/xdy/xdy-pf2e-workbench/commit/16784fb9baeca31fc5e3ad78158844abc4501054))

## [5.40.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.1...v5.40.2) (2023-12-18)


### Bug Fixes

* Revert the latest dying cleanup as it broke handling of dying for some. ([e92de1b](https://github.com/xdy/xdy-pf2e-workbench/commit/e92de1bf87921af984c4582d3fcf614a5d826b97)), closes [#1160](https://github.com/xdy/xdy-pf2e-workbench/issues/1160)
* Revert the latest dying cleanup as it broke handling of dying for some. ([5f1d856](https://github.com/xdy/xdy-pf2e-workbench/commit/5f1d8568bce76ae760241ab1fadf48e2983344e0)), closes [#1160](https://github.com/xdy/xdy-pf2e-workbench/issues/1160)

## [5.40.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.40.0...v5.40.1) (2023-12-17)


### Bug Fixes

* Fallout from updating types, fixes problem with updating actors. ([9dddc3e](https://github.com/xdy/xdy-pf2e-workbench/commit/9dddc3ea563589dc5e15d1874e65dd7bb53a022f))

# [5.40.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.39.2...v5.40.0) (2023-12-17)


### Features

* Support spell variants when autorolling damage for spells. ([56a0342](https://github.com/xdy/xdy-pf2e-workbench/commit/56a0342ad27ba4f2ea956a7dc4929dc7cebf6621))

## [5.39.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.39.1...v5.39.2) (2023-12-17)


### Bug Fixes

* Actually a fix for the Housepatcher. ([e81e0a8](https://github.com/xdy/xdy-pf2e-workbench/commit/e81e0a87e55d1e19173a32184991a71218aab58e))

## [5.39.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.39.0...v5.39.1) (2023-12-17)


### Bug Fixes

* Not really a fix, just notes in the settings that the housepatcher is broken. ([74d57c6](https://github.com/xdy/xdy-pf2e-workbench/commit/74d57c6b4b1a24e2989f7163e33df0d5ac319495))

# [5.39.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.38.4...v5.39.0) (2023-12-17)


### Features

* BAM: When hiding unusable actions, consider the Clever Improviser feat. ([f93ac81](https://github.com/xdy/xdy-pf2e-workbench/commit/f93ac81aa7f240ecc2e643da42ddecb2482f4333)), closes [#1110](https://github.com/xdy/xdy-pf2e-workbench/issues/1110)

## [5.38.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.38.3...v5.38.4) (2023-12-17)


### Bug Fixes

* BAM: Show Treat Wounds if Medicine is trained or Nature is trained and the character has the feat Natural Medicine. ([075a4c0](https://github.com/xdy/xdy-pf2e-workbench/commit/075a4c0ebf83d24bf97543c6434bebbf42a7adc2)), closes [#1124](https://github.com/xdy/xdy-pf2e-workbench/issues/1124)

## [5.38.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.38.2...v5.38.3) (2023-12-17)


### Bug Fixes

* Keeping up with the Macro Faeries. ([644ee5c](https://github.com/xdy/xdy-pf2e-workbench/commit/644ee5cdb87dadcb6c4fce28100408de8466ff02))

## [5.38.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.38.1...v5.38.2) (2023-12-16)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0da0036](https://github.com/xdy/xdy-pf2e-workbench/commit/0da0036affcfadcbb4821b156c93132ba08c6eb4))

## [5.38.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.38.0...v5.38.1) (2023-12-15)


### Bug Fixes

* Cleaned up the dying handling a bit. ([a7109cc](https://github.com/xdy/xdy-pf2e-workbench/commit/a7109cc5f7d46f7af7b90c325cb099523c594ba4))

# [5.38.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.13...v5.38.0) (2023-12-15)


### Features

* When casting spells privately the GM will a link to the spell in the message. ([05fde1e](https://github.com/xdy/xdy-pf2e-workbench/commit/05fde1e7ebeb242b1d103c97276e03a44ef6f25a))

## [5.37.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.12...v5.37.13) (2023-12-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ec4f068](https://github.com/xdy/xdy-pf2e-workbench/commit/ec4f06818f9b0e9ffc8a3735d81cf4bacab7538f))

## [5.37.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.11...v5.37.12) (2023-12-10)


### Bug Fixes

* Give the aura and effect for Dirge of Doom the proper duration. ([bf91484](https://github.com/xdy/xdy-pf2e-workbench/commit/bf914844f36b50ebfd528f20e9a0b0882042d1d9))

## [5.37.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.10...v5.37.11) (2023-12-10)


### Bug Fixes

* Make resetHeroPoints use the party members (that are characters). ([928a29a](https://github.com/xdy/xdy-pf2e-workbench/commit/928a29af6e8a6db7df5bfe05e0c7327ea3d5e033))

## [5.37.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.9...v5.37.10) (2023-12-09)


### Bug Fixes

* Updated levels of the aura effects. ([080e971](https://github.com/xdy/xdy-pf2e-workbench/commit/080e971e76373a61f74576e0880ea5aa6e6d4dc5))

## [5.37.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.8...v5.37.9) (2023-12-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4146245](https://github.com/xdy/xdy-pf2e-workbench/commit/414624584186feb5e778f88a310e58263cef904f))

## [5.37.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.7...v5.37.8) (2023-12-08)


### Bug Fixes

* Update test-release.yml ([3cafef1](https://github.com/xdy/xdy-pf2e-workbench/commit/3cafef1c5264220a5ad08dccbab5500a0ca8eb7a))

## [5.37.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.6...v5.37.7) (2023-12-08)


### Bug Fixes

* Update test-release.yml ([513d2eb](https://github.com/xdy/xdy-pf2e-workbench/commit/513d2eba9991e5cf5c2bf9955ed0f8fb8df6df0a))

## [5.37.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.5...v5.37.6) (2023-12-08)


### Bug Fixes

* Update test-release.yml ([8248731](https://github.com/xdy/xdy-pf2e-workbench/commit/8248731ba364ec2490a9550e0ad14aa0e06b452c))

## [5.37.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.4...v5.37.5) (2023-12-08)


### Bug Fixes

* Update test-release.yml ([d73b9af](https://github.com/xdy/xdy-pf2e-workbench/commit/d73b9af81fc72309ae4308d25a0f46336b86f7de))

## [5.37.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.3...v5.37.4) (2023-12-08)


### Bug Fixes

* Update test-release.yml ([42a4fb3](https://github.com/xdy/xdy-pf2e-workbench/commit/42a4fb3c7fa57c07eb476fec0befc2e4aa793070))

## [5.37.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.2...v5.37.3) (2023-12-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([274659e](https://github.com/xdy/xdy-pf2e-workbench/commit/274659e25a57f20a16eed443ae6f5af24b5caf8b))

## [5.37.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.1...v5.37.2) (2023-12-07)


### Bug Fixes

* Update test-release.yml ([ad0ea60](https://github.com/xdy/xdy-pf2e-workbench/commit/ad0ea604da3ac960d0c283cf3a6d2283e71e984a))

## [5.37.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.37.0...v5.37.1) (2023-12-07)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d6f3e49](https://github.com/xdy/xdy-pf2e-workbench/commit/d6f3e49f2624b5098840178c9eb80166816b1770))

# [5.37.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.36.0...v5.37.0) (2023-12-06)


### Features

* For Breath Weapon Reminder, make party member reminder effects not unidentified even if the setting to hide from players is enabled. (Mainly as a way for players to see their own reminders.) ([49cb227](https://github.com/xdy/xdy-pf2e-workbench/commit/49cb2277f8a1c46ce12d350adb3248a291d366eb))

# [5.36.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.35.4...v5.36.0) (2023-12-06)


### Features

* Change Heropoint Handler and Basic Action Macros to use the current party members rather than the characters of the currently logged in players (with the hero point handler only including non-minion/eidolon characters.) Change minimum and verified pf2e version to 5.10.3 ([152d0ba](https://github.com/xdy/xdy-pf2e-workbench/commit/152d0ba71250df914549305c956d3a347ed9ba18))

## [5.35.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.35.3...v5.35.4) (2023-12-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([68ea240](https://github.com/xdy/xdy-pf2e-workbench/commit/68ea2406b7ea59d51a7dd71b06db967c760234b3))

## [5.35.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.35.2...v5.35.3) (2023-12-04)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f21a1b8](https://github.com/xdy/xdy-pf2e-workbench/commit/f21a1b8a37700d926695e855ab24c86faef26e92))

## [5.35.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.35.1...v5.35.2) (2023-12-03)


### Bug Fixes

* Fix bad json edit. ([e43968e](https://github.com/xdy/xdy-pf2e-workbench/commit/e43968ea3c9fca22ca23c75aa0c4bc013f8c3d99))

## [5.35.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.35.0...v5.35.1) (2023-12-03)


### Bug Fixes

* Fix bad json edit. ([0c17f20](https://github.com/xdy/xdy-pf2e-workbench/commit/0c17f2037b4b3e8e1eb0cc1a066ba653e21edfb6))

# [5.35.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.34.3...v5.35.0) (2023-12-02)


### Features

* Set minimum and verified pf2e system version to 5.10.1 ([fc7956e](https://github.com/xdy/xdy-pf2e-workbench/commit/fc7956e95650059518606128548fc6cfa2aec3d6))

## [5.34.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.34.2...v5.34.3) (2023-11-26)


### Bug Fixes

* Autorolling damage for non-spell attacks should work again. Sets minumum and verified pf2e versions to 5.9.5 ([cd11ba5](https://github.com/xdy/xdy-pf2e-workbench/commit/cd11ba5f4b576276ac1007aee664be30289a6dd6))

## [5.34.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.34.1...v5.34.2) (2023-11-20)


### Bug Fixes

* Update pack build script so renamed macros get the same icon as before. Clean up old and unused macro-> icon mappings. ([b27076a](https://github.com/xdy/xdy-pf2e-workbench/commit/b27076a36623cd0d4541dfe31f77134d44bfcfe2))

## [5.34.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.34.0...v5.34.1) (2023-11-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([115838e](https://github.com/xdy/xdy-pf2e-workbench/commit/115838ec83863e8c65578780dbf31ac777969270))

# [5.34.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.33.0...v5.34.0) (2023-11-19)


### Features

* BAM: Add (D) before actions that are Downtime actions, and add (Downtime) to their tooltip. ([9b85ea8](https://github.com/xdy/xdy-pf2e-workbench/commit/9b85ea88d3fed82f73853791b77419a2febff9f1)), closes [#1113](https://github.com/xdy/xdy-pf2e-workbench/issues/1113)

# [5.33.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.6...v5.33.0) (2023-11-19)


### Bug Fixes

* BAM: Make Squeeze require trained. ([ef6611d](https://github.com/xdy/xdy-pf2e-workbench/commit/ef6611d1fd631083e9f473e74a8e388900f99a97))


### Features

* BAM: Add (E) before actions that are Exploration actions, and add (Exploration) to their tooltip. ([11bdffa](https://github.com/xdy/xdy-pf2e-workbench/commit/11bdffa3ed9c24142dd1e95ed82c2abcd593e88f)), closes [#1107](https://github.com/xdy/xdy-pf2e-workbench/issues/1107)
* BAM: Adds support for calling the Aid macro from the Action Support Engine (ASE) if that module is active. ([ba1afb5](https://github.com/xdy/xdy-pf2e-workbench/commit/ba1afb5ed76e0cc09b8af6553ebfa2309a49d307))

## [5.32.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.5...v5.32.6) (2023-11-19)


### Bug Fixes

* BAM: Make shift and ctrl-clicking a button work for attack actions (by passing along the event here too.) ([b12cde3](https://github.com/xdy/xdy-pf2e-workbench/commit/b12cde3392d8587b9d8f5261519813dc6b1a5d5e))

## [5.32.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.4...v5.32.5) (2023-11-19)


### Bug Fixes

* Changing 'Aura: Bane' to be 10 feet (remaster change). ([6e5c0e7](https://github.com/xdy/xdy-pf2e-workbench/commit/6e5c0e781263e7f296c892adeface803d0d71c49))

## [5.32.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.3...v5.32.4) (2023-11-18)


### Bug Fixes

* Add auras for Courageous Anthem and Rallying Anthem. (Not technically auras, but, eh, good enough.) Didn't remove the auras for Inspire Courage and Inspire Defense in case macros point to those. Both grant the same effects. ([34e9593](https://github.com/xdy/xdy-pf2e-workbench/commit/34e9593896a2fda059894912e4abde758a063a3e))

## [5.32.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.2...v5.32.3) (2023-11-18)


### Bug Fixes

* Show the correct max value for minutes till next heropoint. ([13e769b](https://github.com/xdy/xdy-pf2e-workbench/commit/13e769b6287ec3ea3bc08d8c87c5db39a0f35d0e))

## [5.32.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.1...v5.32.2) (2023-11-18)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f049d05](https://github.com/xdy/xdy-pf2e-workbench/commit/f049d055638ea0aec03dbf33cb34e8762da44e0b))

## [5.32.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.32.0...v5.32.1) (2023-11-18)


### Bug Fixes

* BAM now considers npcs and familiars to be trained for the purpose of whether to show actions. ([a60ebd2](https://github.com/xdy/xdy-pf2e-workbench/commit/a60ebd26aa4ea09115a2ce84048eda9c20a1ade4))

# [5.32.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.31.0...v5.32.0) (2023-11-18)


### Features

* The Skill Action feature quietly passed away today after a long time on life support. It is survived by its close friend and roommate BAM (aka Basic Action Macros) as well as valued colleague ITT (aka PF2e Interactive Token Tooltip) who - while they are certainly not a replacement for the dearly departed feature - are sure to provide some comfort. No service will be held. Memorial contributions may be made to Extra Life (https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=63664#roster) ([ff0fcfb](https://github.com/xdy/xdy-pf2e-workbench/commit/ff0fcfbcd63b8fe9c3ba4ef8f3b8e5badc8de35a)), closes [#1104](https://github.com/xdy/xdy-pf2e-workbench/issues/1104) [#1062](https://github.com/xdy/xdy-pf2e-workbench/issues/1062) [#1060](https://github.com/xdy/xdy-pf2e-workbench/issues/1060) [#1002](https://github.com/xdy/xdy-pf2e-workbench/issues/1002) [#984](https://github.com/xdy/xdy-pf2e-workbench/issues/984) [#983](https://github.com/xdy/xdy-pf2e-workbench/issues/983)

# [5.31.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.30.0...v5.31.0) (2023-11-18)


### Bug Fixes

* Revert vite update. ([b95072e](https://github.com/xdy/xdy-pf2e-workbench/commit/b95072e82d619f6d935d09da6cb7eba402c072e9))


### Features

* Make BAM (Basic Action Macros) by default hide actions that cannot be used due to trained requirement. ([1919a64](https://github.com/xdy/xdy-pf2e-workbench/commit/1919a6400f93d7cf32457fafdd2a93c2a4d8ccf1))

# [5.30.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.29.0...v5.30.0) (2023-11-17)


### Bug Fixes

* Adds text about Identify Magic to the public message when casting spells privately. ([06dde77](https://github.com/xdy/xdy-pf2e-workbench/commit/06dde776d5f660780cbea006718ef8126149e889)), closes [#1092](https://github.com/xdy/xdy-pf2e-workbench/issues/1092)


### Features

* Add the Reposition action macro to BAM. ([520988d](https://github.com/xdy/xdy-pf2e-workbench/commit/520988df68a046afc534da74519ada8ddd2a2aab)), closes [#1090](https://github.com/xdy/xdy-pf2e-workbench/issues/1090)

# [5.29.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.28.1...v5.29.0) (2023-11-16)


### Bug Fixes

* Attack reminder works again. ([f829df4](https://github.com/xdy/xdy-pf2e-workbench/commit/f829df48f5ff1cb8d8c6544b340640f63af9b253))
* Mark Skill Actions as broken, and always disabled. This feature has been on life support, and *may* just have hit the end of it's already prolonged life. ([e5f73b7](https://github.com/xdy/xdy-pf2e-workbench/commit/e5f73b741908125caeee5688e49cfb7dc721cfe7))
* Remove note about requiring 5.9.0 from ancestry paragon and dual class options. ([f39a070](https://github.com/xdy/xdy-pf2e-workbench/commit/f39a07008ae6ee579d6f4eaa9168d655ff675955))
* Stop double-applying persistent damage and healing. ([7a94559](https://github.com/xdy/xdy-pf2e-workbench/commit/7a945599177e97398364ba437d97b4f64569a83f))


### Features

* Removing support for alignment from mystification as it has been removed from the system. ([776a8e9](https://github.com/xdy/xdy-pf2e-workbench/commit/776a8e998d1d9c90e8f4d11fee65b59e7b6b603c))

## [5.28.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.28.0...v5.28.1) (2023-11-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([206f354](https://github.com/xdy/xdy-pf2e-workbench/commit/206f354a322cd74134e06108bf8c533d8b751f58))

# [5.28.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.15...v5.28.0) (2023-11-11)


### Features

* Changes 'autoroll damage for non-attack spells' to a choice setting that splits save and non-save spells. You need to choose again if you had this enabled. ([04be4a9](https://github.com/xdy/xdy-pf2e-workbench/commit/04be4a9013571118a3876f51919df7c04ae7625d)), closes [#982](https://github.com/xdy/xdy-pf2e-workbench/issues/982)

## [5.27.15](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.14...v5.27.15) (2023-11-11)


### Bug Fixes

* Removes support for 'Allow Item Bonuses' APB setting as it has long been broken and I can't figure out how to fix it. ([b32ce2f](https://github.com/xdy/xdy-pf2e-workbench/commit/b32ce2ffa6306d431305f2fbb3688eeb0616fd6b))

## [5.27.14](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.13...v5.27.14) (2023-11-11)


### Bug Fixes

* Add flag to privately cast spell message to allow other modules to find what it refers to. ([d2dacc9](https://github.com/xdy/xdy-pf2e-workbench/commit/d2dacc95d0d764bd019da5dc8c4ba3c5d5daacad))

## [5.27.13](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.12...v5.27.13) (2023-11-11)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0682182](https://github.com/xdy/xdy-pf2e-workbench/commit/06821824cb276ae199cda504ced1048fd42e0edf))

## [5.27.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.11...v5.27.12) (2023-11-10)


### Bug Fixes

* Update test-release.yml ([1870612](https://github.com/xdy/xdy-pf2e-workbench/commit/18706126077676768e46297b188def4332998cfd))

## [5.27.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.10...v5.27.11) (2023-11-10)


### Bug Fixes

* Update test-release.yml ([c87dec7](https://github.com/xdy/xdy-pf2e-workbench/commit/c87dec772c87b2d0f4398fe2f38dcd5e80f10f42))

## [5.27.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.9...v5.27.10) (2023-11-10)


### Bug Fixes

* Another try at making critical hits apply the right number of dying. ([ce0bf1b](https://github.com/xdy/xdy-pf2e-workbench/commit/ce0bf1bf3802a4f0f16fead626162d9e756a78c2))

## [5.27.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.8...v5.27.9) (2023-11-10)


### Bug Fixes

* Keeping up with the Macro Faeries. ([9dd6cd6](https://github.com/xdy/xdy-pf2e-workbench/commit/9dd6cd6c75c0eb08afba31667cf45cfeae3b273c))

## [5.27.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.7...v5.27.8) (2023-11-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f13bfd3](https://github.com/xdy/xdy-pf2e-workbench/commit/f13bfd3d3fecb88b71c436df28e2c90134554172))

## [5.27.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.6...v5.27.7) (2023-11-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8b16018](https://github.com/xdy/xdy-pf2e-workbench/commit/8b1601893cfe20037163e4e6d48a7415b70760e0))

## [5.27.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.5...v5.27.6) (2023-11-06)


### Bug Fixes

* Revert use of foundry-publish to old admin interface for now, got timeouts. ([247cb0f](https://github.com/xdy/xdy-pf2e-workbench/commit/247cb0f8e742d6ae4a941cf6d2eeed9654145193))

## [5.27.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.4...v5.27.5) (2023-11-06)


### Bug Fixes

* Update test-release.yml ([9e75dd5](https://github.com/xdy/xdy-pf2e-workbench/commit/9e75dd5e5b587776b734a981559bd3e53c84a7a5))

## [5.27.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.3...v5.27.4) (2023-11-06)


### Bug Fixes

* Update README.md ([1e003f3](https://github.com/xdy/xdy-pf2e-workbench/commit/1e003f33e9734893c4f169eb91912e646f06b9e2))

## [5.27.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.2...v5.27.3) (2023-11-05)


### Bug Fixes

* Several updates to the various adjustments found in 'xdy-pf2e-workbench-items' compendium, courtesy of @ElvisLiving ([c5be18b](https://github.com/xdy/xdy-pf2e-workbench/commit/c5be18b7ed4e0bf7cec813aba30bfdb318012d83))

## [5.27.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.1...v5.27.2) (2023-11-05)


### Bug Fixes

* Change 'Aura Inspire Courage' and 'Aura Inspire Defense' so they give effects of the proper level (rather than always level 1). ([260b4eb](https://github.com/xdy/xdy-pf2e-workbench/commit/260b4ebb4598efbb86dd51b51d80d5658b567d9b))

## [5.27.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.27.0...v5.27.1) (2023-11-05)


### Bug Fixes

* A couple of bugs related to handling dying. These are the test cases I did, which all 'work on my machine' after these fixes. ([485a1cf](https://github.com/xdy/xdy-pf2e-workbench/commit/485a1cf5a583a7a2ef6cacf7eb31e85ceae26c9d)), closes [#1063](https://github.com/xdy/xdy-pf2e-workbench/issues/1063) [#1059](https://github.com/xdy/xdy-pf2e-workbench/issues/1059)

# [5.27.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.26.0...v5.27.0) (2023-11-04)


### Features

* Added several Adjustments for making undead, courtesy of @ElvisLiving (everything but the zombie) and @Tikael (zombie). ([ef5f6fe](https://github.com/xdy/xdy-pf2e-workbench/commit/ef5f6feb7ebb63372d65edc03737f513e3cb2d8e))

# [5.26.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.6...v5.26.0) (2023-11-03)


### Features

* Remove support for massive damage and the Death trait as both are now part of the pf2e system. Sets minimum pf2e version to 5.8.2 ([7fd00c1](https://github.com/xdy/xdy-pf2e-workbench/commit/7fd00c18d9141f445d008e259bcf60e84933802c))

## [5.25.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.5...v5.25.6) (2023-11-03)


### Bug Fixes

* Removed last remnant of AABP. ([6f5ec65](https://github.com/xdy/xdy-pf2e-workbench/commit/6f5ec65a543c1bdacd2982ba754877799f515ed9))

## [5.25.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.4...v5.25.5) (2023-11-03)


### Bug Fixes

* Revert latest attempt at handling critical hit for dying/wounded option. ([25fba33](https://github.com/xdy/xdy-pf2e-workbench/commit/25fba3365cd98269b86c7561c9b082560e031d75))

## [5.25.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.3...v5.25.4) (2023-11-01)


### Bug Fixes

* Remove AABP on the request of @CrackJackFlood ([840e7e4](https://github.com/xdy/xdy-pf2e-workbench/commit/840e7e4e9516d456e89ea19b501bb642817cbc13))

## [5.25.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.2...v5.25.3) (2023-11-01)


### Bug Fixes

* The Aura for Dirge of Doom should have includesSelf: false ([a1cbc15](https://github.com/xdy/xdy-pf2e-workbench/commit/a1cbc156970e1418a49dc8396e27279b17da7ec7))

## [5.25.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.1...v5.25.2) (2023-10-31)


### Bug Fixes

* Dying automation, handling of critical hits by enemies should work again. ([c14893e](https://github.com/xdy/xdy-pf2e-workbench/commit/c14893eabff6dc32b50c7f53127c2d38808b9caf))
* Make Aura: Dirge of Doom grant [Effect] Dirge of Doom. ([8b0ff34](https://github.com/xdy/xdy-pf2e-workbench/commit/8b0ff34742df9f4d2bb002a41ae6b8434b29c1ae))

## [5.25.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.25.0...v5.25.1) (2023-10-29)


### Bug Fixes

* Reminders bugfixes and cleanup. ([db52f46](https://github.com/xdy/xdy-pf2e-workbench/commit/db52f464cbb8d37236bb10713a7ff97383dc9bba))

# [5.25.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.24.1...v5.25.0) (2023-10-29)


### Features

* "Reminder cannot attack" changed from a boolean to a choice of "No", "Reminder" or "Cancel Attack" (users need to reenable by selecting one of those options). Adds support for the Restrained condition. Improved the messages of both attack and targeting reminders. ([acb5cd4](https://github.com/xdy/xdy-pf2e-workbench/commit/acb5cd4c55e4cbbb479f2ae55cfc679bd24c7d21))

## [5.24.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.24.0...v5.24.1) (2023-10-27)


### Bug Fixes

* Keeping up with the Macro Faeries. ([eb957ce](https://github.com/xdy/xdy-pf2e-workbench/commit/eb957cefcc27a6da1f5e505d6bf434be7e73568a))
* Maybe fix it so one can cast private spells on mac. Don't own a mac so can't check, but foundry seems to also check "Meta", "OsLeft", "OsRight", so I added those to the keys I check. ([8129b48](https://github.com/xdy/xdy-pf2e-workbench/commit/8129b48bf3dea105c83504a7bd9057283b77f11e)), closes [#1054](https://github.com/xdy/xdy-pf2e-workbench/issues/1054)

# [5.24.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.7...v5.24.0) (2023-10-22)


### Bug Fixes

* Support breath weapon cooldown for abilities like Mountain Quake that use #rounds rather than #Recharge. ([7409e0a](https://github.com/xdy/xdy-pf2e-workbench/commit/7409e0a528187fc3856c035a06e7d8e73bd66456)), closes [#1045](https://github.com/xdy/xdy-pf2e-workbench/issues/1045)


### Features

* Add support for "Discordant Voice" to "Aura: Inspire Courage", courtesy of @Friz ([361f184](https://github.com/xdy/xdy-pf2e-workbench/commit/361f1847d1134fe43a1c29b515e32a72262e2e86)), closes [#1046](https://github.com/xdy/xdy-pf2e-workbench/issues/1046)
* Added getAllFromAllowedPacks to the 'PF2e Workbench Customizable Macros' compendium, courtesy of [@esheyw](https://github.com/esheyw) ([0e13a62](https://github.com/xdy/xdy-pf2e-workbench/commit/0e13a62d687ba8c67c494ebfdd497e86d8438244))

## [5.23.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.6...v5.23.7) (2023-10-19)


### Bug Fixes

* Removed "Aura: Bless" and "Aura: Protective Ward" as they are now part of the pf2e system. ([476e632](https://github.com/xdy/xdy-pf2e-workbench/commit/476e632813e6f854c614e2a0c8e16174bd46b204))

## [5.23.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.5...v5.23.6) (2023-10-19)


### Bug Fixes

* Keeping up with the Macro Faeries. ([3121020](https://github.com/xdy/xdy-pf2e-workbench/commit/31210205e1f24a6a78a2a737faded74b09e0ce1b))

## [5.23.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.4...v5.23.5) (2023-10-18)


### Bug Fixes

* Removes the broken houserule that added the remaster crit rules for hammers and flails. Instead, just wait for ([aff158b](https://github.com/xdy/xdy-pf2e-workbench/commit/aff158bb3a0dffc644d28439240374b95d5889f6)), closes [#1018](https://github.com/xdy/xdy-pf2e-workbench/issues/1018)

## [5.23.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.3...v5.23.4) (2023-10-17)


### Bug Fixes

* Actually remove the Refocus macro from the 'PF2e Workbench Macros' compendium. (The code was deleted in 5.23.1) ([4e2aad2](https://github.com/xdy/xdy-pf2e-workbench/commit/4e2aad2fdb24dbd49db349597ae9563fd745c3c5))

## [5.23.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.2...v5.23.3) (2023-10-17)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f33cee6](https://github.com/xdy/xdy-pf2e-workbench/commit/f33cee6082581fe63c8be8a1b1be643ed2bbda18))

## [5.23.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.1...v5.23.2) (2023-10-15)


### Bug Fixes

* Elite/weak works again for npc mystification. ([4013c86](https://github.com/xdy/xdy-pf2e-workbench/commit/4013c86e49eb108021ba34cced01cb0559a38c75)), closes [#1030](https://github.com/xdy/xdy-pf2e-workbench/issues/1030)

## [5.23.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.23.0...v5.23.1) (2023-10-13)


### Bug Fixes

* Removes the broken Refocus macro. (The Customizable Refocus macro in the 'PF2e Workbench Customizable Macros' compendium should still work.) ([a8798f3](https://github.com/xdy/xdy-pf2e-workbench/commit/a8798f360864fa96b459349d2e0803c708340439)), closes [#1022](https://github.com/xdy/xdy-pf2e-workbench/issues/1022)

# [5.23.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.22.0...v5.23.0) (2023-10-11)


### Bug Fixes

* Update CONTRIBUTORS.md ([3aff1f0](https://github.com/xdy/xdy-pf2e-workbench/commit/3aff1f08ad3149c0ca8531554ea9d9a1113ba607))
* Updated links in the AABP feat. ([e9e8b84](https://github.com/xdy/xdy-pf2e-workbench/commit/e9e8b8417a1fab7c4bf5f85bfcbe590aa768720c))


### Features

* Added the utility function isSpellAvailable courtesy of [@esheyw](https://github.com/esheyw) ([4e9ec9a](https://github.com/xdy/xdy-pf2e-workbench/commit/4e9ec9ad836564a9c9f898d9dff6d668336c55a7))

# [5.22.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.21.1...v5.22.0) (2023-10-08)


### Features

* Expose the function mystifyNpcItems so it can be used by macros. I leave actually writing that macro as an exercise for the reader. :) ([374b6fd](https://github.com/xdy/xdy-pf2e-workbench/commit/374b6fdf424c518ddbee16b2eb3f1e430d499c12))

## [5.21.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.21.0...v5.21.1) (2023-10-08)


### Bug Fixes

* > !== >= :) ([e95c176](https://github.com/xdy/xdy-pf2e-workbench/commit/e95c176b8b917ae4121a65704a5bae8d902e0542))

# [5.21.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.20.1...v5.21.0) (2023-10-08)


### Features

* Support using party level (optionally modified by a float multiplier) rather than a hardcoded level value for npc item mystification. ([881e8ca](https://github.com/xdy/xdy-pf2e-workbench/commit/881e8cac6f673bd6aee26f1979ddc4084f0ac732))

## [5.20.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.20.0...v5.20.1) (2023-10-06)


### Bug Fixes

* Add the icons from @CrackJackFlood, add to README.md and CONTRIBUTORS.md ([88d6b7e](https://github.com/xdy/xdy-pf2e-workbench/commit/88d6b7e81068aaca9e8304cafd321d68863e5af2))

# [5.20.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.19.1...v5.20.0) (2023-10-06)


### Features

* Adds a new version of "Another Alternative Bonus Progression" by [@crackjackflood](https://github.com/crackjackflood) (see the feat and effects in the "PF2e Workbench Items" compendium for a description, as well as https://github.com/CrackJackFlood/pf2e-aabp/blob/main/README.md). ([82bdd89](https://github.com/xdy/xdy-pf2e-workbench/commit/82bdd8919c3d79b2cd7b75265ee8be67529e971e))

## [5.19.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.19.0...v5.19.1) (2023-10-06)


### Bug Fixes

* Minimum frightened was off by one ([b7506ee](https://github.com/xdy/xdy-pf2e-workbench/commit/b7506ee48cd6e6e4ae52a2999b76ed98a2239a37))

# [5.19.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.18.5...v5.19.0) (2023-10-01)


### Features

* Adds "Another Alternative Bonus Progression" by [@crackjackflood](https://github.com/crackjackflood) (see the effect in the "PF2e Workbench Items" compendium for a description). Also removes the deprecated feature that set encumbrance based on bulk as that option now exists in the pf2e system itself. ([b1e8d51](https://github.com/xdy/xdy-pf2e-workbench/commit/b1e8d51a7407f810e74136d8265816526c9468b3))
* Adds "Another Alternative Bonus Progression" by [@crackjackflood](https://github.com/crackjackflood) (see the effect in the "PF2e Workbench Items" compendium for a description). Also removes the deprecated feature that set encumbrance based on bulk as that option now exists in the pf2e system itself. ([bb7b11d](https://github.com/xdy/xdy-pf2e-workbench/commit/bb7b11dde5bcb554732e0ac14e18a4e949c9cc3e))

## [5.18.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.18.4...v5.18.5) (2023-09-30)


### Bug Fixes

* Reverted everything but the macros for now. It broke the settings menu. :( ([56a7e46](https://github.com/xdy/xdy-pf2e-workbench/commit/56a7e460e8049d7c2527b041370acefec3a7dc78))

## [5.18.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.18.2...v5.18.3) (2023-09-24)


### Bug Fixes

* Keeping up with the Macro Faeries. Also sets minimum Foundry version 3.09 and miniumum pf2e version to 5.5.3 ([cbc603f](https://github.com/xdy/xdy-pf2e-workbench/commit/cbc603fc82422dbe211bb6902a96085c99b1ed44))

## [5.18.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.18.1...v5.18.2) (2023-09-03)


### Bug Fixes

* Removes broken 'change hero point max' feature. ([30eb137](https://github.com/xdy/xdy-pf2e-workbench/commit/30eb1370e547e3af5847d2b21135bc6bd040f311)), closes [#919](https://github.com/xdy/xdy-pf2e-workbench/issues/919)

## [5.18.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.18.0...v5.18.1) (2023-08-30)


### Bug Fixes

* Skill Actions now look good again, courtesy of @Stwlam ([ed7160d](https://github.com/xdy/xdy-pf2e-workbench/commit/ed7160dbc956df02f0ff1008cf52f6bb97d51b09)), closes [#967](https://github.com/xdy/xdy-pf2e-workbench/issues/967)

# [5.18.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.17.2...v5.18.0) (2023-08-29)


### Bug Fixes

* Handling the results of clicking the dying recovery roll button on the character sheet was on the wrong hook. Clarified the documentation and help. Cleaned up the code. ([06f3366](https://github.com/xdy/xdy-pf2e-workbench/commit/06f3366df8b91b7d61c36e5977954090b051a3bd)), closes [#915](https://github.com/xdy/xdy-pf2e-workbench/issues/915)


### Features

* Verified to work in pf2e 5.4.0, set the minimum foundry version to 3.0.8 and pf2e to 5.4.0. ([8315cb5](https://github.com/xdy/xdy-pf2e-workbench/commit/8315cb5404532e1fd9db86c17e6f24290fb58cb2))

## [5.17.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.17.1...v5.17.2) (2023-08-20)


### Bug Fixes

* Actually remove the feat sections that the houserule legacy variant rules Ancestry Paragon and Dual Class appear in when they are disabled in module settings. Any feats in such a section will automatically be moved to Bonus Feats. ([0537f7c](https://github.com/xdy/xdy-pf2e-workbench/commit/0537f7c4ed33ba1d9d95663e65eb98b14e6ff790))

## [5.17.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.17.0...v5.17.1) (2023-08-18)


### Bug Fixes

* In houserules Ancestry Paragon was a client setting, but should be a world setting. ([47fd438](https://github.com/xdy/xdy-pf2e-workbench/commit/47fd4388191355aebe7bc53b69120fd0ce1c66f4))
* Remove dirtySortActions due to the system sorting actions in the next release. ([b153a6e](https://github.com/xdy/xdy-pf2e-workbench/commit/b153a6ef728e4b21d46afdea7388a822a3266c7e))
* Update the housepatcher example with the latest blind fight support for pf2e perception from https://github.com/reonZ/pf2e-perception/wiki#blind-fight ([67816ba](https://github.com/xdy/xdy-pf2e-workbench/commit/67816ba1b9830e778137dc6d69310d3932879e1e))

# [5.17.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.16.2...v5.17.0) (2023-08-16)


### Features

* Option to enable Keeley's House Rules added to the House Rules section, courtesy of @Stwlam ([9e69a81](https://github.com/xdy/xdy-pf2e-workbench/commit/9e69a81e6ab315a19ba3c44fa1a575736a1dfe6f))

## [5.16.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.16.1...v5.16.2) (2023-08-06)


### Bug Fixes

* The breath weapon reminder effect caused errors when attacking, changed so it no longer does that... ([dc66a07](https://github.com/xdy/xdy-pf2e-workbench/commit/dc66a07434da77b4e0f40af4e4e719555637576e))

## [5.16.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.16.0...v5.16.1) (2023-08-06)


### Bug Fixes

* Don't create several campaign feat sections with the same name... ([938bcd7](https://github.com/xdy/xdy-pf2e-workbench/commit/938bcd7e20090b516a0fa85a926dc460872f79ec))

# [5.16.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.15.1...v5.16.0) (2023-08-06)


### Features

* Under the assumption that the system will eventually remove support for the non-remaster (premaster?) Ancestry Paragon and Dual Class variant rules, support for these future legacy variant rules have been pre-added to the House Rules section. Do not enable both this and the system variant rules. Thanks @Supe! ([bca2cc0](https://github.com/xdy/xdy-pf2e-workbench/commit/bca2cc0c5626183b62323a1f8213adb5893a9aed))

## [5.15.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.15.0...v5.15.1) (2023-08-05)


### Bug Fixes

* Casting spells with saves privately can now include a save button in the public message again. ([4e4506c](https://github.com/xdy/xdy-pf2e-workbench/commit/4e4506cb53d523f9b8874d16875f07aa7a9632c0))

# [5.15.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.14.0...v5.15.0) (2023-08-04)


### Features

* Add option to send notification to all players when heropoints are handed out. ([1bc9fd0](https://github.com/xdy/xdy-pf2e-workbench/commit/1bc9fd09070ca277ef53e6fe8c0d9e977c2859f2)), closes [#923](https://github.com/xdy/xdy-pf2e-workbench/issues/923)

# [5.14.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.13.1...v5.14.0) (2023-08-01)


### Features

* Change the way breath weapon/recharge abilities works to match pf2e 5.3, it only looks at #recharge in the ability text now. (It should still work with most 5.2/creatures imported into worlds during 5.2). ([3338c4c](https://github.com/xdy/xdy-pf2e-workbench/commit/3338c4c2aed6ad9b08983e014fe52876d6dc3243))
* Renamed breath weapon reminder to recharge reminder. Adds option for recharge reminder icon to be hidden to players. ([fcffdc6](https://github.com/xdy/xdy-pf2e-workbench/commit/fcffdc6865af053a1b24a774c336ddb0d783c43c)), closes [#914](https://github.com/xdy/xdy-pf2e-workbench/issues/914)

## [5.13.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.13.0...v5.13.1) (2023-07-31)


### Bug Fixes

* Add the ever so important word 'sufficient' damage to the setting name and hint... I.e. Death effects take one straight to dying if one is brought to 0 hp, not for *any* damage. ([1544445](https://github.com/xdy/xdy-pf2e-workbench/commit/1544445603734ce46c66bfdf2f1eb8e0c12eee2e))

# [5.13.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.12.2...v5.13.0) (2023-07-31)


### Bug Fixes

* Keeping up with the Macro Faeries. ([25ed803](https://github.com/xdy/xdy-pf2e-workbench/commit/25ed8037df43b44fe0027294ab6ce6532fc0b0d8))


### Features

* Add setting to automatically kill on taking damage from a source with the Death trait. Changed massive damage support so it works for more than strikes. ([cb02adf](https://github.com/xdy/xdy-pf2e-workbench/commit/cb02adf0d77156aee360a3d0a1e212031ab7b69b)), closes [#898](https://github.com/xdy/xdy-pf2e-workbench/issues/898)
* Adds setting to make dying/wounded automation work even if the damage is not applied to the proper target. ([b75277d](https://github.com/xdy/xdy-pf2e-workbench/commit/b75277debad2f0c965cc249487f10db1e47c12f7))

## [5.12.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.12.1...v5.12.2) (2023-07-29)


### Bug Fixes

* Keeping up with the Macro Faeries. ([fc5d733](https://github.com/xdy/xdy-pf2e-workbench/commit/fc5d733aa2c4d0a9c8362edd0127faef77c477e6))

## [5.12.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.12.0...v5.12.1) (2023-07-25)


### Bug Fixes

* Customizable Refocus (premaster) macro now actually works. Oops. ([305bbe7](https://github.com/xdy/xdy-pf2e-workbench/commit/305bbe746546e61e30b889568ae722a254419ca6))

# [5.12.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.11.0...v5.12.0) (2023-07-25)


### Features

* Add Customizable Refocus (premaster) macro to the "Customizable Macros" compendium. This macro works the way it did before the Pathfinder Remaster changes. ([414bad5](https://github.com/xdy/xdy-pf2e-workbench/commit/414bad59c5cdbd39c81ae2b714effff6cd95890b))

# [5.11.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.10.3...v5.11.0) (2023-07-25)


### Features

* The message that you can configure to appear when casting spells privately now follows the Remastered rules and no longer show the VSMF of a spell. ([b612ac8](https://github.com/xdy/xdy-pf2e-workbench/commit/b612ac8f385168e5cc975f89c88d3d21b1c59554))
* The Refocus macro now follows the Remastered rules, filling the pool if the user has any 'Focus' feat, and ignoring any 'Wellspring' feats. Note that I did not change how Psychic Spellcasting works. The macro no longer handles the focus-restoring parts of the Extreme Curse of Oracles. ([cf70170](https://github.com/xdy/xdy-pf2e-workbench/commit/cf70170030e5b15863b6022c988725fd5c05f10c))

## [5.10.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.10.2...v5.10.3) (2023-07-25)


### Bug Fixes

* Dropping items when becoming unconscious should work properly again. ([144199c](https://github.com/xdy/xdy-pf2e-workbench/commit/144199cfe8ab8b8e441f077a62a35184127f647e))

## [5.10.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.10.1...v5.10.2) (2023-07-25)


### Bug Fixes

* Changed so everyone sees the mystified name in chat if "Try to mystify speaker and use of name in chat" should replace the name. ([27d05c2](https://github.com/xdy/xdy-pf2e-workbench/commit/27d05c29d163e933ec1d807c29368d6be36a4812)), closes [#904](https://github.com/xdy/xdy-pf2e-workbench/issues/904)

## [5.10.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.10.0...v5.10.1) (2023-07-24)


### Bug Fixes

* Clean up handling of automated increase of dying on taking damage, possibly fixing a few bugs. Also updates housepatcher.md ([d85d88c](https://github.com/xdy/xdy-pf2e-workbench/commit/d85d88cd616ac8c0414b00793b18b15040076d77))

# [5.10.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.9.2...v5.10.0) (2023-07-22)


### Features

* Adds the original macro documentation (if any) to the top of the macros in the 'Symon-provided macros' compendium. You do need to reimport/readd to macro bar to get this. ([da96350](https://github.com/xdy/xdy-pf2e-workbench/commit/da96350126056b95b513385f22250e4dce66a735))

## [5.9.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.9.1...v5.9.2) (2023-07-21)


### Bug Fixes

* Notes in the settings that automated encumbrance is deprecated. ([3153a5f](https://github.com/xdy/xdy-pf2e-workbench/commit/3153a5fa242ef66912c7a5f06eae46f93ff0f413))

## [5.9.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.9.0...v5.9.1) (2023-07-21)


### Bug Fixes

* Deprecates automated encumbrance as that will be part of the pf2e system from version 5.2. Removes the long-deprecated Workbench Flat Check Notes 'effect'. Removes the half-done Workbench ABP 'effect'. ([880f2d1](https://github.com/xdy/xdy-pf2e-workbench/commit/880f2d19f606d27d87b244583fdeeb0d800545c8))

# [5.9.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.8.1...v5.9.0) (2023-07-20)


### Features

* Removes the creature builder as it no longer works, and a viable alternative exists: https://github.com/miki4920/fvtt-module-pf2e-MonsterMaker ([5ca7d05](https://github.com/xdy/xdy-pf2e-workbench/commit/5ca7d05b59b4ac26bc425c1020086229594d4438))

## [5.8.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.8.0...v5.8.1) (2023-07-20)


### Bug Fixes

* Bug in Massive Damage handling. ([e80beb6](https://github.com/xdy/xdy-pf2e-workbench/commit/e80beb6b86de0aa632293f5d602bec1079cc3743))

# [5.8.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.5...v5.8.0) (2023-07-20)


### Features

* Add "Effect: Condition for 1 hour (modifiable)", "Effect: Condition for 1 minute (modifiable)", "Effect: Condition for 1 round, end of turn (modifiable)" and "Effect: Condition for 10 minutes (modifiable)" to the PF2e Workbench Items compendium. ([77c94d5](https://github.com/xdy/xdy-pf2e-workbench/commit/77c94d58371e4dcd99d142cdc894eec5e48b93c4))
* Add the option to handle Massive Damage to Manage World Automation Settings. ([2dcccf0](https://github.com/xdy/xdy-pf2e-workbench/commit/2dcccf04b51851541e16262e58f11bc370b686de))

## [5.7.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.4...v5.7.5) (2023-07-19)


### Bug Fixes

* Possibly fix occasional race condition with dying/wounded. ([c8f5a20](https://github.com/xdy/xdy-pf2e-workbench/commit/c8f5a20c03a39050e934c0c3cbb4456c58dfdba1))

## [5.7.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.3...v5.7.4) (2023-07-17)


### Bug Fixes

* Dexterity !=== reflex... ([fa647f9](https://github.com/xdy/xdy-pf2e-workbench/commit/fa647f97ef6b39fd6b91c934e31b5d1de7c04dbb))

## [5.7.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.2...v5.7.3) (2023-07-17)


### Bug Fixes

* Css fix for BAM buttons with MAP, courtesy of [@apoapostolov](https://github.com/apoapostolov) ([c9d4736](https://github.com/xdy/xdy-pf2e-workbench/commit/c9d4736e6885ce4ced48491f57d6a3f381fd7303))
* Ugly fix for some macros not working on Basic Action Macros. ([ec5eb41](https://github.com/xdy/xdy-pf2e-workbench/commit/ec5eb41f6b116d1196d00f1ccbca296efd053d1a))

## [5.7.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.1...v5.7.2) (2023-07-16)


### Bug Fixes

* More fixes to code to select user's character as fallback when starting BAM. ([3a8302e](https://github.com/xdy/xdy-pf2e-workbench/commit/3a8302e443f3dde8203f383d1dcb2f7ba6f9da9f))

## [5.7.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.7.0...v5.7.1) (2023-07-16)


### Bug Fixes

* Code to select user's character as fallback when starting BAM didn't work. ([aed12f8](https://github.com/xdy/xdy-pf2e-workbench/commit/aed12f87c2fdc0fe57d29cc0bce97ca03e400481)), closes [#890](https://github.com/xdy/xdy-pf2e-workbench/issues/890)

# [5.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.6.0...v5.7.0) (2023-07-14)


### Features

* Moved the previous release's houserule-related feature to the '(Experimental) House Rules' settings menu. Also added an initial version of a *very* experimental and utterly unsupported misfeature that is probably a bad idea to the same menu. ([5520487](https://github.com/xdy/xdy-pf2e-workbench/commit/55204875a7d4c73faf3e3d9411e25ba0b4f59d59))

# [5.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.5.0...v5.6.0) (2023-07-14)


### Features

* I accidentally released a half-working house rules feature that added saves to hammer and flail critical specialization results that I had decided against releasing... Ah well. I have now added a settings toggle for it in case anyone decided they want to keep using it. ([eae6293](https://github.com/xdy/xdy-pf2e-workbench/commit/eae6293e35386338943611cc405db328cc4a7c21))

# [5.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.5...v5.5.0) (2023-07-13)


### Features

* Disconnect automating nonlethal damage from automating dying. ([595c5e9](https://github.com/xdy/xdy-pf2e-workbench/commit/595c5e936cd4df2888ae43e6a0f85b56924417c0))

## [5.4.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.4...v5.4.5) (2023-07-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([c595434](https://github.com/xdy/xdy-pf2e-workbench/commit/c595434a92c95d7420a0b4b68a62e2603cd22d02))

## [5.4.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.3...v5.4.4) (2023-07-07)


### Bug Fixes

* Sorting actions on the character sheet works again. ([66060ce](https://github.com/xdy/xdy-pf2e-workbench/commit/66060ce425efc667acf7e3144e7f389e3d295e8b))

## [5.4.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.2...v5.4.3) (2023-07-06)


### Bug Fixes

* Persistent damage works again. Unless you use Simple Calendar. :( (In which case it still rolls twice.) ([01514c6](https://github.com/xdy/xdy-pf2e-workbench/commit/01514c6174399018bae972bd43e0fb656af9577b))

## [5.4.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.1...v5.4.2) (2023-07-06)


### Bug Fixes

* Only roll persistent damage once even if another roll somehow exists (happens if Simple Calendar is enabled). ([725fd4c](https://github.com/xdy/xdy-pf2e-workbench/commit/725fd4c412d3cef1396b016739f53f7d3a9aa94b)), closes [#868](https://github.com/xdy/xdy-pf2e-workbench/issues/868)

## [5.4.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.4.0...v5.4.1) (2023-07-05)


### Bug Fixes

* Change 'Effect: Minimum Frighetened' (which is used by 'Aura: Aura of Despair') so it does *not* actually give Frightened. ([6360dcd](https://github.com/xdy/xdy-pf2e-workbench/commit/6360dcd934ddbadedb84a78ecc5fd563b88dbab8))

# [5.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.3.1...v5.4.0) (2023-07-05)


### Features

* Set the default for mystification postfix to the included table 'Workbench Adjectives'. ([edb6a6e](https://github.com/xdy/xdy-pf2e-workbench/commit/edb6a6e5bc5a4a511088894ed865d689fcb5b5a6))

## [5.3.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.3.0...v5.3.1) (2023-07-01)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4cc1d5e](https://github.com/xdy/xdy-pf2e-workbench/commit/4cc1d5e2926f5edee633497d99b358f01bfa475d))

# [5.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.2.0...v5.3.0) (2023-07-01)


### Features

* Adds two auras and one effect to the PF2e Workbench Items compendium. Specifically: ([f109220](https://github.com/xdy/xdy-pf2e-workbench/commit/f109220caad746ad51b222793f360e9896f3db08))

# [5.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.1.0...v5.2.0) (2023-07-01)


### Features

* Hiding spell name on damage message when casting spells privately now works again. Also includes a bunch of updated macros from Symon as well as several updated localizations. ([1c798b2](https://github.com/xdy/xdy-pf2e-workbench/commit/1c798b20f346e15db9b909c9cee6c4e8fbde8eb7))

# [5.1.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.5...v5.1.0) (2023-06-24)


### Features

* Add a new effect 'Effect: Condition for 1 round (modifiable)' to the 'PF2e Workbench Items' compendium. Dragging this effect to a token pops up a choice of what condition to give that actor for one round. To give other durations, either modify the effect on the actor, or make a copy of the effect with the duration changed. ([b1afc04](https://github.com/xdy/xdy-pf2e-workbench/commit/b1afc04485210f2cc984d901189387995e325023))

## [5.0.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.4...v5.0.5) (2023-06-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([377b57f](https://github.com/xdy/xdy-pf2e-workbench/commit/377b57f42fca37a07565643a121ee8144bd6930e))

## [5.0.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.3...v5.0.4) (2023-06-22)


### Bug Fixes

* Change the text for the private casting settings to hopefully make it more obvious that the first setting needs to be enabled for any of the others to work. ([aa022ff](https://github.com/xdy/xdy-pf2e-workbench/commit/aa022ff54b2ae5c01c62ffaa1a564be9ade8a043))

## [5.0.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.2...v5.0.3) (2023-06-18)


### Bug Fixes

* Add folders with banners, set ownership on all packs and folders. ([7b60d95](https://github.com/xdy/xdy-pf2e-workbench/commit/7b60d95f17a64b82103650a581e6cc2aaf4c648f))

## [5.0.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.1...v5.0.2) (2023-06-17)


### Bug Fixes

* NPC Scaler initiative works again ([faf05bc](https://github.com/xdy/xdy-pf2e-workbench/commit/faf05bc539f59503766aa2cd4c52417825097f8c)), closes [#839](https://github.com/xdy/xdy-pf2e-workbench/issues/839)
* NPC Scaler no longer removes doubled resistances. ([60ef24c](https://github.com/xdy/xdy-pf2e-workbench/commit/60ef24c553a02fdbbd9316dc236f74b91d9282e6)), closes [#845](https://github.com/xdy/xdy-pf2e-workbench/issues/845)
* Remove warnings about broken featuers from the settings. ([90daaf4](https://github.com/xdy/xdy-pf2e-workbench/commit/90daaf483651e9d9907a87beb91069654d191964))
* Skill Actions work again. ([3b72b13](https://github.com/xdy/xdy-pf2e-workbench/commit/3b72b1361577fb403f641f5983bd96d86b10d31f)), closes [#850](https://github.com/xdy/xdy-pf2e-workbench/issues/850)
* The option to sort actions works again, and now sorts exploration and downtime actions as well. ([9a12a01](https://github.com/xdy/xdy-pf2e-workbench/commit/9a12a01465303e1bc6375c835e5d05136ba043aa))

## [5.0.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v5.0.0...v5.0.1) (2023-06-14)


### Bug Fixes

* Add a thumbnail on the module installation page. ([f359154](https://github.com/xdy/xdy-pf2e-workbench/commit/f359154d8bae8ddf95099b2f451db62b80503631))

# [5.0.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.77.2...v5.0.0) (2023-06-13)


### Features

* The PF2e Workbench now requires PF2e version 5 or later, and Foundry v11 or later. ([73707f0](https://github.com/xdy/xdy-pf2e-workbench/commit/73707f07663b6d167b1f01b39db5a891f797e4ab))


### BREAKING CHANGES

* The PF2e Workbench now requires PF2e version 5 or later, and Foundry v11 or later.

Skill Actions and character sheet action sorting are known to be broken.
There is probably more breakage. Please make github issues when you find something that doesn't work, if there isn't already an issue. PR:s with fixes are even more welcome. :)

## [4.77.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.77.1...v4.77.2) (2023-06-03)


### Bug Fixes

* Remove Quick Quantities as it's now part of the system. Set minimum pf2e version to 4.12.7 ([598a816](https://github.com/xdy/xdy-pf2e-workbench/commit/598a816755007ad5abfade3fb2121a21e110c028))

## [4.77.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.77.1...v4.77.2) (2023-06-03)


### Bug Fixes

* Remove Quick Quantities as it's now part of the system. Set minimum pf2e version to 4.12.7 ([598a816](https://github.com/xdy/xdy-pf2e-workbench/commit/598a816755007ad5abfade3fb2121a21e110c028))

## [4.77.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.77.0...v4.77.1) (2023-05-29)


### Bug Fixes

* Fixes shift and ctrl clicking on items to increase by more than one. ([5ba6fe1](https://github.com/xdy/xdy-pf2e-workbench/commit/5ba6fe1b3dcfb68bb902af3953282e71459d6b9c))
* Sorting actions should default to off. ([cbd9b25](https://github.com/xdy/xdy-pf2e-workbench/commit/cbd9b25c71ecd2ca06a02ad052ac4c2f579cf3e1))

# [4.77.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.76.4...v4.77.0) (2023-05-28)


### Features

* Added client setting to automatically sort actions alphabetically on the character sheet. Courtesy of @Idle ([48bc9f8](https://github.com/xdy/xdy-pf2e-workbench/commit/48bc9f8a43d6121803416ff03167291c6e7dfe8a))

## [4.76.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.76.3...v4.76.4) (2023-05-27)


### Bug Fixes

* Re-added MAP buttons for Basic Action Macros. NOTE: They might not work until pf2e 4.12.6 or greater. ([6eed5ae](https://github.com/xdy/xdy-pf2e-workbench/commit/6eed5aed4a8daa25fa715492f994ce492b159aa7))

## [4.76.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.76.2...v4.76.3) (2023-05-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([2b6ff3b](https://github.com/xdy/xdy-pf2e-workbench/commit/2b6ff3b2a92be7d44826c188db0c9802fa991fed))

## [4.76.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.76.1...v4.76.2) (2023-05-23)


### Bug Fixes

* Keeping up with the Macro Faeries. ([98f145c](https://github.com/xdy/xdy-pf2e-workbench/commit/98f145c04c1a4754812dca2e0fddcbfa53f69360))

## [4.76.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.76.0...v4.76.1) (2023-05-22)


### Bug Fixes

* Keeping up with the Macro Faeries. ([90031bc](https://github.com/xdy/xdy-pf2e-workbench/commit/90031bc4bc57c9893aa441b2f909e5417a699fb6))

# [4.76.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.75.1...v4.76.0) (2023-05-21)


### Features

* Update to require pf2e system version 4.12.0 or greater. Make Basic Action Macros work again for non-english languages. ([ea20290](https://github.com/xdy/xdy-pf2e-workbench/commit/ea20290e98d9dc0f4464a5e83ab0b1c585d0b309))

## [4.75.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.75.0...v4.75.1) (2023-05-21)


### Bug Fixes

* More problems with the gm client doing automation for the client where it shouldn't. I.e. if the client had turned off the settings for autorolling damage, handling persistent damage/healing and/or handling dying recovery rolls but the GM had them on, they would still be automated for clients. ([e5f4c12](https://github.com/xdy/xdy-pf2e-workbench/commit/e5f4c12fc154d6bc1a63475e401fde1a0e802943))

# [4.75.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.74.0...v4.75.0) (2023-05-19)


### Features

* Make it possible to change the setting to use Meta/⌘ (command)/⊞ (windows) to mystify creatures when dragging them onto a scene. *Might* make it possible for mac users to use command-v to paste and reroll the names of mystified creatures just like control-v works for windows users. ([0d95f04](https://github.com/xdy/xdy-pf2e-workbench/commit/0d95f0429a97163c3a9bebf48cdef8f6361e6e7f))

# [4.74.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.5...v4.74.0) (2023-05-19)


### Bug Fixes

* A search and replace gone bad... If user automation/reminders has been wonky for you lately, try again with this version. ([468715d](https://github.com/xdy/xdy-pf2e-workbench/commit/468715d86cc481538071ca7d53ce92bb54ad3b8e))


### Features

* Make the Basic Action Macro dialog a *little* more configurable via a setting, and enable resizing it (it doesn't scale, so of limited use.) ([9fb85fb](https://github.com/xdy/xdy-pf2e-workbench/commit/9fb85fb966c02cb65e1ca5b4ae7c65606c2c439e)), closes [#799](https://github.com/xdy/xdy-pf2e-workbench/issues/799)

## [4.73.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.4...v4.73.5) (2023-05-19)


### Bug Fixes

* Make persistent damage recovery roll work for unlinked tokens (e.g. npcs). ([77d64eb](https://github.com/xdy/xdy-pf2e-workbench/commit/77d64eb5135ea821f40e22fd3589e1870b227c03))

## [4.73.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.3...v4.73.4) (2023-05-19)


### Bug Fixes

* Improve the hint on the sub-settings a bit. Removes the experimental note from autoGainDyingAtZeroHPIfCriticallyHitOneMore and autoGainDyingIfTakingDamageWhenAlreadyDying. ([29cfae1](https://github.com/xdy/xdy-pf2e-workbench/commit/29cfae1b19664f13822513357777b69ff6787b19))

## [4.73.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.2...v4.73.3) (2023-05-19)


### Bug Fixes

* Make minify create a sourcemap. ([8ed48b9](https://github.com/xdy/xdy-pf2e-workbench/commit/8ed48b95c8d547fa8157d4cee78169e51ddc8b16))
* Try to fix problem with foundry-publish ([e3793f3](https://github.com/xdy/xdy-pf2e-workbench/commit/e3793f3693c9ede8c1ffbbc8b4c0ce3e052f3f3b))

## [4.73.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.1...v4.73.2) (2023-05-19)


### Bug Fixes

* Basic Action Macros fails on some actors, this hopefully fixes that. ([e06772c](https://github.com/xdy/xdy-pf2e-workbench/commit/e06772cc138b302868ae3477577d3263c8a904ad))

## [4.73.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.73.0...v4.73.1) (2023-05-19)


### Bug Fixes

* Whirlwind strike bug fixes. ([a38bf5f](https://github.com/xdy/xdy-pf2e-workbench/commit/a38bf5fe7c7173067c8dbe1be973783d8323e0b7))

# [4.73.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.72.1...v4.73.0) (2023-05-19)


### Features

* Change the whirlwindStrike macro so it warns if the aura effect is not present, and uses a counter on it to increase/decrease the reach. (Note that reach over 10 feet is not handled correctly, it covers too much area.) ([d698850](https://github.com/xdy/xdy-pf2e-workbench/commit/d69885097aac31599299eb81f28b0b1d5135c10f))

## [4.72.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.72.0...v4.72.1) (2023-05-18)


### Bug Fixes

* All recovery roll settings have been reset to default values as part of bugfixes. Reintroduced hiding client settings the gm has made unavailable. Moved the suboption to roll persistent damage recovery to it's proper place. ([33c894a](https://github.com/xdy/xdy-pf2e-workbench/commit/33c894a265d21c8219eb3ba07d9af324a008f100))

# [4.72.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.71.4...v4.72.0) (2023-05-18)


### Features

* Add suboption to the apply persistant damage that automatically rolls the persistent damage recovery. ([5bc70c2](https://github.com/xdy/xdy-pf2e-workbench/commit/5bc70c2609b60927803df1444ca9ffb8e56b7c8d))

## [4.71.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.71.3...v4.71.4) (2023-05-18)


### Bug Fixes

* This release, unlike the previous one, is not actually redundant. ([4d3c757](https://github.com/xdy/xdy-pf2e-workbench/commit/4d3c7577d0cd23baca863abbfa7560c693a22af2))

## [4.71.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.71.2...v4.71.3) (2023-05-18)


### Bug Fixes

* Le service des redondances service remercie ses vigiles vigilants pour leur travail inlassable et incessant pour éliminer le verbiage excessif et redondant des mots inclus dans ce module modulaire. ([ba492f7](https://github.com/xdy/xdy-pf2e-workbench/commit/ba492f7832a8bf3464d1de412783869fc6cdd0cd))

## [4.71.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.71.1...v4.71.2) (2023-05-18)


### Bug Fixes

* The department of redundancy department thanks it's vigilant vigilantes for their tirelessly unceasing work to remove excessive and redundant verbiage from the words included in this modular module. ([a875118](https://github.com/xdy/xdy-pf2e-workbench/commit/a875118cae285ae24f47abe6f6a720c97ee137c2))

## [4.71.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.71.0...v4.71.1) (2023-05-18)


### Bug Fixes

* Fix a couple of recovery roll bugs. ([82ccc37](https://github.com/xdy/xdy-pf2e-workbench/commit/82ccc374c9900121cc2811b670b761d724710a70))

# [4.71.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.70.0...v4.71.0) (2023-05-17)


### Features

* Add option to automate handling of recovery roll from Dying. If that option and/or the option to increase dying on going 0 hp and/or the option to increase dying if taking damage when already dying is enabled, mark combatant as defeated on reaching max dying. ([38079ff](https://github.com/xdy/xdy-pf2e-workbench/commit/38079ffb2460e4dd9b085d0356927799024b5cb1))
* Added support for Bonded Focus, Crimson Oath Devotion, Extreme Curse and Major Curse to the Refocus macro. ([51b4d39](https://github.com/xdy/xdy-pf2e-workbench/commit/51b4d39af5a1a6aeb05204493ce0e6089aea3f85)), closes [#806](https://github.com/xdy/xdy-pf2e-workbench/issues/806)

# [4.70.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.69.2...v4.70.0) (2023-05-14)


### Bug Fixes

* Another attempt at a fix. ([2e88d95](https://github.com/xdy/xdy-pf2e-workbench/commit/2e88d95cec9be90d6fb2d49dca0f4876c5de0cd4))
* Another try, now with a yet another way to get a temp dir, that hopefully works on github as well. ([703f767](https://github.com/xdy/xdy-pf2e-workbench/commit/703f76752f82ca3dc57f0538a99715d1e66c455c))
* Print out where the files end up. ([af69580](https://github.com/xdy/xdy-pf2e-workbench/commit/af6958090a64b2481fd76dcd869e53907338f3a6))


### Features

* Switch build to vite. General cleanup and minor bug fixes. ([03676d5](https://github.com/xdy/xdy-pf2e-workbench/commit/03676d5d1ced75c01feae2d922981f0e2afbe297))

## [4.69.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.69.1...v4.69.2) (2023-05-11)


### Bug Fixes

* If the option to make characters drop items when becoming unconscious is enabled, don't drop bucklers as they're strapped on. ([09c93e8](https://github.com/xdy/xdy-pf2e-workbench/commit/09c93e84124c6093ac747a8a007230fd0a81e221)), closes [#794](https://github.com/xdy/xdy-pf2e-workbench/issues/794)

## [4.69.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.69.0...v4.69.1) (2023-05-10)


### Bug Fixes

* Dropping items when unconscious shouldn't cause duplicate messages and update warnings. Also switched to using the system's primaryUpdater check. ([102dd17](https://github.com/xdy/xdy-pf2e-workbench/commit/102dd17f00da625ea516be49a25b2a8d7c486d09))
* Dropping items when unconscious shouldn't cause duplicate messages and update warnings. Also switched to using the system's primaryUpdater check. ([8f5a2b6](https://github.com/xdy/xdy-pf2e-workbench/commit/8f5a2b6215784fd6d361d59f3e34a56b816ea7f5))

# [4.69.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.68.0...v4.69.0) (2023-05-10)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f777fd1](https://github.com/xdy/xdy-pf2e-workbench/commit/f777fd124bf0f66f1e2f4fcd74b489de467d6368))


### Features

* Turn how to handle nonlethal damage into a subsetting to how dying is handled. ([1addb8c](https://github.com/xdy/xdy-pf2e-workbench/commit/1addb8c50748006c48a29a7bbbc16760b1dae641))

# [4.68.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.6...v4.68.0) (2023-05-09)


### Features

* Added world automation setting to automatically drop held items when becoming unconscious. ([dc620e1](https://github.com/xdy/xdy-pf2e-workbench/commit/dc620e10b3f085d04ca92ee10906c0a20bdfd407))

## [4.67.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.5...v4.67.6) (2023-05-07)


### Bug Fixes

* Keeping up with the Macro Faeries. ([580c4d7](https://github.com/xdy/xdy-pf2e-workbench/commit/580c4d7663f7b14eb5dc9bf2947161f0fc7f1cbb))

## [4.67.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.4...v4.67.5) (2023-05-07)


### Bug Fixes

* Possible fix for casting spells privately not always working. ([522ee92](https://github.com/xdy/xdy-pf2e-workbench/commit/522ee921cda2c1fcc65960fa61e4dc1fbed339fd))

## [4.67.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.3...v4.67.4) (2023-05-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8c9b99d](https://github.com/xdy/xdy-pf2e-workbench/commit/8c9b99d70162b88788b0395a9027ae153dba4918))
* Make breath weapon reminder a bit more eager, don't filter on ability name any more. ([f907ae6](https://github.com/xdy/xdy-pf2e-workbench/commit/f907ae60da76ce6099b51e88511558a34c05dc44)), closes [#778](https://github.com/xdy/xdy-pf2e-workbench/issues/778)

## [4.67.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.2...v4.67.3) (2023-04-30)


### Bug Fixes

* Revert previous 'fix' to BAM translations. It made things worse. :) ([97e29a6](https://github.com/xdy/xdy-pf2e-workbench/commit/97e29a6f138c48f94df5b00b094cfad27a810891))

## [4.67.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.1...v4.67.2) (2023-04-30)


### Bug Fixes

* Translations of all actions in BAM should now work again. ([d123300](https://github.com/xdy/xdy-pf2e-workbench/commit/d12330079ea4b0b1ddb8fc07e7b2bfe5f9976948))

## [4.67.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.67.0...v4.67.1) (2023-04-28)


### Bug Fixes

* Possible fix for those with problems casting spells privately. ([f704353](https://github.com/xdy/xdy-pf2e-workbench/commit/f7043532bd39fe703322263be40e102a02e2f910))

# [4.67.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.66.1...v4.67.0) (2023-04-28)


### Features

* When the option to have npcs always cast spells privately is enabled, you can now hold Ctrl to *not* cast a spell privately. ([5132d8f](https://github.com/xdy/xdy-pf2e-workbench/commit/5132d8f49b72f7fcafa3a3492185346a2e0ee903)), closes [#774](https://github.com/xdy/xdy-pf2e-workbench/issues/774)

## [4.66.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.66.0...v4.66.1) (2023-04-28)


### Bug Fixes

* Don't kill unconscious creatures if hitting them with nonlethal weapons... ([7646cc8](https://github.com/xdy/xdy-pf2e-workbench/commit/7646cc85404af3ff2f6c8e9446e7f883cfcac6d5))

# [4.66.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.65.3...v4.66.0) (2023-04-28)


### Features

* If the option to automatically gain dying is enabled, and the attack that brings a creature to 0 hp is Nonlethal, the creature becomes Unconscious rather than dying. ([39ba1a3](https://github.com/xdy/xdy-pf2e-workbench/commit/39ba1a3ec885e5e74edcf1682d28803badd5dd4f))

## [4.65.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.65.2...v4.65.3) (2023-04-27)


### Bug Fixes

* Fixed bug that made skill actions that aren't in game.pf2e.actions not work. ([9eead0a](https://github.com/xdy/xdy-pf2e-workbench/commit/9eead0a4e745946abb322ab3f74ff178829e4eb3))
* Keeping up with the Macro Faeries. ([ac69f94](https://github.com/xdy/xdy-pf2e-workbench/commit/ac69f94d17dbd1a5a31219a7d21a35ec7ef90999))
* Turn off map in basic action macros until I have the time to fix it. ([00aa1ce](https://github.com/xdy/xdy-pf2e-workbench/commit/00aa1ce8e87ccd6420eabdc6e430d763ac024f7d))
* Turn off map in skill actions until I have the time to fix it. ([332524e](https://github.com/xdy/xdy-pf2e-workbench/commit/332524e25af95983c95b05ab7450ee212deb41a3))

## [4.65.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.65.1...v4.65.2) (2023-04-27)


### Bug Fixes

* Keeping up with the Macro Faeries. ([74b6af3](https://github.com/xdy/xdy-pf2e-workbench/commit/74b6af36e26eb9660d4da22f17b007ab9f3ce953))

## [4.65.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.65.0...v4.65.1) (2023-04-27)


### Bug Fixes

* Keeping up with the Macro Faeries. ([63042b6](https://github.com/xdy/xdy-pf2e-workbench/commit/63042b6c5b26a60d79222bf966608d0d04a11da9))

# [4.65.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.64.3...v4.65.0) (2023-04-26)


### Features

* Adds full German translation courtesy of @Liathan ([64bf4bc](https://github.com/xdy/xdy-pf2e-workbench/commit/64bf4bc3a3fce43a7348ba5b42ecaec039232c10))

## [4.64.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.64.2...v4.64.3) (2023-04-23)


### Bug Fixes

* Now hides the name of a privately cast spell from *players* instead of GMs. :) ([db08784](https://github.com/xdy/xdy-pf2e-workbench/commit/db0878464b6104d08483f0276984133d9830f264))

## [4.64.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.64.1...v4.64.2) (2023-04-23)


### Bug Fixes

* Removes the option to add a recall knowledge button to npc sheets as a recent system update broke it beyond repair. ([374dea7](https://github.com/xdy/xdy-pf2e-workbench/commit/374dea74bf387539a5b68138c3d0c0483a123477))

## [4.64.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.64.0...v4.64.1) (2023-04-23)


### Bug Fixes

* Move hide name of privately cast spell to it's own sub-setting. (It's flaky for some people, disable it if it doesn't work for you.) ([2e8bf12](https://github.com/xdy/xdy-pf2e-workbench/commit/2e8bf12de213487c721b9a6fafd1882c9dbc1011))

# [4.64.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.5...v4.64.0) (2023-04-23)


### Bug Fixes

* Less chatty logging. ([5acb938](https://github.com/xdy/xdy-pf2e-workbench/commit/5acb938af0acf175856375592f92a4027ba77d38))


### Features

* Targeting reminder can now be set to require targeting (i.e. only targeted attacks will be rolled). ([453b6cf](https://github.com/xdy/xdy-pf2e-workbench/commit/453b6cf498ba11af1e7d2ccdbcf3abda6c30b58a))

## [4.63.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.4...v4.63.5) (2023-04-21)


### Bug Fixes

* Enables translation of Escape and Earn Income in skill actions feature. ([e93c46d](https://github.com/xdy/xdy-pf2e-workbench/commit/e93c46dcf111346ace062baca58b434bddbf4c78)), closes [#755](https://github.com/xdy/xdy-pf2e-workbench/issues/755)

## [4.63.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.3...v4.63.4) (2023-04-18)


### Bug Fixes

* Names of privately cast spells are again mystified in damage rolls. ([423ecdd](https://github.com/xdy/xdy-pf2e-workbench/commit/423ecdd2430c06bcbc1be16d660819595e4becfd))

## [4.63.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.2...v4.63.3) (2023-04-17)


### Bug Fixes

* If enabled, persistent damage and healing should again apply automatically. ([e3761d3](https://github.com/xdy/xdy-pf2e-workbench/commit/e3761d3662805f970360c806be03306137c02fd8))

## [4.63.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.1...v4.63.2) (2023-04-16)


### Bug Fixes

* Trip shows MAP again. ([cf79122](https://github.com/xdy/xdy-pf2e-workbench/commit/cf79122969a911abf71c1fc093f2d25df3c46b5c)), closes [#750](https://github.com/xdy/xdy-pf2e-workbench/issues/750)

## [4.63.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.63.0...v4.63.1) (2023-04-15)


### Bug Fixes

* Clean up Basic Action Macros a bit, replace a few duplicate icons with others. ([97412c0](https://github.com/xdy/xdy-pf2e-workbench/commit/97412c096175ea0718127cc0840448bd694dd079))

# [4.63.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.62.2...v4.63.0) (2023-04-15)


### Bug Fixes

* Avoid applying persistent healing/damage for old messages. ([a242a4c](https://github.com/xdy/xdy-pf2e-workbench/commit/a242a4c728a70399d6c82771667fcb9f7b28c4e2))


### Features

* Add slashed eye when collapsing messages (toggling to unslashed eye when it's not collapsed). ([1d7d226](https://github.com/xdy/xdy-pf2e-workbench/commit/1d7d22663e7c5aa2339083ea3abf26b28ba1a3dc))

## [4.62.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.62.1...v4.62.2) (2023-04-15)


### Bug Fixes

* Fix regression in NPC mystification pre/post ([d3ca1ec](https://github.com/xdy/xdy-pf2e-workbench/commit/d3ca1ec6f0f6d51ef3e3bad82a6d5dbd60a65d28))

## [4.62.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.62.0...v4.62.1) (2023-04-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d66b7d5](https://github.com/xdy/xdy-pf2e-workbench/commit/d66b7d5e1ab645ce8fe0e8011cf664231c271877))

# [4.62.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.61.1...v4.62.0) (2023-04-14)


### Features

* Made the options to automatically gain dying all have a dropdown with several choices (none, everyone, characters+familiars). Made the various dying options more independent. Fixed several bugs related to when they should or should not apply dying. ([5662841](https://github.com/xdy/xdy-pf2e-workbench/commit/5662841b78e961170874b5b3be5f3d829f952575))

## [4.61.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.61.0...v4.61.1) (2023-04-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([1f93a6f](https://github.com/xdy/xdy-pf2e-workbench/commit/1f93a6f3a17b3761c721c9f2402bfa933e40be65))

# [4.61.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.60.0...v4.61.0) (2023-04-13)


### Features

* Changes Basic Action Macros to use Darkim's fancy new Demoralize macro when you use Demoralize. ([12d521e](https://github.com/xdy/xdy-pf2e-workbench/commit/12d521eb896412238c7f274cf4b7949eb1536826))

# [4.60.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.5...v4.60.0) (2023-04-13)


### Bug Fixes

* Typo in css... ([fdd96e5](https://github.com/xdy/xdy-pf2e-workbench/commit/fdd96e51a948324c7d873dfb8d221acf3e3be103))


### Features

* Adds support for macros setting a flag on a chat message that hides that message to those with too low a user role. ([d42fba3](https://github.com/xdy/xdy-pf2e-workbench/commit/d42fba3e33e222c38d79b4b0d942b115ebfe416e))


### Reverts

* Revert "fix: Debounce updating hooks." ([cf944bc](https://github.com/xdy/xdy-pf2e-workbench/commit/cf944bc1227e43d82a26318939db804189fe66de))

## [4.59.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.4...v4.59.5) (2023-04-12)


### Bug Fixes

* Debounce updating hooks. ([b94b569](https://github.com/xdy/xdy-pf2e-workbench/commit/b94b569865e111c09c24c88060f12ce69019633d))

## [4.59.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.3...v4.59.4) (2023-04-08)


### Bug Fixes

* Potential (if not very good) fix for dying sometimes doubling if all the dying options are on. ([5058dd3](https://github.com/xdy/xdy-pf2e-workbench/commit/5058dd3a754ac72bbe18f73edaa7f50c87ec4e12))

## [4.59.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.2...v4.59.3) (2023-04-08)


### Bug Fixes

* Various edge (and not so edge) cases around automatic gain of dying. No integration with pf2e-target-damage for now. ([a06143c](https://github.com/xdy/xdy-pf2e-workbench/commit/a06143cb4f2bde818aa456fed1b1bfb662b524f2))

## [4.59.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.1...v4.59.2) (2023-04-08)


### Bug Fixes

* Don't increase dying for actors you don't own. ([a6c9e42](https://github.com/xdy/xdy-pf2e-workbench/commit/a6c9e42cef7be360ae998d426b048dbc317dc39f))

## [4.59.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.59.0...v4.59.1) (2023-04-08)


### Bug Fixes

* Hopefully fixes updating foundry admin after switch from webpack to vite. ([e396d97](https://github.com/xdy/xdy-pf2e-workbench/commit/e396d9754812f81f6fd2cd260c3032d497a62992))

# [4.59.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.5...v4.59.0) (2023-04-08)


### Bug Fixes

* Hopefully fixes release script after switch from webpack to vite. ([3006ed1](https://github.com/xdy/xdy-pf2e-workbench/commit/3006ed109438a706d559ca75abd9653d63e10d7f))


### Features

* Adds a subsetting which, if the option to automatically add dying is also enabled, for an actor that is brought to 0 hp by damage from a targeted critically successful attack by an enemy, the dying level will be increased by one more than if not. (As long as that attack was within the last ten messages in the chat at the time the damage was applied, and, if pf2e-target-damage is installed, that damage roll has not already been used for that target.) ([d6a2e26](https://github.com/xdy/xdy-pf2e-workbench/commit/d6a2e263cf63025856029329c9c89d7ecc62c6e9)), closes [#615](https://github.com/xdy/xdy-pf2e-workbench/issues/615)
* Adds a subsetting which, if the option to automatically add dying is also enabled, for an actor that takes damage when already dying, add another one or two levels of dying. NOTE that this implementation does *not* know about immunities and resistances. Even 0 damage will add a level of Dying. ([c2ccaff](https://github.com/xdy/xdy-pf2e-workbench/commit/c2ccaff148b84e301e8d18f097e5445592b00bcd))

## [4.58.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.4...v4.58.5) (2023-04-06)


### Bug Fixes

* Bug that made changing pause text error out on startup. ([ecfac7b](https://github.com/xdy/xdy-pf2e-workbench/commit/ecfac7b797732c90eaf1ee72f7401d9fb01e89ea))

## [4.58.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.3...v4.58.4) (2023-04-03)


### Bug Fixes

* Fix bug that made settings require a manual refresh. ([e3a3c7e](https://github.com/xdy/xdy-pf2e-workbench/commit/e3a3c7e99c2bac104c6ec5085e8dd183e926d6b1))
* Make changing pause text and image take effect without reload. ([64802cf](https://github.com/xdy/xdy-pf2e-workbench/commit/64802cfd7ee07aacbe1800b2263d5e322918f505))

## [4.58.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.2...v4.58.3) (2023-04-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8d8c963](https://github.com/xdy/xdy-pf2e-workbench/commit/8d8c9636d5adfaf7ffe554fde2d94ed39e50b7e3))

## [4.58.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.1...v4.58.2) (2023-04-02)


### Bug Fixes

* Turn of renaming privately cast spells again as it keeps breaking in new and unexpected ways. ([47e6edf](https://github.com/xdy/xdy-pf2e-workbench/commit/47e6edf449e5b65c738e3f137dd88f80967ccf77))

## [4.58.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.58.0...v4.58.1) (2023-04-02)


### Bug Fixes

* When the gm changes settings, make players update which setting hooks are active. ([88e1f1c](https://github.com/xdy/xdy-pf2e-workbench/commit/88e1f1c630e3fd7854d5cb5abdcb01001b3709b3))

# [4.58.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.57.0...v4.58.0) (2023-04-01)


### Features

* Re-enable hiding spell names when casting spells privately. NOTE: this feature is currently incompatible with the module Polyglot. A PR has been submitted to Polyglot to fix this. See https://github.com/mclemente/fvtt-module-polyglot/pull/285 ([90effd9](https://github.com/xdy/xdy-pf2e-workbench/commit/90effd9c9a15410b9956dcc461b50a866cf80878))

# [4.57.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.56.1...v4.57.0) (2023-03-30)


### Features

* Changes minimum supported pf2e version to 4.10.0, removes option to give clumsy to those wielding too large weapons as that is now part of the system, removes the stopgap Dread Marshal Stance and Inspiring Marshal Stance effects as those are now part of the system (which breaks the Marshal Stance macro until that is itself updated or removed.) ([d96fc6a](https://github.com/xdy/xdy-pf2e-workbench/commit/d96fc6a9b3689f07546b32d5e4df983efbcc507f))

## [4.56.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.56.0...v4.56.1) (2023-03-28)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f7bb847](https://github.com/xdy/xdy-pf2e-workbench/commit/f7bb8478d1f885714a589e5dec73cba2f795d9ff))

# [4.56.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.55.3...v4.56.0) (2023-03-27)


### Bug Fixes

* Simplified conditions for moving in iniative on zero hp a bit. Possibly making the problem with spurious initiative changes go away? (Still never happened for me, so not sure if this changes anything.) ([8db74ba](https://github.com/xdy/xdy-pf2e-workbench/commit/8db74bac818e48093c9c2615d704855857d6312b))


### Features

* Update combat tracker names when mystifiying/demystifying. ([6541a09](https://github.com/xdy/xdy-pf2e-workbench/commit/6541a09406372fa8687c27bb38c279eb2d90e1a6)), closes [#720](https://github.com/xdy/xdy-pf2e-workbench/issues/720)

## [4.55.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.55.2...v4.55.3) (2023-03-26)


### Bug Fixes

* Turn off trying to hide spell names on damage roll for now as it breaks the chat message. ([a0f6241](https://github.com/xdy/xdy-pf2e-workbench/commit/a0f6241282cbe3df765b8ebe568e6de6bd0bff45))

## [4.55.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.55.1...v4.55.2) (2023-03-26)


### Bug Fixes

* If a spell is cast privately, the damage roll for it replaces the spell name with the text "A spell". ([597c41c](https://github.com/xdy/xdy-pf2e-workbench/commit/597c41c649e3de370a9b595d2b583b46fc07521b)), closes [#702](https://github.com/xdy/xdy-pf2e-workbench/issues/702)

## [4.55.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.55.0...v4.55.1) (2023-03-26)


### Bug Fixes

* Mystifies message speaker in a few more cases. Supports tokens on other scenes. ([71bea2a](https://github.com/xdy/xdy-pf2e-workbench/commit/71bea2aa155d08190550eb5aff0aa956dcfcce99))

# [4.55.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.54.1...v4.55.0) (2023-03-26)


### Features

* If the option to mystify actor names in chat messages is enabled it uses the token name for the speaker (and tries to replace the name inside the message itself.) ([6c3a3ff](https://github.com/xdy/xdy-pf2e-workbench/commit/6c3a3ff29b1d4109a42fd9a413b4c7b6c2f65763)), closes [#702](https://github.com/xdy/xdy-pf2e-workbench/issues/702)

## [4.54.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.54.0...v4.54.1) (2023-03-26)


### Bug Fixes

* Possible fix for the "setting initiative to just before the current combatant" feature changing initiatives when it shouldn't. ([7fed5f9](https://github.com/xdy/xdy-pf2e-workbench/commit/7fed5f9be219e2cf1bfe76351f0510c2fa717aed))

# [4.54.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.53.1...v4.54.0) (2023-03-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([add9730](https://github.com/xdy/xdy-pf2e-workbench/commit/add9730cbc16f043d4285a4185e4532dc5e0a661))
* Update dependencies. ([af451b3](https://github.com/xdy/xdy-pf2e-workbench/commit/af451b3a00c7fecf7f0bc73b67f0bbd71b7e09d4))


### Features

* Remember all those annoying reloads the Workbench used to require every time you touched a setting? No more. :) ([fa07651](https://github.com/xdy/xdy-pf2e-workbench/commit/fa0765137e5d7a494dbfa3edda0a23b87c8cd9b4))

## [4.53.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.53.0...v4.53.1) (2023-03-23)


### Bug Fixes

* Update dependencies. (And, in case a github problem broke the previous release, might as well do another one.) ([36f9a7f](https://github.com/xdy/xdy-pf2e-workbench/commit/36f9a7f51f9743020998a6aa4a87d45b09495af9))

# [4.53.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.9...v4.53.0) (2023-03-23)


### Features

* Add option to only move dead characters (as opposed to characters and npcs) in initiative order on reaching 0 hp. Also fixes bug with Orc Ferocity-havers being moved in initiative even though they end up with 1 hp. ([de91dff](https://github.com/xdy/xdy-pf2e-workbench/commit/de91dff8a0d7e6f2d684899e81b6444351bf9162))

## [4.52.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.8...v4.52.9) (2023-03-22)


### Bug Fixes

* Typo always disabled player spell rarity colors. ([bd837d0](https://github.com/xdy/xdy-pf2e-workbench/commit/bd837d030a4dce9b8ac52e1a4a7abf6c3ea2df0b))

## [4.52.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.7...v4.52.8) (2023-03-22)


### Bug Fixes

* Another edge case around auto-removing and adding dying condition. ([6ed372d](https://github.com/xdy/xdy-pf2e-workbench/commit/6ed372d82689a42ad48ab24c0f6cb0fedc4c17a5))

## [4.52.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.6...v4.52.7) (2023-03-22)


### Bug Fixes

* A couple of edge cases around auto-removing and adding dying condition. ([dd8b1f7](https://github.com/xdy/xdy-pf2e-workbench/commit/dd8b1f7808bbed82143fbfc7e453008a831bdda2)), closes [#709](https://github.com/xdy/xdy-pf2e-workbench/issues/709)

## [4.52.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.5...v4.52.6) (2023-03-20)


### Bug Fixes

* CR Scaler showed scaled damage for spells, which it shouldn't, it should ignore spell damage as that needs to be handled manually (most likely by moving them to another spell slot). ([1bc46c4](https://github.com/xdy/xdy-pf2e-workbench/commit/1bc46c46ba3917d148b62da7c71cf060e354c58a)), closes [#705](https://github.com/xdy/xdy-pf2e-workbench/issues/705)

## [4.52.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.4...v4.52.5) (2023-03-20)


### Bug Fixes

* Fixed several places where features where enabled for unsupported actor types. Fixed title of journal created when running buildNpcSpellbookJournal macro on an npc. ([d3b9eeb](https://github.com/xdy/xdy-pf2e-workbench/commit/d3b9eeb2a0d99b4da42c34cc2ba23bc7cfb9f005))

## [4.52.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.3...v4.52.4) (2023-03-19)


### Bug Fixes

* It is now possible to stop-bleeding using Basic Action Macros. ([637d751](https://github.com/xdy/xdy-pf2e-workbench/commit/637d75158e286be1328d3229e19933cba67a4659))

## [4.52.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.2...v4.52.3) (2023-03-19)


### Bug Fixes

* Orc Ferocity (and related feats) should now work properly together with the feature to increase dying when reaching 0 hp. ([8d30252](https://github.com/xdy/xdy-pf2e-workbench/commit/8d30252bde99a3c28074dd633e9c6de8af480986))
* Stop Bleeding from Skill Actions was broken. ([607f0fd](https://github.com/xdy/xdy-pf2e-workbench/commit/607f0fdfe7104a5a96a233637084a778083209b8)), closes [#704](https://github.com/xdy/xdy-pf2e-workbench/issues/704)

## [4.52.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.1...v4.52.2) (2023-03-17)


### Bug Fixes

* Updated translations and macros. Set minimum pf2e version to 4.9.0 and verified 4.9.3 ([f41b24b](https://github.com/xdy/xdy-pf2e-workbench/commit/f41b24b01e510ee59ac2ae264ac47a244c98adc5))

## [4.52.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.52.0...v4.52.1) (2023-03-13)


### Bug Fixes

* Fix module.json language list... ([8f080f2](https://github.com/xdy/xdy-pf2e-workbench/commit/8f080f20c52ed51b36d5d9432bd657ab550c376c))

# [4.52.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.51.2...v4.52.0) (2023-03-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([1d7a963](https://github.com/xdy/xdy-pf2e-workbench/commit/1d7a9631eb679f58a6c7b78b73d7612c19e4e8ae))
* Make Escape action work in Skill Actions again. (Real ugly fix, always chooses highest skill, removed MAP support. Might return later.) ([095d553](https://github.com/xdy/xdy-pf2e-workbench/commit/095d553272c9aca0694562bfdf1f74a9afca6fb7))


### Features

* Make Escape action work in Basic Action Macros. Always chooses highest skill, no MAP support. Might revisit later.) ([436b60e](https://github.com/xdy/xdy-pf2e-workbench/commit/436b60ebd6ee7288073366860bf266c65c0ef282))

## [4.51.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.51.1...v4.51.2) (2023-03-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([134ecbb](https://github.com/xdy/xdy-pf2e-workbench/commit/134ecbbfeaaabbe0f33b97c8f43d1ffb27e23673))
* Keeping up with the Macro Faeries. ([bd7999f](https://github.com/xdy/xdy-pf2e-workbench/commit/bd7999f2fb4e5616d35d738db27816a6b19b0fc5))

## [4.51.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.51.0...v4.51.1) (2023-03-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([36b7543](https://github.com/xdy/xdy-pf2e-workbench/commit/36b754391351970ded22319d765855ffeb8350ae))

# [4.51.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.50.1...v4.51.0) (2023-03-06)


### Features

* Added subsettings for minimum level and minimum rarity to the setting to mystify magical and alchemical items on npcs. ([9d89894](https://github.com/xdy/xdy-pf2e-workbench/commit/9d89894faf38ee227675272244479cd415f9cbe9))

## [4.50.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.50.0...v4.50.1) (2023-03-06)


### Bug Fixes

* Keeping up with the Macro Faeries. ([b6d880a](https://github.com/xdy/xdy-pf2e-workbench/commit/b6d880aed6ea89f3d3ba045321a0d11efe5b9817))
* Removes russian language support due to there apparently being several pathfinder translations with incompatible text. (Feel free to add translation to any of the russian translation modules instead, e.g. https://gitlab.com/gnuraco/pf2r/ or https://github.com/phenomen/foundry-vtt-ru) ([9e7a4dc](https://github.com/xdy/xdy-pf2e-workbench/commit/9e7a4dcba7c6e11a2457a9fed19c7ff89bc74da3)), closes [#688](https://github.com/xdy/xdy-pf2e-workbench/issues/688)

# [4.50.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.7...v4.50.0) (2023-03-05)


### Features

* Enhanced Breath Weapon Reminder to catch more types of breath weapons. ([455cd49](https://github.com/xdy/xdy-pf2e-workbench/commit/455cd494d0f52f8444e3ff0f5af00bc27a6c33bb))

## [4.49.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.6...v4.49.7) (2023-03-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([7a70249](https://github.com/xdy/xdy-pf2e-workbench/commit/7a70249432f99133bec592585cb33d2e1f9da7eb))

## [4.49.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.5...v4.49.6) (2023-03-05)


### Bug Fixes

* Fixes autorolling damage for heightened spells. ([12ce1c2](https://github.com/xdy/xdy-pf2e-workbench/commit/12ce1c22af1af517e69a67d6d441d1ea7b0dfd9f)), closes [#680](https://github.com/xdy/xdy-pf2e-workbench/issues/680)

## [4.49.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.4...v4.49.5) (2023-03-04)


### Bug Fixes

* Fix potential null pointer when casting spells. ([648c792](https://github.com/xdy/xdy-pf2e-workbench/commit/648c792693271abd6c0f15a02f51ee0dd5174ed0))
* Turned off hiding settings that have no effect due to previous settings not being enabled. ([3bf9c9d](https://github.com/xdy/xdy-pf2e-workbench/commit/3bf9c9de8a657ae86041dc1e77914876acb5f7b8))

## [4.49.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.3...v4.49.4) (2023-03-02)


### Bug Fixes

* If a spell is cast privately and damage would be automatically rolled, make the damage roll blind so as not to reveal the name of the privately cast spell. ([cc157f5](https://github.com/xdy/xdy-pf2e-workbench/commit/cc157f5f1dc0b295352b6fbd21279a198d310561))

## [4.49.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.2...v4.49.3) (2023-03-02)


### Bug Fixes

* Fixes error when deleting items from sidebar. ([4e04f3e](https://github.com/xdy/xdy-pf2e-workbench/commit/4e04f3ec7c4016bdd2f9872dcd60c306c9a7c466)), closes [#676](https://github.com/xdy/xdy-pf2e-workbench/issues/676)

## [4.49.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.1...v4.49.2) (2023-03-01)


### Bug Fixes

* Fixes Skill Actions for languages other than English. ([81416bc](https://github.com/xdy/xdy-pf2e-workbench/commit/81416bc96e18b00f0a9a3e2a1442cd24fb369739)), closes [#671](https://github.com/xdy/xdy-pf2e-workbench/issues/671)

## [4.49.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.49.0...v4.49.1) (2023-02-28)


### Bug Fixes

* Fixes possible race condition when adding encumbered due to excess weight. ([8e435a8](https://github.com/xdy/xdy-pf2e-workbench/commit/8e435a8b147ffb80df9719b07e3026bd94d9f0b1))

# [4.49.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.48.1...v4.49.0) (2023-02-27)


### Features

* Sweet new icon for Basic Action Macros, courtesy of @Oskar and [@popy](https://github.com/popy). (You'll have to delete the macro from your world and reimport it to get the new icon.) ([7850e6d](https://github.com/xdy/xdy-pf2e-workbench/commit/7850e6dedb085158c088de2070f431842b948d2e))

## [4.48.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.48.0...v4.48.1) (2023-02-27)


### Bug Fixes

* Handle pause image that is an url instead of a local file. ([77e2f94](https://github.com/xdy/xdy-pf2e-workbench/commit/77e2f9466d46001971eab2ce57f35fad65069a8d)), closes [#670](https://github.com/xdy/xdy-pf2e-workbench/issues/670)

# [4.48.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.47.1...v4.48.0) (2023-02-26)


### Features

* Adds basic support for Natural Medicine and Chirurgeon to the Skill Actions feature. ([defdab3](https://github.com/xdy/xdy-pf2e-workbench/commit/defdab3adff66075bc7b3b1c258413e8151ab803)), closes [#665](https://github.com/xdy/xdy-pf2e-workbench/issues/665)

## [4.47.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.47.0...v4.47.1) (2023-02-24)


### Bug Fixes

* "Workbench Adjectives" should work now. Entering the right path to the compendium helped. :) ([0545135](https://github.com/xdy/xdy-pf2e-workbench/commit/054513504c2ec08ab0e48637d93e08ad3f794fe7))

# [4.47.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.46.0...v4.47.0) (2023-02-24)


### Features

* A table of random adjectives for use with the NPC Mystification feature is now included. Enter "Workbench Adjectives" - without quotes - in any of the postfix/prefix settings to use it, you do not need to import the table into your world. ([3ddf19a](https://github.com/xdy/xdy-pf2e-workbench/commit/3ddf19a78f69f01caa90ed454e61ebdf7970c9f4))

# [4.46.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.45.0...v4.46.0) (2023-02-23)


### Features

* Reworks setting to mystify npc magical and alchemical items so that it can happen on either npc being added to scene or on npc reaching 0 hp. Note that if you have enabled this setting previously you need to reenable it on the mystification settings submenu. ([07e85a9](https://github.com/xdy/xdy-pf2e-workbench/commit/07e85a96626e4298f895ef6a399ecfbf340f2ae0)), closes [#511](https://github.com/xdy/xdy-pf2e-workbench/issues/511)

# [4.45.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.44.1...v4.45.0) (2023-02-21)


### Features

* Add support for the upcoming Administer First Aid and Create Forgery action macros to both Skill Actions and Basic Action Macros. ([8d96699](https://github.com/xdy/xdy-pf2e-workbench/commit/8d9669906f2dabfbe6451f81e70f9bd352b69ceb))

## [4.44.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.44.0...v4.44.1) (2023-02-20)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f0d2ac4](https://github.com/xdy/xdy-pf2e-workbench/commit/f0d2ac4a07020e4e5b293687544fd989ae029aa8))

# [4.44.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.43.0...v4.44.0) (2023-02-19)


### Features

* Make Perform work properly for the Skill Actions feature. Clean up Skill Actions in preparation for more work. ([3cc4ce2](https://github.com/xdy/xdy-pf2e-workbench/commit/3cc4ce2925c6f7248dde410c61d42f97b338ece8))

# [4.43.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.42.2...v4.43.0) (2023-02-18)


### Features

* It's no longer necessary to import the entire xdy-pf2e-workbench-macros with 'Keep Document IDs' checked to use Basic Action Macros or the other macros there, instead just import the macros as you needs them. (Some internal utility macros have been moved to xdy-internal-utility-macros.) ([bbc1e6d](https://github.com/xdy/xdy-pf2e-workbench/commit/bbc1e6d897efb2a789a9a17d6dfc2c8e863f4619))

## [4.42.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.42.1...v4.42.2) (2023-02-16)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f515ac8](https://github.com/xdy/xdy-pf2e-workbench/commit/f515ac8b4d335f8af77c08dc5a40a68280ecd5e2))

## [4.42.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.42.0...v4.42.1) (2023-02-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a7a6adf](https://github.com/xdy/xdy-pf2e-workbench/commit/a7a6adf8f8a218631c3cba416780b4412ff9762b))

# [4.42.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.5...v4.42.0) (2023-02-12)


### Features

* Add support for Conceal an Object, Palm an Object and Steal to Basic Action Macros. ([3a605a5](https://github.com/xdy/xdy-pf2e-workbench/commit/3a605a55e5b0c2d14eba5e36c6f8fa08b0bac7a6))

## [4.41.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.4...v4.41.5) (2023-02-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([98ff436](https://github.com/xdy/xdy-pf2e-workbench/commit/98ff436f85944db3fa012d7ccf7396942f21675d))

## [4.41.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.3...v4.41.4) (2023-02-10)


### Bug Fixes

* Keeping up with the Macro Faeries. ([0f5993c](https://github.com/xdy/xdy-pf2e-workbench/commit/0f5993c638ebd742ba1bc0a3806a3eab5d4e2081))

## [4.41.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.2...v4.41.3) (2023-02-09)


### Bug Fixes

* In Basic Action Macros, set Perform to always use singing. ([11555f2](https://github.com/xdy/xdy-pf2e-workbench/commit/11555f210875eac2226fbe699ae92291256e2941))

## [4.41.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.1...v4.41.2) (2023-02-07)


### Bug Fixes

* Keeping up with the Macro Faeries. ([57877cf](https://github.com/xdy/xdy-pf2e-workbench/commit/57877cf9b66d6ab8923d5530c827a65a249ad770))

## [4.41.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.41.0...v4.41.1) (2023-02-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([8be0ea1](https://github.com/xdy/xdy-pf2e-workbench/commit/8be0ea101c10f1ba328662b6c10e57f1e6a0e99f))

# [4.41.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.6...v4.41.0) (2023-02-05)


### Features

* Show MAP for relevant actions on Basic Action Macros. Thank you @Dorako for showing me the way out of css hell so I could focus on making it work... ([b1c0adf](https://github.com/xdy/xdy-pf2e-workbench/commit/b1c0adfcff48cb6251cbc4f86736f675ae6f380d))

## [4.40.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.5...v4.40.6) (2023-02-05)


### Bug Fixes

* Keeping up with the Macro Faeries. ([a6df34a](https://github.com/xdy/xdy-pf2e-workbench/commit/a6df34a7db0fb8ea0dd1a17c15558596119194b8))

## [4.40.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.4...v4.40.5) (2023-02-03)


### Bug Fixes

* Make Basic Action Macros handle an increased font size a little better. It now always shows a tooltip with the full button text, and cuts the overflow rather than wrap if the text does not fit inside the button. ([95d44a8](https://github.com/xdy/xdy-pf2e-workbench/commit/95d44a847fed5bd87d5dd2c61b1be03598b583d3))

## [4.40.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.3...v4.40.4) (2023-02-03)


### Bug Fixes

* Make changing Workbench settings do an automatic refresh. ([ebde42a](https://github.com/xdy/xdy-pf2e-workbench/commit/ebde42a606d1d3ee17f577b84b90c7587912e674))

## [4.40.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.2...v4.40.3) (2023-02-03)


### Bug Fixes

* Always check isLocked before decreasing condition. ([f3eb964](https://github.com/xdy/xdy-pf2e-workbench/commit/f3eb964d5009dd096768ebec9e9820e453b70a5f)), closes [#637](https://github.com/xdy/xdy-pf2e-workbench/issues/637)

## [4.40.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.1...v4.40.2) (2023-02-03)


### Bug Fixes

* Keeping up with the Macro Faeries. ([c511724](https://github.com/xdy/xdy-pf2e-workbench/commit/c511724e915d46f1ddee3a8879d7e33c7d975c71))

## [4.40.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.40.0...v4.40.1) (2023-01-31)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ffa4bc9](https://github.com/xdy/xdy-pf2e-workbench/commit/ffa4bc90e5bc7977dc25a0a4d7bb7db335135c82))

# [4.40.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.39.0...v4.40.0) (2023-01-30)


### Features

* Collapse more variants of chat messages. ([3db4a89](https://github.com/xdy/xdy-pf2e-workbench/commit/3db4a897077aa2996d3f8636cccf5ec4a5134f49))
* The Skill Actions feature now also supports the new action macros in the next pf2e system version. ([1733f94](https://github.com/xdy/xdy-pf2e-workbench/commit/1733f944a1c8a0b62e97a18e7fd2e2f49f234f0d))

# [4.39.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.38.0...v4.39.0) (2023-01-29)


### Bug Fixes

* Keeping up with the Macro Faeries. ([14eeb75](https://github.com/xdy/xdy-pf2e-workbench/commit/14eeb757d17a46d4d1bcae6804cf9d78c836ac7a))


### Features

* Basic Action Macros adds support for the action macros for Decipher Writing, Disable Device, Perform and Subsist that will hopefully be in the next pf2e system release (i.e. if you try to use them now, they will fail.) ([e5c3952](https://github.com/xdy/xdy-pf2e-workbench/commit/e5c3952345e8a0a136acae9a709a1c63121c9815))
* Optional setting to add an asterisk after a feat name on the character sheet if that feat has prerequisites. ([264938a](https://github.com/xdy/xdy-pf2e-workbench/commit/264938a491c376b756c630d961ab7d3ae492ff5f))

# [4.38.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.37.0...v4.38.0) (2023-01-27)


### Features

* Adds options to show spells and/or feats in rarity colours (the same colours as for other items) on actor sheets. ([37e30fa](https://github.com/xdy/xdy-pf2e-workbench/commit/37e30fadbb18880c54a7f4b56c10aa42f178a789))

# [4.37.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.36.0...v4.37.0) (2023-01-27)


### Features

* "Effect: Change Focus Point Maximum" added to the compendium "xdy-pf2e-workbench-items" that one can add to characters that should have a different cap to Focus Points (change the counter value to change the cap.) ([ead8655](https://github.com/xdy/xdy-pf2e-workbench/commit/ead8655114b5bc829e32929a66bda161718cdc13)), closes [#630](https://github.com/xdy/xdy-pf2e-workbench/issues/630)

# [4.36.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.35.1...v4.36.0) (2023-01-27)


### Features

* The option to automatically reduce Frightened at the end of the turn now supports Dwarven Doughtiness. ([69e9e39](https://github.com/xdy/xdy-pf2e-workbench/commit/69e9e397cce90e9fe6327b2229aefbca5704fc8c)), closes [#631](https://github.com/xdy/xdy-pf2e-workbench/issues/631)

## [4.35.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.35.0...v4.35.1) (2023-01-23)


### Bug Fixes

* Removed the 'eye' on collapsed chat cards again as that clashes with something else (that I apparently don't use as I don't get that problem). Click the title to expand for now. ([1227dad](https://github.com/xdy/xdy-pf2e-workbench/commit/1227dadc92322e32a6adfa8d121b5baa5bc1e8bc))

# [4.35.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.34.0...v4.35.0) (2023-01-22)


### Features

* Adds separate options for collapsing attack and action cards. Brings back the slashed eye icon to indicate a collapsed section. ([c37755a](https://github.com/xdy/xdy-pf2e-workbench/commit/c37755a090b20db57529b2e9f2976a68e77fca65))

# [4.34.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.33.0...v4.34.0) (2023-01-21)


### Features

* Collapses Action chat cards if the setting to collapse item cards is enabled. Click the action title or the roll total to expand or collapse. ([9a48b2d](https://github.com/xdy/xdy-pf2e-workbench/commit/9a48b2dc624d0a11a1b046545fc2064c8feafac4)), closes [#622](https://github.com/xdy/xdy-pf2e-workbench/issues/622)

# [4.33.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.32.0...v4.33.0) (2023-01-21)


### Features

* Add a couple of javascript versions of macros from ApoApostolov (made by Magus and changed a bit by me) to the new xdy-customizable-macros compendium. ([900c14f](https://github.com/xdy/xdy-pf2e-workbench/commit/900c14f83a3e318f095710ddfde7b8b808f2e8ae)), closes [#623](https://github.com/xdy/xdy-pf2e-workbench/issues/623)

# [4.32.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.5...v4.32.0) (2023-01-19)


### Features

* Add counters to auras, to increase radius ([003cb0a](https://github.com/xdy/xdy-pf2e-workbench/commit/003cb0a3ffb51daab344f3391af7f59f0f16f4a6))

## [4.31.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.4...v4.31.5) (2023-01-18)


### Bug Fixes

* Keeping up with the Macro Faeries. ([128e84c](https://github.com/xdy/xdy-pf2e-workbench/commit/128e84c6c29ebb655b094bca6ea6e2d8cc6c8e23))

## [4.31.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.3...v4.31.4) (2023-01-17)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f11c143](https://github.com/xdy/xdy-pf2e-workbench/commit/f11c1433314fcc56a88c48337e90db8cc45f0893))

## [4.31.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.2...v4.31.3) (2023-01-17)


### Bug Fixes

* Keeping up with the Macro Faeries. ([f6b9363](https://github.com/xdy/xdy-pf2e-workbench/commit/f6b93635358a11efe7fb0499e9f1b117daba0288))
* Keeping up with the Macro Faeries. ([509f123](https://github.com/xdy/xdy-pf2e-workbench/commit/509f1231eff8c26ca4992cbd52ddab9597fde46e))

## [4.31.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.1...v4.31.2) (2023-01-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([6593b60](https://github.com/xdy/xdy-pf2e-workbench/commit/6593b60e9cf6cff084b94738ac444d605110f92e))

## [4.31.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.31.0...v4.31.1) (2023-01-15)


### Bug Fixes

* Keeping up with the Macro Faeries. ([57e282a](https://github.com/xdy/xdy-pf2e-workbench/commit/57e282a27da6a82ef5441ce8442ddb0d6eddbcfc))

# [4.31.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.30.4...v4.31.0) (2023-01-15)


### Features

* Re-adds MAP-5 and MAP-10 to Skill Actions that have the attack trait. ([a84953b](https://github.com/xdy/xdy-pf2e-workbench/commit/a84953b322fc2562db9fba799badb51e0f2fa2ab))

## [4.30.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.30.3...v4.30.4) (2023-01-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([4bfe3c0](https://github.com/xdy/xdy-pf2e-workbench/commit/4bfe3c0a6038482c1bbe5ebdd0052d5661c668b8))

## [4.30.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.30.2...v4.30.3) (2023-01-14)


### Bug Fixes

* Keeping up with the Macro Faeries. ([c67a180](https://github.com/xdy/xdy-pf2e-workbench/commit/c67a180cef0a4e1150804985b64691a627ba4334))

## [4.30.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.30.1...v4.30.2) (2023-01-09)


### Bug Fixes

* Keeping up with the Macro Faeries. ([101f6aa](https://github.com/xdy/xdy-pf2e-workbench/commit/101f6aa4ef2ecf2bdc2e549d6ddaf48c5571bc3b))

## [4.30.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.30.0...v4.30.1) (2023-01-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([d68d73c](https://github.com/xdy/xdy-pf2e-workbench/commit/d68d73c1c9dfa53d574c6b03b30ab330e141694d))

# [4.30.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.5...v4.30.0) (2023-01-07)


### Features

* Updated Inspire Defense and Inspire Courage auras to set the level of the effect they grant, which means the resistances are now set correctly. Also gave them and the Bane and Bless auras a link to the source spell. ([37b990c](https://github.com/xdy/xdy-pf2e-workbench/commit/37b990cfc0c841fdd1d53bcce1a416cea4ebd782))

## [4.29.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.4...v4.29.5) (2023-01-07)


### Bug Fixes

* If the option to collapse chat cards is enabled, collapse more types of messages. Show remaining actions in a notification as well as in chat. ([14a6193](https://github.com/xdy/xdy-pf2e-workbench/commit/14a6193625dc25fc73c2d4f2762d77ae1caaf317))

## [4.29.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.3...v4.29.4) (2023-01-04)


### Bug Fixes

* Better sort for Basic Action Macro. ([d84419d](https://github.com/xdy/xdy-pf2e-workbench/commit/d84419d07feab03f597be1ae651459aab1b2b083)), closes [#602](https://github.com/xdy/xdy-pf2e-workbench/issues/602)

## [4.29.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.2...v4.29.3) (2023-01-04)


### Bug Fixes

* WhirlwindStrike macro now ignores dead potential targets and *actually* uses the first non-reach non-ranged weapon if no reach weapon is wielded. ([557e403](https://github.com/xdy/xdy-pf2e-workbench/commit/557e40361ee6ddd1166e76f5d4253c2ba91293e3))

## [4.29.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.1...v4.29.2) (2023-01-03)


### Bug Fixes

* Include latest translations. ([fa1b7d4](https://github.com/xdy/xdy-pf2e-workbench/commit/fa1b7d4bc3026cb1fa7a00a88520a129f48b99e8))

## [4.29.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.29.0...v4.29.1) (2023-01-03)


### Bug Fixes

* Basic Action Macros now only cares about actors on the current scene, and only checks if best among party members. ([7d88021](https://github.com/xdy/xdy-pf2e-workbench/commit/7d88021ed77944ed4e77e62caaa72b564be41fe9))

# [4.29.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.28.1...v4.29.0) (2023-01-03)


### Features

* Basic Action Macros buttons now sorted by localized action name. ([cb84862](https://github.com/xdy/xdy-pf2e-workbench/commit/cb84862680e58d8eec0d29868382f52e32a9056f))

## [4.28.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.28.0...v4.28.1) (2023-01-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([29decdf](https://github.com/xdy/xdy-pf2e-workbench/commit/29decdffe783de6292b3293112d61ae12ad50712))

# [4.28.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.27.0...v4.28.0) (2023-01-02)


### Features

* Localization for Basic Action Macros. ([20b2ff8](https://github.com/xdy/xdy-pf2e-workbench/commit/20b2ff8087989a2d40fe68563e4cc5f3bf286554))

# [4.27.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.26.3...v4.27.0) (2023-01-02)


### Features

* Localization for Whirlwind Strike macro. The macro also now uses the first equipped weapon if there are no reach weapons. ([8db55f0](https://github.com/xdy/xdy-pf2e-workbench/commit/8db55f00f1230e29dffaa5903e92071995f2c619))

## [4.26.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.26.2...v4.26.3) (2023-01-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([2e92570](https://github.com/xdy/xdy-pf2e-workbench/commit/2e92570a684b937ea758218c3924a338a1f16ccf))

## [4.26.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.26.1...v4.26.2) (2023-01-01)


### Bug Fixes

* Make the NPC Scaler work again. ([7e2dcea](https://github.com/xdy/xdy-pf2e-workbench/commit/7e2dceaf54e4f427d8ca8a483d47578bb4a3b7cb))

## [4.26.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.26.0...v4.26.1) (2023-01-01)


### Bug Fixes

* Auto-applying persistent damage rolled by the persistent damage module now works, including IWR. So does auto-applying persistent healing. Note that for regeneration it *always* applies the healing as it doesn't know if the deactivation condition applies. ([979d389](https://github.com/xdy/xdy-pf2e-workbench/commit/979d3894d2fe7fdc21691f8e6ee11b9faa64ecd6))

# [4.26.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.25.0...v4.26.0) (2023-01-01)


### Features

* Supports (and requires) the pf2e system version 2.6.0. Removes the deprecated IWR reminder feature as full support for IWR is now part of the system. Fully removes the partially removed player items rarity colorization feature as that too is part of the system. Updates types to match the latest pf2e version. ([bedf8f6](https://github.com/xdy/xdy-pf2e-workbench/commit/bedf8f62522bebe248714daf1345dbe4239e2900))

# [4.25.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.24.3...v4.25.0) (2022-12-31)


### Features

* Adds support for shift-clicking to bring up, or skip, the roll dialog depending on user setting, and control-clicking to make roll secret in Basic Action Macros. With these caveats: For the buttons with names ending in '(toggle)' shift and control works as for effects, recall knowledge is *always* secret and the macro used does not currently support shift-clicking, for craft and repair neither works as the macro in question doesn't seem to support them. ([f8539b1](https://github.com/xdy/xdy-pf2e-workbench/commit/f8539b1f591e4bd7b2267876523911a934484b56))

## [4.24.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.24.2...v4.24.3) (2022-12-31)


### Bug Fixes

* Removes support for MAP-5 and MAP-10 in Skill Actions, they broke at some point (and have never worked for escape anyway). ([db3804b](https://github.com/xdy/xdy-pf2e-workbench/commit/db3804bea616a00571a2036c42c13311757ce224))

## [4.24.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.24.1...v4.24.2) (2022-12-30)


### Bug Fixes

* Add warning to the readme and settings hint for Skill Actions that they currently make character sheets *very* slow to load for most people. ([d164672](https://github.com/xdy/xdy-pf2e-workbench/commit/d164672a36a84991d9ed0c8757ce29d3561f0abd))

## [4.24.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.24.0...v4.24.1) (2022-12-30)


### Bug Fixes

* Renames Chinese localization file to cn.json ([3a59a4d](https://github.com/xdy/xdy-pf2e-workbench/commit/3a59a4d995252e705b64645abc62e05469ee396c)), closes [#593](https://github.com/xdy/xdy-pf2e-workbench/issues/593)

# [4.24.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.23.3...v4.24.0) (2022-12-27)


### Features

* Adds basic macro for Whirlwind Strike to xdy-pf2e-workbench-macros. Requires that the selected token has the Whirlwind Strike feat, a reach weapon and the Reach 'aura' that can be found in xdy-pf2e-workbench-items. (Set the radius of the aura RE to the reach the actor has.) ([1d721e6](https://github.com/xdy/xdy-pf2e-workbench/commit/1d721e638d612dfcc182ee5e9da548a683f53699))

## [4.23.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.23.2...v4.23.3) (2022-12-24)


### Bug Fixes

* Improve documentation a bit, remove some unused localization. ([c977f6e](https://github.com/xdy/xdy-pf2e-workbench/commit/c977f6e352c5cf65d61e83f9a3eb174c3499fd29))

## [4.23.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.23.1...v4.23.2) (2022-12-22)


### Bug Fixes

* Keeping up with the Macro Faeries. Also, note that with the next pf2e version, the IWR reminders will not only be obsolete, they will be broken (and thus removed). ([ced92e3](https://github.com/xdy/xdy-pf2e-workbench/commit/ced92e3b67aab344237b7bc0037d9f81ae65e81e))

## [4.23.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.23.0...v4.23.1) (2022-12-16)


### Bug Fixes

* Fixes the attack bonus in Workbench ABP (used to be all attacks, is now melee and ranged attacks as I can't see how to do 'weapon' and 'unarmed' attacks. If you are using it you need to replace it manually on any actors using it.) Updates supported pf2e system version to 4.5.0. ([71c16a1](https://github.com/xdy/xdy-pf2e-workbench/commit/71c16a1d29599b0404287d1d1ef125eaf1045614))

# [4.23.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.22.2...v4.23.0) (2022-12-15)


### Features

* Added setting for whether to show if the selected actor is the best at an action in the Basic Action Macros dialog. @Supe cleaned up a *ton* of console warnings for users of Skill Actions. ([7d24572](https://github.com/xdy/xdy-pf2e-workbench/commit/7d2457297278fcbd281115f1a915155d1a7c0194)), closes [#540](https://github.com/xdy/xdy-pf2e-workbench/issues/540)

## [4.22.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.22.1...v4.22.2) (2022-12-12)


### Bug Fixes

* Updated translations. ([d153054](https://github.com/xdy/xdy-pf2e-workbench/commit/d153054b23f3fdac89e0914ce26fa07e76f6228a))

## [4.22.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.22.0...v4.22.1) (2022-12-04)


### Bug Fixes

* Localization of skill action variant labels. ([50ab363](https://github.com/xdy/xdy-pf2e-workbench/commit/50ab36312964ab43b81c6add1f744604636ca174))

# [4.22.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.21.0...v4.22.0) (2022-12-04)


### Bug Fixes

* Reverted use of localization of skill action variants. ([48edb6a](https://github.com/xdy/xdy-pf2e-workbench/commit/48edb6a559c55870b6243af661cf4148afaafe99))


### Features

* Added setting for if skill actions should send the action description to chat when action macro is not used (courtesy of @Idle). Localized skill action variants. ([00a7df9](https://github.com/xdy/xdy-pf2e-workbench/commit/00a7df988a27908a8e6f43afcf027f847d1a1ab9))

# [4.21.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.20.0...v4.21.0) (2022-12-02)


### Features

* Localized macros. Added icon for Advanced Countdown macro. Set verified compatibility to latest version. Removed some stray asyncs. ([6319b54](https://github.com/xdy/xdy-pf2e-workbench/commit/6319b54fc992cdb7049dd0b882061696ee85bb6a))

# [4.20.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.19.0...v4.20.0) (2022-11-27)


### Features

* Adds 'Build Npc Spellbook Journal' macro to xdy-pf2e-workbench-macros compendium. Originally from Avery (Velara) Avery[#9136](https://github.com/xdy/xdy-pf2e-workbench/issues/9136), modified by me. ([f0c4816](https://github.com/xdy/xdy-pf2e-workbench/commit/f0c4816f48f74f2210660238e4c2db559810b8a3))
* Makes the function 'callHeroPointHandler' available for macros. It shows the hero point handler dialog with a random character selected and the time set to 60 minutes. ([8684c57](https://github.com/xdy/xdy-pf2e-workbench/commit/8684c57095fc90f53a3227a60263ddac6699d1d4)), closes [#568](https://github.com/xdy/xdy-pf2e-workbench/issues/568)

# [4.19.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.18.1...v4.19.0) (2022-11-25)


### Features

* Custom pause image and text now default to the original position, with an option to center them with the text above the image. ([70afd9c](https://github.com/xdy/xdy-pf2e-workbench/commit/70afd9c0e636fe2c774b5e583c5873b935830157)), closes [#565](https://github.com/xdy/xdy-pf2e-workbench/issues/565)

## [4.18.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.18.0...v4.18.1) (2022-11-24)


### Bug Fixes

* Fix a couple of bugs with pause text and image. ([4f17815](https://github.com/xdy/xdy-pf2e-workbench/commit/4f17815fb2077216f4ac42ad478503a4b908d9d2))

# [4.18.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.17.2...v4.18.0) (2022-11-24)


### Features

* Add support for custom pause text (defaults to "Game Paused", no localization yet.) ([505e72e](https://github.com/xdy/xdy-pf2e-workbench/commit/505e72e8fbee9603620684a31db79583644db2dc))

## [4.17.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.17.1...v4.17.2) (2022-11-24)


### Bug Fixes

* Moved optional pause image to the center of the screen and the pause text above the image. ([a10bef4](https://github.com/xdy/xdy-pf2e-workbench/commit/a10bef4247520674b5f982ca47834deb76661094))

## [4.17.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.17.0...v4.17.1) (2022-11-24)


### Bug Fixes

* Add support for Psychic to the Refocus macro. ([d9398af](https://github.com/xdy/xdy-pf2e-workbench/commit/d9398afafa35ba5dbcc084cc9edf01864b7f53c3))

# [4.17.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.16.1...v4.17.0) (2022-11-24)


### Features

* Adds Refocus macro to xdy-pf2e-workbench-macros compendium. Dialog with buttons to regain 1 focus point, or 2 if the character has any of the *-focus feats, or 3 if any of the *-wellspring feats (with admonition to only choose that button if one has indeed spent more than 2 or 3 focus points since the last refocus.) ([276e42d](https://github.com/xdy/xdy-pf2e-workbench/commit/276e42dc43f390580031149bca1750358e8e4b16))

## [4.16.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.16.0...v4.16.1) (2022-11-23)


### Bug Fixes

* Enabled filepicker on the custom pause image setting, and moved it out of the qol menu into the main module settings as I couldn't get the filepicker to work in a submenu. ([e187dd4](https://github.com/xdy/xdy-pf2e-workbench/commit/e187dd4cb8481ce3dc8cef5f0a78ab205c24b5c6))

# [4.16.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.15.0...v4.16.0) (2022-11-23)


### Features

* Adds setting to qol menu to set a custom pause image using a path relative to foundry's data folder, e.g. systems/pf2e/icons/deity/Pharasma.webp ([d251ff7](https://github.com/xdy/xdy-pf2e-workbench/commit/d251ff721d65cc2038c295d050bc74d394112751))

# [4.15.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.14.2...v4.15.0) (2022-11-23)


### Features

* Change mystification to use actor prototype token name rather than the actor name when demystifying. (Which defaults to to actor name.) ([7801585](https://github.com/xdy/xdy-pf2e-workbench/commit/7801585feb54dc050e4d4142db18caa1c29bc1ed)), closes [#551](https://github.com/xdy/xdy-pf2e-workbench/issues/551)

## [4.14.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.14.1...v4.14.2) (2022-11-23)


### Bug Fixes

* Don't add Recall Knowledge button to npcs that aren't in the world. ([23b17a1](https://github.com/xdy/xdy-pf2e-workbench/commit/23b17a1e8fadb43d6a74494d2dd4be384cb52ff4)), closes [#560](https://github.com/xdy/xdy-pf2e-workbench/issues/560)

## [4.14.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.14.0...v4.14.1) (2022-11-18)


### Bug Fixes

* Skill actions errored out due to recall-knowledge-lore being renamed to recall-knowledge. ([1634b1e](https://github.com/xdy/xdy-pf2e-workbench/commit/1634b1ed6e4c37e0131183b5fe461b98a9e75243))

# [4.14.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.7...v4.14.0) (2022-11-18)


### Features

* Changes to require PF2e version 4.4 or greater. Makes public message for privately cast spell work. ([d6fba18](https://github.com/xdy/xdy-pf2e-workbench/commit/d6fba18ac4343009d463aa91d7d408f0245c2fc4))

## [4.13.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.6...v4.13.7) (2022-11-14)


### Bug Fixes

* Gets rid of console warnings for *new* macros added from 'Symon-provided macros'. I.e. in an existing world you need to manually reimport the macros from that compendium to no longer get the warnings. ([2755b35](https://github.com/xdy/xdy-pf2e-workbench/commit/2755b350c591677ed5859e1d6d895ad47d211ec1)), closes [#547](https://github.com/xdy/xdy-pf2e-workbench/issues/547)

## [4.13.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.5...v4.13.6) (2022-11-13)


### Bug Fixes

* The Npc scaler accidentally set will save to equal the reflex save. ([42f3558](https://github.com/xdy/xdy-pf2e-workbench/commit/42f3558d445528912307e17fdabcecab1cfebdc0)), closes [#545](https://github.com/xdy/xdy-pf2e-workbench/issues/545)

## [4.13.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.4...v4.13.5) (2022-11-12)


### Bug Fixes

* The Recall_Knowledge macro now also handles skills, removing the 'skills only' comment from the button in Basic Action Macros. ([c599ba9](https://github.com/xdy/xdy-pf2e-workbench/commit/c599ba9e8397aaaa992949e3dbd318071baec0b7))

## [4.13.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.3...v4.13.4) (2022-11-12)


### Bug Fixes

* Keeping up with the Macro Faeries. ([e43fb93](https://github.com/xdy/xdy-pf2e-workbench/commit/e43fb93ddbe2128ac80d10a9cc2f96a72ac03e4d))

## [4.13.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.2...v4.13.3) (2022-11-08)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ba2edcf](https://github.com/xdy/xdy-pf2e-workbench/commit/ba2edcf81d8fa0101ffbfe4242bd2e19498f23f3))

## [4.13.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.1...v4.13.2) (2022-11-07)


### Bug Fixes

* 'Create a Distraction' on the 'Basic Action Macros' dialog. ([f61b51a](https://github.com/xdy/xdy-pf2e-workbench/commit/f61b51a06a7496c4c7b39b30a2595830218914d3))

## [4.13.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.13.0...v4.13.1) (2022-11-07)


### Bug Fixes

* 'Treat Wounds' in 'Basic Action Macro' should work now. Both the 'Create a Diversion' buttons are still broken. ([a5fc4d6](https://github.com/xdy/xdy-pf2e-workbench/commit/a5fc4d6eb7a811076f7e2607cbeb9e91c50b531d))

# [4.13.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.12.0...v4.13.0) (2022-11-07)


### Features

* 'Basic Action Macros' now works for non-party npcs and remembers which token you opened it for so you no longer need to have that token selected once the dialog is open. (Only one dialog can be open at a time.) ([c895b2f](https://github.com/xdy/xdy-pf2e-workbench/commit/c895b2febc28ffbd9ecfc048e70303e63a51eef8))

# [4.12.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.11.3...v4.12.0) (2022-11-07)


### Features

* Adds the 'Basic Action Macros' macro (shows a dialog with a button for most macros, with bonus and whether you're the best in the party at that action) courtesy of @ApoApostolov and me. To use it, import all macros from the compendium 'xdy-pf2e-workbench-macros' making sure to check 'Keep Document IDs' when importing. ([10b6e95](https://github.com/xdy/xdy-pf2e-workbench/commit/10b6e950e17e5e615afad06d13326948535447c1))

## [4.11.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.11.2...v4.11.3) (2022-11-06)


### Bug Fixes

* The "quick quantities" feature (ctrl/shift-click to add many items) works again. ([3ac6e8a](https://github.com/xdy/xdy-pf2e-workbench/commit/3ac6e8a1bab348b86720ef78704b890ce2086f73))

## [4.11.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.11.1...v4.11.2) (2022-11-06)


### Bug Fixes

* Keeping up with the Macro Faeries. ([64c4167](https://github.com/xdy/xdy-pf2e-workbench/commit/64c41678c18801ecd68e571a370910b8d03fd897))

## [4.11.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.11.0...v4.11.1) (2022-11-06)


### Bug Fixes

* Removed error in the chat log when using some skill actions. Also removed console warnings when using quick quantity. ([07dc4d1](https://github.com/xdy/xdy-pf2e-workbench/commit/07dc4d194d22181ddf86f5bd0ca2e702423400a1))

# [4.11.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.10.4...v4.11.0) (2022-11-05)


### Features

* More reliable way of finding heightened spell level when autorolling damage for spells. Requires pf2e 4.3.4 ([dc0a3f8](https://github.com/xdy/xdy-pf2e-workbench/commit/dc0a3f8bfd61c7ca180648b67d52c016b94650ce))

## [4.10.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.10.3...v4.10.4) (2022-11-03)


### Bug Fixes

* Add auditory trait to Inspire Courage aura and Inspire Defense aura ([#532](https://github.com/xdy/xdy-pf2e-workbench/issues/532)) ([b25eaba](https://github.com/xdy/xdy-pf2e-workbench/commit/b25eaba7e947526213f5315155e4bcd8733bf91d))

## [4.10.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.10.2...v4.10.3) (2022-11-01)


### Bug Fixes

* Fix skill action slugs not being added along to rolls ([0c4fc75](https://github.com/xdy/xdy-pf2e-workbench/commit/0c4fc75714697a91437a3adec4270b34b47b55f7))

## [4.10.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.10.1...v4.10.2) (2022-10-29)


### Bug Fixes

* Change how token animation speed setting is enabled, warn about problems with Multilevel Tokens module if that module is enabled. ([080a638](https://github.com/xdy/xdy-pf2e-workbench/commit/080a6389996ae4c32de9043e2723f665eaaeda43)), closes [#516](https://github.com/xdy/xdy-pf2e-workbench/issues/516)
* Typoes in condition handler messages. ([e78315b](https://github.com/xdy/xdy-pf2e-workbench/commit/e78315be3d2bbbdbce146d6b9f7de669df3560e2))

## [4.10.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.10.0...v4.10.1) (2022-10-29)


### Bug Fixes

* Disable the 'eye' hint on collapsed chat cards. It'll return once I figure out how to do it without breaking Dorako UI. ([67cb5c0](https://github.com/xdy/xdy-pf2e-workbench/commit/67cb5c0da1ecae603d6a2097d9370feeab00314d))

# [4.10.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.9.2...v4.10.0) (2022-10-27)


### Features

* Make the noOrSuccessfulFlatcheck function available for macros. Fix potential null-pointer in reminderIWR. ([4d2a887](https://github.com/xdy/xdy-pf2e-workbench/commit/4d2a8873cac170a101fdda4656c19795df57f738))

## [4.9.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.9.1...v4.9.2) (2022-10-26)


### Bug Fixes

* Allow hypen in prefix words. ([754e674](https://github.com/xdy/xdy-pf2e-workbench/commit/754e674fdee1073564d4fbbe2c0aca7fef391f01)), closes [#512](https://github.com/xdy/xdy-pf2e-workbench/issues/512)
* Basic support for Escape action (only acrobatics and athletics and without MAP buttons.) ([279847a](https://github.com/xdy/xdy-pf2e-workbench/commit/279847a6eef2f0a3e2dae8d9bdbe6924d68f0c11))
* Checking if pf2e-sheet-skill-actions or pf2e-toolbox is active printed an error message to the console, should be a notification now. ([eb7d102](https://github.com/xdy/xdy-pf2e-workbench/commit/eb7d1028c754a2b31bcb510940ff97d3361d9f74))

## [4.9.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.9.0...v4.9.1) (2022-10-23)


### Bug Fixes

* Only mystify *npc* items... ([0e56a79](https://github.com/xdy/xdy-pf2e-workbench/commit/0e56a79fd490898a22a02a25a1c9fe74accc6e80))

# [4.9.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.8.1...v4.9.0) (2022-10-23)


### Features

* Adds optional setting (to mystification settings submenu) to automatically mystify any non-temporary physical items that are alchemical or magical when an npc is added to a scene. ([4f39d4b](https://github.com/xdy/xdy-pf2e-workbench/commit/4f39d4b79690251d8a409ed46ffd01299647ecec)), closes [#497](https://github.com/xdy/xdy-pf2e-workbench/issues/497)

## [4.8.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.8.0...v4.8.1) (2022-10-22)


### Bug Fixes

* Cleaning up is hard to do... I.e. when 'cleaning up' I broke stuff. Uncleaning now. ([a0f7a44](https://github.com/xdy/xdy-pf2e-workbench/commit/a0f7a448897c55caede176c46f194969d0e192ae))

# [4.8.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.7.2...v4.8.0) (2022-10-22)


### Bug Fixes

* Allow private spellcasting regardless of gm default roll mode. (Click ctrl-shift to cast a spell privately without a public message even if you have that enabled.) ([f1a3986](https://github.com/xdy/xdy-pf2e-workbench/commit/f1a3986caafceec343f8286fae7c0e9fffbff909)), closes [#492](https://github.com/xdy/xdy-pf2e-workbench/issues/492)


### Features

* Add optional setting for token animation movement speed. Defaults to foundry setting, which I consider way too low. ([9d4f74a](https://github.com/xdy/xdy-pf2e-workbench/commit/9d4f74a1abe71290cd514f99f77a11825f8c2006))
* Move options to change max hero points and allow item bonuses in ABP to a new settings submenu for variant rules. ([65b8d4a](https://github.com/xdy/xdy-pf2e-workbench/commit/65b8d4ab45f685a421fafa01773c393bb9c7936d))

## [4.7.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.7.1...v4.7.2) (2022-10-18)


### Bug Fixes

* Improve the private spell casting message. ([d446388](https://github.com/xdy/xdy-pf2e-workbench/commit/d4463886fc26f7d3a0bbb3936ac2005cf8c0047f)), closes [#485](https://github.com/xdy/xdy-pf2e-workbench/issues/485)

## [4.7.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.7.0...v4.7.1) (2022-10-17)


### Bug Fixes

* Error in the console when using some creature abilities. ([54d3bd0](https://github.com/xdy/xdy-pf2e-workbench/commit/54d3bd03039e2af5d7f4e3a1b3a567f81fb67cf6))

# [4.7.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.6.1...v4.7.0) (2022-10-16)


### Features

* Adds option to add persistent adjective from rolltable as a prefix instead of a random number as a postfix. Courtesy of @Shyrik ([93246d6](https://github.com/xdy/xdy-pf2e-workbench/commit/93246d6974a3cabed3feea6e85f2de6f1dc70852))

## [4.6.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.6.0...v4.6.1) (2022-10-16)


### Bug Fixes

* Keeping up with the Macro Faeries. ([7d294c1](https://github.com/xdy/xdy-pf2e-workbench/commit/7d294c12c05f74aa965a4cdd53f7482e6f6b00cb))

# [4.6.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.12...v4.6.0) (2022-10-15)


### Features

* Use color (reddish=active, grey=inactive) and icon (eye=active, eye-slash=inactive) for action toggles on skill action list. ([3caccd1](https://github.com/xdy/xdy-pf2e-workbench/commit/3caccd108db22b540b8f00ca13f6cc59dce0a400)), closes [#449](https://github.com/xdy/xdy-pf2e-workbench/issues/449) [#433](https://github.com/xdy/xdy-pf2e-workbench/issues/433)

## [4.5.12](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.11...v4.5.12) (2022-10-15)


### Bug Fixes

* TIL the download *should* be versioned. Thanks @MrVauxs! ([527e0c4](https://github.com/xdy/xdy-pf2e-workbench/commit/527e0c453f24a7435937c58d53ea4fb4399363d1))

## [4.5.11](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.10...v4.5.11) (2022-10-15)


### Bug Fixes

* Switch to always use latest version in the manifest. ([80d3372](https://github.com/xdy/xdy-pf2e-workbench/commit/80d3372a60b8f91628680e802a81e5d730933a29)), closes [#451](https://github.com/xdy/xdy-pf2e-workbench/issues/451)

## [4.5.10](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.9...v4.5.10) (2022-10-14)


### Bug Fixes

* NPC scaling for actions (and probably more) was broken. All items except those of the following types should now scale: ([ef82459](https://github.com/xdy/xdy-pf2e-workbench/commit/ef824598654d37232041e5692ba7343f5619af07)), closes [#480](https://github.com/xdy/xdy-pf2e-workbench/issues/480)

## [4.5.9](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.8...v4.5.9) (2022-10-14)


### Bug Fixes

* Fixes autorolling damage for heightened spells. ([663d782](https://github.com/xdy/xdy-pf2e-workbench/commit/663d782623cba2fec3b2469000e48d953923d733)), closes [#478](https://github.com/xdy/xdy-pf2e-workbench/issues/478)

## [4.5.8](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.7...v4.5.8) (2022-10-13)


### Bug Fixes

* Rolling back last couple of changes, something went horribadly wrong... ([eed1bf3](https://github.com/xdy/xdy-pf2e-workbench/commit/eed1bf31bdf1c280c24d745b36c7e707f0e5630a))
* Unbreak autorolling damage for normal attacks. ([9841566](https://github.com/xdy/xdy-pf2e-workbench/commit/98415669e94078a7111a574fb5be4cde12e2435e))

## [4.5.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.6...v4.5.7) (2022-10-13)


### Bug Fixes

* Unbreak autorolling damage for normal attacks. ([54693f0](https://github.com/xdy/xdy-pf2e-workbench/commit/54693f0c22617a2d3b193672f7baa17c41b8f793))

## [4.5.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.5...v4.5.6) (2022-10-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([1022574](https://github.com/xdy/xdy-pf2e-workbench/commit/10225741e9b882eb5fd790508dec2e5b9b508039))

## [4.5.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.4...v4.5.5) (2022-10-12)


### Bug Fixes

* Do not autoroll damage/healing for spells with variable casting time (the player probably has a choice to make.) ([9a17cdc](https://github.com/xdy/xdy-pf2e-workbench/commit/9a17cdc436a450e716001bd29221b3951c57833b))

## [4.5.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.3...v4.5.4) (2022-10-11)


### Bug Fixes

* Broken error messages for reminderIWR. Adds option to not show 'complex IWR types do not work' warning. Wait a bit longer for pf2-flat-check to complete. ([8dd3fd7](https://github.com/xdy/xdy-pf2e-workbench/commit/8dd3fd70d9c6959ace5608ff308cfc8aae784ce3)), closes [#471](https://github.com/xdy/xdy-pf2e-workbench/issues/471) [#472](https://github.com/xdy/xdy-pf2e-workbench/issues/472)

## [4.5.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.2...v4.5.3) (2022-10-10)


### Bug Fixes

* And the same fix for system workaround borking wornbench macros, but in another place. ([a611ab6](https://github.com/xdy/xdy-pf2e-workbench/commit/a611ab646ecbdb8d8cda7e5b53c116c1f572e447))

## [4.5.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.1...v4.5.2) (2022-10-10)


### Bug Fixes

* Fix for system workaround borking wornbench macros. ([24147f2](https://github.com/xdy/xdy-pf2e-workbench/commit/24147f27d80f7c98c525694f4a9ad76f9f51ef75))

## [4.5.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.5.0...v4.5.1) (2022-10-09)


### Bug Fixes

* What do you mean I need to test *again* after doing only a *tiny* change that can't possibly affect anything? Bah. :) ([26e32d1](https://github.com/xdy/xdy-pf2e-workbench/commit/26e32d12321f6d723ed7f2c677d0797dd5e60e64))

# [4.5.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.4.0...v4.5.0) (2022-10-09)


### Features

* Add optional subsetting to always have npcs cast private spells if enabled. ([7532929](https://github.com/xdy/xdy-pf2e-workbench/commit/7532929a528a2eb7c807879c96042d4718542e34)), closes [#438](https://github.com/xdy/xdy-pf2e-workbench/issues/438)

# [4.4.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.6...v4.4.0) (2022-10-08)


### Features

* Localization support added in Skill actions and a couple of reminder messages. ([9a6551e](https://github.com/xdy/xdy-pf2e-workbench/commit/9a6551e53d11fc10bcbcc28a4d404a460ea5e189))

## [4.3.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.5...v4.3.6) (2022-10-08)


### Bug Fixes

* The option to collapse item chat cards no longer affects damage cards. ([25d94e2](https://github.com/xdy/xdy-pf2e-workbench/commit/25d94e24b9d85bb51c0c5c34bea059b2b1c0913e))

## [4.3.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.4...v4.3.5) (2022-10-04)


### Bug Fixes

* Fix spelling error in module.json ([fda7f4b](https://github.com/xdy/xdy-pf2e-workbench/commit/fda7f4beb38ae0166aa1fb1291c9b7bcdbc1ab42))

## [4.3.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.3...v4.3.4) (2022-10-03)


### Bug Fixes

* Handle edge cases around automation of dying and unconscious. ([7daa449](https://github.com/xdy/xdy-pf2e-workbench/commit/7daa449159be905fe579e06a0e75a219a0ef2e94))

## [4.3.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.2...v4.3.3) (2022-10-03)


### Bug Fixes

* The optional setting to automatically apply clumsy if wielding an oversized weapon now allow small characters to wield medium weapons with impunity. ([f9b88c0](https://github.com/xdy/xdy-pf2e-workbench/commit/f9b88c02631577793784cf165943fbaf5e467e90))

## [4.3.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.1...v4.3.2) (2022-10-02)


### Bug Fixes

* Keeping up with the Macro Faeries. ([89e6b03](https://github.com/xdy/xdy-pf2e-workbench/commit/89e6b03f6a0c7caefdcd1fa41829a85553e4e7bd))

## [4.3.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.3.0...v4.3.1) (2022-10-01)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ee06cf4](https://github.com/xdy/xdy-pf2e-workbench/commit/ee06cf48e3b47713e97ee65192e155baf3242caa))

# [4.3.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.6...v4.3.0) (2022-10-01)


### Features

* My attempt at ABP using Rule Elements (hosted on a 'Feat'). ([24a347f](https://github.com/xdy/xdy-pf2e-workbench/commit/24a347fb2cee1aee677d073725c5617a1851229f))

## [4.2.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.5...v4.2.6) (2022-09-28)


### Bug Fixes

* Keeping up with the Macro Faeries. ([22cbd8b](https://github.com/xdy/xdy-pf2e-workbench/commit/22cbd8b4ac249a6861b7a34bc9732c1ca85a20bc))

## [4.2.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.4...v4.2.5) (2022-09-24)


### Bug Fixes

* Deprecate showing item names in rarity colour on actor sheets as that feature is in the syste from https://github.com/foundryvtt/pf2e/pull/3856 ([dff74b5](https://github.com/xdy/xdy-pf2e-workbench/commit/dff74b518f6c70e094320a75318a3e867fbada81))

## [4.2.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.3...v4.2.4) (2022-09-24)


### Bug Fixes

* Keeping up with the Macro Faeries. ([ecc3dd1](https://github.com/xdy/xdy-pf2e-workbench/commit/ecc3dd1321f3f09679c0f123b3c0789fa2845665))

## [4.2.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.2...v4.2.3) (2022-09-23)


### Bug Fixes

* Keeping up with the Macro Faeries. ([1e892c2](https://github.com/xdy/xdy-pf2e-workbench/commit/1e892c2f69cb724037b80c963d6d461f78ef0043))

## [4.2.2](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.1...v4.2.2) (2022-09-22)


### Bug Fixes

* Make non-save spells autoroll damage. ([09f8d6b](https://github.com/xdy/xdy-pf2e-workbench/commit/09f8d6bbdeb3c7a6765c28b0806321ec17f6af01)), closes [#434](https://github.com/xdy/xdy-pf2e-workbench/issues/434)

## [4.2.1](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.2.0...v4.2.1) (2022-09-21)


### Bug Fixes

* Keeping up with the Macro Faeries. ([779117e](https://github.com/xdy/xdy-pf2e-workbench/commit/779117e63a72deb4d766a0bd429898ebdd12c09e))

# [4.2.0](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.7...v4.2.0) (2022-09-20)


### Features

* Added option to automatically apply and remove Clumsy based on whether the character is holding an oversized weapon. Improved automation of Orc Ferocity and Numb to Death. ([fb5ac74](https://github.com/xdy/xdy-pf2e-workbench/commit/fb5ac74399fa493fc197a1c380d8fd2bd6acb86d))

## [4.1.7](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.6...v4.1.7) (2022-09-15)


### Bug Fixes

* Minor cleanup and optimization of autoroll damage, expand damage rolls, interaction with pf2 flat rolls module, actions reminder. ([7a3488f](https://github.com/xdy/xdy-pf2e-workbench/commit/7a3488f8181369ac7a4d39aadc03f8d1c365b453))

## [4.1.6](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.5...v4.1.6) (2022-09-14)


### Bug Fixes

* Wrap sheet skill action traits. ([a16081f](https://github.com/xdy/xdy-pf2e-workbench/commit/a16081f280d014be6130dbc0cf90c8bea9c0f689)), closes [#420](https://github.com/xdy/xdy-pf2e-workbench/issues/420)

## [4.1.5](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.4...v4.1.5) (2022-09-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([840d996](https://github.com/xdy/xdy-pf2e-workbench/commit/840d996509a2a24eb2c3c6ac879a7c719e491c7d))

## [4.1.4](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.3...v4.1.4) (2022-09-13)


### Bug Fixes

* Keeping up with the Macro Faeries. ([40025f4](https://github.com/xdy/xdy-pf2e-workbench/commit/40025f468a77427a44a7dca605d828757d531521))

## [4.1.3](https://github.com/xdy/xdy-pf2e-workbench/compare/v4.1.2...v4.1.3) (2022-09-11)


### Bug Fixes

* Unbreak skill actions. Fixes [#417](https://github.com/xdy/xdy-pf2e-workbench/issues/417) ([2d58798](https://github.com/xdy/xdy-pf2e-workbench/commit/2d587980585ad4d0b2c542a75f8535b1f1d50472))

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
