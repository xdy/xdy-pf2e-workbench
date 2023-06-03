import { MeasuredTemplatePF2e } from "@module/canvas/measured-template.ts";
import { ScenePF2e } from "./document.ts";
import { ItemPF2e } from "@item";
import { ActorPF2e } from "@actor";
import { ItemOriginFlag } from "@module/chat-message/data.ts";
export declare class MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get item(): ItemPF2e<ActorPF2e> | null;
}
export interface MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get object(): MeasuredTemplatePF2e<this> | null;
    flags: DocumentFlags & {
        pf2e?: {
            origin?: ItemOriginFlag;
        };
    };
}
