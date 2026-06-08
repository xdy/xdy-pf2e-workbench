export const OP_SYNC = "canvasPointerSync" as const;
export const OP_STOP = "canvasPointerStop" as const;

export interface PointerSyncPayload {
    operation: typeof OP_SYNC;
    userId: string;
    wx: number;
    wy: number;
    iconClass: string;
    color: string;
}

export interface PointerStopPayload {
    operation: typeof OP_STOP;
    userId: string;
}

export type PointerPayload = PointerSyncPayload | PointerStopPayload;

export const REMOTE_CLASS = "xdy-pf2e-workbench-pointer-remote";
export const DEFAULT_POINTER_COLOR = "#ffffff";
export const DEFAULT_POINTER_ICON = "fa-regular fa-hand-point-down";

export const SOCKET_NAME = `module.xdy-pf2e-workbench`;
