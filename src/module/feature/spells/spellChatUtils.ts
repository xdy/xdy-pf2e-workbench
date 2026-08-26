import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import { withLock } from "../../utils/locks.ts";
import { fireAndForget } from "../../utils.ts";
import { getSpellDocData } from "./spellData.ts";

export function postLearnChatMessage(actor: ActorPF2e, fullKey: string, data: Record<string, string | number>): void {
    const message = game.i18n.format(fullKey, data);
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
    spell: SpellPF2e | Record<string, unknown>,
    entryId?: string,
): Promise<string | null> {
    const clone = getSpellDocData(spell);
    if (entryId) {
        clone.system = { ...(clone.system ?? {}), location: { value: entryId } };
    }
    return withLock(actor.id, async () => {
        const created = await actor.createEmbeddedDocuments("Item", [clone]);
        const [first] = created;
        return (first as { uuid?: string } | undefined)?.uuid ?? null;
    });
}
