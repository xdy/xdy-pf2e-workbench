/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from ".";
export declare class CriticalHitAndFumbleCards {
    private static rollTypes;
    private static diceSoNice;
    private static appendButtonsOption;
    static handleDraw(chatMessage: ChatMessagePF2e): void;
    private static automaticDraw;
    private static drawFromTable;
    static appendButtons(chatMessage: ChatMessagePF2e, $html: JQuery): void;
}
