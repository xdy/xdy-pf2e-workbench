import { ScenePF2e, TokenDocumentPF2e } from "@scene";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { ActorSystemData } from "@actor/data/base.js";
import { mystifyModifierKey, mystifyRandomPropertyType } from "../../settings/index.js";
import { generateNameFromTraits } from "./traits-name-generator.js";
import { logError } from "../../utils.js";
import { TokenPF2e } from "@module/canvas/token/object.js";
import { ChatMessagePF2e } from "@module/chat-message/index.js";

function shouldSkipRandomProperty(token: TokenPF2e | TokenDocumentPF2e) {
    return (
        game.settings.get(MODULENAME, "npcMystifierRandomPropertySkipForUnique") &&
        (<ActorSystemData>token?.actor?.system)?.traits?.rarity === "unique"
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
    const fixSetting = String(game.settings.get(MODULENAME, "npcMystifierRandomWordPrefixRollTable"));

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
                    } else {
                        return <string>fixSetting;
                    }
                }
            }
        }
        const draw = await table?.draw({ displayChat: false });
        if (draw && draw?.results[0]) {
            return draw?.results[0].getChatText();
        } else {
            return <string>fixSetting;
        }
    }

    logError(`Rolltable for ${fixSetting} setting not defined or not found.`);

    return "";
}

export async function buildTokenName(
    token: TokenPF2e | TokenDocumentPF2e | null,
    isMystified: boolean,
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
    return tokenName === "" ? String(game.settings.get(MODULENAME, "npcMystifierNoMatch")) : tokenName;
}

function isMystifyModifierKeyPressed() {
    switch (mystifyModifierKey) {
        case "ALT":
            return game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.ALT);
        case "CONTROL":
            return game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);
        case "META":
            return game?.keyboard?.downKeys.has("MetaLeft") || game?.keyboard?.downKeys.has("MetaRight");
        default:
            return false;
    }
}

export async function tokenCreateMystification(token: any) {
    const key = String(game.settings.get(MODULENAME, "npcMystifierModifierKey"));
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

/**
 * Takes a token ID and a boolean value to perform a mystification.
 *
 * @param {string} tokenId - The ID of the token.
 * @param {boolean} active - Whether the mystification should be active or not.
 * @return {Promise<void>} A promise that resolves when the mystification is complete.
 */
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
    const allOfActor = game.settings.get(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor");
    if (game.user?.isGM && isTokenMystified(token) && allOfActor) {
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
    scene?.updateEmbeddedDocuments("Token", updates, {}).then(() => {
        if (game.combat) {
            new Promise((resolve) => setTimeout(resolve, 50)).then(() => {
                ui.combat?.render(true);
                ui.combat.combats
                    .filter((x) => x.combatants.filter((c) => c.actor?.id === token.actor?.id).length > 0)
                    .forEach((c) => c.updateSource({}, { render: true }));
            });
        }
    });
}

export function renderNameHud(data: TokenDocumentPF2e, html: JQuery) {
    let token: TokenPF2e | null;
    if (canvas && canvas.tokens) {
        token = canvas.tokens.get(<string>data._id) ?? null;

        const title = isTokenMystified(token) ? "Unmystify" : "Mystify";
        const toggle = $(
            `<div class="control-icon toggle ${
                isTokenMystified(token) ? "active" : ""
            }" data-action="mystify"> <i class="fas fa-eye-slash" title="${title}"></i></div>`,
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

export function mangleNamesInChatMessage(message: ChatMessagePF2e, html: JQuery) {
    const actorId = <string>message?.speaker?.actor;
    const tokenId = message?.speaker?.token;
    const actor = game.actors?.get(actorId);
    const tokens = game.scenes?.active?.tokens ?? game.scenes?.current?.tokens ?? canvas?.scene?.tokens;
    const token = tokens?.get(<string>tokenId);
    const actionCard = html?.find(".action-card");
    const speaker = html?.find(".message-sender");

    const tokenName = token?.name || message.speaker.alias;
    const tokenNameNoNumber = tokenName?.replace(/\d+$/, "").trim();

    if (tokenNameNoNumber && actor?.prototypeToken.name?.trim() !== tokenNameNoNumber) {
        if (actionCard.html()) {
            actionCard.html(actionCard.html().replace(new RegExp(<string>actor?.prototypeToken.name, "gi"), tokenName));
        }
        if (speaker.html()) {
            speaker.html(speaker.html().replace(message.speaker.alias, tokenName));
            message.speaker.alias = tokenName;
        }
    }
}

export function canMystify() {
    return game.user?.isGM && canvas && canvas.tokens;
}
