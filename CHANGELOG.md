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
