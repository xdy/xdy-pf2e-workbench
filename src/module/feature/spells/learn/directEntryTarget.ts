import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import type { LearnSpellTarget } from "../types.ts";
import { createSpellWithLock } from "../spellChatUtils.ts";
import { LearnSpellHandler } from "./learnSpellHandler.ts";

export class DirectEntryTarget implements LearnSpellTarget {
    async addSpell(
        spell: SpellPF2e | Record<string, unknown>,
        actor: ActorPF2e,
        entryId: string,
    ): Promise<string | null> {
        return createSpellWithLock(actor, spell, entryId);
    }
}

export const directEntryLearnHandler = new LearnSpellHandler(new DirectEntryTarget());
