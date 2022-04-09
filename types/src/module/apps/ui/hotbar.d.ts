import { MacroPF2e } from "@module/macro";
declare class HotbarPF2e extends Hotbar<MacroPF2e> {
    /** Handle macro creation from non-macros */
    _onDrop(event: ElementDragEvent): Promise<void>;
}
export { HotbarPF2e };
