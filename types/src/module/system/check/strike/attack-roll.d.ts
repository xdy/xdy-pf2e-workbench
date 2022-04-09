import { RollDataPF2e } from "@system/rolls";
import { CheckRoll } from "../roll";
export declare class StrikeAttackRoll extends CheckRoll {
    static CHAT_TEMPLATE: string;
    render(this: Rolled<StrikeAttackRoll>, options?: RollRenderOptions): Promise<string>;
    toJSON(): StrikeRollJSON;
}
interface StrikeRollJSON extends RollJSON {
    data?: Partial<RollDataPF2e>;
}
export {};
