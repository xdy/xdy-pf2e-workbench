import { StrikeLookupData } from "@module/chat-message/index.ts";
import { ZeroToThree } from "@module/data.ts";
import { UserPF2e } from "@module/user/index.ts";
import { DegreeOfSuccessIndex } from "@system/degree-of-success.ts";
import { RollDataPF2e } from "@system/rolls.ts";
import { CheckType } from "./types.ts";
declare class CheckRoll extends Roll {
    static CHAT_TEMPLATE: string;
    get roller(): UserPF2e | null;
    get type(): CheckType;
    /** A string of some kind to help system API identify the roll */
    get identifier(): string | null;
    get action(): string | null;
    get degreeOfSuccess(): DegreeOfSuccessIndex | null;
    get isReroll(): boolean;
    get isRerollable(): boolean;
    render(this: Rolled<CheckRoll>, options?: RollRenderOptions): Promise<string>;
}
interface CheckRoll extends Roll {
    options: CheckRollDataPF2e;
}
interface CheckRollDataPF2e extends RollDataPF2e {
    type?: CheckType;
    identifier?: Maybe<string>;
    action?: Maybe<string>;
    isReroll?: boolean;
    degreeOfSuccess?: ZeroToThree;
    strike?: StrikeLookupData;
    domains?: string[];
}
export { CheckRoll, CheckRollDataPF2e };
