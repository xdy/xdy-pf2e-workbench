import type { RegionBehaviorInstanceType, RegionBehaviorInstances } from "./types.ts";
declare class RegionBehaviorPF2e<TParent extends RegionDocument = RegionDocument> extends RegionBehavior<TParent> {
    isOfType<T extends RegionBehaviorInstanceType>(...types: T[]): this is RegionBehaviorInstances<TParent>[T];
    protected _onUpdate(data: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, userId: string): void;
}
export { RegionBehaviorPF2e };
