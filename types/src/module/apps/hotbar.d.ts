import { MacroPF2e } from "@module/macro.ts";
declare class HotbarPF2e extends Hotbar<MacroPF2e> {
    #private;
    /** Handle macro creation from non-macros */
    _onDrop(event: DragEvent): Promise<void>;
}
export { HotbarPF2e };
