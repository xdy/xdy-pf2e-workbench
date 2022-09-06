import { OneToFour } from "@module/data";
declare type DieFaceCount = 4 | 6 | 8 | 10 | 12 | 20;
declare type DiceExpression = `${OneToFour | ""}d${DieFaceCount}`;
interface EffectBadgeCounter {
    type: "counter";
    value: number;
}
interface EffectBadgeValue {
    type?: "value";
    value: number | DiceExpression;
}
declare type EffectBadge = EffectBadgeCounter | EffectBadgeValue;
export { EffectBadge };
