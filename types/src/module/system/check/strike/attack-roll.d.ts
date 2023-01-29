import { CheckRoll } from "../roll";
export declare class StrikeAttackRoll extends CheckRoll {
    static CHAT_TEMPLATE: string;
    render(this: Rolled<StrikeAttackRoll>, options?: RollRenderOptions): Promise<string>;
}
