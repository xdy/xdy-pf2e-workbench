import { ActorSystemData, CreaturePF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../constants.ts";
import { mystifyModifierKey, mystifyRandomPropertyType } from "../../settings/npc-mystification.ts";
import { generateNameFromTraits } from "./traits-name-generator.ts";
import { getModuleFlag, getModuleSetting, heroes } from "../../utils.ts";
import { logError } from "../../utils/logging.ts";
import * as systems from "../../utils/systems.ts";

function shouldSkipRandomProperty(token: TokenDocumentPF2e<ScenePF2e>): boolean {
    return (
        getModuleSetting<boolean>("npcMystifierRandomPropertySkipForUnique") &&
        (<ActorSystemData>token?.actor?.system)?.traits?.rarity === "unique"
    );
}

function hasRandomProperty(token: TokenDocumentPF2e<ScenePF2e>): boolean {
    switch (mystifyRandomPropertyType) {
        case "numberPostfix":
        case "wordPrefix":
            return token.name.split(" ").length !== (token.actor?.prototypeToken.name.split(" ") ?? [""]).length;
        default:
            return false;
    }
}

async function fetchRandomWordPrefix(): Promise<string> {
    const fixSetting = getModuleSetting<string>("npcMystifierRandomWordPrefixRollTable").trim();

    // "null" check is due to a previous bug that may have left invalid data in text fields
    if (fixSetting !== null && fixSetting !== "null" && fixSetting !== "") {
        const table = game?.tables?.find((t) => t.name === fixSetting);
        if (!table) {
            const packId = systems.getModulePackId("xdy-internal-tables");
            const pack = game.packs.get(packId);
            if (pack) {
                const index = await pack.getIndex();
                const id = index.find((e) => e.name.includes(<string>fixSetting))?._id;
                if (id) {
                    const document = await pack?.getDocument(id);
                    const draw = await (<RollTable>document).draw({ displayChat: false });
                    if (draw && draw?.results[0]) {
                        // @ts-expect-error description works but not in the types it seems
                        return draw?.results[0].description;
                    } else {
                        return <string>fixSetting;
                    }
                }
            }
        }
        const draw = await table?.draw({ displayChat: false });
        if (draw && draw?.results[0]) {
            // @ts-expect-error description works but not in the types it seems
            return draw?.results[0].description;
        } else {
            return <string>fixSetting;
        }
    }

    logError(`Rolltable for ${fixSetting} setting not defined or not found.`);

    return "";
}

async function buildTokenName(
    token: TokenDocumentPF2e<ScenePF2e>,
    isMystified: boolean,
    useFullTraitName = true,
): Promise<string> {
    let tokenName = "";

    function getTokenName(): string {
        const useOriginalTokenName = getModuleSetting<boolean>("npcMystifierDemystifyToOriginalTokenName");
        if (useOriginalTokenName) {
            const originalTokenName = getModuleFlag(token, "originalTokenName", "");
            if (originalTokenName) {
                return originalTokenName ?? "";
            }
        }
        return token.actor?.prototypeToken.name ?? "";
    }

    if (token && token.actor) {
        tokenName = token.name;
        const keep = getModuleSetting<boolean>("npcMystifierKeepRandomProperty");
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
            if (!getModuleFlag(token, "originalTokenName")) {
                await token.setFlag(MODULENAME, "originalTokenName", token.name);
            }

            if (useFullTraitName) {
                tokenName = await generateNameFromTraits(token);
            } else {
                tokenName = getTokenName();
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
    return tokenName === "" ? getModuleSetting<string>("npcMystifierNoMatch") : tokenName;
}

function isMystifyModifierKeyPressed() {
    const keyboardManager = foundry.helpers.interaction.KeyboardManager;
    switch (mystifyModifierKey) {
        case "ALT":
            return game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.ALT);
        case "CONTROL":
            return game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.CONTROL);
        case "META":
            return game.keyboard.downKeys.has("MetaLeft") || game.keyboard.downKeys.has("MetaRight");
        default:
            return false;
    }
}

export async function tokenCreateMystification(token: any): Promise<void> {
    const key = getModuleSetting<string>("npcMystifierModifierKey");
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

// @ts-expect-error TODO fix
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
export async function doMystificationFromToken(tokenId: string, active: boolean): Promise<void> {
    const token = game.scenes?.current?.tokens?.get(tokenId);
    if (token) {
        return doMystification(token, active);
    }
}

function rarityIndex(rarity: string): number {
    const rarityKeys = Object.keys(CONFIG.PF2E.rarityTraits);
    const idx = rarityKeys.indexOf(rarity);
    return idx >= 0 ? idx : 0;
}

function shouldUseFullTraitName(token: TokenDocumentPF2e<ScenePF2e>): boolean {
    const includeRarity = getModuleSetting<string>("npcMystifierIncludeCreaturesOfThisRarityOrGreater");
    const creatureRarity = (<ActorSystemData>token.actor?.system)?.traits?.rarity ?? "common";
    const eligibleForRarity = rarityIndex(creatureRarity) >= rarityIndex(includeRarity);

    let includeLevel = Number(getModuleSetting<number>("npcMystifierIncludeCreaturesOfThisLevelOrGreater"));
    if (getModuleSetting<boolean>("npcMystifierIncludeCreaturesOfThisLevelOrGreaterUsingPartyLevel")) {
        includeLevel = game?.actors?.party?.level ?? includeLevel;
    }
    const eligibleForLevel = includeLevel === -1 || (token.actor as CreaturePF2e).level >= includeLevel;

    return eligibleForRarity && eligibleForLevel;
}

export async function doMystification(token: TokenDocumentPF2e<ScenePF2e> | undefined, active: boolean): Promise<void> {
    if (!token?.actor || !canvas.scene) {
        return;
    }

    if ("party" === token.actor.type) {
        return;
    }

    if (heroes().includes(<CreaturePF2e>token.actor)) {
        return;
    }

    if (
        getModuleSetting<string>("npcMystifierExcludeActorTypes")
            .split(",")
            .map((t) => t.trim())
            .includes(token.actor?.type)
    ) {
        return;
    }

    const useFullTraitName = shouldUseFullTraitName(token);

    const updates = [
        {
            _id: token.id,
            name: await buildTokenName(token, active, useFullTraitName),
        },
    ];

    const allOfActor = getModuleSetting<boolean>("npcMystifierDemystifyAllTokensBasedOnTheSameActor");
    if (active && game.user?.isGM && isTokenMystified(token) && allOfActor) {
        for (const t of canvas.scene.tokens) {
            if (t.id !== token.id && t.actor?.id === token.actor.id && isTokenMystified(t)) {
                updates.push({
                    _id: t.id,
                    name: await buildTokenName(t, active, useFullTraitName),
                });
            }
        }
    }
    await canvas.scene.updateEmbeddedDocuments("Token", updates, { render: true });
    renameCombatants(token);
}

function renameCombatants(token: TokenDocumentPF2e<ScenePF2e>): void {
    for (const combat of game.combats) {
        const ids = combat.combatants.filter((c) => c.actor?.id === token.actor?.id).map((c) => ({ _id: c.id }));
        if (ids.length > 0) {
            combat.updateEmbeddedDocuments("Combatant", ids, { diff: false, render: true });
        }
    }
}

export function renderNameHud(app: { object?: unknown }, html: HTMLElement): void {
    const tokenId =
        (app?.object as { id?: string })?.id ?? (app?.object as { document?: { id?: string } })?.document?.id;
    if (!tokenId || !canvas?.tokens) return;
    const token = canvas.tokens.get(tokenId);
    if (!token) return;

    const mystified = isTokenMystified(token);
    if (!canMystify() || token?.actor?.hasPlayerOwner) return;

    const toggle = createMystifyToggle(mystified, tokenId);
    const column = html.querySelector("div.col.left");
    if (column) {
        column.appendChild(toggle);
    }
}

function createMystifyToggle(mystified: boolean, tokenId: string): HTMLDivElement {
    const title = mystified ? "Unmystify" : "Mystify";
    const toggle = document.createElement("div");
    toggle.className = `control-icon toggle ${mystified ? "active" : ""}`;
    toggle.setAttribute("data-action", "mystify");

    const icon = document.createElement("i");
    icon.className = getModuleSetting<string>("npcMystifierIcon");
    icon.title = title;
    toggle.appendChild(icon);

    toggle.addEventListener("click", createMystifyClickHandler(tokenId));
    return toggle;
}

function createMystifyClickHandler(tokenId: string): (e: MouseEvent) => Promise<void> {
    return async (e: MouseEvent) => {
        const hudElement = e.currentTarget as HTMLElement;
        const active = hudElement.classList.contains("active");
        const updatedToken = canvas?.tokens?.get(tokenId) ?? null;
        if (updatedToken && isTokenMystified(updatedToken) === active) {
            await doMystification(updatedToken.document, isTokenMystified(updatedToken));
        }
        hudElement.classList.toggle("active");
    };
}

export function canMystify(): any {
    return game.user?.isGM && canvas && canvas.tokens;
}
