import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { MeasuredTemplatePF2e } from "@module/canvas/measured-template.ts";
import { ItemOriginFlag } from "@module/chat-message/data.ts";
import { ChatMessagePF2e } from "@module/documents.ts";
import { ScenePF2e } from "./document.ts";
export declare class MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get item(): ItemPF2e<ActorPF2e> | null;
    /** The chat message from which this template was spawned */
    get message(): ChatMessagePF2e | null;
    /** If present, show the clear-template button on the message from which this template was spawned */
    protected _onCreate(data: this["_source"], options: DocumentModificationContext<TParent>, userId: string): void;
    /** If present, hide the clear-template button on the message from which this template was spawned */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
export interface MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get object(): MeasuredTemplatePF2e<this> | null;
    flags: DocumentFlags & {
        pf2e?: {
            messageId?: string;
            origin?: ItemOriginFlag;
        };
    };
}
