import { ChatContextFlag, CheckRollContextFlag } from "./data";
declare function isCheckContextFlag(flag?: ChatContextFlag): flag is CheckRollContextFlag;
export { isCheckContextFlag };
