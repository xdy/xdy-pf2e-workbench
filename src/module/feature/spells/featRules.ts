import type { ActorPF2e, SpellPF2e } from "foundry-pf2e";
import { actorHasItemBySlug } from "../../utils.ts";

export function getActorClassSlugs(actor: ActorPF2e): string[] {
    const slugs = new Set<string>();
    for (const item of actor.items) {
        if (item.type === "class" && item.system?.slug) {
            slugs.add(item.system.slug as string);
        }
    }
    return [...slugs];
}

const SKILL_TO_TRADITION: Record<string, string> = {
    arcana: "arcane",
    nature: "primal",
    religion: "divine",
};

export function getSkillBasedTraditionGrants(actor: ActorPF2e): Set<string> {
    const grants = new Set<string>();
    if (!actorHasItemBySlug(actor, "impossible-polymath")) return grants;

    const skills = (actor as { skills?: Record<string, { rank?: number }> }).skills ?? {};
    for (const [skillSlug, tradition] of Object.entries(SKILL_TO_TRADITION)) {
        if ((skills[skillSlug]?.rank ?? 0) >= 1) grants.add(tradition);
    }
    return grants;
}

export type SpellPredicate = (spell: SpellPF2e) => boolean;
