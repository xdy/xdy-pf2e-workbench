/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { PhysicalItemPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message";
import { CheckDC } from "@system/degree-of-success";
import { SkillActionOptions } from "../types";
declare function repair(options: RepairActionOptions): Promise<void>;
declare function onRepairChatCardEvent(event: JQuery.ClickEvent, message: ChatMessagePF2e | undefined, $card: JQuery): Promise<void>;
interface RepairActionOptions extends SkillActionOptions {
    difficultyClass?: CheckDC;
    item?: PhysicalItemPF2e;
    uuid?: string;
}
export { onRepairChatCardEvent, repair };
