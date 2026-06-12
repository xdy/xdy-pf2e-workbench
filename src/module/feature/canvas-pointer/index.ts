import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import type { PointerPayload, PointerPingPayload, PointerSyncPayload } from "./constants.ts";
import { DEFAULT_POINTER_COLOR, OP_PING, OP_SYNC, SOCKET_NAME } from "./constants.ts";
import {
    getOrCreateRemoteElement,
    removeRemoteElement,
    sendPing,
    sendPosition,
    sendStop,
    updateRemoteElement,
    worldToScreen,
} from "./network.ts";
import { logWarn } from "../../utils.ts";

let initialized = false;
let active = false;
let overlay: HTMLElement | null = null;
let iconClass: string = "";
let userColor: string = "";
let broadcastTimer: string | number | NodeJS.Timeout | null | undefined = null;

const remotes = new Map<string, HTMLElement>();

export function initCanvasPointer(): void {
    if (initialized) return;
    initialized = true;

    game.socket.on(SOCKET_NAME, (payload: PointerPayload) => {
        if (payload.operation === OP_SYNC) {
            handleRemoteSync(payload);
        } else if (payload.operation === OP_PING) {
            handleRemotePing(payload);
        } else {
            handleRemoteStop(payload);
        }
    });

    Hooks.on("userConnected", onUserConnected);
}

export function activateCanvasPointer(faIconClass: string): boolean {
    if (active) return false;
    if (!canvas?.ready) return false;

    active = true;
    iconClass = faIconClass;
    userColor = game.user?.color?.css ?? DEFAULT_POINTER_COLOR;

    if (userColor === DEFAULT_POINTER_COLOR) {
        logWarn(`${SOCKET_NAME} | userColor fell back to default — game.user?.color?.css was unavailable`);
    }

    setupLocalOverlay();
    startBroadcast();

    document.body.classList.add("xdy-pf2e-workbench-pointer-active");
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("mousedown", onMouseDown);
    return true;
}

export function deactivateCanvasPointer(): boolean {
    if (!active) return false;
    active = false;

    stopBroadcast();

    document.body.classList.remove("xdy-pf2e-workbench-pointer-active");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("mousedown", onMouseDown);

    if (overlay) {
        overlay.style.display = "none";
    }
    return true;
}

function startBroadcast(): void {
    sendPosition(iconClass, userColor);
    const interval = (game.settings.get(MODULENAME, "canvasPointerBroadcastInterval") as number) ?? 10;
    broadcastTimer = setInterval(() => sendPosition(iconClass, userColor), interval);
}

function stopBroadcast(): void {
    if (broadcastTimer !== null) {
        clearInterval(broadcastTimer);
        broadcastTimer = null;
    }
    sendStop(game.user?.id ?? "");
}

function setupLocalOverlay(): void {
    if (!overlay) {
        overlay = document.createElement("i");
        overlay.id = "xdy-pf2e-workbench-pointer-overlay";
        overlay.setAttribute("aria-hidden", "true");
        document.body.appendChild(overlay);
    }
    overlay.className = iconClass;
    overlay.style.display = "block";
    overlay.style.color = userColor;
}

function handleRemoteSync(payload: PointerSyncPayload): void {
    if (!canvas?.ready) return;
    if (payload.userId === game.user?.id) return;

    const { screenX, screenY } = worldToScreen(payload.wx, payload.wy);

    const el = getOrCreateRemoteElement(remotes, payload.userId);
    updateRemoteElement(el, payload.iconClass, payload.color);
    el.style.left = `${Math.round(screenX)}px`;
    el.style.top = `${Math.round(screenY)}px`;
}

function handleRemoteStop({ userId }: { userId: string }): void {
    removeRemoteElement(remotes, userId);
}

function onUserConnected(user: foundry.documents.BaseUser, connected: boolean): void {
    if (!connected) {
        removeRemoteElement(remotes, user.id);
    }
}

function onVisibilityChange(): void {
    if (document.visibilityState === "hidden") {
        deactivateCanvasPointer();
    }
}

function onMouseMove(event: MouseEvent): void {
    if (!overlay) return;
    overlay.style.left = `${event.clientX}px`;
    overlay.style.top = `${event.clientY}px`;
}

function onMouseDown(_event: MouseEvent): void {
    if (!canvas?.ready) return;
    const pingMode = game.settings.get(MODULENAME, "canvasPointerPingMode") as string;
    if (pingMode === "sound" || pingMode === "visualAndSound") {
        const src = game.settings.get(MODULENAME, "canvasPointerPingSound") as string;
        const volume = game.settings.get(MODULENAME, "canvasPointerPingVolume") as number;
        if (src) {
            game.audio.play(src, { volume });
            sendPing(src, volume);
        }
    }
    if (pingMode === "visual" || pingMode === "visualAndSound") {
        canvas.ping(canvas.mousePosition);
    }
}

function handleRemotePing(payload: PointerPingPayload): void {
    if (!canvas?.ready) return;
    if (payload.userId === game.user?.id) return;
    if (payload.soundSrc) {
        game.audio.play(payload.soundSrc, { volume: payload.volume });
    }
}
