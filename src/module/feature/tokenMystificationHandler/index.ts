import { MODULENAME } from "../../xdy-pf2e-workbench";
import { TokenDocumentPF2e } from "@scene";
import { mystifyModifierKey } from "../../settings";
import { TokenDataPF2e } from "@scene/token-document";
import { TokenPF2e } from "@canvas";
import { generateNameFromTraits } from "./traits-name-generator";

function shouldSkipRandomNumber(token: TokenPF2e | TokenDocumentPF2e) {
    return (
        game.settings.get(MODULENAME, "npcMystifierSkipRandomNumberForUnique") &&
        // @ts-ignore
        token?.actor?.data?.data?.traits?.rarity === "unique"
    );
}

export async function mystifyToken(token: TokenPF2e | TokenDocumentPF2e | null, isMystified: boolean): Promise<string> {
    if (token === null) return "";
    let name = token?.name || "";
    if (token) {
        const keep = game.settings.get(MODULENAME, "npcMystifierKeepNumberAtEndOfName");
        if (isMystified) {
            if (keep) {
                name = `${token?.actor?.name} ${name?.match(/\d+$/)?.[0] ?? ""}`;
            } else {
                name = token?.actor?.name || "";
            }
        } else {
            switch (game.settings.get(MODULENAME, "npcMystifierMethod")) {
                default:
                    name = await generateNameFromTraits(token);
            }
            //Do not allow name to be just empty string
            if (name === "") {
                name = "...";
            }

            const addRandom = game.settings.get(MODULENAME, "npcMystifierAddRandomNumber");
            if (token?.name?.match(/ \d+$/)?.[0] && keep && !shouldSkipRandomNumber(token)) {
                name = `${name} ${token?.name?.match(/ \d+$/)?.[0] ?? ""}`;
            } else {
                if (addRandom && !shouldSkipRandomNumber(token)) {
                    let rolled = Math.floor(Math.random() * 100) + 1;
                    //Retry once if the number is already used, can't be bothered to roll until unique or keep track of used numbers
                    if (canvas?.scene?.tokens?.find((t) => t.name.endsWith(` ${rolled}`))) {
                        rolled = Math.floor(Math.random() * 100) + 1;
                    }
                    name += ` ${rolled}`;
                }
            }
        }
    }

    return name;
}

function isMystifyModifierKeyPressed() {
    switch (mystifyModifierKey) {
        case "ALT":
            return game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.ALT);
        case "CONTROL":
            return game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);
        default:
            return false;
    }
}

export async function tokenCreateMystification(token: any) {
    const key = game.settings.get(MODULENAME, "npcMystifierModifierKey");
    if (
        game.user?.isGM &&
        token &&
        !token?.actor?.hasPlayerOwner &&
        key !== "DISABLED" &&
        (key === "ALWAYS" || isMystifyModifierKeyPressed()) &&
        (!game.keyboard?.downKeys.has("V") || game.keyboard?.downKeys.has("Insert"))
    ) {
        await canvas?.scene?.updateEmbeddedDocuments("Token", await doMystification(token, false));
    }
}

export function isTokenMystified(token: TokenPF2e | TokenDocumentPF2e | null): boolean {
    const tokenName = token?.data.name;
    const actorName = token?.actor?.name;
    if (tokenName !== actorName && game.settings.get(MODULENAME, "npcMystifierKeepNumberAtEndOfName")) {
        const tokenNameNoNumber = tokenName?.trim().replace(/\d+$/, "").trim();
        const actorNameNoNumber = actorName?.replace(/\d+$/, "").trim();
        return tokenNameNoNumber !== actorNameNoNumber;
    }
    return tokenName !== actorName || false;
}

export async function doMystification(token: TokenPF2e, active: boolean) {
    //define array of objects to be updated
    const updates = [
        {
            _id: <string>token.id,
            name: await mystifyToken(token, active),
        },
    ];

    if (
        game.user?.isGM &&
        isTokenMystified(token) &&
        game.settings.get(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor")
    ) {
        canvas?.scene?.tokens
            ?.filter((t) => t.actor?.id === token?.actor?.id)
            ?.filter((x) => isTokenMystified(x))
            ?.forEach(async (x) =>
                updates.push({
                    _id: <string>x.id,
                    name: await mystifyToken(x, active),
                })
            );
    }

    return updates;
}

export function renderNameHud(data: TokenDataPF2e, html: JQuery) {
    let token: TokenPF2e | null;
    if (canvas && canvas.tokens) {
        token = canvas.tokens.get(<string>data._id) ?? null;

        const title = isTokenMystified(token) ? "Unmystify" : "Mystify";
        const toggle = $(
            `<div class="control-icon ${
                isTokenMystified(token) ? "active" : ""
            }" > <i class="fas fa-eye-slash"  title=${title}></i></div>`
        );
        if (canMystify() && !token?.actor?.hasPlayerOwner) {
            toggle.on("click", async (e) => {
                const hudElement = $(e.currentTarget);
                const active = hudElement.hasClass("active");
                if (token !== null && isTokenMystified(token) === active) {
                    const updates = await doMystification(token, active);
                    await canvas?.scene?.updateEmbeddedDocuments("Token", updates);
                }
                hudElement.toggleClass("active");
            });
            html.find("div.col.left").append(toggle);
        }
    }
}

export function mangleChatMessage(message: ChatMessage, html: JQuery) {
    const actorId = <string>message?.data?.speaker?.actor;
    const tokenId = message?.data?.speaker?.token;
    const actor = game.actors?.get(actorId);
    const jqueryContent = html?.find(".action-card");

    const tokenName = <string>canvas?.scene?.tokens?.find((t) => t?.id === tokenId)?.name;
    const tokenNameNoNumber = tokenName?.replace(/\d+$/, "").trim();

    if (tokenNameNoNumber && actor?.name?.trim() !== tokenNameNoNumber && jqueryContent && jqueryContent.html()) {
        jqueryContent.html(jqueryContent.html().replace(new RegExp(<string>actor?.name, "gi"), tokenNameNoNumber));
    }
}

export function canMystify() {
    return game.user?.isGM && canvas && canvas.tokens;
}
