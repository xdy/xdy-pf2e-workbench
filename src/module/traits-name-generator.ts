// Add any additional hooks if necessary
import { TRAITS } from "./xdy-pf2e-constants";
import { MODULENAME } from "./xdy-pf2e-workbench";

function filterTraitList(traitsList: any) {
    //TODO Clean up this mess
    if (game.settings.get(MODULENAME, "npcMystifierFilterBlacklist")) {
        const blacklist =
            (<string>game.settings.get(MODULENAME, "npcMystifierFilterBlacklist")).toLocaleLowerCase().split(",") ||
            null;
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
        const replacement: string = <string>game.settings.get(MODULENAME, "npcMystifierFilterRaritiesReplacement");
        if (replacement !== "") {
            rarities = rarities.map((trait: string) => {
                if (trait !== "common") {
                    return replacement;
                }
                return trait;
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

    let others: string[] = [];
    if (!game.settings.get(MODULENAME, "npcMystifierFilterOtherTraits")) {
        others = traitsList
            .filter((trait: string) => !eliteWeak.includes(trait))
            .filter((trait: string) => !rarities.includes(trait))
            .filter((trait: string) => !creatures.includes(trait))
            .filter((trait: string) => !families.includes(trait));
    }

    return [<string>game.settings.get(MODULENAME, "npcMystifierPrefix")]
        .concat(eliteWeak)
        .concat(rarities)
        .concat(others)
        .concat(creatures)
        .concat(families)
        .concat([<string>game.settings.get(MODULENAME, "npcMystifierPostfix")]);
}

export function generateNameFromTraits(token: Token) {
    //Option to filter out other traits?
    let traitsList = token?.actor?.data?.data["traits"]["traits"]?.value;

    traitsList = filterTraitList(traitsList);

    let name = traitsList
        .map((trait: string) => {
            return trait.charAt(0).toUpperCase() + trait.slice(1);
        })
        // .map((trait: string) => {
        //     return game.i18n.localize(`PF2E.TraitDescription.${trait}`);
        // })
        .join(" ");

    if (game.settings.get(MODULENAME, "npcMystifierAddRandomNumber")) {
        name += ` ${Math.floor(Math.random() * 100)}`;
        //TODO Check if token exists with this name, if so, reroll.
    }
    return name;
}
