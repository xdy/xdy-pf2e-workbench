import { ActorDimensions } from "@actor/types";
import { ItemType } from "@item/data";
import { UserPF2e } from "@module/user";
import { Statistic } from "@system/statistic";
import { ActorPF2e, HitPointsSummary } from "../base";
import { TokenDimensions, VehicleData, VehicleSource } from "./data";
declare class VehiclePF2e extends ActorPF2e {
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Vehicle dimensions are specified for all three axes and usually do not form cubes */
    get dimensions(): ActorDimensions;
    getTokenDimensions(dimensions?: Omit<ActorDimensions, "height">): TokenDimensions;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    protected _preUpdate(changed: DeepPartial<VehicleSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
interface VehiclePF2e {
    readonly data: VehicleData;
    get hitPoints(): HitPointsSummary;
    saves: {
        fortitude: Statistic;
    };
}
export { VehiclePF2e };
