import type { TokenPF2e } from "../index.ts";
declare class TokenLayerPF2e<TObject extends TokenPF2e> extends TokenLayer<TObject> {
    /** Prevent redirection of event to `Ruler` when ctrl key is pressed. */
    protected _onClickLeft(event: PlaceablesLayerPointerEvent<TObject>): void;
    /** Cycle Z indices of a hovered token stack */
    cycleStack(): boolean;
}
export { TokenLayerPF2e };
