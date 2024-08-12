import type { RegionDocumentPF2e } from "@scene";
declare class RegionBehaviorPF2e<TParent extends RegionDocumentPF2e | null = RegionDocumentPF2e | null> extends RegionBehavior<TParent> {
    protected _onUpdate(data: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, userId: string): void;
}
export { RegionBehaviorPF2e };
