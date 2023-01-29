interface EffectBadgeCounter {
    type: "counter";
    value: number;
    labels?: string[];
}
interface EffectBadgeValue {
    type?: "value";
    value: number | string;
}
type EffectBadge = EffectBadgeCounter | EffectBadgeValue;
export { EffectBadge };
