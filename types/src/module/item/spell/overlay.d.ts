import { SpellOverlay, SpellOverlayType, SpellSource } from "./data.ts";
import { SpellPF2e } from "./index.ts";
import { ActorPF2e } from "@actor";
declare class SpellOverlayCollection extends Collection<SpellOverlay> {
    readonly spell: SpellPF2e;
    constructor(spell: SpellPF2e, entries?: Record<string, SpellOverlay>);
    /** Returns all variants based on override overlays */
    get overrideVariants(): SpellPF2e<ActorPF2e>[];
    getType(overlayId: string): SpellOverlayType;
    create(overlayType: SpellOverlayType, options?: {
        renderSheet: boolean;
    }): Promise<void>;
    updateOverride(variantSpell: SpellPF2e<ActorPF2e>, data: Partial<SpellSource>, options?: DocumentModificationContext<ActorPF2e>): Promise<SpellPF2e<ActorPF2e>>;
    deleteOverlay(overlayId: string): Promise<void>;
    protected verifyOverlayId(overlayId: string): void;
}
export { SpellOverlayCollection };
