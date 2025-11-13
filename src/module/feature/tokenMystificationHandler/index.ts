import { ActorSystemData, CreaturePF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { mystifyModifierKey, mystifyRandomPropertyType } from "../../settings/index.js";
import { generateNameFromTraits } from "./traits-name-generator.js";
import { heroes, logError } from "../../utils.js";

function shouldSkipRandomProperty(token) {
    return (
        game.settings.get(MODULENAME, "npcMystifierRandomPropertySkipForUnique") &&
        (<ActorSystemData>token?.actor?.system)?.traits?.rarity === "unique"
    );
}

function hasRandomProperty(token) {
    switch (mystifyRandomPropertyType) {
        case "numberPostfix":
        case "wordPrefix":
            return token.name.split(" ").length !== (token.actor?.prototypeToken.name.split(" ") ?? [""]).length;
        default:
            return false;
    }
}

async function fetchRandomWordPrefix(): Promise<string> {
    const fixSetting = String(game.settings.get(MODULENAME, "npcMystifierRandomWordPrefixRollTable")).trim();

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

export async function buildTokenName(token: TokenDocumentPF2e<ScenePF2e>, isMystified: boolean): Promise<string> {
    let tokenName = "";

    function getTokenName(): string {
        const useOriginalTokenName = game.settings.get(MODULENAME, "npcMystifierDemystifyToOriginalTokenName");
        if (useOriginalTokenName) {
            const originalTokenName = String(token.getFlag(MODULENAME, "originalTokenName"));
            if (originalTokenName) {
                return originalTokenName ?? "";
            }
        }
        return token.actor?.prototypeToken.name ?? "";
    }

    if (token && token.actor) {
        tokenName = token.name;
        const keep = game.settings.get(MODULENAME, "npcMystifierKeepRandomProperty");
        if (isMystified) {
            if (keep && !shouldSkipRandomProperty(token)) {
                switch (mystifyRandomPropertyType) {
                    case "numberPostfix":
                        tokenName = `${getTokenName()} ${tokenName.match(/\d+$/)?.[0] ?? ""}`.trim();
                        break;
                    case "wordPrefix":
                        tokenName = `${(tokenName.match(/\b([a-zA-Z0-9_-]+)\b/) ?? [""])[0]} ${getTokenName()}`.trim();
                        break;
                    default:
                        tokenName = getTokenName();
                }
            } else {
                tokenName = getTokenName();
            }
        } else {
            // Store the original name before mystifying
            if (!token.getFlag(MODULENAME, "originalTokenName")) {
                await token.setFlag(MODULENAME, "originalTokenName", token.name);
            }

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
                        tokenName = getTokenName();
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
            return game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.ALT);
        case "CONTROL":
            return game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);
        case "META":
            return game.keyboard.downKeys.has("MetaLeft") || game.keyboard.downKeys.has("MetaRight");
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
        if (Hooks.call(`${MODULENAME}.tokenCreateMystification`, token)) {
            await doMystification(token, false);
        }
    }
}

export function isTokenMystified(token): boolean {
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
    const token = game.scenes?.current?.tokens?.get(tokenId);
    if (token) {
        return doMystification(token, active);
    }
}

export async function doMystification(token: TokenDocumentPF2e<ScenePF2e> | undefined, active: boolean) {
    if (!token?.actor || !canvas.scene) {
        return;
    }

    if (
        heroes().includes(<CreaturePF2e>token.actor) ||
        String(game.settings.get(MODULENAME, "npcMystifierExcludeActorTypes"))
            .split(",")
            .map((t) => t.trim())
            .includes(token.actor?.type)
    ) {
        return;
    }

    // define array of objects to be updated
    const updates = [
        {
            _id: token.id,
            name: await buildTokenName(token, active),
        },
    ];

    const allOfActor = game.settings.get(MODULENAME, "npcMystifierDemystifyAllTokensBasedOnTheSameActor");
    if (active && game.user?.isGM && isTokenMystified(token) && allOfActor) {
        for (const t of canvas.scene.tokens) {
            if (t.id !== token.id && t.actor?.id === token.actor.id && isTokenMystified(t)) {
                updates.push({
                    _id: t.id,
                    name: await buildTokenName(t, active),
                });
            }
        }
    }
    await canvas.scene.updateEmbeddedDocuments("Token", updates, { render: true });
    for (const combat of game.combats) {
        // The combat tracker doesn't update the combatant names when the token names change
        const ids = combat.combatants.filter((c) => c.actor?.id === token.actor?.id).map((c) => ({ _id: c.id }));
        if (ids.length > 0) {
            combat.updateEmbeddedDocuments("Combatant", ids, { diff: false, render: true });
        }
    }
}

export function renderNameHud(data: TokenDocumentPF2e, html: HTMLElement) {
    let token: TokenPF2e<TokenDocumentPF2e<ScenePF2e>> | null;
    if (canvas && canvas.tokens) {
        token = canvas.tokens.get(<string>data._id) ?? null;

        const title = isTokenMystified(token) ? "Unmystify" : "Mystify";
        const toggle = document.createElement("div");
        toggle.className = `control-icon toggle ${isTokenMystified(token) ? "active" : ""}`;
        toggle.setAttribute("data-action", "mystify");

        const icon = document.createElement("i");
        icon.className = String(game.settings.get(MODULENAME, "npcMystifierIcon"));
        icon.title = title;

        toggle.appendChild(icon);

        if (canMystify() && !token?.actor?.hasPlayerOwner) {
            toggle.addEventListener("click", async (e) => {
                const hudElement = e.currentTarget as HTMLElement;
                const active = hudElement.classList.contains("active");
                if (token !== null && isTokenMystified(token) === active) {
                    await doMystification(token?.document, active);
                }
                hudElement.classList.toggle("active");
            });

            const column = html.querySelector("div.col.left");
            if (column) {
                column.appendChild(toggle);
            }
        }
    }
}

export function canMystify() {
    return game.user?.isGM && canvas && canvas.tokens;
}
