import { SpellOverlay, SpellOverlayType, SpellSource } from "./data";
import { SpellPF2e } from ".";
declare class SpellOverlayCollection extends Collection<SpellOverlay> {
    readonly spell: SpellPF2e;
    constructor(spell: SpellPF2e, entries?: Record<string, SpellOverlay>);
    /** Returns all variants based on override overlays */
    get overrideVariants(): Embedded<SpellPF2e>[];
    getType(overlayId: string): SpellOverlayType;
    create(overlayType: SpellOverlayType, options?: {
        renderSheet: boolean;
    }): Promise<void>;
    updateOverride(variantSpell: Embedded<SpellPF2e>, data: Partial<SpellSource>, options?: DocumentModificationContext): Promise<Embedded<SpellPF2e>>;
    deleteOverlay(overlayId: string): Promise<void>;
    protected verifyOverlayId(overlayId: string): void;
}
export { SpellOverlayCollection };
