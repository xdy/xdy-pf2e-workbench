import type { RegionEventType } from "types/foundry/client-esm/data/region-behaviors/base.d.ts";
import type { SetField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { RegionEventPF2e } from "./types.ts";
declare class EnvironmentBehaviorTypePF2e extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema> {
    events: Set<RegionEventType>;
    static defineSchema(): EnvironmentTypeSchema;
    protected _handleRegionEvent(event: RegionEventPF2e): Promise<void>;
}
interface EnvironmentBehaviorTypePF2e extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema>, ModelPropsFromSchema<EnvironmentTypeSchema> {
}
type EnvironmentTypeSchema = {
    environmentTypes: SetField<StringField>;
    mode: StringField<"add" | "remove" | "override">;
};
type EnvironmentTypeData = ModelPropsFromSchema<EnvironmentTypeSchema>;
type EnvironmentTypeSource = SourceFromSchema<EnvironmentTypeSchema>;
export { EnvironmentBehaviorTypePF2e };
export type { EnvironmentTypeData, EnvironmentTypeSource };
