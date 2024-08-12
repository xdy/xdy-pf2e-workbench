import { ZeroToTwo } from "@module/data.ts";
import { RegionBehaviorPF2e } from "./document.ts";
import fields = foundry.data.fields;
declare class EnvironmentFeatureBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentFeatureTypeSchema, RegionBehaviorPF2e | null> {
    static defineSchema(): EnvironmentFeatureTypeSchema;
}
interface EnvironmentFeatureBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentFeatureTypeSchema, RegionBehaviorPF2e | null>, ModelPropsFromSchema<EnvironmentFeatureTypeSchema> {
}
type EnvironmentFeatureTypeSchema = {
    terrain: fields.SchemaField<{
        difficult: fields.NumberField<ZeroToTwo, ZeroToTwo, true, false, true>;
    }>;
};
export { EnvironmentFeatureBehaviorType };
