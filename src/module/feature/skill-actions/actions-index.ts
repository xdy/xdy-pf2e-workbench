import { SKILL_ACTIONS_DATA } from "./skill-actions-data";
import { ActionItemPF2e, ItemPF2e } from "@item";

const ACTION_IDS = SKILL_ACTIONS_DATA.map((row) => row.compendiumId);

export class ActionsIndex extends Map<string, ItemPF2e> {
    private static _instance: ActionsIndex;

    static get instance() {
        if (!this._instance) {
            this._instance = new ActionsIndex();
        }
        return this._instance;
    }

    private constructor() {
        super();
    }

    async loadCompendium(packName: string) {
        const pack = game.packs.get(packName);
        if (!pack) {
            return;
        }

        const actions = <ActionItemPF2e[]>await pack.getDocuments({ _id: { $in: ACTION_IDS } });
        for (const action of actions) {
            //It's weird that this is needed, but...
            const slug = action.slug ?? sluggify(action.name);
            if (slug) {
                this.set(slug, action);
            }
        }
    }
}

//Webpack yells at me if I use the system sluggify. Not up to yelling back at it right now. Everything below this is from: https://github.com/xdy-forks/pf2e/blob/af99fccbf93fd8316f5aeeccdfab3646090a62bd/src/util/misc.ts

const wordCharacter = String.raw`[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`;
const nonWordCharacter = String.raw`[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]`;
const nonWordCharacterRE = new RegExp(nonWordCharacter, "gu");

const wordBoundary = String.raw`(?:${wordCharacter})(?=${nonWordCharacter})|(?:${nonWordCharacter})(?=${wordCharacter})`;
const nonWordBoundary = String.raw`(?:${wordCharacter})(?=${wordCharacter})`;
const lowerCaseLetter = String.raw`\p{Lowercase_Letter}`;
const upperCaseLetter = String.raw`\p{Uppercase_Letter}`;
const lowerCaseThenUpperCaseRE = new RegExp(`(${lowerCaseLetter})(${upperCaseLetter}${nonWordBoundary})`, "gu");

const nonWordCharacterHyphenOrSpaceRE = /[^-\p{White_Space}\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Join_Control}]/gu;
const upperOrWordBoundariedLowerRE = new RegExp(`${upperCaseLetter}|(?:${wordBoundary})${lowerCaseLetter}`, "gu");

/**
 * The system's sluggification algorithm for labels and other terms.
 * @param [camel=null] The sluggification style to use: null is default, and there are otherwise two camel options.
 */
function sluggify(str: string, { camel = null }: { camel?: "dromedary" | "bactrian" | null } = {}): string {
    switch (camel) {
        case null:
            return str
                .replace(lowerCaseThenUpperCaseRE, "$1-$2")
                .toLowerCase()
                .replace(/['’]/g, "")
                .replace(nonWordCharacterRE, " ")
                .trim()
                .replace(/[-\s]+/g, "-");
        case "bactrian": {
            const dromedary = sluggify(str, { camel: "dromedary" });
            return dromedary.charAt(0).toUpperCase() + dromedary.slice(1);
        }
        case "dromedary":
            return str
                .replace(nonWordCharacterHyphenOrSpaceRE, "")
                .replace(/[-_]+/g, " ")
                .replace(upperOrWordBoundariedLowerRE, (part, index) =>
                    index === 0 ? part.toLowerCase() : part.toUpperCase()
                )
                .replace(/\s+/g, "");
        default:
            throw Error("I don't think that's a real camel.");
    }
}
