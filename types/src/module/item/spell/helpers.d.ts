import type { SpellPF2e } from "./index.ts";
declare function createSpellRankLabel(spell: SpellPF2e, castRank?: number): string;
declare function createDescriptionPrepend(spell: SpellPF2e, { includeTraditions }: {
    includeTraditions: boolean;
}): Promise<string>;
export { createDescriptionPrepend, createSpellRankLabel };
