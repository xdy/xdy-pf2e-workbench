import type { ActorPF2e } from "foundry-pf2e";
import { I18N } from "./helpers.ts";
import { withLock } from "../../utils/locks.ts";
import { fireAndForget } from "../../utils.ts";

export function postLearnChatMessage(
    actor: ActorPF2e,
    key: string,
    data: Record<string, string | number | boolean | null | undefined>,
): void {
    const message = game.i18n.format(`${I18N}.${key}`, data);
    fireAndForget(
        ChatMessage.create({
            content: message,
            speaker: ChatMessage.getSpeaker({ actor }),
        }),
        "postLearnChatMessage",
    );
}

export async function createSpellWithLock(
    actor: ActorPF2e,
    data: Record<string, unknown>,
    entryId?: string,
): Promise<string | null> {
    const clone = entryId
        ? { ...data, system: { ...((data.system as Record<string, unknown>) ?? {}), location: { value: entryId } } }
        : data;
    return withLock(actor.id, async () => {
        const created = await actor.createEmbeddedDocuments("Item", [clone]);
        return Array.isArray(created) && created.length > 0 ? ((created[0] as { uuid?: string })?.uuid ?? null) : null;
    });
}
