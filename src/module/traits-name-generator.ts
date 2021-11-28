import { GAME, TRAITS } from "./xdy-pf2e-constants";
import { MODULENAME } from "./xdy-pf2e-workbench";

function filterTraitList(traitsList: any) {
    //TODO Clean up this mess
    if (GAME.settings.get(MODULENAME, "npcMystifierFilterBlacklist")) {
        const blacklist =
            (<string>GAME.settings.get(MODULENAME, "npcMystifierFilterBlacklist")).toLocaleLowerCase().split(",") ||
            null;
        if (blacklist) {
            traitsList = traitsList.filter((trait: string) => {
                return !blacklist.map((trait: string) => trait.trim()).includes(trait);
            });
        }
    }

    let eliteWeak: string[] = [];
    if (!GAME.settings.get(MODULENAME, "npcMystifierFilterEliteWeak")) {
        eliteWeak = traitsList.filter((trait: string) => TRAITS.ELITE_WEAK.includes(trait));
    }

    let rarities: string[] = [];
    if (!GAME.settings.get(MODULENAME, "npcMystifierFilterRarities")) {
        rarities = traitsList.filter((trait: string) => TRAITS.RARITIES.includes(trait));
        const replacement: string = (<string>(
            GAME.settings.get(MODULENAME, "npcMystifierFilterRaritiesReplacement")
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
    if (!GAME.settings.get(MODULENAME, "npcMystifierFilterCreatureTypesTraits")) {
        creatures = traitsList.filter((trait: string) => TRAITS.CREATURE_TYPES.includes(trait));
    }

    let families: string[] = [];
    if (!GAME.settings.get(MODULENAME, "npcMystifierFilterCreatureFamilyTraits")) {
        families = traitsList.filter((trait: string) => TRAITS.CREATURE_FAMILIES.includes(trait));
    }

    let others: string[] = [];
    if (!GAME.settings.get(MODULENAME, "npcMystifierFilterOtherTraits")) {
        others = traitsList
            .filter((trait: string) => !TRAITS.ELITE_WEAK.includes(trait))
            .filter((trait: string) => !TRAITS.RARITIES.includes(trait))
            .filter((trait: string) => !TRAITS.CREATURE_TYPES.includes(trait))
            .filter((trait: string) => !TRAITS.CREATURE_FAMILIES.includes(trait));
    }

    return [<string>GAME.settings.get(MODULENAME, "npcMystifierPrefix")]
        .concat(eliteWeak)
        .concat(rarities)
        .concat(others)
        .concat(creatures)
        .concat(families)
        .concat([<string>GAME.settings.get(MODULENAME, "npcMystifierPostfix")]);
}

export function generateNameFromTraits(token: Token) {
    const data = token?.actor?.data?.data;
    // @ts-ignore How to type this?
    const traits = data?.traits;
    let traitsList: string[] = traits?.traits?.value.filter(
        (trait: string, index: number, self: string[]) => self.indexOf(trait) === index
    );
    const customTraits = traits?.traits?.custom;
    if (customTraits) {
        traitsList = traitsList.concat(customTraits.trim().split(","));
    }
    const tokenRarities = traits.rarity?.value;
    if (tokenRarities) {
        traitsList = traitsList.concat(tokenRarities);
    }

    traitsList = filterTraitList(traitsList);

    let name = traitsList
        .map((trait: string) => {
            return trait?.charAt(0).toUpperCase() + trait?.slice(1);
        })
        // .map((trait: string) => {
        //     return game.i18n.localize(`PF2E.TraitDescription.${trait}`);
        // })
        .join(" ");

    if ((game as Game).settings.get(MODULENAME, "npcMystifierAddRandomNumber")) {
        name += ` ${Math.floor(Math.random() * 100)}`;
        //TODO Check if token exists with this name, if so, reroll.
    }
    return name;
}
