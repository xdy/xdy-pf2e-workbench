import { CreatureIdentificationData } from "@module/recall-knowledge.ts";
export declare class RecallKnowledgePopup extends Application {
    #private;
    constructor(options: Partial<ApplicationOptions>, data: CreatureIdentificationData);
    static get defaultOptions(): ApplicationOptions;
    getData(): Promise<PopupData>;
}
interface PopupData {
    standard: {
        label: string;
        attempts: string[];
    };
    loreEasy: string[];
    loreVeryEasy: string[];
}
export {};
