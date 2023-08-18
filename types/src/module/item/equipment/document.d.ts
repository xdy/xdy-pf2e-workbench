import { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/data/index.ts";
import { PhysicalItemPF2e } from "@item/physical/index.ts";
import { UserPF2e } from "@module/documents.ts";
import { EquipmentSource, EquipmentSystemData, EquipmentTrait } from "./data.ts";
import { OtherEquipmentTag } from "./types.ts";
declare class EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    get otherTags(): Set<OtherEquipmentTag>;
    prepareBaseData(): void;
    prepareSiblingData(this: EquipmentPF2e<ActorPF2e>): void;
    prepareActorData(): void;
    getChatData(this: EquipmentPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: EquipmentSource;
    system: EquipmentSystemData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
