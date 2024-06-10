import type { ActorPF2e } from "@actor";
import type { SpellOverlay, SpellOverlayType, SpellSource } from "./data.ts";
import type { SpellPF2e } from "./document.ts";
declare class SpellOverlayCollection extends Collection<SpellOverlay> {
    readonly spell: SpellPF2e;
    constructor(spell: SpellPF2e, entries?: Record<string, SpellOverlay>);
    /** Returns all variants based on override overlays */
    get overrideVariants(): SpellPF2e[];
    getType(overlayId: string): SpellOverlayType;
    create(overlayType: SpellOverlayType, options?: {
        renderSheet: boolean;
    }): Promise<void>;
    updateOverride<TSpell extends SpellPF2e>(variantSpell: TSpell, data: Partial<SpellSource>, operation?: Partial<DatabaseUpdateOperation<ActorPF2e>>): Promise<TSpell | null>;
    deleteOverlay(overlayId: string): Promise<void>;
    protected verifyOverlayId(overlayId: string): void;
}
export { SpellOverlayCollection };
