import { ActorDimensions } from "@actor/types";
import { ItemPF2e } from "@item/base";
import { ItemSourcePF2e } from "@item/data";
import { ActiveEffectPF2e } from "@module/active-effect";
import { UserPF2e } from "@module/user";
import { ActorPF2e, HitPointsSummary } from "../base";
import { TokenDimensions, VehicleData, VehicleSource } from "./data";
export declare class VehiclePF2e extends ActorPF2e {
    static get schema(): typeof VehicleData;
    /** Vehicle dimensions are specified for all three axes and usually do not form cubes */
    get dimensions(): ActorDimensions;
    getTokenDimensions(dimensions?: Omit<ActorDimensions, "height">): TokenDimensions;
    prepareBaseData(): void;
    protected _preUpdate(changed: DeepPartial<VehicleSource>, options: DocumentModificationContext<this>, user: UserPF2e): Promise<void>;
}
export interface VehiclePF2e {
    readonly data: VehicleData;
    get hitPoints(): HitPointsSummary;
    createEmbeddedDocuments(embeddedName: "ActiveEffect", data: PreCreate<foundry.data.ActiveEffectSource>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[]>;
    createEmbeddedDocuments(embeddedName: "Item", data: PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    createEmbeddedDocuments(embeddedName: "ActiveEffect" | "Item", data: PreCreate<foundry.data.ActiveEffectSource>[] | PreCreate<ItemSourcePF2e>[], context?: DocumentModificationContext): Promise<ActiveEffectPF2e[] | ItemPF2e[]>;
}
