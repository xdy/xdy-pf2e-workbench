import { StrikeLookupData } from "@module/chat-message";
import { ZeroToThree } from "@module/data";
import { UserPF2e } from "@module/user";
import { DegreeOfSuccessIndex } from "@system/degree-of-success";
import { RollDataPF2e } from "@system/rolls";
declare class CheckRoll extends Roll {
    roller: UserPF2e | null;
    isReroll: boolean;
    isRerollable: boolean;
    constructor(formula: string, data?: {}, options?: CheckRollDataPF2e);
    get degreeOfSuccess(): DegreeOfSuccessIndex | null;
}
interface CheckRoll extends Roll {
    options: CheckRollDataPF2e;
}
interface CheckRollDataPF2e extends RollDataPF2e {
    isReroll?: boolean;
    degreeOfSuccess?: ZeroToThree;
    strike?: StrikeLookupData;
}
export { CheckRoll, CheckRollDataPF2e };
