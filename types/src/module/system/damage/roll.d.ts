import { DamageRollFlag } from "@module/chat-message";
import { UserPF2e } from "@module/user";
import { RollDataPF2e } from "@system/rolls";
import { DamageTemplate } from "./weapon";
declare class DamageRoll extends Roll<DamageRollDataPF2e> {
    roller: UserPF2e | null;
    get formula(): string;
    constructor(formula: string, data: {} | undefined, options: DamageRollDataPF2e);
    protected _evaluate(options?: Omit<EvaluateRollParams, "async"> | undefined): Promise<Rolled<this>>;
    getTooltip(): Promise<string>;
    /** Overriden to use formula override instead of _formula */
    render(chatOptions?: RollRenderOptions | undefined): Promise<string>;
}
interface DamageRollDataPF2e extends RollDataPF2e {
    damage: DamageTemplate;
    result?: DamageRollFlag;
}
export { DamageRoll };
