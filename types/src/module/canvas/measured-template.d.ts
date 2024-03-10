import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { EffectAreaShape } from "@item/spell/types.ts";
import type { ChatMessagePF2e } from "@module/chat-message/document.ts";
import type { MeasuredTemplateDocumentPF2e, ScenePF2e } from "@scene";
import type { TemplateLayerPF2e } from "./index.ts";
declare class MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    get actor(): ActorPF2e | null;
    get item(): ItemPF2e | null;
    get message(): ChatMessagePF2e | null;
    get areaShape(): EffectAreaShape | null;
    /** Set the template layer's grid precision appropriately for this measured template's shape. */
    snapForShape(): void;
    highlightGrid(): void;
    protected _onDragLeftDrop(event: PlaceablesLayerPointerEvent<this>): Promise<void | TDocument[]>;
}
interface MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
