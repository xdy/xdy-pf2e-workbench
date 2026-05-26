import { ChatMessagePF2e, SpellPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import * as systems from "../../utils/systems.js";
import { buildSpellMessage } from "./buildPublicSpellMessage.js";

const I18N_PREFIX = `${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage`;

interface SpellcastingSettings {
    autoRevealIfKnown: boolean;
    autoRevealMembers: boolean;
    autoRevealOverrideGMRoll: boolean;
    publicMessage: boolean;
    showToGM: boolean;
    showTraits: boolean;
    traitsBlocklist: string;
}

export async function handlePrivateSpellcasting(
    data: Record<string, unknown>,
    message: ChatMessagePF2e,
): Promise<void> {
    const settings = readSpellcastingSettings();
    const spellUuid = <string>systems.getFlag(message, "origin.uuid");
    const originSpell: SpellPF2e | null = fromUuidSync(spellUuid);

    const partyMembersWithSpell = findPartyMembersWithSpell(originSpell);

    if (settings.autoRevealIfKnown && partyMembersWithSpell && partyMembersWithSpell.length > 0) {
        if (settings.autoRevealMembers) {
            showPartymembersWithSpell(message, partyMembersWithSpell, data);
        }
        if (settings.autoRevealOverrideGMRoll) {
            message.applyRollMode("publicroll");
        }
        return;
    }

    applyPrivateWhisperToMessage(data, message);

    if (settings.publicMessage && !isShiftModifierActive()) {
        const { content, flags } = await buildMessageData(message, originSpell, spellUuid, data, settings);

        const gmId = game.users.activeGM?.id;
        const whisper = settings.showToGM ? [] : game.users.filter((u) => u.active && u.id !== gmId).map((u) => u.id);

        // @ts-expect-error TODO Fix typing
        await ChatMessage.create({
            author: game.userId,
            content,
            flags,
            whisper,
        });
    }
}

function readSpellcastingSettings(): SpellcastingSettings {
    return {
        autoRevealIfKnown: Boolean(game.settings.get(MODULENAME, "castPrivateSpellAutoRevealIfKnown")),
        autoRevealMembers: Boolean(
            game.settings.get(MODULENAME, "castPrivateSpellAutoRevealPartyMembersThatKnowSpell"),
        ),
        autoRevealOverrideGMRoll: Boolean(
            game.settings.get(MODULENAME, "castPrivateSpellAutoRevealOverrideGMRollMode"),
        ),
        publicMessage: Boolean(game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessage")),
        showToGM: Boolean(game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowToGM")),
        showTraits: Boolean(game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageShowTraits")),
        traitsBlocklist: String(
            game.settings.get(MODULENAME, "castPrivateSpellWithPublicMessageTraitsBlocklist") ?? "",
        ),
    };
}

function findPartyMembersWithSpell(originSpell: SpellPF2e | null): string[] | undefined {
    if (!originSpell) return undefined;
    return game.actors?.party?.members
        ?.filter((actor) => actor?.items?.some((item) => actorKnowsSpell(item, originSpell)))
        .map((actor) => actor?.name);
}

function actorKnowsSpell(item: foundry.abstract.Document, originSpell: SpellPF2e): boolean {
    // @ts-expect-error TODO Fix typing
    if (item.slug !== originSpell.slug) return false;
    // @ts-expect-error TODO Fix typing
    if (!item.isOfType("spell")) return false;

    const spell = item as unknown as SpellPF2e;
    if (!spell.spellcasting) return false;

    return actorHasSpellAvailable(spell);
}

function actorHasSpellAvailable(spell: SpellPF2e): boolean {
    const entry = spell.spellcasting;

    // @ts-expect-error TODO Fix typing
    if (!entry?.isPrepared) return true;

    const slots = entry?.system?.slots;
    if (!slots) return false;

    // @ts-expect-error TODO Fix typing
    return Object.values(slots).some((group: { prepared: { id: string }[] }) =>
        group.prepared.some((s) => s.id === spell.id),
    );
}

function showPartymembersWithSpell(
    message: ChatMessagePF2e,
    membersWithSpell: string[] | undefined,
    data: Record<string, unknown>,
): void {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = message.content;

    const firstDivider = tempDiv.querySelector("hr.item-block-divider");
    if (firstDivider) {
        const knownByText = game.i18n.format(`${I18N_PREFIX}.knownBy`, {
            spellHavers: membersWithSpell?.join(",") ?? "",
        });

        const knownByElement = document.createElement("div");
        knownByElement.innerHTML = knownByText;
        firstDivider.insertAdjacentElement("afterend", knownByElement);
    }

    const newContent = tempDiv.innerHTML;
    if (newContent !== message.content) {
        data.content = newContent;
        message.updateSource({ content: newContent });
    }
}

async function buildMessageData(
    message: ChatMessagePF2e,
    originSpell: SpellPF2e | null,
    spellUuid: string,
    data: Record<string, unknown>,
    settings: SpellcastingSettings,
): Promise<{ content: string; flags: Record<string, unknown> }> {
    const anonymous = game.i18n.localize(`${I18N_PREFIX}.they`);
    const tokenName = game.pf2e.settings.tokens.nameVisibility
        ? anonymous
        : (message.alias ?? message.token?.name ?? message.actor?.name ?? anonymous);

    const type = systems.getFlag<string>(message, "origin.type") ?? "spell";
    const tradition = systems.getFlag<string>(message, "casting.tradition") ?? "";
    const isBasicSave = systems.getFlag<string[]>(message, "context.options")?.includes("item:defense:basic");

    const originalContent = (data.content ?? "") as string;
    const content = buildSpellMessage(
        originSpell,
        tokenName,
        type,
        tradition,
        spellUuid,
        originalContent,
        isBasicSave,
        settings.showTraits,
        settings.traitsBlocklist,
    );

    const flags = buildPrivateSpellFlags(message);

    return { content, flags };
}

function buildPrivateSpellFlags(message: ChatMessagePF2e): Record<string, unknown> {
    return {
        "xdy-pf2e-workbench": {
            privateSpell: {
                originUuid: systems.getFlag(message, "origin.uuid"),
                originCastRank: systems.getFlag(message, "origin.castRank"),
                originMessageUuid: message.uuid,
            },
        },
    };
}

function applyPrivateWhisperToMessage(data: Record<string, unknown>, message: ChatMessagePF2e): void {
    data.style = CONST.CHAT_MESSAGE_STYLES.OTHER;
    data.whisper = ChatMessage.getWhisperRecipients("GM").map((u) => u.id) as string[];
    if (!game.user.isGM) {
        (data.whisper as string[]).push(game.user.id);
    }

    message.updateSource(data);
}

function isShiftModifierActive(): boolean {
    // TODO Doesn't work on mac?
    const keyboardManager = foundry.helpers.interaction.KeyboardManager;
    return game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.SHIFT);
}
