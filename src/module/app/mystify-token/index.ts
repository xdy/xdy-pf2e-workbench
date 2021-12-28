import { generateNameFromTraits } from "./traits-name-generator";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { mystifyModifierKey } from "../../settings";
import { TokenData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs";

function shouldSkipRandomNumber(token: Token | TokenDocument) {
    return (
        (game as Game).settings.get(MODULENAME, "npcMystifierSkipRandomNumberForUnique") &&
        // @ts-ignore
        token?.actor?.data?.data?.traits?.rarity?.value === "unique"
    );
}

export async function mystifyToken(
    token: Token | TokenDocument | null,
    isMystified: boolean,
    doUpdate = true
): Promise<string> {
    if (token === null) return "";
    let name = token?.name || "";
    if (token) {
        const keep = (game as Game).settings.get(MODULENAME, "npcMystifierKeepNumberAtEndOfName");
        if (isMystified) {
            if (keep) {
                name = `${token?.actor?.name} ${name?.match(/\d+$/)?.[0] ?? ""}`;
            } else {
                name = token?.actor?.name || "";
            }
        } else {
            switch ((game as Game).settings.get(MODULENAME, "npcMystifierMethod")) {
                default:
                    name = await generateNameFromTraits(token);
            }

            const addRandom = (game as Game).settings.get(MODULENAME, "npcMystifierAddRandomNumber");
            if (token?.name?.match(/ \d+$/)?.[0] && keep && !shouldSkipRandomNumber(token)) {
                name = `${name} ${token?.name?.match(/ \d+$/)?.[0] ?? ""}`;
            } else {
                if (addRandom && !shouldSkipRandomNumber(token)) {
                    let rolled = Math.floor(Math.random() * 100) + 1;
                    //Retry once if the number is already used, can't be bothered to roll until unique or keep track of used numbers
                    if ((game as Game).scenes?.active?.tokens?.find((t) => t.name.endsWith(` ${rolled}`))) {
                        rolled = Math.floor(Math.random() * 100) + 1;
                    }
                    name += ` ${rolled}`;
                }
            }
        }
    }

    if (doUpdate) {
        if (!(token instanceof TokenDocument)) {
            await token.document.update({ name: name });
        } else {
            token.data.name = name;
            token.data.update(token.data);
        }
        return name;
    } else {
        return name;
    }
}

function isMystifyModifierKeyPressed() {
    switch (mystifyModifierKey) {
        case "ALT":
            // @ts-ignore
            return (game as Game)?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.ALT);
        case "CONTROL":
            // @ts-ignore
            return (game as Game)?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);
        default:
            return false;
    }
}

export function preTokenCreateMystification(token: Token) {
    if (
        (game as Game).user?.isGM &&
        !((game as Game).settings.get(MODULENAME, "npcMystifierModifierKey") === "DISABLED") &&
        ((game as Game).settings.get(MODULENAME, "npcMystifierModifierKey") === "ALWAYS" ||
            // @ts-ignore
            isMystifyModifierKeyPressed()) &&
        // @ts-ignore
        (!(game as Game).keyboard?.downKeys.has("V") || (game as Game).keyboard?.downKeys.has("Insert"))
    ) {
        mystifyToken(token, isTokenMystified(token));
    }
}

export function isTokenMystified(token: Token | TokenDocument | null): boolean {
    const tokenName = token?.data.name;
    const actorName = token?.actor?.name;
    if (tokenName !== actorName && (game as Game).settings.get(MODULENAME, "npcMystifierKeepNumberAtEndOfName")) {
        const tokenNameNoNumber = tokenName?.trim().replace(/\d+$/, "").trim();
        const actorNameNoNumber = actorName?.replace(/\d+$/, "").trim();
        return tokenNameNoNumber !== actorNameNoNumber;
    }
    return tokenName !== actorName || false;
}

export async function doMystification(token: Token, active: boolean) {
    //define array of objects to be updated
    const updates = [
        {
            _id: <string>token.id,
            name: await mystifyToken(token, active, false),
        },
    ];

    if (
        (game as Game).user?.isGM &&
        isTokenMystified(token) &&
        (game as Game).settings.get(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor")
    ) {
        (canvas as Canvas)?.scene?.tokens
            ?.filter((t) => t.actor?.id === token?.actor?.id)
            ?.filter((x) => isTokenMystified(x))
            ?.forEach(async (x) =>
                updates.push({
                    _id: <string>x.id,
                    name: await mystifyToken(x, active, false),
                })
            );
    }

    return updates;
}

export function renderNameHud(data: TokenData, html: JQuery) {
    let token: Token | null;
    if ((game as Game).user?.isGM && canvas instanceof Canvas && canvas && canvas.tokens) {
        token = canvas.tokens.get(<string>data._id) ?? null;

        const title = isTokenMystified(token) ? "Unmystify" : "Mystify";
        const toggle = $(
            `<div class="control-icon ${
                isTokenMystified(token) ? "active" : ""
            }" > <i class="fas fa-eye-slash"  title=${title}></i></div>`
        );
        toggle.on("click", async (e) => {
            const hudElement = $(e.currentTarget);
            const active = hudElement.hasClass("active");
            if (token !== null && isTokenMystified(token) === active) {
                const updates = await doMystification(token, active);
                await (game as Game).scenes?.active?.updateEmbeddedDocuments("Token", updates);
            }
            hudElement.toggleClass("active");
        });
        html.find("div.col.left").append(toggle);
    }
}

export function mangleChatMessage(message: ChatMessage, html: JQuery) {
    const actorId = <string>message?.data?.speaker?.actor;
    const tokenId = message?.data?.speaker?.token;
    const actor = (game as Game).actors?.get(actorId);
    const jqueryContent = html?.find(".action-card");

    const tokenName = <string>(game as Game).scenes?.active?.tokens?.find((t) => t?.id === tokenId)?.name;
    const tokenNameNoNumber = tokenName?.replace(/\d+$/, "").trim();

    if (tokenNameNoNumber && actor?.name?.trim() !== tokenNameNoNumber && jqueryContent && jqueryContent.html()) {
        jqueryContent.html(jqueryContent.html().replace(new RegExp(<string>actor?.name, "gi"), tokenNameNoNumber));
    }
}
