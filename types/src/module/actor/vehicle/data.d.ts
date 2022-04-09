import { ActorSystemData, BaseActorAttributes, BaseActorDataPF2e, BaseActorSourcePF2e, BaseHitPointsData, BaseTraitsData } from "@actor/data/base";
import { ValuesList } from "@module/data";
import { VehiclePF2e } from ".";
/** The stored source data of a vehicle actor */
export declare type VehicleSource = BaseActorSourcePF2e<"vehicle", VehicleSystemData>;
/** The boxed data object of the vehicle actor */
export declare class VehicleData extends BaseActorDataPF2e<VehiclePF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface VehicleData extends Omit<VehicleSource, "effects" | "flags" | "items" | "token"> {
    type: VehicleSource["type"];
    data: VehicleSource["data"];
    readonly _source: VehicleSource;
}
interface VehicleHitPointsData extends Required<BaseHitPointsData> {
    brokenThreshold: number;
    negativeHealing: false;
}
interface VehicleAttributes extends BaseActorAttributes {
    ac: {
        value: number;
        check: number;
        details: string;
    };
    hardness: number;
    hp: VehicleHitPointsData;
}
/** The system-level data of vehicle actors. */
interface VehicleSystemData extends ActorSystemData {
    attributes: VehicleAttributes;
    details: {
        description: string;
        level: {
            value: number;
        };
        price: number;
        space: {
            long: number;
            wide: number;
            high: number;
        };
        crew: string;
        passengers: string;
        pilotingCheck: string;
        AC: number;
        speed: number;
    };
    saves: {
        fortitude: {
            rank: number;
            value: number;
            saveDetail: string;
        };
    };
    traits: VehicleTraitsData;
    [key: string]: any;
}
export declare type VehicleTrait = keyof ConfigPF2e["PF2E"]["vehicleTraits"];
declare type VehicleTraits = ValuesList<VehicleTrait>;
interface VehicleTraitsData extends BaseTraitsData {
    traits: VehicleTraits;
}
export interface TokenDimensions {
    width: number;
    height: number;
}
export {};
