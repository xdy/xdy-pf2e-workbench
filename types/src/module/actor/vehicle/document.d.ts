import { ActorDimensions } from "@actor/types.ts";
import { ItemType } from "@item/base/data/index.ts";
import type { UserPF2e } from "@module/user/index.ts";
import { TokenDocumentPF2e } from "@scene/index.ts";
import { ArmorStatistic, Statistic, StatisticDifficultyClass } from "@system/statistic/index.ts";
import { ActorPF2e, HitPointsSummary } from "../base.ts";
import { TokenDimensions, VehicleSource, VehicleSystemData } from "./data.ts";
declare class VehiclePF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: StatisticDifficultyClass<ArmorStatistic>;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Vehicle dimensions are specified for all three axes and usually do not form cubes */
    get dimensions(): ActorDimensions;
    get hardness(): number;
    /** Whether the creature emits sound: overridable by AE-like */
    get emitsSound(): boolean;
    getTokenDimensions(dimensions?: Omit<ActorDimensions, "height">): TokenDimensions;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    protected _preUpdate(changed: DeepPartial<VehicleSource>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface VehiclePF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: VehicleSource;
    system: VehicleSystemData;
    get hitPoints(): HitPointsSummary;
    saves: {
        fortitude: Statistic;
    };
}
export { VehiclePF2e };
