/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from "./index.ts";
export declare class CriticalHitAndFumbleCards {
    private static rollTypes;
    private static diceSoNice;
    private static appendButtonsOption;
    static handleDraw(message: ChatMessagePF2e): void;
    private static automaticDraw;
    private static drawFromTable;
    static appendButtons(message: ChatMessagePF2e, $html: JQuery): void;
}
