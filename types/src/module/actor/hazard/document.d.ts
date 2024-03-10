import { ActorPF2e } from "@actor";
import { SaveType } from "@actor/types.ts";
import { ConditionPF2e } from "@item";
import { ItemType } from "@item/base/data/index.ts";
import { Rarity } from "@module/data.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { DamageType } from "@system/damage/index.ts";
import { Statistic } from "@system/statistic/index.ts";
import { HazardSource, HazardSystemData } from "./data.ts";
declare class HazardPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    skills: Record<"stealth", Statistic<this>>;
    get allowedItemTypes(): (ItemType | "physical")[];
    get rarity(): Rarity;
    get isComplex(): boolean;
    get hardness(): number;
    get hasDefenses(): boolean;
    /** Minimal check since the disabled status of a hazard isn't logged */
    get canAttack(): boolean;
    get emitsSound(): boolean;
    isAffectedBy(effect: DamageType | ConditionPF2e): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /**
     * Some hazards have an implicit immunity exception to certain damage types despite having object immunities: use a
     * weakness or resistance as indication.
     */
    prepareData(): void;
    private prepareSaves;
}
interface HazardPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: HazardSource;
    system: HazardSystemData;
    saves: {
        [K in SaveType]?: Statistic;
    };
}
export { HazardPF2e };
