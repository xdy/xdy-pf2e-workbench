import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ScenePF2e, TokenDocumentPF2e } from "@scene";
import { mystifyModifierKey, mystifyRandomPropertyType } from "../../settings";
import { TokenDataPF2e } from "@scene/token-document";
import { generateNameFromTraits } from "./traits-name-generator";
import { TokenPF2e } from "@module/canvas";

function shouldSkipRandomProperty(token: TokenPF2e | TokenDocumentPF2e) {
    return (
        game.settings.get(MODULENAME, "npcMystifierRandomPropertySkipForUnique") &&
        token?.actor?.system?.traits?.rarity === "unique"
    );
}

function hasRandomProperty(token: TokenPF2e | TokenDocumentPF2e) {
    switch (mystifyRandomPropertyType) {
        case "numberPostfix":
        case "wordPrefix":
            return token.name.split(" ").length !== (token.actor?.prototypeToken.name.split(" ") ?? [""]).length;
        default:
            return false;
    }
}

async function fetchRandomWordPrefix(): Promise<string> {
    const fixSetting = game.settings.get(MODULENAME, "npcMystifierRandomWordPrefixRollTable");

    // "null" check is due to a previous bug that may have left invalid data in text fields
    if (fixSetting !== null && fixSetting !== "null" && fixSetting !== "") {
        const draw = await game?.tables?.find((table) => table.name === fixSetting)?.draw({ displayChat: false });
        if (draw && draw?.results[0]) {
            return draw?.results[0].getChatText();
        }
    }

    console.error(`Rolltable for ${fixSetting} setting not defined or not found.`);

    return "";
}

export async function buildTokenName(
    token: TokenPF2e | TokenDocumentPF2e | null,
    isMystified: boolean
): Promise<string> {
    let tokenName = "";
    if (token && token.actor) {
        tokenName = token.name;
        const keep = game.settings.get(MODULENAME, "npcMystifierKeepRandomProperty");
        if (isMystified) {
            if (keep && !shouldSkipRandomProperty(token)) {
                switch (mystifyRandomPropertyType) {
                    case "numberPostfix":
                        tokenName = `${token.actor.prototypeToken.name} ${tokenName.match(/\d+$/)?.[0] ?? ""}`.trim();
                        break;
                    case "wordPrefix":
                        tokenName = `${(tokenName.match(/\b([a-zA-Z0-9_-]+)\b/) ?? [""])[0]} ${
                            token.actor.prototypeToken.name
                        }`.trim();
                        break;
                    default:
                        tokenName = token.actor.prototypeToken.name;
                }
            } else {
                tokenName = token.actor.prototypeToken.name;
            }
        } else {
            switch (game.settings.get(MODULENAME, "npcMystifierUseOtherTraits")) {
                default:
                    tokenName = await generateNameFromTraits(token);
            }

            if (hasRandomProperty(token) && keep && !shouldSkipRandomProperty(token)) {
                switch (mystifyRandomPropertyType) {
                    case "numberPostfix":
                        tokenName = `${tokenName} ${token.name.match(/\d+$/)?.[0] ?? ""}`.trim();
                        break;
                    case "wordPrefix":
                        tokenName = `${(token.name.match(/\b([a-zA-Z0-9_-]+)\b/) ?? [""])[0]} ${tokenName}`.trim();
                        break;
                    default:
                        tokenName = token.actor.prototypeToken.name;
                }
            } else {
                if (!shouldSkipRandomProperty(token)) {
                    let rolled = 0;

                    switch (mystifyRandomPropertyType) {
                        case "numberPostfix":
                            rolled = Math.floor(Math.random() * 100) + 1;
                            // Retry once if the number is already used, can't be bothered to roll until unique or keep track of used numbers
                            // @ts-ignore
                            if (canvas?.scene?.tokens?.find((t) => t.name.endsWith(` ${rolled}`))) {
                                rolled = Math.floor(Math.random() * 100) + 1;
                            }
                            tokenName += ` ${rolled}`;
                            break;
                        case "wordPrefix":
                            tokenName = `${await fetchRandomWordPrefix()} ${tokenName}`.trim();
                            break;
                    }
                }
            }
        }
    }

    // Never return an empty string
    return tokenName === "" ? <string>game.settings.get(MODULENAME, "npcMystifierNoMatch") : tokenName;
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
        await doMystification(token, false);
    }
}

