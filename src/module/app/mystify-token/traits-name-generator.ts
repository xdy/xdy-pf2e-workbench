import { TRAITS } from "../../xdy-pf2e-constants";
import { MODULENAME } from "../../xdy-pf2e-workbench";
// eslint-disable-next-line import/named
import { Translations } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/foundry.js/localization";

async function fixesPreAndPost(settingkey: string): Promise<string> {
    const fixSetting: string = <string>game.settings.get(MODULENAME, settingkey);

    return (
        game?.tables
            ?.find((table) => table.name === fixSetting)
            // @ts-ignore
            ?.draw({ displayChat: false })
            .then((draw) => draw.results[0].getChatText()) ?? fixSetting
    );
}

function filterTraitList(traitsList: string[], prefix: string, postfix: string): string[] {
    //TODO Clean up this mess
    if (game.settings.get(MODULENAME, "npcMystifierFilterBlacklist")) {
        const blacklist =
            game.settings.get(MODULENAME, "npcMystifierFilterBlacklist").toLocaleLowerCase().split(",") || null;
        if (blacklist) {
            traitsList = traitsList.filter((trait: string) => {
                return !blacklist.map((trait: string) => trait.trim()).includes(trait);
            });
        }
    }

    let eliteWeak: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterEliteWeak")) {
        eliteWeak = traitsList.filter((trait: string) => TRAITS.ELITE_WEAK.includes(trait));
    }

    let rarities: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterRarities")) {
        rarities = traitsList.filter((trait: string) => TRAITS.RARITIES.includes(trait));
        const replacement: string = (<string>(
            game.settings.get(MODULENAME, "npcMystifierFilterRaritiesReplacement")
        )).toLocaleLowerCase();
        if (replacement !== "") {
            rarities = rarities.map((trait: string) => {
                if (trait !== "common") {
                    return replacement;
                } else {
                    return trait;
                }
            });
        }
    }

    let creatures: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterCreatureTypesTraits")) {
        creatures = traitsList.filter((trait: string) => TRAITS.CREATURE_TYPES.includes(trait));
    }

    let families: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterCreatureFamilyTraits")) {
        families = traitsList.filter((trait: string) => TRAITS.CREATURE_FAMILIES.includes(trait));
    }

    let alignments: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterAlignmentTraits")) {
        alignments = traitsList.filter((trait: string) => TRAITS.ALIGNMENTS.includes(trait));
    }

    let others: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterOtherTraits")) {
        others = traitsList
            .filter((trait: string) => !TRAITS.ELITE_WEAK.includes(trait))
            .filter((trait: string) => !TRAITS.RARITIES.includes(trait))
            .filter((trait: string) => !TRAITS.CREATURE_TYPES.includes(trait))
            .filter((trait: string) => !TRAITS.CREATURE_FAMILIES.includes(trait))
            .filter((trait: string) => !TRAITS.ALIGNMENTS.includes(trait));
    }

    return [prefix]
        .concat(eliteWeak)
        .concat(alignments)
        .concat(rarities)
        .concat(others)
        .concat(creatures)
        .concat(families)
        .concat([postfix]);
}

export async function generateNameFromTraits(token: Token | TokenDocument) {
    const data = token?.actor?.data?.data;
    // @ts-ignore How to type this?
    const traits = data?.traits;
    let traitsList: string[] = traits?.traits?.value;
    const customTraits = traits?.traits?.custom;
    if (customTraits) {
        traitsList = traitsList.concat(customTraits.trim().split(","));
    }
    const tokenRarities = traits.rarity?.value;
    if (tokenRarities) {
        traitsList = traitsList.concat(tokenRarities);
    }

    const prefix = await fixesPreAndPost("npcMystifierPrefix");
    const postfix = await fixesPreAndPost("npcMystifierPostfix");
    traitsList = filterTraitList(traitsList, prefix, postfix);

    return traitsList
        .map((trait: string) => trait.trim())
        .filter((trait: string, index: number) => {
            return traitsList.indexOf(trait) === index;
        })
        .map((trait: string) => {
            return trait?.charAt(0).toLocaleUpperCase() + trait?.slice(1);
        })
        .map((trait: string) => {
            const translationNeeded = trait !== prefix && trait !== postfix;
            return (
                (translationNeeded
                    ? (<Translations>game.i18n.translations[MODULENAME] ?? {})[`TRAITS.Trait${trait}`]
                    : trait) ?? trait
            );
        })
        .join(" ");
}
