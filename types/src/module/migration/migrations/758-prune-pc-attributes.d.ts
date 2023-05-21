import { ActorSourcePF2e } from "@actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove inadvertently stored attributes caused by bug in Rest for the Night script */
export declare class Migration758PrunePCAttributes extends MigrationBase {
    static version: number;
    toDelete: readonly ["-=ac", "-=ancestryhp", "-=battleForm", "-=classDC", "-=classOrSpellDC", "-=classhp", "-=dexCap", "-=doomed", "-=dying", "-=familiarAbilities", "-=flanking", "-=flatbonushp", "-=flatbonussp", "-=handsFree", "-=hardness", "hp.-=breakdown", "hp.-=details", "hp.-=max", "hp.-=name", "hp.-=negativeHealing", "hp.-=recoveryMultiplier", "hp.-=totalModifier", "hp.-=tempsource", "hp.-=_modifiers", "initiative.-=_modifiers", "initiative.-=breakdown", "initiative.-=label", "initiative.-=name", "initiative.-=roll", "initiative.-=tiebreakPriority", "initiative.-=totalModifier", "-=levelbonushp", "-=levelbonussp", "-=perception", "-=polymorphed", "-=reach", "-=shield", "speed.-=_modifiers", "speed.-=breakdown", "speed.-=name", "speed.-=total", "speed.-=totalModifier", "speed.-=type", "-=spellDC", "-=wounded"];
    updateActor(source: ActorSourceWithDeletions): Promise<void>;
}
type ActorSourceWithDeletions = ActorSourcePF2e & {
    [K in `system.attributes.${Migration758PrunePCAttributes["toDelete"][number]}`]?: null;
};
export {};