export function isTokenMystified(token: TokenPF2e | TokenDocumentPF2e | null): boolean {
    const tokenName = token?.name;
    const prototypeTokenName = token?.actor?.prototypeToken.name ?? "";

    // TODO This needs improving. Basically, look at the various mystification settings and figure out what's been added, only check the non-added bits.
    return (tokenName?.indexOf(prototypeTokenName) ?? -1) < 0;
}

export async function doMystificationFromToken(tokenId: string, active: boolean) {
    // @ts-ignore
    const token = <TokenPF2e>(<unknown>game.scenes?.current?.tokens?.get(tokenId));
    if (token) {
        return doMystification(token, active);
    }
}

export async function doMystification(token: TokenPF2e, active: boolean) {
    if (!token?.actor) {
        return;
    }

    // define array of objects to be updated
    const updates = [
        {
            _id: <string>token.id,
            name: await buildTokenName(token, active),
        },
    ];

    const scene: ScenePF2e | null = canvas?.scene;
    if (
        game.user?.isGM &&
        isTokenMystified(token) &&
        game.settings.get(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor")
    ) {
        // @ts-ignore
        for (const sceneToken of scene?.tokens
            ?.filter((t) => t.actor?.id === token?.actor?.id)
            ?.filter((x) => isTokenMystified(x)) || []) {
            updates.push({
                _id: <string>sceneToken.id,
                name: await buildTokenName(sceneToken, active),
            });
        }
    }
    // @ts-ignore
    await scene?.updateEmbeddedDocuments("Token", updates, {});
}

export function renderNameHud(data: TokenDataPF2e, html: JQuery) {
    let token: TokenPF2e | null;
    if (canvas && canvas.tokens) {
        token = canvas.tokens.get(<string>data._id) ?? null;

        const title = isTokenMystified(token) ? "Unmystify" : "Mystify";
        const toggle = $(
            `<div class="control-icon toggle ${
                isTokenMystified(token) ? "active" : ""
            }" data-action="mystify"> <i class="fas fa-eye-slash" title="${title}"></i></div>`
        );
        if (canMystify() && !token?.actor?.hasPlayerOwner) {
            toggle.on("click", async (e) => {
                const hudElement = $(e.currentTarget);
                const active = hudElement.hasClass("active");
                if (token !== null && isTokenMystified(token) === active) {
                    await doMystification(token, active);
                }
                hudElement.toggleClass("active");
            });
            html.find("div.col.left").append(toggle);
        }
    }
}

export function mangleChatMessage(message: ChatMessage, html: JQuery) {
    const actorId = <string>message?.speaker?.actor;
    const tokenId = message?.speaker?.token;
    const actor = game.actors?.get(actorId);
    const jqueryContent = html?.find(".action-card");

    // @ts-ignore
    const tokenName = <string>canvas?.scene?.tokens?.find((t) => t?.id === tokenId)?.name;
    const tokenNameNoNumber = tokenName?.replace(/\d+$/, "").trim();

    if (
        tokenNameNoNumber &&
        actor?.prototypeToken.name?.trim() !== tokenNameNoNumber &&
        jqueryContent &&
        jqueryContent.html()
    ) {
        jqueryContent.html(
            jqueryContent.html().replace(new RegExp(<string>actor?.prototypeToken.name, "gi"), tokenNameNoNumber)
        );
    }
}

export function canMystify() {
    return game.user?.isGM && canvas && canvas.tokens;
}
