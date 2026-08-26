import type { ItemPF2e } from "foundry-pf2e";

export function isScrollWithSpell(item: ItemPF2e): boolean {
    const system = item.system as { category?: string; spell?: unknown };
    return item.type === "consumable" && system.category === "scroll" && !!system.spell;
}

export function isMystified(item: ItemPF2e): boolean {
    const system = item.system as { identification?: { status?: string } } | undefined;
    return system?.identification?.status === "unidentified";
}
