import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import type { EffectAreaShape } from "@item/spell/types.ts";
import type { ChatMessagePF2e } from "@module/chat-message/document.ts";
import type { MeasuredTemplateDocumentPF2e, ScenePF2e } from "@scene";
import type { TemplateLayerPF2e } from "./layer/template.ts";

declare class MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    get actor(): ActorPF2e | null;
    get item(): ItemPF2e | null;
    get message(): ChatMessagePF2e | null;
    get areaShape(): EffectAreaShape | null;
    /**
     * Returns the snapping for this template's highlight.
     * Note that circle templates created via the canvas controls are neither bursts nor emanations, and thus can go in either position.
     */
    get snappingMode(): number;
    highlightGrid(): void;
    /** Overriden to also return collision information */
    protected _getGridHighlightPositions(): PointCollision[];
}
interface PointCollision extends Point {
    collision?: boolean;
}
interface MeasuredTemplatePF2e<TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>> extends MeasuredTemplate<TDocument> {
    get layer(): TemplateLayerPF2e<this>;
}
export { MeasuredTemplatePF2e };
