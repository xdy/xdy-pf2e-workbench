declare class ProseMirrorMenuPF2e extends foundry.prosemirror.ProseMirrorMenu {
    #private;
    protected _getDropDownMenus(): Record<string, ProseMirrorDropDownConfig>;
    protected _isMarkActive(item: ProseMirrorMenuItem): boolean;
    protected _isNodeActive(item: ProseMirrorMenuItem): boolean;
    protected _toggleTextBlock(node: ProseMirror.NodeType, { attrs }: {
        attrs?: Record<string, unknown> | null;
    }): void;
    protected _onAction(event: MouseEvent): void;
}
export { ProseMirrorMenuPF2e };
