import { IdentifyCreatureData } from "@module/recall-knowledge";
export declare class RecallKnowledgePopup extends Application {
    private data;
    static get defaultOptions(): ApplicationOptions;
    constructor(options: Partial<ApplicationOptions>, data: IdentifyCreatureData);
    getData(): Promise<{
        specificLoreAttempts: string[];
        unspecificLoreAttempts: string[];
        skills: {
            name: string;
            attempts: string[];
        }[];
    }>;
    private padAttempts;
}
