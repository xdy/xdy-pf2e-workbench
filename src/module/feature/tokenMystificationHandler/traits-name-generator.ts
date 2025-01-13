import { CREATURE_IDENTIFICATION_TRAITS, ELITE_WEAK } from "../../xdy-pf2e-constants.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

let TRAITS: {
    SIZES: string[];
    RARITIES: string[];
    PF2E_CREATURE_TRAITS: string[];
    CREATURE_IDENTIFICATION_TRAITS: string[];
    ELITE_WEAK: string[];
};

async function fixesPreAndPost(settingkey: string): Promise<string> {
    const fixSetting = String(game.settings.get(MODULENAME, settingkey));

    // "null" check is due to a previous bug that may have left invalid data in text fields
    if (fixSetting !== null && fixSetting !== "null" && fixSetting !== "") {
        const table = game?.tables?.find((t) => t.name === fixSetting);
        if (!table) {
            const pack = game.packs.get("xdy-pf2e-workbench.xdy-internal-tables");
            if (pack) {
                const index = await pack.getIndex();
                const id = index.find((e) => e.name.includes(<string>fixSetting))?._id;
                if (id) {
                    const document = await pack?.getDocument(id);
                    const draw = await (<RollTable>document).draw({ displayChat: false });
                    if (draw && draw?.results[0]) {
                        return draw?.results[0].getChatText();
                    }
                }
            }
        } else {
            const draw = await table?.draw({ displayChat: false });
            if (draw && draw?.results[0]) {
                return draw?.results[0].getChatText();
            }
        }
        return <string>fixSetting;
    }
    return "";
}

function fillTraits() {
    TRAITS = {
        RARITIES: Object.keys(CONFIG.PF2E.rarityTraits),
        SIZES: Object.keys(CONFIG.PF2E.actorSizes),
        CREATURE_IDENTIFICATION_TRAITS: CREATURE_IDENTIFICATION_TRAITS,
        PF2E_CREATURE_TRAITS: Object.keys(CONFIG.PF2E.creatureTraits),
        ELITE_WEAK: ELITE_WEAK,
    };
}

function filterTraitList(traitsList: string[], prefix: string, postfix: string): string[] {
    if (game.settings.get(MODULENAME, "npcMystifierBlacklist")) {
        const blocklist =
            String(game.settings.get(MODULENAME, "npcMystifierBlacklist")).toLocaleLowerCase().split(",") || null;
        if (blocklist) {
            traitsList = traitsList.filter((trait: string) => {
                return !blocklist.map((trait: string) => trait.trim()).includes(trait);
            });
        }
    }

    let size: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseSize")) {
        size = traitsList.filter((trait: string) => TRAITS.SIZES.includes(trait));
    }

    let eliteWeak: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseEliteWeak")) {
        eliteWeak = traitsList.filter((trait: string) => TRAITS.ELITE_WEAK.includes(trait));
    }

    let rarities: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseRarities")) {
        rarities = traitsList.filter((trait: string) => TRAITS.RARITIES.includes(trait));
        const replacement: string = String(
            game.settings.get(MODULENAME, "npcMystifierUseRaritiesReplacement"),
        ).toLocaleLowerCase();
        if (replacement !== "") {
            rarities = rarities.map((trait: string) => (trait !== "common" ? replacement : trait));
        }
    }

    let creatureIdentificationTraits: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseCreatureTypesTraits")) {
        creatureIdentificationTraits = traitsList.filter((trait: string) =>
            TRAITS.CREATURE_IDENTIFICATION_TRAITS.includes(trait),
        );
    }

    let pf2eCreatureTraits: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseCreatureTraits")) {
        pf2eCreatureTraits = traitsList.filter((trait: string) => TRAITS.PF2E_CREATURE_TRAITS.includes(trait));
    }

    let others: string[] = [];
    if (game.settings.get(MODULENAME, "npcMystifierUseOtherTraits")) {
        others = traitsList
            .filter((trait: string) => !TRAITS.ELITE_WEAK.includes(trait))
            .filter((trait: string) => !TRAITS.SIZES.includes(trait))
            .filter((trait: string) => !TRAITS.RARITIES.includes(trait))
            .filter((trait: string) => !TRAITS.CREATURE_IDENTIFICATION_TRAITS.includes(trait))
            .filter((trait: string) => !TRAITS.PF2E_CREATURE_TRAITS.includes(trait));
    }

    // Deduplicate using set
    return Array.from(
        new Set(
            [prefix]
                .concat(size)
                .concat(eliteWeak)
                .concat(rarities)
                .concat(others)
                .concat(creatureIdentificationTraits)
                .concat(pf2eCreatureTraits)
                .concat([postfix]),
        ).values(),
    );
}

/**
 * Generates a name from traits using the current mystification settings for a given token ID.
 *
 * @param {string} tokenId - The ID of the token.
 * @returns {Promise<void>} A promise that resolves with the generated name from traits.
 */
export async function generateNameFromTraitsForToken(tokenId: string) {
    // @ts-ignore
    const token = game.scenes?.current?.tokens?.get(tokenId);
    if (token) {
        return generateNameFromTraits(token);
    }
}

export async function generateNameFromTraits(token) {
    let result: any;
    const traits = token?.actor?.system?.traits;
    if (!TRAITS) {
        fillTraits();
    }

    if (traits) {
        let traitsList = <string[]>traits["value"];
        if (traitsList) {
            const tokenRarities: any = traits.rarity;
            if (tokenRarities) {
                traitsList = traitsList.concat(tokenRarities);
            }

            const size = traits?.size?.value;
            if (size) {
                traitsList.push(size);
            }

            const actor: any = token.actor;
            if (actor.system?.attributes?.adjustment) {
                traitsList.push(actor.system?.attributes?.adjustment);
            }

            const prefix = (await fixesPreAndPost("npcMystifierPrefix")) || "";
            const postfix = (await fixesPreAndPost("npcMystifierPostfix")) || "";
            traitsList = filterTraitList(traitsList, prefix, postfix);

            result = traitsList
                .map((trait: string) => trait.trim())
                .filter((trait: string, index: number) => {
                    return traitsList.indexOf(trait) === index;
                })
                .filter((trait) => trait.trim().length > 0)
                .map((trait: string) => {
                    return trait?.charAt(0).toLocaleUpperCase() + trait?.slice(1);
                })
                .map((trait: string) => {
                    const lowercaseTrait = trait.toLocaleLowerCase();
                    if (TRAITS.ELITE_WEAK.includes(lowercaseTrait)) {
                        switch (lowercaseTrait) {
                            case TRAITS.ELITE_WEAK[0]:
                                return game.i18n.localize("PF2E.NPC.Adjustment.EliteLabel");
                            case TRAITS.ELITE_WEAK[1]:
                                return game.i18n.localize("PF2E.NPC.Adjustment.WeakLabel");
                        }
                    } else if (TRAITS.SIZES.includes(lowercaseTrait)) {
                        return game.i18n.localize(CONFIG.PF2E.actorSizes[lowercaseTrait]);
                    }

                    const translations: any = game.i18n.translations.PF2E ?? {};
                    return (trait !== prefix && trait !== postfix ? translations[`Trait${trait}`] : trait) ?? trait;
                })
                .join(" ");
        }
    } else {
        // Shouldn't happen. But, just in case...
        result = <string>game.settings.get(MODULENAME, "npcMystifierNoMatch");
    }
    return result;
}
