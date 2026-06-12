import type { PointerPingPayload, PointerStopPayload, PointerSyncPayload } from "./constants.ts";
import { OP_PING, OP_STOP, OP_SYNC, REMOTE_CLASS, SOCKET_NAME } from "./constants.ts";

export function worldToScreen(wx: number, wy: number): { screenX: number; screenY: number } {
    if (!canvas?.ready) return { screenX: 0, screenY: 0 };
    const { x, y } = canvas.stage.worldTransform.apply({ x: wx, y: wy });
    return { screenX: x, screenY: y };
}

export function sendPosition(iconClass: string, userColor: string): void {
    if (!canvas?.ready) return;
    const mp = canvas.mousePosition;
    const payload = {
        operation: OP_SYNC,
        userId: game.user?.id,
        wx: Math.round(mp.x),
        wy: Math.round(mp.y),
        iconClass,
        color: userColor,
    } satisfies PointerSyncPayload;
    game.socket.emit(SOCKET_NAME, payload);
}

export function sendPing(soundSrc: string, volume: number): void {
    if (!canvas?.ready) return;
    const mp = canvas.mousePosition;
    game.socket.emit(SOCKET_NAME, {
        operation: OP_PING,
        userId: game.user?.id,
        wx: Math.round(mp.x),
        wy: Math.round(mp.y),
        soundSrc,
        volume,
    } satisfies PointerPingPayload);
}

export function sendStop(userId: string): void {
    game.socket.emit(SOCKET_NAME, {
        operation: OP_STOP,
        userId,
    } satisfies PointerStopPayload);
}

export function getOrCreateRemoteElement(remotes: Map<string, HTMLElement>, userId: string): HTMLElement {
    let el = remotes.get(userId);
    if (!el) {
        el = document.createElement("i");
        el.classList.add(REMOTE_CLASS);
        el.setAttribute("aria-hidden", "true");
        document.body.appendChild(el);
        remotes.set(userId, el);
    }
    return el;
}

export function updateRemoteElement(el: HTMLElement, iconClass: string, color: string): void {
    el.className = `${REMOTE_CLASS} ${iconClass}`;
    el.style.color = color;
}

export function removeRemoteElement(remotes: Map<string, HTMLElement>, userId: string): void {
    const el = remotes.get(userId);
    if (el) {
        el.remove();
        remotes.delete(userId);
    }
}
